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

// MySQL deshabilitado por defecto. Cuando tengas una base de datos,
// arranca con DB_ENABLED=true (y las credenciales DB_* correspondientes).
const DB_ENABLED = String(process.env.DB_ENABLED || 'false').toLowerCase() === 'true';

const DB_HOST = process.env.DB_HOST || '34.139.33.19';
const DB_USER = process.env.DB_USER || 'rustaco';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Rustaco.2000';
const DB_NAME = process.env.DB_NAME || 'rustaco';
const DB_PORT = Number(process.env.DB_PORT) || 3306;

const statsDb = DB_ENABLED
  ? mysql.createPool({
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
    })
  : null;

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
  if (!DB_ENABLED) {
    console.log('MySQL deshabilitado (DB_ENABLED=false). Stats del juego desactivadas; tickets guardados en tickets.json');
    return;
  }
  try {
    await statsDb.query('SELECT 1 AS ok');
    console.log(`MySQL OK at ${DB_HOST}:${DB_PORT} (${DB_NAME})`);
    try {
      await ensureTicketTables();
    } catch (error) {
      console.error('Ticket tables init failed:', error.message || error);
    }
  } catch (error) {
    console.error('MySQL connection failed:', {
      code: error.code || null,
      errno: error.errno || null,
      sqlState: error.sqlState || null,
      message: error.message || 'Unknown error'
    });
  }
}

const STEAM_API_KEY = process.env.STEAM_API_KEY || '5B524B1DFABA4C0079095168DA81EF7F';

// SteamIDs con acceso al panel administrativo (separados por coma en env ADMIN_STEAM_IDS)
const ADMIN_STEAM_IDS = (process.env.ADMIN_STEAM_IDS || '76561198416933402')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

function isAdminSteamId(steamid) {
  return ADMIN_STEAM_IDS.includes(String(steamid || ''));
}

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
      avatar: req.user.avatar,
      isAdmin: isAdminSteamId(req.user.steamid)
    });
  } else {
    res.json({ steamid: null });
  }
});

app.get('/api/stats', async (req, res) => {
  if (!DB_ENABLED) {
    return res.status(503).json({ error: 'Estadísticas no disponibles (base de datos deshabilitada).' });
  }
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
  if (!DB_ENABLED) {
    return res.status(503).json({ error: 'Estadísticas no disponibles (base de datos deshabilitada).' });
  }
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
  if (!DB_ENABLED) {
    return res.status(503).json({ ok: false, disabled: true, message: 'MySQL deshabilitado (DB_ENABLED=false)' });
  }
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

// ============================================================
//  SISTEMA DE TICKETS (perfil de usuario + panel administrativo)
// ============================================================

const TICKET_CATEGORIES = new Set(['general', 'report', 'appeal', 'store', 'bug', 'other']);
const TICKET_STATUSES = new Set(['open', 'answered', 'closed']);
const TICKET_LIMITS = {
  subjectMin: 4,
  subjectMax: 100,
  messageMin: 10,
  messageMax: 2000,
  replyMin: 2,
  maxOpenPerUser: 3,
  windowMs: 60 * 60 * 1000, // 1 hora
  maxPerWindow: 5
};

let ticketTablesReady = false;

async function ensureTicketTables() {
  await statsDb.query(
    `CREATE TABLE IF NOT EXISTS WebTickets (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      SteamId VARCHAR(20) NOT NULL,
      UserName VARCHAR(100) NOT NULL,
      Avatar VARCHAR(300) NULL,
      Category VARCHAR(30) NOT NULL,
      Subject VARCHAR(120) NOT NULL,
      Status VARCHAR(20) NOT NULL DEFAULT 'open',
      CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_tickets_steam (SteamId),
      INDEX idx_tickets_status (Status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );
  await statsDb.query(
    `CREATE TABLE IF NOT EXISTS WebTicketMessages (
      Id INT AUTO_INCREMENT PRIMARY KEY,
      TicketId INT NOT NULL,
      SteamId VARCHAR(20) NOT NULL,
      UserName VARCHAR(100) NOT NULL,
      Avatar VARCHAR(300) NULL,
      IsAdmin TINYINT(1) NOT NULL DEFAULT 0,
      Body TEXT NOT NULL,
      CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_ticket_messages_ticket (TicketId)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );
  ticketTablesReady = true;
  console.log('Ticket tables ready (WebTickets, WebTicketMessages)');
}

function requireAuth(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.steamid) {
    return next();
  }
  res.status(401).json({ error: 'Debes iniciar sesión con Steam.' });
}

// Middleware para proteger rutas de admin
function requireAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user && isAdminSteamId(req.user.steamid)) {
    return next();
  }
  res.status(403).json({ error: 'No tienes permisos de administrador.' });
}

