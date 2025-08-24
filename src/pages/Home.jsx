import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../assets/styles.css';
import '../assets/home-dark.css';
import rustaco2logo from '../assets/img/rustaco2.png';
import logorustaco from '../assets/img/logorustaco.png';
import rustgamedark from '../assets/img/rustgamedark.jpg';
import steamlogo from '../assets/img/steamlogo.png';
import poionakologo from '../assets/img/poionakologo.png';
import rustypot from '../assets/img/rustypot.png';
import cantosogangLogo from '../assets/img/cantosogang.webp';
import juninLogo from '../assets/img/juninlogo.png';
import salomonLogo from '../assets/img/salomonlogo.png';
import mcompanyvLogo from '../assets/img/mcompanyvlogo.png';
import aaaaLogo from '../assets/img/AAAA.png';
import teamOTLogo from '../assets/img/teamlogoot.webp';
import losmuchachoslogo from '../assets/img/losmuchachoslogo.webp';
import teamotmainlogo from '../assets/img/teamotmainlogo.png';
import teamlstlogo from '../assets/img/teamlstlogo.png';
import srLogo from '../assets/img/srlogo.png';
import rustypotlogo from '../assets/img/rustypotlogo.png';
import logodiscord2 from '../assets/img/logodiscord2.png';

const flagChile = "https://flagcdn.com/w20/cl.png";
const flagUSA = "https://flagcdn.com/w20/us.png";
const flagBrazil = "https://flagcdn.com/w20/br.png";

const translations = {
  es: { formato: 'Formato', sobre: 'Sobre Rustaco', equipos: 'Equipos', verReglas: 'Ver Reglas' },
  en: { formato: 'Format', sobre: 'About Rustaco', equipos: 'Teams', verReglas: 'See Rules' },
  pt: { formato: 'Formato', sobre: 'Sobre o Rustaco', equipos: 'Equipes', verReglas: 'Ver Regras' }
};

function TopBar({ lang, setLang }) {
  return (
    <div className="TopBar" style={{ position: 'sticky', top: 0, zIndex: 200 }}>
      <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={logorustaco} alt="Rustaco" style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }} />
          <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/equipos" className="nav-btn">{translations[lang].equipos}</Link>
            <Link to="/reglas" className="nav-btn">{translations[lang].verReglas}</Link>
            <Link to="/applys" className="nav-btn btn-primary" style={{ padding: '0.4rem 0.7rem' }}>{lang === 'es' ? 'Postular' : lang === 'en' ? 'Apply' : 'Postular'}</Link>
            <Link to="/about" className="nav-btn">{translations[lang].sobre}</Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="icon-btn flag" onClick={() => setLang('es')} title="Español"><img src={flagChile} alt="ES" /></button>
            <button className="icon-btn flag" onClick={() => setLang('en')} title="English"><img src={flagUSA} alt="EN" /></button>
            <button className="icon-btn flag" onClick={() => setLang('pt')} title="Português"><img src={flagBrazil} alt="PT" /></button>
          </div>
          <a href="https://www.rustaco.site/auth/steam" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#23201a 60%,#27ae60)', color: '#fff', padding: '0.45rem 0.6rem', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
            <span className="icon-btn steam"><img src={steamlogo} alt="Steam" /></span>
            <span style={{ marginLeft: 6 }}>Login Steam</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="animated-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <div className="animated-bg-image" style={{ position: 'absolute', inset: 0, backgroundImage: `url(${rustgamedark})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.25) contrast(0.95)', opacity: 1 }} aria-hidden />
      <div className="animated-bg-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))' }} aria-hidden />
    </div>
  );
}

import { TEAMS, TeamModal } from './equipos';

