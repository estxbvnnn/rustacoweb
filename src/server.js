// filepath: server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const cors = require('cors');
const os = require('os');

const app = express();

// Cambia la IP de binding y los orígenes CORS para desarrollo local
// Usa localhost y 127.0.0.1 en vez de la IP de red si solo trabajas en tu PC

// 1. Cambia el origin de CORS para aceptar solo localhost y 127.0.0.1
app.use(cors({
  origin: [
    'https://www.rustaco.site'
  ],
  credentials: true
}));

app.use(session({
  secret: 'rustaco',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none', // <-- usa 'none' para cross-site cookies con HTTPS
    secure: true      // <-- usa true para HTTPS
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // Para parsear JSON en POST

passport.serializeUser((user, done) => {
  // Guarda solo los campos necesarios en la sesión
  done(null, {
    steamid: user.id,
    name: user.displayName,
    avatar: user.photos?.[2]?.value || user.photos?.[0]?.value || null
  });
});
passport.deserializeUser((obj, done) => {
  // Recupera el usuario en el mismo formato
  done(null, obj);
});

// Almacena usuarios autenticados (en memoria, para demo)
const steamUsers = {};

// Modifica el callback de SteamStrategy para guardar usuarios
passport.use(new SteamStrategy({
  returnURL: 'https://www.rustaco.site/auth/steam/return',
  realm: 'https://www.rustaco.site/',
  apiKey: '3E6FB3DF729486B3EF9485399557CC45'
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

// Cambia la ruta de inicio de login Steam para usar localhost
app.get('/auth/steam', (req, res, next) => {
  req.headers.host = 'www.rustaco.site';
  next();
}, passport.authenticate('steam', { failureRedirect: '/auth/steam/fail' }));

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/auth/steam/fail' }),
  (req, res) => {
    if (req.user && req.user.steamid) {
      // Redirige solo a la home sin parámetros visibles
      res.redirect('https://www.rustaco.site/');
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

// --- Almacenamiento en memoria de solicitudes ---
const applys = []; // [{ teamName, captain, discord, players, why, strategy, submittedBy, submittedAt }]

// --- Endpoint para guardar solicitud de inscripción ---
app.post('/api/apply', (req, res) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  const { teamName, captain, discord, players, why, strategy } = req.body;
  // Corrige la validación para permitir que los campos 'why' y 'strategy' sean opcionales (si lo deseas)
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
  res.json({ ok: true });
});

// Define aquí los SteamID de los admins
const ADMIN_STEAM_IDS = ['76561198416933402', '76561198067186042']; // Agrega ambos SteamID

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
// Este backend Express debe correr en HTTP (puerto 3001).
// Nginx debe estar configurado para HTTPS en el dominio www.rustaco.site
// y redirigir /auth/steam y /api/* al backend en http://localhost:3001

const PORT = 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  const ip = getLocalIPv4();
  console.log(`Backend Steam Auth en http://${ip}:${PORT} (accesible desde tu red local)`);
});

// Si ves "Cannot find module 'cors'", debes instalarlo primero:
// Ejecuta en la terminal (en la carpeta del proyecto):
// npm install cors

// Solución: Asegúrate que los endpoints estén definidos antes de cualquier "catch-all" o rutas estáticas.
// Si usas un servidor React con rutas estáticas, los endpoints deben ir antes de servir el frontend.

// --- Endpoints API ---
// Aquí están todos tus endpoints API

// --- Servir archivos estáticos del frontend (si usas build) ---
// Si tienes algo como:
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// asegúrate que esto esté al final del archivo, después de todos los endpoints API.