function requireTicketsReady(req, res, next) {
  if (ticketTablesReady) {
    return next();
  }
  res.status(503).json({ error: 'El sistema de tickets no está disponible en este momento.' });
}

// Sanitización: una línea (asuntos, nombres) y texto multilínea (mensajes)
function cleanLine(value, max) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function cleanBody(value, max) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

function parseTicketId(raw) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// ------------------------------------------------------------
// Almacenamiento de tickets: MySQL (DB_ENABLED=true) o archivo
// JSON local (tickets.json) cuando no hay base de datos.
// ------------------------------------------------------------

const TICKET_STATUS_ORDER = { open: 0, answered: 1, closed: 2 };

const ticketsFile = path.join(__dirname, '..', 'tickets.json');
let fileData = { nextTicketId: 1, nextMessageId: 1, tickets: [], messages: [] };

function loadFileStore() {
  try {
    if (fs.existsSync(ticketsFile)) {
      const parsed = JSON.parse(fs.readFileSync(ticketsFile, 'utf8'));
      fileData = {
        nextTicketId: Number(parsed.nextTicketId) || 1,
        nextMessageId: Number(parsed.nextMessageId) || 1,
        tickets: Array.isArray(parsed.tickets) ? parsed.tickets : [],
        messages: Array.isArray(parsed.messages) ? parsed.messages : []
      };
    }
  } catch (error) {
    console.error('No se pudo leer tickets.json, se inicia vacío:', error.message || error);
    fileData = { nextTicketId: 1, nextMessageId: 1, tickets: [], messages: [] };
  }
}

function saveFileStore() {
  fs.writeFileSync(ticketsFile, JSON.stringify(fileData, null, 2), 'utf8');
}

function sortTickets(list) {
  return [...list].sort((a, b) => {
    const orderDiff = (TICKET_STATUS_ORDER[a.Status] ?? 9) - (TICKET_STATUS_ORDER[b.Status] ?? 9);
    if (orderDiff !== 0) return orderDiff;
    return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime();
  });
}

function fileMessageCount(ticketId) {
  return fileData.messages.filter((msg) => msg.TicketId === ticketId).length;
}

