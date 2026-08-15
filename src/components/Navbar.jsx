import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoNuevo from '../assets/img/logonuevo.png';
import UserMenu from './UserMenu.jsx';
import LangSwitcher from './LangSwitcher.jsx';
import { notifyComingSoon } from './ComingSoon.jsx';
import { useT } from '../context/LanguageContext.jsx';

// ─── EDITA AQUÍ TUS REDES SOCIALES ─────────────────────────────────────────
const SOCIALS = [
  { icon: 'bi-discord', url: 'https://discord.gg/WEjcYM3wRs', label: 'Discord' },
  { icon: 'bi-twitter-x', url: 'https://x.com/RustacoEvents', label: 'X' },
];
// ───────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const t = useT();
  const { pathname } = useLocation();

  const isActive = (p) => (p === '/' ? pathname === '/' : pathname.startsWith(p));
  const cls = (p) => `rw-tb-link ${isActive(p) ? 'rw-tb-link--active' : ''}`;

  return (
    <header className="rw-tb">
      {/* franja superior: redes + sesión / idioma */}
      <div className="rw-tb-strip">
        <div className="rw-tb-social">
          <span className="rw-tb-social-label">{t.navConnect}</span>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rw-tb-social-btn"
              title={s.label}
              aria-label={s.label}
            >
              <i className={`bi ${s.icon}`} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="rw-tb-session">
          <UserMenu />
          <LangSwitcher />
        </div>
      </div>

      {/* barra principal: nav izquierda · logo · nav derecha */}
      <div className="rw-tb-main">
        <nav className="rw-tb-nav rw-tb-nav--left" aria-label="Navegación">
          <Link to="/" className={cls('/')}>{t.navHome}</Link>
          <Link to="/events" className={cls('/events')}>{t.navLeaderboard}</Link>
        </nav>

        <Link to="/" className="rw-tb-logo" aria-label="Rustaco">
          <span className="rw-tb-logo-frame">
            <img src={logoNuevo} alt="Rustaco" />
          </span>
          <span className="rw-tb-tagline">{t.navTagline}</span>
        </Link>

        <nav className="rw-tb-nav rw-tb-nav--right" aria-label="Navegación">
          <Link to="/maps" className={cls('/maps')}>{t.navMaps}</Link>
          <button type="button" className="rw-tb-link rw-tb-link--btn" onClick={notifyComingSoon}>
            {t.navStore}
          </button>
        </nav>
      </div>
    </header>
  );
}
