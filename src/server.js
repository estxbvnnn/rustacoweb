// filepath: server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const os = require('os');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_PUBLIC_URL = process.env.SERVER_PUBLIC_URL || 'https://158.69.212.144';
const CLIENT_URL = process.env.CLIENT_URL || 'https://158.69.212.144';
const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const corsOrigins = [
  CLIENT_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.EXTRA_CORS_ORIGINS
].filter(Boolean)
  .flatMap((value) => String(value).split(',').map((item) => item.trim()).filter(Boolean));

// --- AGREGAR ESTA LÍNEA PARA PRODUCCIÓN DETRÁS DE NGINX ---
app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'rustaco',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    secure: NODE_ENV === 'production'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // Para parsear JSON en POST

const DB_HOST = process.env.DB_HOST || '34.139.33.19';
const DB_USER = process.env.DB_USER || 'rustaco';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Rustaco.2000';
const DB_NAME = process.env.DB_NAME || 'rustaco';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

const statsDb = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000,
  supportBigNumbers: true,
  bigNumberStrings: true
});

function stripSensitiveStatsFields(row) {
  if (!row || typeof row !== 'object') {
    return row;
  }

  const blockedKeys = new Set([
    'ip',
    'lastip',
    'last_ip',
    'userip',
    'clientip',
    'remoteip',
    'ipv4',
    'ipv6'
  ]);

  return Object.fromEntries(
    Object.entries(row).filter(([key]) => !blockedKeys.has(String(key).toLowerCase()))
  );
}

async function verifyDbConnection() {
  try {
    await statsDb.query('SELECT 1 AS ok');
    console.log(`MySQL OK at ${DB_HOST}:${DB_PORT} (${DB_NAME})`);
  } catch (error) {
    console.error('MySQL connection failed:', {
      code: error.code || null,
      errno: error.errno || null,
      sqlState: error.sqlState || null,
      message: error.message || 'Unknown error'
    });
  }
}

const STEAM_API_KEY = process.env.STEAM_API_KEY || '3E6FB3DF729486B3EF9485399557CC45';

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  // Recupera el usuario en el mismo formato
  done(null, obj);
});

// Almacena usuarios autenticados (en memoria, para demo)
const steamUsers = {};

// Modifica el callback de SteamStrategy para guardar usuarios
passport.use(new SteamStrategy({
  returnURL: `${SERVER_PUBLIC_URL.replace(/\/$/, '')}/auth/steam/return`,
  realm: `${SERVER_PUBLIC_URL.replace(/\/$/, '')}/`,
  apiKey: STEAM_API_KEY
}, (identifier, profile, done) => {
  process.nextTick(() => {
    profile.identifier = identifier;
    // Guarda el usuario en memoria (por steamid)
    if (profile && profile.id) {
      steamUsers[profile.id] = {
        steamid: profile.id,
        name: profile.displayName,
        avatar: profile.photos?.[2]?.value || profile.photos?.[0]?.value || null,
        lastLogin: new Date().toISOString()
      };
    }
    // Devuelve el objeto en el formato que espera el frontend
    return done(null, {
      steamid: profile.id,
      name: profile.displayName,
      avatar: profile.photos?.[2]?.value || profile.photos?.[0]?.value || null
    });
  });
}));

app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/auth/steam/fail' }));

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/auth/steam/fail' }),
  (req, res) => {
    if (req.user && req.user.steamid) {
      // Redirige solo a la home sin parámetros visibles
      res.redirect(CLIENT_URL);
    } else {
      res.redirect('/auth/steam/fail');
    }
  }
);

app.get('/auth/steam/fail', (req, res) => {
  res.status(401).send('Steam login failed');
});

app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return res.status(500).send('Logout error'); }
    res.redirect('/');
  });
});

// Endpoint para logout desde el frontend (AJAX)
app.post('/api/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return res.status(500).json({ ok: false, error: 'Logout error' }); }
    res.json({ ok: true });
  });
});

// API para obtener el usuario autenticado (Steam)
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated() && req.user) {
    // Devuelve el usuario en el formato correcto
    res.json({
      steamid: req.user.steamid,
      name: req.user.name,
      avatar: req.user.avatar
    });
  } else {
    res.json({ steamid: null });
  }
});