const jsonTicketStore = {
  async init() {
    loadFileStore();
  },
  async countOpenByUser(steamid) {
    return fileData.tickets.filter((t) => t.SteamId === steamid && t.Status !== 'closed').length;
  },
  async createTicket({ steamid, userName, avatar, category, subject, isAdmin, message }) {
    const now = new Date().toISOString();
    const ticket = {
      Id: fileData.nextTicketId++,
      SteamId: steamid,
      UserName: userName,
      Avatar: avatar,
      Category: category,
      Subject: subject,
      Status: 'open',
      CreatedAt: now,
      UpdatedAt: now
    };
    fileData.tickets.push(ticket);
    fileData.messages.push({
      Id: fileData.nextMessageId++,
      TicketId: ticket.Id,
      SteamId: steamid,
      UserName: userName,
      Avatar: avatar,
      IsAdmin: isAdmin ? 1 : 0,
      Body: message,
      CreatedAt: now
    });
    saveFileStore();
    return ticket.Id;
  },
  async listByUser(steamid) {
    return sortTickets(fileData.tickets.filter((t) => t.SteamId === steamid))
      .slice(0, 50)
      .map((t) => ({
        Id: t.Id,
        Category: t.Category,
        Subject: t.Subject,
        Status: t.Status,
        CreatedAt: t.CreatedAt,
        UpdatedAt: t.UpdatedAt,
        Messages: fileMessageCount(t.Id)
      }));
  },
  async getTicket(id) {
    const ticket = fileData.tickets.find((t) => t.Id === id);
    return ticket ? { ...ticket } : null;
  },
  async getMessages(id) {
    return fileData.messages
      .filter((msg) => msg.TicketId === id)
      .sort((a, b) => a.Id - b.Id)
      .map((msg) => ({ ...msg }));
  },
  async addMessage({ ticketId, steamid, userName, avatar, isAdmin, body, nextStatus }) {
    const ticket = fileData.tickets.find((t) => t.Id === ticketId);
    if (!ticket) return false;
    const now = new Date().toISOString();
    fileData.messages.push({
      Id: fileData.nextMessageId++,
      TicketId: ticketId,
      SteamId: steamid,
      UserName: userName,
      Avatar: avatar,
      IsAdmin: isAdmin ? 1 : 0,
      Body: body,
      CreatedAt: now
    });
    ticket.Status = nextStatus;
    ticket.UpdatedAt = now;
    saveFileStore();
    return true;
  },
  async setStatus(id, status) {
    const ticket = fileData.tickets.find((t) => t.Id === id);
    if (!ticket) return false;
    ticket.Status = status;
    ticket.UpdatedAt = new Date().toISOString();
    saveFileStore();
    return true;
  },
  async deleteTicket(id) {
    const before = fileData.tickets.length;
    fileData.tickets = fileData.tickets.filter((t) => t.Id !== id);
    if (fileData.tickets.length === before) return false;
    fileData.messages = fileData.messages.filter((msg) => msg.TicketId !== id);
    saveFileStore();
    return true;
  },
  async listAll({ status, category, q }) {
    let list = fileData.tickets;
    if (status) list = list.filter((t) => t.Status === status);
    if (category) list = list.filter((t) => t.Category === category);
    if (q) {
      const term = q.toLowerCase();
      list = list.filter((t) =>
        String(t.Subject || '').toLowerCase().includes(term) ||
        String(t.UserName || '').toLowerCase().includes(term) ||
        String(t.SteamId || '').includes(term)
      );
    }
    const counts = { open: 0, answered: 0, closed: 0 };
    fileData.tickets.forEach((t) => {
      if (counts[t.Status] !== undefined) counts[t.Status] += 1;
    });
    const tickets = sortTickets(list)
      .slice(0, 200)
      .map((t) => ({ ...t, Messages: fileMessageCount(t.Id) }));
    return { tickets, counts };
  }
};

