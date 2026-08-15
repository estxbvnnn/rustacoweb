import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles.css';
import '../assets/home-dark.css';
import '../assets/server-theme.css';

import logoNuevo from '../assets/img/logonuevo.png';
import { useT } from '../context/LanguageContext.jsx';

const DISCORD_URL = 'https://discord.gg/WEjcYM3wRs';

export default function Maps() {
  const t = useT();

  React.useEffect(() => {
    document.body.classList.add('has-video-bg');
    return () => document.body.classList.remove('has-video-bg');
  }, []);

  return (
    <div className="rw-page">
      <main className="rw-lb-main">
        <div className="rw-lb-head">
          <span className="rw-section-kicker">{t.mapsKicker}</span>
          <h1>{t.mapsTitle}</h1>
          <p>{t.mapsSubtitle}</p>
        </div>

        {/* ── Pestaña del servidor ── */}
        <section className="rw-maps-server">
          <div className="rw-maps-server-banner" />
          <div className="rw-maps-server-body">
            <div className="rw-maps-server-name">
              <i className="bi bi-hdd-network" aria-hidden="true" />
              <span>Rustaco.co 2X</span>
              <span className="rw-maps-divider">|</span>
              <span className="rw-maps-tag">{t.mapsTag}</span>
            </div>
            <div className="rw-maps-server-loc" title={t.mapsLocationLabel}>
              <i className="bi bi-shield-lock" aria-hidden="true" />
              <span>{t.mapsLocation}</span>
            </div>
          </div>
        </section>

        {/* ── Próxima votación de mapa ── */}
        <section className="rw-maps-vote">
          <div className="rw-rules-sectionhead">
            <i className="bi bi-map" aria-hidden="true" />
            <h2>{t.mapsVoteTitle}</h2>
          </div>

          <div className="rw-maps-soon">
            <span className="rw-maps-soon-icon">
              <i className="bi bi-hourglass-split" aria-hidden="true" />
            </span>
            <h3>{t.mapsSoonTitle}</h3>
            <p>{t.mapsSoonText}</p>
            <a
              className="rw-btn rw-btn--discord rw-btn--sm"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-discord" /> {t.mapsDiscordBtn}
            </a>
          </div>
        </section>
      </main>

      <footer className="rw-footer">
        <div className="rw-footer-brand">
          <img src={logoNuevo} alt="Rustaco" loading="lazy" decoding="async" />
          <span>{t.footerRights}</span>
        </div>
        <nav className="rw-footer-links">
          <Link to="/">{t.navHome}</Link>
          <Link to="/events">{t.navLeaderboard}</Link>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">{t.navDiscord}</a>
        </nav>
      </footer>
    </div>
  );
}