app.get('/api/stats', async (req, res) => {
  const allowedTables = new Set(['PlayerStats', 'StatsStorage']);
  const table = allowedTables.has(req.query.table) ? req.query.table : 'PlayerStats';
  const limitRaw = parseInt(req.query.limit, 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 50;
  const KILL_LOOT_TYPE = 6;
  const DEATH_LOOT_TYPE = 9;

  try {
    if (table === 'PlayerStats') {
      const [rows] = await statsDb.query(
        'SELECT p.*, ' +
        'COALESCE(k.ItemValue, 0) AS Kills, ' +
        'COALESCE(d.ItemValue, 0) AS Deaths, ' +
        'CASE WHEN COALESCE(d.ItemValue, 0) = 0 THEN COALESCE(k.ItemValue, 0) ' +
        'ELSE ROUND(COALESCE(k.ItemValue, 0) / NULLIF(d.ItemValue, 0), 2) END AS KDR ' +
        'FROM PlayerStats p ' +
        'LEFT JOIN StatsStorage k ON k.UserId = p.UserId AND k.LootType = ? AND k.ShortName = ? ' +
        'LEFT JOIN StatsStorage d ON d.UserId = p.UserId AND d.LootType = ? AND d.ShortName = ? ' +
        'ORDER BY Kills DESC ' +
        'LIMIT ?',
        [
          KILL_LOOT_TYPE, 'kills',
          DEATH_LOOT_TYPE, 'deaths',
          limit
        ]
      );
      if (rows.length === 0) {
        res.json({ table, rows });
        return;
      }

      const resourceShortNames = [
        'stones',
        'metal.ore',
        'hq.metal.ore',
        'sulfur.ore',
        'wood',
        'cloth',
        'leather',
        'bone.fragments',
        'mushroom',
        'scrap',
        'green.berry',
        'red.berry',
        'blue.berry',
        'black.berry',
        'yellow.berry',
        'white.berry',
        'corn',
        'pumpkin',
        'potato',
        'wheat',
        'ammo.rocket.basic',
        'ammo.rocket.hv',
        'ammo.rocket.fire',
        'explosive.timed',
        'ammo.rifle.explosive',
        'crate_normal_2',
        'crate_normal',
        'crate_elite'
      ];

      const userIds = rows.map((row) => row.UserId).filter(Boolean);
      const [resourceRows] = await statsDb.query(
        'SELECT UserId, ShortName, SUM(ItemValue) AS ItemValue ' +
        'FROM StatsStorage ' +
        'WHERE UserId IN (?) AND ShortName IN (?) ' +
        'GROUP BY UserId, ShortName',
        [userIds, resourceShortNames]
      );

      const resourceMap = new Map();
      resourceRows.forEach((row) => {
        if (!resourceMap.has(row.UserId)) {
          resourceMap.set(row.UserId, new Map());
        }
        resourceMap.get(row.UserId).set(row.ShortName, row.ItemValue);
      });

      const rowsWithResources = rows.map((row) => {
        const perUser = resourceMap.get(row.UserId) || new Map();
        const resources = {};
        resourceShortNames.forEach((name) => {
          resources[name] = perUser.get(name) || 0;
        });
        return stripSensitiveStatsFields({ ...row, ...resources });
      });

      res.json({ table, rows: rowsWithResources });
      return;
    }

    const [rows] = await statsDb.query('SELECT * FROM ?? LIMIT ?', [table, limit]);
    res.json({ table, rows: rows.map(stripSensitiveStatsFields) });
  } catch (error) {
    console.error('Stats query error:', error);
    res.status(500).json({
      error: 'Stats query failed',
      code: error.code || null,
      message: error.message || 'Unknown error'
    });
  }
});

app.get('/api/player-stats', async (req, res) => {
  const userIdRaw = String(req.query.userId || '').trim();
  const nicknameRaw = String(req.query.nickname || '').trim();
  const isNumericId = (value) => /^[0-9]{5,20}$/.test(value);
  const userId = isNumericId(userIdRaw) ? userIdRaw : (isNumericId(nicknameRaw) ? nicknameRaw : '');
  if (!userId) {
    res.status(400).json({ error: 'Invalid userId' });
    return;
  }

  const KILL_LOOT_TYPE = 6;
  const DEATH_LOOT_TYPE = 9;
  const GATHER_LOOT_TYPE = 5;
  const resourceShortNames = [
    'stones',
    'metal.ore',
    'hq.metal.ore',
    'sulfur.ore',
    'wood',
    'cloth',
    'leather',
    'bone.fragments',
    'mushroom',
    'scrap',
    'green.berry',
    'red.berry',
    'blue.berry',
    'black.berry',
    'yellow.berry',
    'white.berry',
    'corn',
    'pumpkin',
    'potato',
    'wheat',
    'ammo.rocket.basic',
    'ammo.rocket.hv',
    'ammo.rocket.fire',
    'explosive.timed',
    'ammo.rifle.explosive',
    'crate_normal_2',
    'crate_normal',
    'crate_elite'
  ];

  try {
    const [players] = await statsDb.query(
      'SELECT UserId, LastName, Points FROM PlayerStats WHERE UserId = ? LIMIT 1',
      [userId]
    );

    const [killDeathRows] = await statsDb.query(
      'SELECT ShortName, ItemValue FROM StatsStorage ' +
      'WHERE UserId = ? AND LootType IN (?, ?) AND ShortName IN (?, ?)',
      [userId, KILL_LOOT_TYPE, DEATH_LOOT_TYPE, 'kills', 'deaths']
    );

    const killDeathMap = new Map();
    if (Array.isArray(killDeathRows)) {
      killDeathRows.forEach((row) => {
        killDeathMap.set(row.ShortName, row.ItemValue);
      });
    }

    const kills = Number(killDeathMap.get('kills')) || 0;
    const deaths = Number(killDeathMap.get('deaths')) || 0;
    const kdr = deaths === 0 ? kills : Math.round((kills / deaths) * 100) / 100;

    const [resources] = await statsDb.query(
      'SELECT ShortName, SUM(ItemValue) AS ItemValue ' +
      'FROM StatsStorage ' +
      'WHERE UserId = ? AND ShortName IN (?) ' +
      'GROUP BY ShortName ' +
      'ORDER BY FIELD(ShortName, ?)',
      [userId, resourceShortNames, resourceShortNames]
    );

    const resourceMap = new Map();
    if (Array.isArray(resources)) {
      resources.forEach((row) => {
        resourceMap.set(row.ShortName, row);
      });
    }

    const orderedResources = resourceShortNames.map((name) => {
      const row = resourceMap.get(name);
      return {
        UserId: row?.UserId || userId,
        LootType: GATHER_LOOT_TYPE,
        ShortName: name,
        ItemValue: row?.ItemValue || 0
      };
    });

    const playerRow = Array.isArray(players) && players.length > 0 ? players[0] : null;

    res.json({
      player: {
        UserId: playerRow?.UserId || userId,
        LastName: playerRow?.LastName || nicknameRaw || 'Unknown',
        Points: playerRow?.Points || 0,
        Kills: kills,
        Deaths: deaths,
        KDR: kdr
      },
      resources: orderedResources
    });
  } catch (error) {
    console.error('Player stats query error:', error);
    res.status(500).json({
      error: 'Player stats query failed',
      code: error.code || null,
      message: error.message || 'Unknown error'
    });
  }
});

app.get('/api/health/db', async (req, res) => {
  try {
    await statsDb.query('SELECT 1 AS ok');
    res.json({ ok: true, host: DB_HOST, database: DB_NAME, port: DB_PORT });
  } catch (error) {
    res.status(500).json({
      ok: false,
      code: error.code || null,
      errno: error.errno || null,
      sqlState: error.sqlState || null,
      message: error.message || 'Unknown error'
    });
  }
});

// --- Almacena solicitudes de inscripción ---
// Usar archivo JSON para persistencia
const applysFile = path.join(__dirname, '..', 'applys.json');
let applys = [];
// Cargar applys al iniciar el servidor
if (fs.existsSync(applysFile)) {
  try {
    applys = JSON.parse(fs.readFileSync(applysFile, 'utf8'));
  } catch (e) {
    applys = [];
  }
}
// Función para guardar applys en archivo
function saveApplys() {
  fs.writeFileSync(applysFile, JSON.stringify(applys, null, 2), 'utf8');
}

// --- Endpoint para guardar solicitud de inscripción ---
app.post('/api/apply', (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  const { teamName, captain, discord, players, why, strategy } = req.body;
  if (
    !teamName ||
    !captain ||
    !discord ||
    !players ||
    !Array.isArray(players) ||
    players.length !== 8 ||
    players.some(p => !p.name || !p.steamid || !p.twitch)
  ) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  applys.push({
    teamName,
    captain,
    discord,
    players,
    why: why || '',
    strategy: strategy || '',
    submittedBy: req.user.steamid,
    submittedByName: req.user.name,
    submittedAt: new Date().toISOString()
  });
  saveApplys();
  res.json({ ok: true });
});

// --- Endpoint para eliminar apply por índice (solo admin) ---
app.delete('/api/admin/applys/:idx', requireAdmin, (req, res) => {
  const idx = parseInt(req.params.idx, 10);
  if (isNaN(idx) || idx < 0 || idx >= applys.length) {
    return res.status(400).json({ ok: false, error: 'Índice inválido' });
  }
  applys.splice(idx, 1);
  saveApplys();
  res.json({ ok: true });
});

// Define aquí los SteamID de los admins
const ADMIN_STEAM_IDS = [
  '76561198416933402',
  '76561198067186042',
  '76561199167906871',
  '76561199220103836',
  '76561198301561047'
]; // Agrega todos los SteamID

// Middleware para proteger rutas de admin
function requireAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user && ADMIN_STEAM_IDS.includes(req.user.steamid)) {
    return next();
  }
  res.status(403).json({ error: 'Forbidden' });
}