const mysqlTicketStore = {
  async init() {
    await ensureTicketTables();
  },
  async countOpenByUser(steamid) {
    const [rows] = await statsDb.query(
      "SELECT COUNT(*) AS total FROM WebTickets WHERE SteamId = ? AND Status <> 'closed'",
      [steamid]
    );
    return Number(rows[0]?.total || 0);
  },
  async createTicket({ steamid, userName, avatar, category, subject, isAdmin, message }) {
    const conn = await statsDb.getConnection();
    try {
      await conn.beginTransaction();
      const [result] = await conn.query(
        'INSERT INTO WebTickets (SteamId, UserName, Avatar, Category, Subject) VALUES (?, ?, ?, ?, ?)',
        [steamid, userName, avatar, category, subject]
      );
      await conn.query(
        'INSERT INTO WebTicketMessages (TicketId, SteamId, UserName, Avatar, IsAdmin, Body) VALUES (?, ?, ?, ?, ?, ?)',
        [result.insertId, steamid, userName, avatar, isAdmin ? 1 : 0, message]
      );
      await conn.commit();
      return result.insertId;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },
  async listByUser(steamid) {
    const [rows] = await statsDb.query(
      `SELECT t.Id, t.Category, t.Subject, t.Status, t.CreatedAt, t.UpdatedAt,
        (SELECT COUNT(*) FROM WebTicketMessages m WHERE m.TicketId = t.Id) AS Messages
       FROM WebTickets t
       WHERE t.SteamId = ?
       ORDER BY FIELD(t.Status, 'open', 'answered', 'closed'), t.UpdatedAt DESC
       LIMIT 50`,
      [steamid]
    );
    return rows;
  },
  async getTicket(id) {
    const [rows] = await statsDb.query('SELECT * FROM WebTickets WHERE Id = ? LIMIT 1', [id]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  },
  async getMessages(id) {
    const [rows] = await statsDb.query(
      'SELECT Id, SteamId, UserName, Avatar, IsAdmin, Body, CreatedAt FROM WebTicketMessages WHERE TicketId = ? ORDER BY CreatedAt ASC, Id ASC',
      [id]
    );
    return rows;
  },
  async addMessage({ ticketId, steamid, userName, avatar, isAdmin, body, nextStatus }) {
    await statsDb.query(
      'INSERT INTO WebTicketMessages (TicketId, SteamId, UserName, Avatar, IsAdmin, Body) VALUES (?, ?, ?, ?, ?, ?)',
      [ticketId, steamid, userName, avatar, isAdmin ? 1 : 0, body]
    );
    await statsDb.query(
      'UPDATE WebTickets SET Status = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE Id = ?',
      [nextStatus, ticketId]
    );
    return true;
  },
  async setStatus(id, status) {
    const [result] = await statsDb.query(
      'UPDATE WebTickets SET Status = ?, UpdatedAt = CURRENT_TIMESTAMP WHERE Id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },
  async deleteTicket(id) {
    const conn = await statsDb.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query('DELETE FROM WebTicketMessages WHERE TicketId = ?', [id]);
      const [result] = await conn.query('DELETE FROM WebTickets WHERE Id = ?', [id]);
      await conn.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },
  async listAll({ status, category, q }) {
    const where = [];
    const params = [];
    if (status) {
      where.push('t.Status = ?');
      params.push(status);
    }
    if (category) {
      where.push('t.Category = ?');
      params.push(category);
    }
    if (q) {
      where.push('(t.Subject LIKE ? OR t.UserName LIKE ? OR t.SteamId LIKE ?)');
      const like = `%${q}%`;
      params.push(like, like, like);
    }

    const [tickets] = await statsDb.query(
      `SELECT t.Id, t.SteamId, t.UserName, t.Avatar, t.Category, t.Subject, t.Status, t.CreatedAt, t.UpdatedAt,
        (SELECT COUNT(*) FROM WebTicketMessages m WHERE m.TicketId = t.Id) AS Messages
       FROM WebTickets t
       ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
       ORDER BY FIELD(t.Status, 'open', 'answered', 'closed'), t.UpdatedAt DESC
       LIMIT 200`,
      params
    );

    const [countRows] = await statsDb.query(
      'SELECT Status, COUNT(*) AS Total FROM WebTickets GROUP BY Status'
    );
    const counts = { open: 0, answered: 0, closed: 0 };
    countRows.forEach((row) => {
      if (TICKET_STATUSES.has(row.Status)) {
        counts[row.Status] = Number(row.Total) || 0;
      }
    });

    return { tickets, counts };
  }
};

const ticketStore = DB_ENABLED ? mysqlTicketStore : jsonTicketStore;

// Sin MySQL los tickets quedan listos de inmediato (archivo local)
if (!DB_ENABLED) {
  jsonTicketStore.init().then(() => {
    ticketTablesReady = true;
    console.log(`Tickets en archivo local: ${ticketsFile}`);
  });
}

// Rate limit en memoria por SteamID para creación de tickets
const ticketCreationLog = new Map();

// --- Crear ticket ---
app.post('/api/tickets', requireAuth, requireTicketsReady, async (req, res) => {
  const category = String(req.body?.category || '').toLowerCase().trim();
  const subject = cleanLine(req.body?.subject, TICKET_LIMITS.subjectMax);
  const message = cleanBody(req.body?.message, TICKET_LIMITS.messageMax);

  if (!TICKET_CATEGORIES.has(category)) {
    return res.status(400).json({ error: 'Categoría inválida.' });
  }
  if (subject.length < TICKET_LIMITS.subjectMin) {
    return res.status(400).json({ error: `El asunto debe tener al menos ${TICKET_LIMITS.subjectMin} caracteres.` });
  }
  if (message.length < TICKET_LIMITS.messageMin) {
    return res.status(400).json({ error: `El mensaje debe tener al menos ${TICKET_LIMITS.messageMin} caracteres.` });
  }

  const steamid = String(req.user.steamid);
  const now = Date.now();
  const recent = (ticketCreationLog.get(steamid) || []).filter((ts) => now - ts < TICKET_LIMITS.windowMs);
  if (recent.length >= TICKET_LIMITS.maxPerWindow) {
    return res.status(429).json({ error: 'Has creado demasiados tickets en poco tiempo. Inténtalo más tarde.' });
  }

  try {
    const openCount = await ticketStore.countOpenByUser(steamid);
    if (openCount >= TICKET_LIMITS.maxOpenPerUser) {
      return res.status(409).json({
        error: `Ya tienes ${TICKET_LIMITS.maxOpenPerUser} tickets sin cerrar. Cierra alguno antes de crear otro.`
      });
    }

    const id = await ticketStore.createTicket({
      steamid,
      userName: cleanLine(req.user.name, 100) || 'Jugador',
      avatar: req.user.avatar || null,
      category,
      subject,
      isAdmin: isAdminSteamId(steamid),
      message
    });

    recent.push(now);
    ticketCreationLog.set(steamid, recent);
    res.status(201).json({ ok: true, id });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ error: 'No se pudo crear el ticket. Inténtalo nuevamente.' });
  }
});

// --- Mis tickets ---
app.get('/api/tickets', requireAuth, requireTicketsReady, async (req, res) => {
  try {
    const tickets = await ticketStore.listByUser(String(req.user.steamid));
    res.json({ tickets });
  } catch (error) {
    console.error('List tickets error:', error);
    res.status(500).json({ error: 'No se pudieron cargar tus tickets.' });
  }
});

// --- Detalle de ticket (dueño o admin) ---
app.get('/api/tickets/:id', requireAuth, requireTicketsReady, async (req, res) => {
  const id = parseTicketId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Ticket inválido.' });
  }

  try {
    const ticket = await ticketStore.getTicket(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado.' });
    }

    const isOwner = String(ticket.SteamId) === String(req.user.steamid);
    if (!isOwner && !isAdminSteamId(req.user.steamid)) {
      return res.status(403).json({ error: 'No puedes ver este ticket.' });
    }

    const messages = await ticketStore.getMessages(id);
    res.json({ ticket, messages });
  } catch (error) {
    console.error('Ticket detail error:', error);
    res.status(500).json({ error: 'No se pudo cargar el ticket.' });
  }
});

// --- Responder ticket (dueño o admin) ---
app.post('/api/tickets/:id/messages', requireAuth, requireTicketsReady, async (req, res) => {
  const id = parseTicketId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Ticket inválido.' });
  }

  const body = cleanBody(req.body?.message, TICKET_LIMITS.messageMax);
  if (body.length < TICKET_LIMITS.replyMin) {
    return res.status(400).json({ error: 'El mensaje está vacío.' });
  }

  try {
    const ticket = await ticketStore.getTicket(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado.' });
    }

    const steamid = String(req.user.steamid);
    const isAdmin = isAdminSteamId(steamid);
    const isOwner = String(ticket.SteamId) === steamid;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'No puedes responder este ticket.' });
    }
    if (ticket.Status === 'closed' && !isAdmin) {
      return res.status(409).json({ error: 'El ticket está cerrado.' });
    }

    // Respuesta de admin marca el ticket como respondido; la del usuario lo reabre
    const nextStatus = isAdmin && !isOwner ? 'answered' : 'open';

    await ticketStore.addMessage({
      ticketId: id,
      steamid,
      userName: cleanLine(req.user.name, 100) || 'Jugador',
      avatar: req.user.avatar || null,
      isAdmin,
      body,
      nextStatus
    });
    res.status(201).json({ ok: true, status: nextStatus });
  } catch (error) {
    console.error('Ticket reply error:', error);
    res.status(500).json({ error: 'No se pudo enviar la respuesta.' });
  }
});

