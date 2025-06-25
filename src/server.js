// filepath: server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3001/auth/steam/return',
  realm: 'http://localhost:3001/',
  apiKey: '3E6FB3DF729486B3EF9485399557CC45'
}, (identifier, profile, done) => {
  process.nextTick(() => {
    profile.identifier = identifier;
    return done(null, profile);
  });
}));

app.use(session({ secret: 'rustaco', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/'); }
);

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  (req, res) => {
    // Aquí puedes redirigir al frontend con la info del usuario
    res.redirect(`http://localhost:3000/?steamid=${req.user.id}&name=${req.user.displayName}`);
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.listen(3001, () => console.log('Backend Steam Auth en http://localhost:3001'));