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
import rustypotfree from '../assets/img/rustypotfree.png';
import teamwp from '../assets/img/teamwp.png';
import teamlatampower from '../assets/img/teamlatampower.png';
import teammantenca from '../assets/img/teammanteca.png';
import teamsh from '../assets/img/teamsh.jpg';
import { TEAMS, TeamModal } from './equipos';

// Admin steam IDs
const ADMIN_STEAM_IDS = [
  '76561198416933402',
  '76561198067186042',
  '76561199167906871',
  '76561199220103836',
  '76561198301561047'
];

const flagChile = "https://flagcdn.com/w20/cl.png";
const flagUSA = "https://flagcdn.com/w20/us.png";
const flagBrazil = "https://flagcdn.com/w20/br.png";

const translations = {
  es: { formato: 'Formato', sobre: 'Sobre Rustaco', equipos: 'Equipos', verReglas: 'Ver Reglas' },
  en: { formato: 'Format', sobre: 'About Rustaco', equipos: 'Teams', verReglas: 'See Rules' },
  pt: { formato: 'Formato', sobre: 'Sobre o Rustaco', equipos: 'Equipes', verReglas: 'Ver Regras' }
};

function TopBar({ lang, setLang, user, onLogout }) {
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
          {/* Mostrar perfil si está logeado */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={user.avatar} alt="avatar" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid #27ae60' }} />
              <span style={{ color: '#fff', fontWeight: 700 }}>{user.personaname}</span>
              <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', padding: '0.4rem 0.7rem', borderRadius: 8 }}>Logout</button>
              {ADMIN_STEAM_IDS.includes(user.steamid) && (
                <Link to="/admin" className="nav-btn btn-primary" style={{ padding: '0.4rem 0.7rem', background: '#e67e22' }}>Admin Panel</Link>
              )}
            </div>
          ) : (
            <a href="https://www.rustaco.site/auth/steam" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#23201a 60%,#27ae60)', color: '#fff', padding: '0.45rem 0.6rem', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>
              <span className="icon-btn steam"><img src={steamlogo} alt="Steam" /></span>
              <span style={{ marginLeft: 6 }}>Login Steam</span>
            </a>
          )}
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