// --- Cerrar ticket (dueño o admin) ---
app.post('/api/tickets/:id/close', requireAuth, requireTicketsReady, async (req, res) => {
  const id = parseTicketId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Ticket inválido.' });
  }

  try {
    const ticket = await ticketStore.getTicket(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado.' });
    }

    const steamid = String(req.user.steamid);
    if (String(ticket.SteamId) !== steamid && !isAdminSteamId(steamid)) {
      return res.status(403).json({ error: 'No puedes cerrar este ticket.' });
    }
    if (ticket.Status === 'closed') {
      return res.status(409).json({ error: 'El ticket ya está cerrado.' });
    }

    await ticketStore.setStatus(id, 'closed');
    res.json({ ok: true });
  } catch (error) {
    console.error('Ticket close error:', error);
    res.status(500).json({ error: 'No se pudo cerrar el ticket.' });
  }
});

// ============================================================
//  PANEL ADMINISTRATIVO
// ============================================================

// Ruta protegida solo para el admin
app.get('/api/admin', requireAdmin, (req, res) => {
  res.json({ admin: true, user: req.user });
});

// Lista de usuarios autenticados por Steam (solo admin)
app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json(Object.values(steamUsers));
});

// Todos los tickets con filtros (solo admin)
app.get('/api/admin/tickets', requireAdmin, requireTicketsReady, async (req, res) => {
  const status = String(req.query.status || '').toLowerCase().trim();
  const category = String(req.query.category || '').toLowerCase().trim();
  const q = cleanLine(req.query.q, 60);

  try {
    const result = await ticketStore.listAll({
      status: TICKET_STATUSES.has(status) ? status : '',
      category: TICKET_CATEGORIES.has(category) ? category : '',
      q
    });
    res.json(result);
  } catch (error) {
    console.error('Admin tickets error:', error);
    res.status(500).json({ error: 'No se pudieron cargar los tickets.' });
  }
});

// Cambiar estado de un ticket (solo admin)
app.post('/api/admin/tickets/:id/status', requireAdmin, requireTicketsReady, async (req, res) => {
  const id = parseTicketId(req.params.id);
  const status = String(req.body?.status || '').toLowerCase().trim();
  if (!id) {
    return res.status(400).json({ error: 'Ticket inválido.' });
  }
  if (!TICKET_STATUSES.has(status)) {
    return res.status(400).json({ error: 'Estado inválido.' });
  }

  try {
    const updated = await ticketStore.setStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Ticket no encontrado.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('Admin ticket status error:', error);
    res.status(500).json({ error: 'No se pudo actualizar el ticket.' });
  }
});

// Eliminar ticket y su conversación (solo admin)
app.delete('/api/admin/tickets/:id', requireAdmin, requireTicketsReady, async (req, res) => {
  const id = parseTicketId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Ticket inválido.' });
  }

  try {
    const deleted = await ticketStore.deleteTicket(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ticket no encontrado.' });
    }
    res.json({ ok: true });
  } catch (error) {
    console.error('Admin ticket delete error:', error);
    res.status(500).json({ error: 'No se pudo eliminar el ticket.' });
  }
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