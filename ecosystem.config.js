// Configuración de PM2 para producción.
//
// IMPORTANTE: este archivo NO contiene secretos y sí se commitea.
// Todas las credenciales (SESSION_SECRET, STEAM_API_KEY, DB_*, ...) se leen
// del archivo `.env` de la raíz del proyecto, que está en .gitignore.
//
//   pm2 start ecosystem.config.js
//   pm2 save && pm2 startup systemd

module.exports = {
  apps: [
    {
      name: 'rustaco',
      script: 'src/server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