export default function Home() {
  const [lang, setLang] = useState('es');
  const [openTeam, setOpenTeam] = useState(null);
  const history = useHistory();
  const [showAuthNotice, setShowAuthNotice] = useState(false);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState(() => {
    // Event: Thursday 11 September 2025 15:00 GMT-3 -> UTC 18:00
    const target = new Date(Date.UTC(2025, 8, 11, 18, 0, 0));
    return Math.max(0, target.getTime() - Date.now());
  });

  // Prepare displayed teams: custom order first, then the rest
  const priorityOrder = [
    "Team cG",
    "Team Junin",
    "Team OT",
    "Team OT Main",
    "Team LoS Muchacho's"
  ];

  const displayedTeams = [
    ...priorityOrder
      .map(name => TEAMS.find(t => t.name === name))
      .filter(Boolean),
    ...TEAMS.filter(t => !priorityOrder.includes(t.name))
  ].slice(0, 16);

  React.useEffect(() => {
    const target = new Date(Date.UTC(2025, 8, 11, 18, 0, 0));
    const id = setInterval(() => {
      const remaining = Math.max(0, target.getTime() - Date.now());
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = ms => {
    const total = Math.floor(ms / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return { days, hours, minutes, seconds };
  };

  // Check authentication via backend API; returns true if logged
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/user', { credentials: 'include' });
      if (!res.ok) return false;
      const j = await res.json();
      return Boolean(j && j.steamid);
    } catch (e) {
      return false;
    }
  };

  const handleApply = async () => {
    const ok = await checkAuth();
    if (ok) {
      history.push('/applys');
    } else {
      // show small notice prompting to login first
      setShowAuthNotice(true);
      // auto-hide after 6s
      setTimeout(() => setShowAuthNotice(false), 6000);
    }
  };

  function AuthNotice() {
    if (!showAuthNotice) return null;
    return (
      <div style={{ marginTop: 8, fontSize: '0.95rem', color: 'var(--hd-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span>Necesitas iniciar sesión con Steam para postular.</span>
        <a href="/auth/steam" style={{ color: 'var(--hd-text)', fontWeight: 800 }}>Iniciar sesión</a>
      </div>
    );
  }

  return (
    <div className="home-dark">
      <AnimatedBackground />
      <TopBar lang={lang} setLang={setLang} />
      {/* Banner Discord y Rustypot a la izquierda, marcados pero sin colores */}
      <div
        style={{
          position: 'fixed',
          top: 120,
          left: 24,
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '14px',
          minWidth: 260,
          maxWidth: 340
        }}
      >
        <a
          href="https://discord.rustaco.site"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.08rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 18px',
            borderRadius: '12px',
            border: '2px solid #fff',
            background: 'none',
            boxShadow: '0 2px 12px #0008'
          }}
        >
          <img
            src={logodiscord2}
            alt="Discord"
            style={{
              width: 44,
              height: 44,
              marginRight: 8,
              background: 'transparent',
              borderRadius: '50%',
              objectFit: 'contain'
            }}
          />
          <span>¡Únete a nuestro Discord!</span>
        </a>
        <a
          href="https://rustypot.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.08rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px 18px',
            borderRadius: '12px',
            border: '2px solid #fff',
            background: 'none',
            boxShadow: '0 2px 12px #0008'
          }}
        >
          <span style={{ fontWeight: 800 }}>Sponsored by</span>
          <img
            src={rustypotlogo}
            alt="Rustypot Logo"
            style={{
              height: 44,
              width: 144,
              marginLeft: 8,
              borderRadius: '50%',
              background: 'transparent',
              objectFit: 'contain'
            }}
          />
        </a>
      </div>
      <main style={{ position: 'relative', zIndex: 20, paddingTop: 80, paddingBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 24 }}>
        <div className="logo-grid">
          <div className="logo-spot left" aria-hidden>
            <div className="logo-glow left"></div>
            <div className="logo-fill" />
            <img src={poionakologo} alt="Poionako" />
            <div className="social-panel" aria-hidden>
              <a className="social-link" href="https://solo.to/poionako" target="_blank" rel="noopener noreferrer"><span className="social-icon">🔗</span><span className="social-label">Link</span></a>
              <a className="social-link" href="https://www.youtube.com/@PoiOnako" target="_blank" rel="noopener noreferrer"><span className="social-icon">▶</span><span className="social-label">YouTube</span></a>
              <a className="social-link" href="https://kick.com/poionako" target="_blank" rel="noopener noreferrer"><span className="social-icon">⚡</span><span className="social-label">Kick</span></a>
              <a className="social-link" href="https://x.com/poionako" target="_blank" rel="noopener noreferrer"><span className="social-icon">✦</span><span className="social-label">X</span></a>
              <a className="social-link" href="https://www.tiktok.com/@poionako" target="_blank" rel="noopener noreferrer"><span className="social-icon">♪</span><span className="social-label">TikTok</span></a>
              <a className="social-link" href="https://www.instagram.com/poionako" target="_blank" rel="noopener noreferrer"><span className="social-icon">📸</span><span className="social-label">Instagram</span></a>
            </div>
          </div>
          <div className="logo-sep" aria-hidden>×</div>

          <div className="logo-spot center" aria-hidden>
            <div className="logo-glow center"></div>
            <div className="logo-fill" />
            <img src={rustaco2logo} alt="Rustaco II" style={{ width: '86%', height: '86%' }} />
          </div>

          <div className="logo-sep" aria-hidden>×</div>
          <div className="logo-spot right" aria-hidden>
            <div className="logo-glow right"></div>
            <div className="logo-fill" />
            <img src={rustypot} alt="Rustypot" />
            <div className="social-panel" aria-hidden>
              <a className="social-link" href="https://rustypot.com" target="_blank" rel="noopener noreferrer"><span className="social-icon">🌐</span><span className="social-label">Web</span></a>
              <a className="social-link" href="https://x.com/RustyPot" target="_blank" rel="noopener noreferrer"><span className="social-icon">✦</span><span className="social-label">X</span></a>
              <a className="social-link" href="https://www.instagram.com/rustypotofficial" target="_blank" rel="noopener noreferrer"><span className="social-icon">📸</span><span className="social-label">Instagram</span></a>
              <a className="social-link" href="https://discord.com/invite/by5bykp" target="_blank" rel="noopener noreferrer"><span className="social-icon">💬</span><span className="social-label">Discord</span></a>
            </div>
          </div>
        </div>
        {/* Event countdown and apply CTA (directly under the logos) */}
        <section style={{ width: '100%', maxWidth: 1200, marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div className="panel" style={{ padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className="countdown-panel">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="countdown-title">{lang === 'es' ? 'Cuenta regresiva hasta Rustaco II' : lang === 'en' ? 'Countdown to Rustaco II' : 'Contagem regressiva para Rustaco II'}</div>
                <div className="time-row">
                  {(() => {
                    if (timeLeft <= 0) return <div className="countdown-badge">EL EVENTO HA COMENZADO</div>;
                    const t = formatTime(timeLeft);
                    return (
                      <>
                        <div className="time-unit">
                          <div className="time-value">{t.days}</div>
                          <div className="time-label">{lang === 'es' ? 'Días' : lang === 'en' ? 'Days' : 'Dias'}</div>
                        </div>
                        <div className="time-unit">
                          <div className="time-value">{String(t.hours).padStart(2,'0')}</div>
                          <div className="time-label">{lang === 'es' ? 'Horas' : lang === 'en' ? 'Hours' : 'Horas'}</div>
                        </div>
                        <div className="time-unit">
                          <div className="time-value">{String(t.minutes).padStart(2,'0')}</div>
                          <div className="time-label">{lang === 'es' ? 'Min' : lang === 'en' ? 'Min' : 'Min'}</div>
                        </div>
                        <div className="time-unit">
                          <div className="time-value">{String(t.seconds).padStart(2,'0')}</div>
                          <div className="time-label">{lang === 'es' ? 'Seg' : lang === 'en' ? 'Sec' : 'Seg'}</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

          <div style={{ display: 'flex', gap: 12, flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={handleApply} className="btn-primary">{lang === 'es' ? 'Postula al Evento ya' : lang === 'en' ? 'Apply to Event Now' : 'Postule ao Evento já'}</button>
            {/* If not authenticated, show small hint with login link */}
            <AuthNotice />
          </div>
          </div>
        </section>

        {/* Teams gallery — column-style cards inspired by the provided HTML */}
        <section className="teams-section panel" aria-label="Equipos" style={{ width: '100%', maxWidth: 1200, marginTop: 48 }}>
          <div className="columnteam" role="list">
            {displayedTeams.slice(0, 16).map((team, idx) => (
              <div className="columnteams" key={(team.name||'team') + idx} role="listitem">
                <div className="team-item team-item--v4 team-4" onClick={() => (team.channels && team.channels.length) ? setOpenTeam(team) : null} title={team.name}>
                  <a href="#" className="team-item__thumbnail" onClick={(e) => e.preventDefault()}>
                    {/* Solución: envuelve la expresión condicional en un fragmento */}
                    <>
                      {team.logo ? (
                        <div className="team-item__img-primary" style={{ backgroundImage: `url(${team.logo === srLogo ? srLogo : team.logo})` }} />
                      ) : (
                        <div className="team-item__bg-holder">
                          <div className="team-item__bg" style={{ backgroundImage: `url(${rustgamedark})` }} />
                        </div>
                      )}
                    </>
                  </a>
                  <span className="team-item__subtitle h6">{team.channels && team.channels.length ? 'Equipo Confirmado' : 'A confirmar'}</span>
                  <h2 className="team-item__title">{team.name}</h2>
                </div>
              </div>
            ))}
          </div>
          {openTeam && <TeamModal team={openTeam} onClose={() => setOpenTeam(null)} />}
        </section>
      </main>
    </div>
  );
}