export default function Home() {
  const [lang, setLang] = useState('es');
  const [openTeam, setOpenTeam] = useState(null);
  const history = useHistory();
  const [showAuthNotice, setShowAuthNotice] = useState(false);

  // Estado para usuario autenticado
  const [user, setUser] = useState(null);

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

  // Check authentication via backend API; returns user object if logged
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/user', { credentials: 'include' });
      if (!res.ok) return null;
      const j = await res.json();
      return j && j.steamid ? j : null;
    } catch (e) {
      return null;
    }
  };

  // Al montar, obtener usuario
  React.useEffect(() => {
    checkAuth().then(u => setUser(u));
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {}
    setUser(null);
    window.location.reload();
  };

  const handleApply = async () => {
    const u = await checkAuth();
    if (u) {
      history.push('/applys');
    } else {
      setShowAuthNotice(true);
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
      <TopBar lang={lang} setLang={setLang} user={user} onLogout={handleLogout} />

      {/* Banners Discord y Rustypot a la derecha, en columna y posición fija */}
      <div
        style={{
          position: 'fixed',
          top: 120,
          right: 24,
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '18px',
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '11px 18px',
            borderRadius: '10px',
            border: '2px solid #fff',
            background: 'none',
            boxShadow: '0 2px 12px #0008',
            minHeight: 200,
            minWidth: 290
          }}
        >
          <img
            src={rustypotfree}
            alt="Rustypot Free"
            style={{
              height: 200,
              width: 'auto',
              // borderRadius: 12, // <-- elimina el borde redondeado de la imagen
              background: 'transparent',
              objectFit: 'contain',
              filter: 'brightness(1.15) drop-shadow(0 0 6px #fff8)'
            }}
          />
        </a>
      </div>
      <main style={{
        position: 'relative',
        zIndex: 20,
        paddingTop: 40,
        paddingBottom: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 24,
        width: '100%'
      }}>
        {/* Centraliza el logo grid */}
        <div className="logo-grid" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="logo-spot left" aria-hidden>
            <div className="logo-glow left"></div>
            <div className="logo-fill" />
            {/* Logo Poionako: social-panel solo visible al hacer click, decorado y con botón cerrar */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={poionakologo}
                alt="Poionako"
                style={{ cursor: 'pointer', width: 120, height: 120, borderRadius: '50%', objectFit: 'contain' }}
                onClick={() => {
                  const panel = document.getElementById('poionako-info-panel');
                  if (panel) panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
                }}
              />
              <div
                id="poionako-info-panel"
                className="poionako-info-panel"
                aria-hidden
                style={{
                  display: 'none',
                  position: 'static',
                  marginTop: 24,
                  background: 'rgba(34,34,34,0.98)',
                  borderRadius: 18,
                  boxShadow: '0 2px 18px #000a',
                  padding: '22px 32px',
                  zIndex: 10,
                  flexDirection: 'column',
                  gap: '18px',
                  alignItems: 'center',
                  minWidth: 320,
                  maxWidth: 420,
                  position: 'relative'
                }}
              >
                {/* Botón cerrar dentro del panel */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      const panel = document.getElementById('poionako-info-panel');
                      if (panel) panel.style.display = 'none';
                    }}
                    style={{
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0.25rem 0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 16,
                      boxShadow: '0 2px 8px #0007',
                      lineHeight: 1,
                      marginBottom: 8
                    }}
                    aria-label="Cerrar"
                  >
                    cerrar
                  </button>
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#53fc18', marginBottom: 8, textAlign: 'center', letterSpacing: 1 }}>
                  Poionako
                </div>
                <div style={{ color: '#fff', fontSize: '1.08rem', textAlign: 'center', marginBottom: 8 }}>
                  Streamer y creador de contenido. Colaborador en Rustaco II.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                  <a className="social-link" href="https://solo.to/poionako" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#53fc18', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    🔗 Link
                  </a>
                  <a className="social-link" href="https://www.youtube.com/@PoiOnako" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#e25822', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    ▶ YouTube
                  </a>
                  <a className="social-link" href="https://kick.com/poionako" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#9147ff', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    ⚡ Kick
                  </a>
                  <a className="social-link" href="https://x.com/poionako" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#23201a', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    ✦ X (Twitter)
                  </a>
                  <a className="social-link" href="https://www.tiktok.com/@poionako" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#ff0050', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    ♪ TikTok
                  </a>
                  <a className="social-link" href="https://www.instagram.com/poionako" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#fccc63', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none' }}>
                    📸 Instagram
                  </a>
                </div>
              </div>
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
            {/* Usar rustypotlogo.png grande y mostrar info abajo de forma profesional, con botón para cerrar */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={rustypotlogo}
                alt="Rustypot"
                style={{
                  cursor: 'pointer',
                  width: 420,
                  height: 420,
                  borderRadius: '50%',
                  objectFit: 'contain'
                }}
                onClick={() => {
                  const panel = document.getElementById('rustypot-info-panel');
                  if (panel) panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
                }}
              />
              <div
                id="rustypot-info-panel"
                className="rustypot-info-panel"
                aria-hidden
                style={{
                  display: 'none',
                  position: 'static',
                  marginTop: 24,
                  background: 'rgba(34,34,34,0.98)',
                  borderRadius: 18,
                  boxShadow: '0 2px 18px #000a',
                  padding: '22px 32px',
                  zIndex: 10,
                  flexDirection: 'column',
                  gap: '18px',
                  alignItems: 'center',
                  minWidth: 320,
                  maxWidth: 420,
                  position: 'relative'
                }}
              >
                {/* Botón cerrar dentro del panel */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      const panel = document.getElementById('rustypot-info-panel');
                      if (panel) panel.style.display = 'none';
                    }}
                    style={{
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0.25rem 0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 16,
                      boxShadow: '0 2px 8px #0007',
                      lineHeight: 1,
                      marginBottom: 8
                    }}
                    aria-label="Cerrar"
                  >
                    cerrar
                  </button>
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#e25822', marginBottom: 8, textAlign: 'center', letterSpacing: 1 }}>
                  Rustypot
                </div>
                <div style={{ color: '#fff', fontSize: '1.08rem', textAlign: 'center', marginBottom: 8 }}>
                  Rustypot es el sitio #1 de apuestas con skins de Rust. Patrocinador oficial de Rustaco II.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                  <a className="social-link" href="https://rustypot.com" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#e25822', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    🌐 Sitio Web
                  </a>
                  <a className="social-link" href="https://x.com/RustyPot" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#23201a', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    ✦ X (Twitter)
                  </a>
                  <a className="social-link" href="https://www.instagram.com/rustypotofficial" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#9147ff', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none', marginBottom: 4 }}>
                    📸 Instagram
                  </a>
                  <a className="social-link" href="https://discord.com/invite/by5bykp" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: '#fff', background: '#5865F2', borderRadius: 8, padding: '10px', textAlign: 'center', textDecoration: 'none' }}>
                    💬 Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Event countdown and apply CTA (directly under the logos) */}
        <section style={{
          width: '100%',
          maxWidth: 1200,
          marginTop: 18,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}>
          <div className="panel" style={{
            padding: '14px 20px',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
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
            <button
              disabled
              className="btn-primary"
              style={{
                background: '#000000',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: 10,
                padding: '0.7rem 1.4rem',
                boxShadow: `
                  inset 0 2px 8px #101417,
                  inset 0 1px 4px #111518,
                  inset 0 -2px 8px #111517,
                  0 2px 12px #101418,
                  0 1px 6px #101416
                `,
                letterSpacing: 1,
                fontSize: '1.08rem',
                cursor: 'not-allowed',
                opacity: 0.6,
                transition: 'background 0.2s'
              }}
              title="Aplicaciones cerradas"
            >
              Aplicaciones Cerradas!
            </button>
            {/* If not authenticated, show small hint with login link */}
            <AuthNotice />
          </div>
          </div>
        </section>

        {/* Inicio/Fin del evento (decorado) */}
        <div style={{ marginTop: 14, width: '100%', maxWidth: 820, display: 'flex', justifyContent: 'center' }}>
          <div
            role="note"
            aria-label="Fechas del evento"
            style={{
              width: '100%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
              borderRadius: 14,
              padding: '12px 16px',
              boxShadow: '0 8px 28px rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              color: '#e6f7e6'
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg,#e25822 0,#53fc18 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 6px 18px rgba(0,0,0,0.6)' }}>
              📅
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 15, color: '#fff' }}>
                {lang === 'es' ? 'Rustaco II — Fechas del evento' : lang === 'en' ? 'Rustaco II — Event dates' : 'Rustaco II — Datas do evento'}
              </div>

              <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 8, flexWrap: 'wrap', color: '#dfe7ee' }}>
                <div style={{ minWidth: 160 }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>{lang === 'es' ? 'Inicio' : lang === 'en' ? 'Start' : 'Início'}</div>
                  <div style={{ fontWeight: 800 }}>{lang === 'es' ? 'Jue 11 Sep — 15:00 (GMT-3)' : lang === 'en' ? 'Thu 11 Sep — 15:00 (GMT-3)' : 'Qui 11 Set — 15:00 (GMT-3)'}</div>
                </div>

                <div style={{ width: 1, height: 44, background: 'rgba(255,255,255,0.06)' }} />

                <div style={{ minWidth: 160 }}>
                  <div style={{ fontSize: 12, opacity: 0.9 }}>{lang === 'es' ? 'Fin' : lang === 'en' ? 'End' : 'Fim'}</div>
                  <div style={{ fontWeight: 800 }}>{lang === 'es' ? 'Dom 14 Sep' : lang === 'en' ? 'Sun 14 Sep' : 'Dom 14 Set'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams gallery — column-style cards inspired by the provided HTML */}
        <section className="teams-section panel" aria-label="Equipos" style={{
          width: '100%',
          maxWidth: 1200,
          marginTop: 48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div className="columnteam" role="list">
            {displayedTeams.slice(0, 16).map((team, idx) => (
              <div className="columnteams" key={(team.name||'team') + idx} role="listitem">
                <div className="team-item team-item--v4 team-4" onClick={() => (team.channels && team.channels.length) ? setOpenTeam(team) : null} title={team.name}>
                  <a href="#" className="team-item__thumbnail" onClick={(e) => e.preventDefault()}>
                    {/* Solución: envuelve la expresión condicional en un fragmento */}
                    <>
                      {team.logo ? (
                        <div
                          className="team-item__img-primary"
                          style={{
                            backgroundImage: `url(${team.logo === srLogo ? srLogo : team.logo})`,
                            backgroundPosition: 'center',
                            backgroundSize: team.name === "Team Latam Power" ? '120%' : 'cover'
                          }}
                        />
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