// Ruta protegida solo para el admin
app.get('/api/admin', requireAdmin, (req, res) => {
  res.json({ admin: true, user: req.user });
});

// Ruta protegida: lista de usuarios autenticados por Steam (solo admin)
app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json(Object.values(steamUsers));
});

// Ruta protegida: lista de solicitudes de inscripción (solo admin)
app.get('/api/admin/applys', requireAdmin, (req, res) => {
  res.json(applys);
});

// Cambia el mensaje de inicio para mostrar la IP real de tu PC en vez de 0.0.0.0
function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// IMPORTANTE:
// Este backend Express debe correr en HTTP (puerto 3001 por defecto).
// Nginx puede exponer HTTPS y redirigir /auth/steam y /api/* al backend.

app.listen(PORT, HOST, () => {
  const ip = getLocalIPv4();
  console.log(`Backend Steam Auth en http://${ip}:${PORT} (accesible desde tu red local)`);
  console.log(`SERVER_PUBLIC_URL=${SERVER_PUBLIC_URL}`);
  console.log(`CLIENT_URL=${CLIENT_URL}`);
  console.log(`CORS origins: ${corsOrigins.join(', ')}`);
  verifyDbConnection();
});

// Si ves "Cannot find module 'cors'", debes instalarlo primero:
// Ejecuta en la terminal (en la carpeta del proyecto):
// npm install cors

// Solución: Asegúrate que los endpoints estén definidos antes de cualquier "catch-all" o rutas estáticas.
// Si usas un servidor React con rutas estáticas, los endpoints deben ir antes de servir el frontend.

// --- Endpoints API ---
// Aquí están todos tus endpoints API

// --- Servir archivos estáticos del frontend (si usas build) ---
// Si has hecho `npm run build`, sirve los archivos estáticos desde la carpeta `build`
const buildPath = path.join(__dirname, '..', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Devuelve index.html para cualquier ruta no gestionada por la API
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // Mensaje informativo si no existe la carpeta build
  console.warn('Build folder not found. Run `npm run build` in the project root to create it.');
}

// Asegúrate de que lo anterior está después de todos los endpoints API.

// Nota: este proyecto corre el frontend con `react-scripts`.
// Si necesitas un backend Node/Express, define scripts separados (ej: "server").