import React, { useRef, useEffect, useState, useMemo } from 'react';
import logo from '../assets/img/logorustaco.png';
import rustpmc3 from '../assets/img/rustpmc3.png';
import rustpmc4 from '../assets/img/rustpmc4.png';
import logodiscord from '../assets/img/logodiscord.png';
import mapaRustacooo from '../assets/img/maparustacooo.png';
import poionakologo from '../assets/img/poionakologo.png'; // Agrega este import al inicio
import steamlogo from '../assets/img/steamlogo.png'; // Asegúrate de tener este archivo en assets/img
const flagChile = "https://flagcdn.com/w20/cl.png";
const flagUSA = "https://flagcdn.com/w20/us.png";
const flagBrazil = "https://flagcdn.com/w20/br.png";
import '../assets/styles.css';
import { Link, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Importa el fondo
import fondo from '../assets/img/fondo.jpg';
import rustaco2logo from '../assets/img/rustaco2.png'; // Nuevo logo Rustaco II
import kicklogo from '../assets/img/kick.png'; // Logo Kick optimizado
import cantosogangLogo from '../assets/img/cantosogang.webp';
import juninLogo from '../assets/img/juninlogo.png';
import salomonLogo from '../assets/img/salomonlogo.png';
import mcompanyvLogo from '../assets/img/mcompanyvlogo.png';
import aaaaLogo from '../assets/img/AAAA.png';
import teamOTLogo from '../assets/img/teamlogoot.webp';

// Traducciones
const translations = {
  es: {
    formato: 'Formato',
    sobre: 'Sobre Rustaco',
    equipos: 'Equipos',
    stats: 'Stats',
    infoAdicional: 'Información adicional',
    infoAdicionalTexto: 'Pronto anunciaremos más detalles sobre premios, invitados especiales y sorpresas para la comunidad. ¡Mantente atento a nuestras redes sociales!',
    formatoTitulo: 'Formato - Rustaco II',
    formato1: 'Rustaco II contará con <b>128 jugadores</b> participando en el evento.',
    formato2: '16 equipos formados por 8 jugadores lucharán por el primer puesto.',
    formato3: 'Cada equipo tendrá su propia isla donde podrán construir y equiparse estratégicamente para el enfrentamiento final.',
    sobreTitulo: 'Sobre Rustaco',
    sobreTexto: 'Rustaco fue formado por un grupo de amigos con experiencia brutal en Rust, que han decidido crear torneos y eventos competitivos para la comunidad LATAM.',
    eventoTitulo: 'Rustaco II',
    equiposParticipantes: 'Equipos participantes',
    equiposTexto: 'Los equipos participantes poco a poco serán anunciados.',
    equipo: 'Team',
    aConfirmar: 'A confirmar',
    discord1: 'Únete a nuestro Discord',
    discord2: 'Haz click aquí para entrar al servidor',
    footer: 'Rustaco Eventos — Inspirado en Rust. Todos los derechos reservados.',
    equiposLabel: 'Equipos',
    equiposDesc: 'Total de equipos participantes en el evento.',
    jugadoresEquipo: 'Jugadores por equipo',
    jugadoresEquipoDesc: 'Cada equipo estará compuesto por 8 jugadores.',
    jugadores: 'Jugadores',
    jugadoresDesc: 'Participantes confirmados para Rustaco 2.',
    hora: 'Hora',
    horaDesc: 'Horario de inicio del evento (hora chilena).',
    modo: 'Modo',
    modoDesc: 'El evento se desarrollará en formato competitivo.',
    verReglas: 'Ver Reglas',
    fecha: 'Fechas',
    fechaDesc: 'Fechas del evento Rustaco II.',
    inscripcionesBtn: 'Inscripciones abiertas ¡YA!',
    inscripcionesFechas: 'del 6 de Agosto 15:00 GMT-3 hasta el 8 de Septiembre 16:00 GMT-3',
    inscripcionesMsg: '¡No te quedes fuera! Inscribe tu equipo y participa en Rustaco II.',
    // Añade traducciones para el sponsor Poionako
    sponsorTitle: 'Patrocinado por',
    sponsorDesc: 'Poionako es streamer y creador de contenido.',
    sponsorFollow: '¡Síguelo y apóyalo en sus canales!',
    sponsorName: 'Nombre',
    sponsorGames: 'Juegos',
    sponsorLang: 'Idioma',
    sponsorLocation: 'Ubicación',
    sponsorGamesList: 'Rust, variedad',
    sponsorLangValue: 'Español',
    sponsorLocationValue: 'España',
    sponsorAbout: 'Sobre el streamer:',
    sponsorLive: 'Transmite en vivo, crea contenido en YouTube y comparte clips en X (Twitter) y Kick.',
    streamNotice: 'Todo el evento será transmitido por la administración en',
    // Countdown
    countdownTitle: 'Cuenta regresiva — 11 de septiembre 15:00 (hora de Chile)',
    countdownDone: '¡Llegó la hora!',
    daysShort: 'd',
    hoursShort: 'h',
    minutesShort: 'm',
    secondsShort: 's',
  },
  en: {
    formato: 'Format',
    sobre: 'About Rustaco',
    equipos: 'Teams',
    stats: 'Stats',
    infoAdicional: 'Additional Information',
    infoAdicionalTexto: 'We will soon announce more details about prizes, special guests, and surprises for the community. Stay tuned to our social networks!',
    formatoTitulo: 'Format - Rustaco II',
    formato1: 'Rustaco II will feature <b>128 players</b> participating in the event.',
    formato2: '16 teams of 8 players will compete for first place.',
    formato3: 'Each team will have its own island to build and prepare strategically for the final showdown.',
    sobreTitulo: 'About Rustaco',
    sobreTexto: 'Rustaco was formed by a group of friends with brutal Rust experience, who decided to create tournaments and competitive events for the LATAM community.',
    eventoTitulo: 'Rustaco II',
    equiposParticipantes: 'Participating Teams',
    equiposTexto: 'Participating teams will be announced little by little.',
    equipo: 'Team',
    aConfirmar: 'To be confirmed',
    discord1: 'Join our Discord',
    discord2: 'Click here to join the server',
    footer: 'Rustaco Events — Inspired by Rust. All rights reserved.',
    equiposLabel: 'Teams',
    equiposDesc: 'Total teams participating in the event.',
    jugadoresEquipo: 'Players per team',
    jugadoresEquipoDesc: 'Each team will be made up of 8 players.',
    jugadores: 'Players',
    jugadoresDesc: 'Confirmed participants for Rustaco 2.',
    hora: 'Time',
    horaDesc: 'Event start time (Chile time).',
    modo: 'Mode',
    modoDesc: 'The event will be held in competitive format.',
    verReglas: 'See Rules',
    fecha: 'Dates',
    fechaDesc: 'Dates of the Rustaco II event.',
    inscripcionesBtn: 'Registrations open NOW!',
    inscripcionesFechas: 'from August 6th 15:00 GMT-3 to September 8th 16:00 GMT-3',
    inscripcionesMsg: "Don't miss out! Register your team and participate in Rustaco II.",
    // Sponsor Poionako translations
    sponsorTitle: 'Sponsored by',
    sponsorDesc: 'Poionako is a streamer and content creator.',
    sponsorFollow: 'Follow and support him on his channels!',
    sponsorName: 'Name',
    sponsorGames: 'Games',
    sponsorLang: 'Language',
    sponsorLocation: 'Location',
    sponsorGamesList: 'Rust, variety',
    sponsorLangValue: 'Spanish',
    sponsorLocationValue: 'Spain',
    sponsorAbout: 'About the streamer:',
    sponsorLive: 'Streams live, creates content on YouTube and shares clips on X (Twitter) and Kick.',
    streamNotice: 'The entire event will be streamed by the administration on',
    // Countdown
    countdownTitle: 'Countdown — Sep 11, 3:00 PM (Chile Time)',
    countdownDone: 'Time is up!',
    daysShort: 'd',
    hoursShort: 'h',
    minutesShort: 'm',
    secondsShort: 's',
  },
  pt: {
    formato: 'Formato',
    sobre: 'Sobre o Rustaco',
    equipos: 'Equipes',
    stats: 'Estatísticas',
    infoAdicional: 'Informações adicionais',
    infoAdicionalTexto: 'Em breve anunciaremos mais detalhes sobre prêmios, convidados especiais e surpresas para a comunidade. Fique ligado em nossas redes sociais!',
    formatoTitulo: 'Formato - Rustaco II',
    formato1: 'O Rustaco II contará com <b>128 jogadores</b> participando do evento.',
    formato2: '16 equipes formadas por 8 jogadores disputarão o primeiro lugar.',
    formato3: 'Cada equipe terá sua própria ilha para construir e se equipar estrategicamente para o confronto final.',
    sobreTitulo: 'Sobre o Rustaco',
    sobreTexto: 'O Rustaco foi formado por um grupo de amigos com grande experiência em Rust, que decidiram criar torneios e eventos competitivos para a comunidade LATAM.',
    eventoTitulo: 'Rustaco II',
    equiposParticipantes: 'Equipes participantes',
    equiposTexto: 'As equipes participantes serão anunciadas aos poucos.',
    equipo: 'Equipe',
    aConfirmar: 'A confirmar',
    discord1: 'Entre no nosso Discord',
    discord2: 'Clique aqui para entrar no servidor',
    footer: 'Rustaco Eventos — Inspirado em Rust. Todos os direitos reservados.',
    equiposLabel: 'Equipes',
    equiposDesc: 'Total de equipes participantes no evento.',
    jogadoresEquipo: 'Jogadores por equipe',
    jogadoresEquipoDesc: 'Cada equipe será composta por 8 jogadores.',
    jogadores: 'Jogadores',
    jogadoresDesc: 'Participantes confirmados para o Rustaco 2.',
    hora: 'Hora',
    horaDesc: 'Horário de início do evento (horário do Chile).',
    modo: 'Modo',
    modoDesc: 'O evento será realizado em formato competitivo.',
    verReglas: 'Ver Regras',
    fecha: 'Datas',
    fechaDesc: 'Datas do evento Rustaco II.',
    inscripcionesBtn: 'Inscrições abertas AGORA!',
    inscripcionesFechas: 'de 3 de agosto 15:00 GMT-4 até 8 de setembro 16:00 GMT-3',
    inscripcionesMsg: 'Não fique de fora! Inscreva sua equipe e participe do Rustaco II.',
    // Sponsor Poionako translations
    sponsorTitle: 'Patrocinado por',
    sponsorDesc: 'Poionako é streamer e criador de conteúdo.',
    sponsorFollow: 'Siga e apoie ele em seus canais!',
    sponsorName: 'Nome',
    sponsorGames: 'Jogos',
    sponsorLang: 'Idioma',
    sponsorLocation: 'Localização',
    sponsorGamesList: 'Rust, variedade',
    sponsorLangValue: 'Espanhol',
    sponsorLocationValue: 'Espanha',
    sponsorAbout: 'Sobre o streamer:',
    sponsorLive: 'Transmite ao vivo, cria conteúdo no YouTube e compartilha clipes no X (Twitter) e Kick.',
    streamNotice: 'Todo o evento será transmitido pela administração em',
    // Countdown
    countdownTitle: 'Contagem regressiva — 11 de setembro 15:00 (horário do Chile)',
    countdownDone: 'Chegou a hora!',
    daysShort: 'd',
    hoursShort: 'h',
    minutesShort: 'm',
    secondsShort: 's',
  }
};

// Hook para animaciones al hacer scroll
function useRevealOnScroll(ref, options = {}) {
  useEffect(() => {
    if (!ref?.current) return;
    const node = ref.current;
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-visible');
        } else {
          node.classList.remove('reveal-visible');
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      threshold: options.threshold || 0.15
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options.threshold]);
}

const logoAnim = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.08, 1],
    rotate: [0, 8, -8, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const btnAnim = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.07, 1],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Añade interacciones de hover/tap consistentes para todos los botones de la HUD
const hoverTapProps = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 }
};

// Modifica el logo y los botones en TopBar para usar motion
const TopBar = ({ onFormatoClick, onInfoClick, onTeamsClick, lang, setLang }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= 900 : false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Hysteresis y rAF para evitar parpadeo en el tope
  const SCROLL_DOWN_THRESHOLD = 80; // activa estado "scrolled" al pasar 80px
  const SCROLL_UP_THRESHOLD = 20;   // desactiva al volver por debajo de 20px
  const rafRef = React.useRef(null);
  const scrolledRef = React.useRef(isScrolled);

  React.useEffect(() => {
    scrolledRef.current = isScrolled;
  }, [isScrolled]);

  React.useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const curr = scrolledRef.current;
        if (!curr && y > SCROLL_DOWN_THRESHOLD) {
          scrolledRef.current = true;
          setIsScrolled(true);
        } else if (curr && y < SCROLL_UP_THRESHOLD) {
          scrolledRef.current = false;
          setIsScrolled(false);
        }
      });
    };
    const onResize = () => setIsMobile(window.innerWidth <= 900);

    onResize();
    onScroll(); // estado inicial coherente
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const closeMenuIfMobile = () => {
    if (isMobile) setMenuOpen(false);
  };

  return (
    <div
      className="TopBar"
      style={{
        width: '100%',
        minHeight: isScrolled ? '62px' : '80px',
        background: 'rgba(15,15,15,0.35)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: isScrolled ? '0 6px 24px rgba(0,0,0,0.35)' : '0 2px 12px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'min-height 180ms ease, box-shadow 180ms ease, background 180ms ease' // transición suave
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          minWidth: 0
        }}>
          <motion.img
            src={logo}
            alt="Rustaco Logo"
            variants={logoAnim}
            initial="initial"
            animate="animate"
            style={{
              borderRadius: '50%',
              width: isScrolled ? 56 : 64,
              height: isScrolled ? 56 : 64,
              objectFit: 'cover',
              boxShadow: '0 1px 12px #0007'
            }}
          />
          {/* Botón hamburguesa en mobile */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                width: 44,
                height: 44,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.25)'
              }}
            >
              ☰
            </button>
          )}
          {/* Contenedor de navegación (colapsable en mobile) */}
          <div
            style={{
              display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? '0.4rem' : '2rem',
              marginLeft: isMobile ? 0 : '2rem',
              position: isMobile ? 'absolute' : 'static',
              top: isMobile ? '100%' : 'auto',
              left: isMobile ? 0 : 'auto',
              right: isMobile ? 0 : 'auto',
              padding: isMobile ? '0.75rem' : 0,
              background: isMobile ? 'rgba(15,15,15,0.92)' : 'transparent',
              backdropFilter: isMobile ? 'blur(10px)' : 'none',
              WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'none',
              borderBottom: isMobile ? '1px solid rgba(255,255,255,0.08)' : 'none',
              boxShadow: isMobile ? '0 10px 30px rgba(0,0,0,0.45)' : 'none',
              borderRadius: isMobile ? '0 0 14px 14px' : 0,
              zIndex: 101
            }}
          >
            <motion.button
              className="nav-btn"
              onClick={() => { onFormatoClick(); closeMenuIfMobile(); }}
              variants={btnAnim}
              {...hoverTapProps}
              initial="initial"
              animate="animate"
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '1.08rem',
                padding: isMobile ? '0.8rem 0.9rem' : '0.55rem 1.5rem',
                borderRadius: 10,
                boxShadow: 'none',
                cursor: 'pointer',
                letterSpacing: '1px',
                textDecoration: 'none',
                margin: 0,
                transition: 'color 0.2s, background 0.2s'
              }}
            >
              {translations[lang].formato}
            </motion.button>
            <motion.button
              className="nav-btn"
              onClick={() => { onInfoClick(); closeMenuIfMobile(); }}
              variants={btnAnim}
              {...hoverTapProps}
              initial="initial"
              animate="animate"
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '1.08rem',
                padding: isMobile ? '0.8rem 0.9rem' : '0.55rem 1.5rem',
                borderRadius: 10,
                boxShadow: 'none',
                cursor: 'pointer',
                letterSpacing: '1px',
                textDecoration: 'none',
                margin: 0,
                transition: 'color 0.2s, background 0.2s'
              }}
            >
              {translations[lang].sobre}
            </motion.button>
            <Link to="/equipos" onClick={closeMenuIfMobile}>
              <motion.button
                className="nav-btn"
                variants={btnAnim}
                {...hoverTapProps}
                initial="initial"
                animate="animate"
                style={{
                  background: 'none',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  padding: isMobile ? '0.8rem 0.9rem' : '0.55rem 1.5rem',
                  borderRadius: 10,
                  boxShadow: 'none',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textDecoration: 'none',
                  margin: 0,
                  transition: 'color 0.2s, background 0.2s'
                }}
              >
                {translations[lang].equipos}
              </motion.button>
            </Link>
            <motion.a
              href="/events"
              className="nav-btn"
              variants={btnAnim}
              {...hoverTapProps}
              initial="initial"
              animate="animate"
              onClick={closeMenuIfMobile}
              style={{
                background: 'none',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '1.08rem',
                padding: isMobile ? '0.8rem 0.9rem' : '0.55rem 1.5rem',
                borderRadius: 10,
                boxShadow: 'none',
                cursor: 'pointer',
                letterSpacing: '1px',
                textDecoration: 'none',
                margin: 0,
                transition: 'color 0.2s, background 0.2s'
              }}
            >
              {translations[lang].stats}
            </motion.a>
            <motion.div style={{ display: 'inline-block' }} variants={btnAnim} initial="initial" animate="animate">
              <Link
                to="/reglas"
                onClick={closeMenuIfMobile}
                className="nav-btn"
                style={{
                  background: 'none',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  padding: isMobile ? '0.8rem 0.9rem' : '0.55rem 1.5rem',
                  borderRadius: 10,
                  boxShadow: 'none',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textDecoration: 'none',
                  margin: 0,
                  transition: 'color 0.2s, background 0.2s'
                }}
              >
                {translations[lang].verReglas}
              </Link>
            </motion.div>
            <motion.div style={{ display: 'inline-block' }} variants={btnAnim} initial="initial" animate="animate">
              <LoginSteam />
            </motion.div>
          </div>
        </div>
        {/* Selector de idioma (siempre visible) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <motion.button
            onClick={() => { setLang('es'); closeMenuIfMobile(); }}
            variants={btnAnim}
            {...hoverTapProps}
            initial="initial"
            animate="animate"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10,
              padding: 4,
              cursor: 'pointer',
              marginRight: 2,
              boxShadow: 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s'
            }}
            title="Español LATAM"
          >
            <img src={flagChile} alt="Chile" style={{ width: 26, height: 18, verticalAlign: 'middle', display: 'block' }} />
          </motion.button>
          <motion.button
            onClick={() => { setLang('en'); closeMenuIfMobile(); }}
            variants={btnAnim}
            {...hoverTapProps}
            initial="initial"
            animate="animate"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10,
              padding: 4,
              cursor: 'pointer',
              marginRight: 2,
              boxShadow: 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s'
            }}
            title="English USA"
          >
            <img src={flagUSA} alt="USA" style={{ width: 26, height: 18, verticalAlign: 'middle', display: 'block' }} />
          </motion.button>
          <motion.button
            onClick={() => { setLang('pt'); closeMenuIfMobile(); }}
            variants={btnAnim}
            {...hoverTapProps}
            initial="initial"
            animate="animate"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10,
              padding: 4,
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s'
            }}
            title="Português Brasil"
          >
            <img src={flagBrazil} alt="Brasil" style={{ width: 26, height: 18, verticalAlign: 'middle', display: 'block' }} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Botón profesional de Login Steam SOLO en la TopBar
const ADMIN_STEAM_IDS = [
  '76561198416933402',
  '76561198067186042',
  '76561199220103836',
  '76561199167906871',
  '76561198301561047'
];

const LoginSteam = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    fetch('https://www.rustaco.site/api/user', {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) return { steamid: null };
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setUser(data && data.steamid ? data : null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('https://www.rustaco.site/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(() => window.location.href = '/')
      .catch(() => window.location.href = '/');
  };

  if (loading) {
    // Muestra un spinner pequeño pero NO bloquea la UI ni overlays
    return (
      <div style={{
        width: 120,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span className="loader" style={{
          display: 'inline-block',
          width: 28, height: 28,
          border: '4px solid #e25822',
          borderTop: '4px solid #23201a',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </div>
    );
  }

  if (user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#23201a',
        borderRadius: 10,
        padding: '0.35rem 1.1rem',
        boxShadow: '0 1px 8px #0006',
        color: '#fff',
        fontWeight: 600,
        margin: 0,
        maxWidth: 340,
        height: 44,
        minHeight: 44
      }}>
        <img src={user.avatar} alt="avatar" style={{
          width: 32, height: 32, borderRadius: '50%', marginRight: 6, border: '2px solid #7289da'
        }} />
        <span style={{ color: '#b3cfff', fontWeight: 700, fontSize: '1rem', marginRight: 8 }}>
          {user.name}
        </span>
        {/* Solo muestra el botón Admin Panel si el usuario es admin */}
        {ADMIN_STEAM_IDS.includes(user.steamid) && (
          <a
            href="/admin"
            style={{
              marginLeft: 8,
              color: '#27ae60',
              fontWeight: 700,
              textDecoration: 'underline',
              fontSize: '0.98rem'
            }}
          >
            Admin Panel
          </a>
        )}
        <a
          href="#logout"
          onClick={handleLogout}
          style={{
            marginLeft: 8,
            color: '#e25822',
            fontWeight: 700,
            textDecoration: 'underline',
            fontSize: '0.98rem'
          }}
        >
          Logout
        </a>
      </div>
    );
  }

  // Botón de Login Steam como <a> normal, sin overlays ni eventos extra
  return (
    <a
      href="https://www.rustaco.site/auth/steam"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'linear-gradient(90deg, #23201a 60%, #27ae60 100%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.08rem',
        padding: '0.55rem 1.5rem 0.55rem 1.1rem',
        border: 'none',
        borderRadius: 10,
        boxShadow: '0 2px 8px #0007',
        cursor: 'pointer',
        letterSpacing: '1px',
        textDecoration: 'none',
        margin: 0,
        height: 44,
        minHeight: 44,
        transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
        alignSelf: 'center'
      }}
      title="Iniciar sesión con Steam"
    >
      <img
        src={steamlogo}
        alt="Steam"
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'transparent',
          marginRight: 8,
          boxShadow: '0 1px 4px #0006',
          objectFit: 'cover',
          border: '2px solid #27ae60'
        }}
      />
      <span style={{
        fontWeight: 700,
        fontSize: '1.08rem',
        letterSpacing: '1px',
        color: '#fff',
        textShadow: '0 1px 4px #000a'
      }}>
        Login Steam
      </span>
    </a>
  );
};

const DISCORD_CONTACT = "https://discord.rustaco.site"; // Cambia por el Discord oficial si es otro

// Usa el idioma del Home; elimina el estado local de idioma
const InscripcionBanner = ({ lang }) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch('/api/user', {
      credentials: 'include',
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) return { steamid: null };
        return res.json();
      })
      .then(data => setUser(data && data.steamid ? data : null))
      .catch(() => setUser(null));
  }, []);

  const handleClick = () => {
    if (user) {
      history.push('/applys');
    } else {
      setShowModal(true);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeVariants}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2.5rem 0 0 0'
      }}
    >
      <button
        onClick={handleClick}
        style={{
          background: 'linear-gradient(90deg, #27ae60 60%, #e25822 100%)',
          color: '#fff',
          fontWeight: 900,
          fontSize: '1.35rem',
          padding: '1.1rem 2.8rem',
          border: 'none',
          borderRadius: 18,
          boxShadow: '0 4px 18px #27ae6088',
          cursor: 'pointer',
          letterSpacing: '1px',
          textDecoration: 'none',
          marginBottom: '1.2rem',
          opacity: 1,
          transition: 'background 0.2s, transform 0.2s'
        }}
        title={translations[lang].inscripcionesBtn}
      >
        {translations[lang].inscripcionesBtn}<br />
        <span style={{ fontWeight: 700, fontSize: '1.08rem', color: '#b3cfff' }}>
          {translations[lang].inscripcionesFechas}
        </span>
      </button>
      <span style={{
        color: '#e25822',
        fontSize: '1.18rem',
        fontWeight: 700,
        marginTop: 8,
        opacity: 0.95,
        textAlign: 'center'
      }}>
        {translations[lang].inscripcionesMsg}
      </span>
      {/* ...el resto del modal y mensaje se puede dejar oculto o eliminar si no se usa */}
    </motion.div>
  );
};

const fadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.39, 0.575, 0.565, 1] } }
};

// Utilidad TZ: convierte una hora local en America/Santiago a Date UTC
function tzOffsetInMs(date, timeZone) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  const parts = dtf.formatToParts(date);
  const map = {};
  for (const p of parts) map[p.type] = p.value;
  const asUTC = Date.UTC(map.year, Number(map.month) - 1, map.day, map.hour, map.minute, map.second);
  return asUTC - date.getTime();
}

function zonedTimeToUtc({ year, monthIndex, day, hour, minute, second = 0 }, timeZone) {
  const guess = new Date(Date.UTC(year, monthIndex, day, hour, minute, second));
  const offset = tzOffsetInMs(guess, timeZone);
  return new Date(guess.getTime() - offset);
}

// Utilidad: próxima fecha objetivo Sep 11 15:00 America/Santiago (DST-safe)
function getNextTargetDate() {
  const tz = 'America/Santiago';
  const now = new Date();
  const y = now.getUTCFullYear();
  const mk = (year) => zonedTimeToUtc({ year, monthIndex: 8, day: 11, hour: 15, minute: 0 }, tz); // Sep=8
  const thisYear = mk(y);
  return now.getTime() < thisYear.getTime() ? thisYear : mk(y + 1);
}

// Hook de cuenta regresiva
function useCountdown(targetDate) {
  const [diff, setDiff] = useState(() => Math.max(0, targetDate.getTime() - Date.now()));
  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.max(0, targetDate.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const expired = diff <= 0;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, expired };
}

// Banner de cuenta regresiva (mejorado)
function CountdownBanner({ lang }) {
  const [target] = useState(() => getNextTargetDate());

  const { days, hours, minutes, seconds, expired } = useCountdown(target);

  // Localized preview of target in user's timezone
  const localeMap = { es: 'es-ES', en: 'en-US', pt: 'pt-BR' };
  const localTargetStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(localeMap[lang] || 'en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }).format(target);
    } catch {
      return target.toLocaleString();
    }
  }, [lang, target]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeVariants}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        margin: '0.8rem 0 0.2rem 0'
      }}
      title={`${translations[lang].countdownTitle} • ${localTargetStr}`}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: '#fff',
        fontWeight: 900,
        letterSpacing: '1px',
        textShadow: '0 1px 4px #000a'
      }}>
        <i className="bi bi-calendar2-week" style={{ color: '#e25822' }} />
        {translations[lang].countdownTitle}
      </div>

      {expired ? (
        <div style={{ color: '#e25822', fontWeight: 900, fontSize: '1.2rem' }}>
          {translations[lang].countdownDone}
        </div>
      ) : (
        <div
          role="timer"
          aria-live="polite"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 0.9rem',
            borderRadius: 16,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
            backdropFilter: 'blur(6px)'
          }}
        >
          <TimeBox value={days} label={translations[lang].daysShort} />
          <Sep />
          <TimeBox value={hours} label={translations[lang].hoursShort} />
          <Sep />
          <TimeBox value={minutes} label={translations[lang].minutesShort} />
          <Sep />
          <TimeBox value={seconds} label={translations[lang].secondsShort} />
        </div>
      )}

      {!expired && (
        <div style={{ color: '#b3cfff', fontWeight: 600, fontSize: '0.95rem', opacity: 0.9 }}>
          {localTargetStr}
        </div>
      )}
    </motion.div>
  );
}

// Caja de tiempo con animación profesional por cambio de valor
function TimeBox({ value, label }) {
  const pad = (n) => String(n).padStart(2, '0');
  const fontMono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

  return (
    <div
      style={{
        minWidth: 64,
        textAlign: 'center',
        background: 'linear-gradient(180deg, #23201a 65%, #1b1915 100%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12,
        padding: '0.5rem 0.55rem',
        color: '#fff',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 6px 18px rgba(0,0,0,0.35)'
      }}
    >
      <div style={{ height: 28, overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-block',
              fontWeight: 900,
              fontSize: '1.25rem',
              color: '#f39c12',
              fontFamily: fontMono,
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.8rem', opacity: 0.85, letterSpacing: '0.5px' }}>{label}</div>
    </div>
  );
}

function Sep() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 10,
        height: 28,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffffcc',
        fontWeight: 900,
        textShadow: '0 1px 4px #000a'
      }}
    >
      :
    </div>
  );
}

// Reemplaza los principales bloques por motion.div/motion.section/motion.header
const Header = ({ lang }) => {
  const headerRef = useRef(null);
  useRevealOnScroll(headerRef, { threshold: 0.2 });

  return (
    <motion.header
      ref={headerRef}
      className="header reveal"
      initial="hidden"
      animate="visible"
      variants={fadeVariants}
      style={{
        marginTop: '0',
        padding: '3rem 0 1.2rem 0',
        textAlign: 'center',
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'none'
      }}
    >
      <motion.div
        className="logo-glow-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'none'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src={rustaco2logo}
          alt="Rustaco II Logo"
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            objectFit: 'contain',
            background: 'none',
            boxShadow: 'none',
            margin: '0 auto',
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}
        />
        {/* Elimina el fondo glow */}
        {/* <div className="logo-glow-bg"></div> */}
      </motion.div>

      {/* NUEVA: Cuenta regresiva hasta 11 de septiembre 15:00 (hora de Chile) */}
      <CountdownBanner lang={lang} />

      <InscripcionBanner lang={lang} />
    </motion.header>
  );
};

// Ejemplo para FormatoSection (aplica igual a otras secciones principales)
const FormatoSection = React.forwardRef(({ lang }, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  return (
    <motion.section
      ref={sectionRef}
      className="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeVariants}
      style={{
        maxWidth: 1600,
        minHeight: '60vh',
        margin: '0 auto',
        marginTop: '26rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 2rem',
        textAlign: 'left',
        gap: '0.5rem',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      <div
        style={{
          flex: 1.2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          minWidth: 0
        }}
      >
        <h2
          style={{
            fontFamily: 'Montserrat, Impact, Arial Black, Arial, sans-serif',
            fontWeight: 800,
            color: 'var(--rust-orange)',
            marginBottom: '2rem',
            fontSize: '2.5rem',
            letterSpacing: '1px'
          }}
        >
          {translations[lang].formatoTitulo}
        </h2>
        <ul style={{
          color: '#f5f5f5',
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '1.5rem',
          margin: 0,
          maxWidth: 650,
          paddingLeft: '1.2em',
          listStyle: 'disc'
        }}>
          <li dangerouslySetInnerHTML={{ __html: translations[lang].formato1 }} />
          <li>{translations[lang].formato2}</li>
          <li>{translations[lang].formato3}</li>
        </ul>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 0,
          position: 'relative'
        }}
      >
        <div className="logo-glow-container reveal">
          <img
            src={rustpmc4}
            alt="Evento Rust"
            style={{
              width: '100%',
              maxWidth: '1000px',
              minWidth: '400px',
              borderRadius: 0,
              boxShadow: 'none',
              objectFit: 'contain',
              marginLeft: '0.5rem',
              marginRight: 0,
              background: 'none',
              animation: 'imgPop 1.2s cubic-bezier(.4,0,.2,1)',
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
          />
          <div className="logo-glow-bg"></div>
        </div>
      </div>
    </motion.section>
  );
});

const AboutSection = React.forwardRef(({ lang }, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  return (
    <motion.section
      ref={sectionRef}
      className="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeVariants}
      style={{
        maxWidth: 1600,
        minHeight: '60vh',
        margin: '0 auto',
        marginTop: '2.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 2rem',
        textAlign: 'left',
        gap: '0.5rem',
        boxSizing: 'border-box',
        width: '100%',
        background: 'transparent'
      }}
    >
      <div
        style={{
          flex: 1.3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 0,
          position: 'relative'
        }}
      >
        <div className="logo-glow-container reveal">
          <img
            src={rustpmc3}
            alt="Sobre Rustaco"
            style={{
              width: '100%',
              maxWidth: '900px',
              minWidth: '400px',
              borderRadius: 0,
              boxShadow: 'none',
              objectFit: 'contain',
              background: 'transparent',
              animation: 'imgPop 1.2s cubic-bezier(.4,0,.2,1)',
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
          />
          <div className="logo-glow-bg"></div>
        </div>
      </div>
      <div
        style={{
          flex: 1.1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minWidth: 0
        }}
      >
        <h2
          style={{
            fontFamily: 'Montserrat, Impact, Arial Black, Arial, sans-serif',
            fontWeight: 900,
            color: 'var(--rust-orange)',
            marginBottom: '2rem',
            fontSize: '2.7rem',
            letterSpacing: '1px',
            textAlign: 'left'
          }}
        >
          {translations[lang].sobreTitulo}
        </h2>
        <p style={{
          color: '#f5f5f5',
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontWeight: 500,
          fontSize: '1.5rem',
          margin: 0,
          maxWidth: 700,
          textAlign: 'left'
        }}>
          {translations[lang].sobreTexto}
        </p>
        <Link
          to="/reglas"
          style={{
            marginTop: '2.2rem',
            background: 'linear-gradient(90deg, #7289da 60%, #e25822 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.15rem',
            padding: '0.9rem 2.5rem',
            border: 'none',
            borderRadius: 14,
            boxShadow: '0 2px 12px #0007',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
            letterSpacing: '1px',
            textDecoration: 'none',
            display: 'inline-block'
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {translations[lang].verReglas}
        </Link>
      </div>
    </motion.section>
  );
});

const ExtraInfoSection = React.forwardRef(({ lang }, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  return (
    <motion.section
      ref={sectionRef}
      className="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeVariants}
      style={{
        maxWidth: 900,
        margin: '0 auto',
        marginTop: '3rem',
        marginBottom: '3rem',
        padding: '2.5rem 1.5rem',
        borderRadius: '24px',
        boxShadow: 'none',
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}
    >
      <h3 style={{
        color: 'var(--rust-orange)',
        fontFamily: 'Montserrat, Impact, Arial Black, Arial, sans-serif',
        fontWeight: 800,
        fontSize: '2rem',
        marginBottom: '1rem',
        letterSpacing: '1px'
      }}>
        {translations[lang].infoAdicional}
      </h3>
      <p style={{
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '1.2rem',
        textAlign: 'center',
        margin: 0,
        maxWidth: 700
      }}>
        {translations[lang].infoAdicionalTexto}
      </p>
      {/* No agregar mensaje de Twitch aquí */}
    </motion.section>
  );
});

const EventoInfoSection = React.forwardRef(({ lang }, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  const infoCards = [
    {
      label: translations[lang].equiposLabel,
      value: '16',
      icon: '👥',
      description: translations[lang].equiposDesc
    },
    {
      label: translations[lang].jugadoresEquipo,
      value: '8',
      icon: '🧑‍🤝‍🧑',
      description: translations[lang].jugadoresEquipoDesc
    },
    {
      label: translations[lang].jugadores,
      value: lang === 'es' ? '128' : '128',
      icon: '🎮',
      description: translations[lang].jugadoresDesc
    },
    {
      label: translations[lang].hora,
      value: '15:00 (GMT-3)',
      icon: '⏰',
      description: translations[lang].horaDesc
    },
    {
      label: translations[lang].fecha,
      value: '11, 12, 13 & 14 de septiembre', 
      icon: '📅',
      description: translations[lang].fechaDesc
    },
    {
      label: translations[lang].modo,
      value: translations[lang].modo === 'Modo' ? 'Competitivo' : 'Competitive',
      icon: '🏆',
      description: translations[lang].modoDesc
    }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeVariants}
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        marginTop: '4rem',
        marginBottom: '3rem',
        padding: '2rem 1rem',
        borderRadius: '28px',
        boxShadow: 'none', // Elimina sombra
        background: 'none', // Elimina fondo negro
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div className="reveal">
          <img
            src={logo}
            alt="Rustaco Logo"
            style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: 'none', // Elimina sombra
              background: 'none', // Elimina fondo negro
              border: '2px solid #e25822'
            }}
          />
        </div>
        <div className="reveal">
          <h2 style={{
            fontFamily: 'Montserrat, Impact, Arial Black, Arial, sans-serif',
            fontWeight: 900,
            color: 'var(--rust-orange)',
            fontSize: '2.1rem',
            letterSpacing: '2px',
            margin: 0,
            textShadow: '2px 2px 8px #000a'
          }}>
            {translations[lang].eventoTitulo}
          </h2>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.2rem',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {infoCards.map((card, idx) => (
          <div
            key={card.label + '-' + idx}
            className="evento-info-card reveal"
            style={{
              background: 'none', // Elimina fondo negro
              borderRadius: '16px',
              boxShadow: 'none', // Elimina sombra
              padding: '1.2rem 1.4rem',
              minWidth: 170,
              maxWidth: 210,
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              border: 'none',
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '1.08rem',
              color: '#fff',
              letterSpacing: '1px',
              position: 'relative',
              transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
              overflow: 'hidden'
            }}
          >
            <span style={{
              fontSize: '1.7rem',
              marginBottom: '0.1rem',
              filter: 'drop-shadow(0 2px 6px #000a)'
            }}>{card.icon}</span>
            <span style={{
              color: 'var(--rust-orange)',
              fontWeight: 900,
              fontSize: '1.35rem',
              textShadow: '1px 1px 8px #000a'
            }}>{card.value}</span>
            <span style={{
              fontSize: '0.98rem',
              color: '#f39c12',
              fontWeight: 600,
              marginBottom: '0.1rem',
              textAlign: 'center'
            }}>{card.label}</span>
            <span style={{
              fontSize: '0.93rem',
              color: '#e0e0e0',
              fontWeight: 400,
              textAlign: 'center',
              marginTop: '0.1rem',
              opacity: 0.85,
              lineHeight: 1.3
            }}>{card.description}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
});

const TeamsSection = React.forwardRef(({ lang }, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  // Estado para mostrar el modal de información de equipo
  const [openTeamIdx, setOpenTeamIdx] = useState(null);

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  // --- Equipos destacados y el resto ---
  const teams = [
    {
      name: "Team cG",
      logo: cantosogangLogo,
      channels: [
        { url: "https://www.twitch.tv/lukasito", name: "Lukasito" },
        { url: "https://www.twitch.tv/adriidr", name: "Adriidr" },
        { url: "https://www.twitch.tv/02tez", name: "02tez" },
        { url: "https://www.twitch.tv/murloc_cg", name: "Murloc_cg" },
        { url: "https://www.twitch.tv/nadiahq", name: "Nadiahq" },
        { url: "https://www.twitch.tv/edinz_", name: "Edinz_" },
        { url: "https://www.twitch.tv/v2unstoppable", name: "V2Unstoppable" },
        { url: "https://kick.com/poionako", name: "Poionako" }
      ]
    },
    {
      name: "Team Junin",
      logo: juninLogo,
      channels: [
        { url: "https://www.twitch.tv/junin", name: "Junin" },
        { url: "https://www.twitch.tv/toddynho", name: "Toddynho" },
        { url: "https://www.twitch.tv/r3crutatv", name: "R3crutatv" },
        { url: "https://www.twitch.tv/dubomtv", name: "Dubomtv" },
        { url: "https://www.twitch.tv/andrerossi", name: "Andrerossi" },
        { url: "https://www.twitch.tv/mtx1__", name: "Mtx1__" },
        { url: "https://www.twitch.tv/rubyhub", name: "Rubyhub" },
        { url: "https://www.twitch.tv/sh0cker", name: "Sh0cker" }
      ]
    },
    {
      name: "Team OT",
      logo: teamOTLogo,
      channels: [
        { url: "https://www.twitch.tv/deathwingua", name: "deathwingua" },
        { url: "https://www.twitch.tv/riqqeloff", name: "riqqeloff" },
        { url: "https://www.twitch.tv/hutnik", name: "hutnik" },
        { url: "https://www.twitch.tv/oilrats", name: "oilrats" },
        { url: "https://www.twitch.tv/mango", name: "mango" },
        { url: "https://www.twitch.tv/farmerlucas", name: "farmerlucas" },
        { url: "https://www.twitch.tv/basetradetv", name: "basetradetv" },
        { url: "https://www.twitch.tv/babayaga__0", name: "babayaga__0" }
      ]
    },
    {
      name: "Team Lagtam",
      logo: salomonLogo,
      channels: [
        { url: "https://www.twitch.tv/salomonl96_", name: "salomonl96_" },
        { url: "https://www.twitch.tv/morganelia", name: "morganelia" },
        { url: "https://www.twitch.tv/yopickeosola", name: "yopickeosola" },
        { url: "https://www.twitch.tv/eldestinydbl", name: "eldestinydbl" },
        { url: "https://www.twitch.tv/noscopeaim", name: "noscopeaim" },
        { url: "https://www.twitch.tv/wavesxs0314", name: "wavesxs0314" },
        { url: "https://www.twitch.tv/notcarlitoxcr", name: "notcarlitoxcr" },
        { url: "https://www.twitch.tv/vacnekopp", name: "vacnekopp" }
      ]
    },
    {
      name: "Team MCV",
      logo: mcompanyvLogo,
      channels: [
        { url: "https://www.twitch.tv/mcompanyv", name: "mcompanyv" },
        { url: "https://www.twitch.tv/renepilon", name: "renepilon" },
        { url: "https://www.twitch.tv/mk33l", name: "mk33l" },
        { url: "https://www.twitch.tv/joe100val", name: "joe100val" },
        { url: "https://www.twitch.tv/naviix19", name: "naviix19" },
        { url: "https://www.twitch.tv/crazita", name: "crazita" },
        { url: "https://www.twitch.tv/fuegales", name: "fuegales" },
        { url: "https://www.twitch.tv/tilteada", name: "tilteada" }
      ]
    },
    {
      name: "Team AAAA",
      logo: aaaaLogo,
      channels: [
        { url: "https://kick.com/04-mauri", name: "04-mauri" },
        { url: "https://www.twitch.tv/lichaafps", name: "lichaafps" },
        { url: "https://kick.com/1matuh", name: "1matuh" },
        { url: "https://kick.com/papats", name: "papats" },
        { url: "https://www.twitch.tv/nbfacu", name: "nbfacu" },
        { url: "https://www.twitch.tv/1stompz", name: "1stopmz" },
        { url: "https://www.twitch.tv/elchuecoo19", name: "elchuecoo19" },
        { url: "https://www.twitch.tv/zisaac18", name: "zisaac18" }
      ]
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `${translations[lang].equipo} ${i + 6}`,
      status: translations[lang].aConfirmar,
      channels: []
    }))
  ];

  const firstRow = teams.slice(0, 8);
  const secondRow = teams.slice(8, 16);

  // Modal de información de equipo
  const TeamInfoModal = ({ team, onClose }) => (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.55)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#23201a",
          borderRadius: 22,
          boxShadow: "0 8px 32px #000b",
          padding: "2.2rem 2rem 1.5rem 2rem",
          minWidth: 320,
          maxWidth: 400,
          width: "90vw",
          color: "#fff",
          fontFamily: "Montserrat, Arial, sans-serif",
          position: "relative"
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 28,
            cursor: "pointer"
          }}
          aria-label="Cerrar"
        >×</button>
        {team.logo && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16
          }}>
            <img
              src={team.logo}
              alt={team.name + " Logo"}
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 2px 12px #0008"
              }}
            />
          </div>
        )}
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: 900,
          color: "#fff",
          textAlign: "center",
          marginBottom: 8
        }}>{team.name}</h2>
        {team.status && (
          <div style={{
            color: "#f39c12",
            fontWeight: 700,
            fontSize: "1.09rem",
            textAlign: "center",
            marginBottom: 10
          }}>{team.status}</div>
        )}
        {team.channels && team.channels.length > 0 && (
          <>
            <div style={{
              color: "#f39c12",
              fontWeight: 700,
              fontSize: "1.09rem",
              marginBottom: 6,
              textAlign: "center"
            }}>
              Canales de transmisión
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
              alignItems: "center"
            }}>
              {team.channels.map((ch, i) => (
                <li key={i} style={{ marginBottom: 0 }}>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: ch.url.includes("kick.com") ? "#53fc18" : "#9147ff",
                      fontWeight: 700,
                      textDecoration: "underline",
                      fontSize: "1.08rem",
                      wordBreak: "break-all",
                      letterSpacing: "0.5px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "rgba(0,0,0,0.10)",
                      borderRadius: 8,
                      padding: "2px 10px"
                    }}
                  >
                    {ch.url.includes("kick.com") ? (
                      <svg width="18" height="18" viewBox="0 0 32 32" style={{ marginRight: 2 }}>
                        <rect width="32" height="32" rx="7" fill="#53fc18"/>
                        <text x="16" y="22" textAnchor="middle" fontSize="18" fill="#23201a" fontWeight="bold">K</text>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 32 32" style={{ marginRight: 2 }}>
                        <rect width="32" height="32" rx="7" fill="#9147ff"/>
                        <text x="16" y="22" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="bold">T</text>
                      </svg>
                    )}
                    {ch.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <motion.section
        ref={sectionRef}
        className="reveal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeVariants}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          marginTop: '2.5rem',
          marginBottom: '3.5rem',
          padding: 0,
          background: 'none',
          borderRadius: 0,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.2rem'
        }}
      >
        <h2 style={{
          fontFamily: 'Montserrat, Impact, Arial Black, Arial, sans-serif',
          fontWeight: 900,
          color: 'var(--rust-orange)',
          fontSize: '2rem',
          letterSpacing: '2px',
          margin: 0,
          textShadow: '2px 2px 8px #000a'
        }}>
          {translations[lang].equiposParticipantes}
        </h2>
        <p
          style={{
            color: '#fff',
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '1.15rem',
            margin: 0,
            marginBottom: '1.5rem',
            textAlign: 'center',
            opacity: 0.85,
            maxWidth: 700
          }}
        >
          {translations[lang].equiposTexto}
        </p>
        {/* Primera fila */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '1.7rem',
            width: '100%',
            marginTop: '1.2rem'
          }}
        >
          {firstRow.map((team, idx) => (
            <div
              key={team.name + '-' + idx}
              className="reveal"
              style={{
                background: team.logo
                  ? `linear-gradient(135deg, #23201a 70%, ${idx === 0 ? "#e25822" : "#9147ff"} 100%)`
                  : 'linear-gradient(135deg, #23201a 70%, #3a4bd8 100%)',
                borderRadius: '16px',
                boxShadow: team.logo
                  ? `0 4px 24px ${idx === 0 ? "#e25822cc" : "#9147ffcc"}, 0 0 0 3px #fff2`
                  : '0 2px 12px #000a, 0 0 0 1.5px #7289da88',
                padding: '1.5rem 1.2rem',
                minHeight: 110,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.7rem',
                border: 'none',
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 700,
                fontSize: '1.08rem',
                color: '#fff',
                letterSpacing: '1px',
                position: 'relative',
                transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setOpenTeamIdx(idx)}
            >
              {team.logo && (
                <div style={{
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6,
                  boxShadow: "none",
                  background: "none"
                }}>
                  <img
                    src={team.logo}
                    alt={team.name + " Logo"}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 2px 12px #0008"
                    }}
                  />
                </div>
              )}
              <span style={{
                fontSize: '1.3rem',
                color: '#b3cfff',
                fontWeight: 900,
                textShadow: '1px 1px 8px #23272a',
                textAlign: 'center'
              }}>
                {team.name}
              </span>
              {team.status && (
                <span style={{
                  fontSize: '1.08rem',
                  color: '#fff',
                  fontWeight: 600,
                  opacity: 0.85,
                  letterSpacing: '1px',
                  marginTop: '0.2rem'
                }}>
                  {team.status}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Segunda fila */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '1.7rem',
            width: '100%',
            marginTop: '1.2rem'
          }}
        >
          {secondRow.map((team, idx) => (
            <div
              key={team.name + '-' + (idx + 8)}
              className="reveal"
              style={{
                background: team.logo
                  ? `linear-gradient(135deg, #23201a 70%, #3a4bd8 100%)`
                  : 'linear-gradient(135deg, #23201a 70%, #3a4bd8 100%)',
                borderRadius: '16px',
                boxShadow: '0 2px 12px #000a, 0 0 0 1.5px #7289da88',
                padding: '1.5rem 1.2rem',
                minHeight: 110,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.7rem',
                border: 'none',
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 700,
                fontSize: '1.08rem',
                color: '#fff',
                letterSpacing: '1px',
                position: 'relative',
                transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setOpenTeamIdx(idx + 8)}
            >
              {team.logo && (
                <div style={{
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6,
                  boxShadow: "none",
                  background: "none"
                }}>
                  <img
                    src={team.logo}
                    alt={team.name + " Logo"}
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 2px 12px #0008"
                    }}
                  />
                </div>
              )}
              <span style={{
                fontSize: '1.3rem',
                color: '#b3cfff',
                fontWeight: 900,
                textShadow: '1px 1px 8px #23272a',
                textAlign: 'center'
              }}>
                {team.name}
              </span>
              {team.status && (
                <span style={{
                  fontSize: '1.08rem',
                  color: '#fff',
                  fontWeight: 600,
                  opacity: 0.85,
                  letterSpacing: '1px',
                  marginTop: '0.2rem'
                }}>
                  {team.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.section>
      {/* Modal de información de equipo */}
      {openTeamIdx !== null && (
        <TeamInfoModal team={teams[openTeamIdx]} onClose={() => setOpenTeamIdx(null)} />
      )}
    </>
  );
});

const DiscordBanner = ({ lang }) => (
  <a
    href="https://discord.rustaco.site"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'fixed',
      top: 90,
      right: 24,
      zIndex: 9999,
      background: 'linear-gradient(90deg, #3a4bd8 60%, #5865f2 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px #000a',
      padding: '0.7rem 1.5rem 0.7rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      color: '#fff',
      textDecoration: 'none',
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1.15rem'
    }}
    className="discord-banner"
  >
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 60% 40%, #7289da 70%, #5865f2 100%)',
        borderRadius: '50%',
        width: 42,
        height: 42,
        marginRight: '0.7rem',
        boxShadow: '0 2px 8px #5865f2cc',
      }}
    >
      <img
        src={logodiscord}
        alt="Discord"
        style={{
          width: 26,
          height: 26,
          display: 'block',
        }}
      />
    </span>
    <span style={{
      color: '#fff',
      letterSpacing: '1px',
      textShadow: '1px 1px 8px #23272a',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <span>{translations[lang].discord1}</span>
      <span style={{
        fontWeight: 500,
        fontSize: '0.97rem',
        color: '#b3cfff',
        marginTop: 2,
        textDecoration: 'underline',
        cursor: 'pointer'
      }}>
        {translations[lang].discord2}
      </span>
    </span>
  </a>
);

const Footer = ({ lang }) => (
  <footer className="footer">
    &copy; {new Date().getFullYear()} {translations[lang].footer}
  </footer>
);

// Componente para el fondo animado
const AnimatedBackground = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}
  >
    {/* Fondo suavizado */}
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.45) grayscale(0.1)',
        opacity: 0.7,
        zIndex: 1
      }}
    />
    {/* Animación profesional: partículas flotando */}
    <svg
      width="100vw"
      height="100vh"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: 'none'
      }}
    >
      {[...Array(18)].map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * window.innerWidth}
          cy={Math.random() * window.innerHeight}
          r={18 + Math.random() * 22}
          fill={i % 3 === 0 ? "#e25822" : i % 2 === 0 ? "#7289da" : "#27ae60"}
          opacity={0.13 + Math.random() * 0.09}
        >
          <animate
            attributeName="cy"
            values={`0;${window.innerHeight};0`}
            dur={`${6 + Math.random() * 6}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cx"
            values={`${Math.random() * window.innerWidth};${Math.random() * window.innerWidth};${Math.random() * window.innerWidth}`}
            dur={`${8 + Math.random() * 8}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  </div>
);

// Chatbot notification and widget
import { useRef as useRefChatbot } from 'react';

const chatbotMessages = {
  es: {
    welcome: "¡Bienvenido a Rustaco II! ¿En qué podemos ayudarte?",
    options: [
      "¿Cómo me inscribo?",
      "¿Cuál es el formato?",
      "Tengo un problema"
    ],
    inscripcion: "Para inscribirte, primero debes iniciar sesión en la web con Steam. Luego, haz clic en el botón grande de 'Inscripciones abiertas ¡YA!' en la página principal y sigue los pasos.",
    formato: "El formato es de 8 jugadores por equipo. Cada team tiene su propia isla donde debe construir una base y prepararse estratégicamente para el enfrentamiento final.",
    problema: "Si tienes algún problema, contacta al staff en nuestro Discord: https://discord.rustaco.site"
  },
  en: {
    welcome: "Welcome to Rustaco II! How can we help you?",
    options: [
      "How do I register?",
      "What is the format?",
      "I have a problem"
    ],
    inscripcion: "To register, you must first log in to the website with Steam. Then, click the big 'Registrations open NOW!' button on the main page and follow the steps.",
    formato: "The format is 8 players per team. Each team has its own island to build a base and prepare strategically for the final showdown.",
    problema: "If you have any issues, contact the staff on our Discord: https://discord.rustaco.site"
  },
  pt: {
    welcome: "Bem-vindo ao Rustaco II! Como podemos ajudar?",
    options: [
      "Como me inscrevo?",
      "Qual é o formato?",
      "Tenho um problema"
    ],
    inscripcion: "Para se inscrever, primeiro faça login no site com Steam. Depois, clique no botão grande 'Inscrições abertas AGORA!' na página principal e siga os passos.",
    formato: "O formato é de 8 jogadores por equipe. Cada equipe tem sua própria ilha para construir uma base e se preparar estrategicamente para o confronto final.",
    problema: "Se você tiver algum problema, entre em contato com a equipe no nosso Discord: https://discord.rustaco.site"
  }
};

// Helper: pick first playable audio source; returns null if none
const pickSupportedAudio = (sources = []) => {
  try {
    const a = new window.Audio();
    a.preload = 'none';
    for (const { src, type } of sources) {
      // If type omitted or supported by the browser
      if (!type || a.canPlayType(type)) {
        a.src = src;
        return a;
      }
    }
  } catch {}
  return null;
};

function ChatbotWidget({ lang }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const chatEndRef = useRefChatbot(null);

  // Sonidos para el bot
  const sndBot = useRefChatbot(null);
  const sndUser = useRefChatbot(null);

  // Cargar sonidos solo una vez y solo si el navegador los soporta
  useEffect(() => {
    sndBot.current = pickSupportedAudio([
      { src: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae1b1.mp3', type: 'audio/mpeg' }
      // agrega un .ogg si tienes una alternativa: { src: '...ogg', type: 'audio/ogg' }
    ]);
    sndUser.current = pickSupportedAudio([
      { src: 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b7bfa.mp3', type: 'audio/mpeg' }
    ]);

    if (sndBot.current) sndBot.current.volume = 0.18;
    if (sndUser.current) sndUser.current.volume = 0.18;
  }, []);

  // Animación y aparición del mensaje inicial tras 3 segundos (sin reproducir sonido automático)
  useEffect(() => {
    setShowNotif(false);
    setShowWelcome(false);
    setMessages([]);
    const timer = setTimeout(() => {
      setShowWelcome(true);
      setMessages([{ from: "bot", text: chatbotMessages[lang].welcome }]);
      setShowNotif(true);
      // No auto-play para evitar errores/autoplay-block
    }, 3000);
    return () => clearTimeout(timer);
  }, [lang]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  // Reproducir sonidos solo cuando el chat está abierto y hay interacción
  useEffect(() => {
    if (!open || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.from === "bot" && sndBot.current) {
      sndBot.current.play?.().catch(() => {});
    }
    if (last.from === "user" && sndUser.current) {
      sndUser.current.play?.().catch(() => {});
    }
  }, [messages, open]);

  const handleOption = idx => {
    let reply = "";
    if (idx === 0) reply = chatbotMessages[lang].inscripcion;
    if (idx === 1) reply = chatbotMessages[lang].formato;
    if (idx === 2) reply = chatbotMessages[lang].problema;
    setMessages(msgs => [
      ...msgs,
      { from: "user", text: chatbotMessages[lang].options[idx] },
      { from: "bot", text: reply }
    ]);
  };

  return (
    <>
      {/* Notification bubble animada */}
      {showNotif && !open && (
        <div
          onClick={() => {
            setOpen(true);
            setShowNotif(false);
            // Reproduce un sonido al abrir si está disponible
            sndBot.current?.play?.().catch(() => {});
          }}
          style={{
            position: "fixed",
            bottom: 110,
            right: 32,
            background: "linear-gradient(90deg, #23201a 60%, #e25822 100%)",
            color: "#fff",
            borderRadius: 18,
            boxShadow: "0 4px 24px #000a",
            padding: "1.1rem 1.7rem",
            cursor: "pointer",
            zIndex: 99999,
            fontWeight: 700,
            fontSize: "1.08rem",
            display: "flex",
            alignItems: "center",
            gap: 12,
            animation: "notifFadeIn 0.9s cubic-bezier(.4,0,.2,1)"
          }}
        >
          <i className="bi bi-chat-dots" style={{ fontSize: 26, marginRight: 10, color: "#fff" }}></i>
          <span style={{ fontSize: "1.08rem", fontWeight: 700, letterSpacing: "0.5px" }}>
            {chatbotMessages[lang].welcome}
          </span>
          <style>
            {`
              @keyframes notifFadeIn {
                0% { transform: translateY(40px) scale(0.8); opacity: 0; }
                100% { transform: translateY(0) scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}
      {/* Chatbot floating button */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 99999
        }}
      >
        <button
          onClick={() => {
            setOpen(o => !o);
            setShowNotif(false);
            // Sonido suave al abrir el chat si procede
            if (!open) sndBot.current?.play?.().catch(() => {});
          }}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e25822 60%, #23201a 100%)",
            color: "#fff",
            border: "none",
            boxShadow: "0 4px 18px #000a",
            fontSize: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s"
          }}
          title="Abrir chat"
        >
          <i className="bi bi-chat-dots"></i>
        </button>
        {/* Chatbot window */}
        {open && (
          <div
            style={{
              position: "fixed",
              bottom: 110,
              right: 32,
              width: 360,
              maxWidth: "95vw",
              background: "rgba(34,34,34,0.97)",
              borderRadius: 22,
              boxShadow: "0 12px 48px #000c, 0 0 0 2px #e25822cc",
              padding: "1.5rem 1.1rem 1.2rem 1.1rem",
              zIndex: 99999,
              color: "#fff",
              fontFamily: "Montserrat, Arial, sans-serif",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              animation: "chatFadeIn 0.7s cubic-bezier(.4,0,.2,1)"
            }}
          >
            <div style={{ fontWeight: 900, fontSize: "1.18rem", color: "#e25822", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <i className="bi bi-robot" style={{ fontSize: 26, color: "#fff" }}></i>
              Rustaco II Bot
              <button
                onClick={() => setOpen(false)}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: 26,
                  cursor: "pointer",
                  fontWeight: 700
                }}
                title="Cerrar"
              >
                ×
              </button>
            </div>
            <div style={{
              flex: 1,
              minHeight: 90,
              maxHeight: 240,
              overflowY: "auto",
              marginBottom: 8,
              paddingRight: 4,
              transition: "background 0.2s"
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  margin: "0.4rem 0",
                  textAlign: msg.from === "bot" ? "left" : "right",
                  display: "flex",
                  justifyContent: msg.from === "bot" ? "flex-start" : "flex-end",
                  alignItems: "flex-end"
                }}>
                  <span style={{
                    display: "inline-block",
                    background: msg.from === "bot"
                      ? "linear-gradient(90deg, #23201a 80%, #e25822 100%)"
                      : "linear-gradient(90deg, #27ae60 60%, #23201a 100%)",
                    color: "#fff",
                    borderRadius: msg.from === "bot" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                    padding: "0.7rem 1.1rem",
                    fontSize: "1.05rem",
                    marginBottom: 2,
                    maxWidth: 260,
                    wordBreak: "break-word",
                    boxShadow: msg.from === "bot"
                      ? "0 2px 8px #e2582288"
                      : "0 2px 8px #27ae6088",
                    animation: "msgFadeIn 0.5s"
                  }}>
                    {msg.text}
                  </span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {/* Opciones solo si último mensaje es bot y menos de 8 mensajes */}
            {messages.length < 8 && messages[messages.length - 1]?.from === "bot" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {chatbotMessages[lang].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOption(idx)}
                    style={{
                      background: "linear-gradient(90deg, #7289da 60%, #e25822 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "0.8rem 1.1rem",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px #7289da66",
                      transition: "background 0.2s"
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <style>
              {`
                @keyframes chatFadeIn {
                  0% { transform: translateY(60px) scale(0.95); opacity: 0; }
                  100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                @keyframes msgFadeIn {
                  0% { transform: scale(0.9); opacity: 0; }
                  100% { transform: scale(1); opacity: 1; }
                }
              `}
            </style>
          </div>
        )}
      </div>
      {/* Bootstrap icons CDN (solo una vez en tu index.html si no está) */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
    </>
  );
}

const Home = () => {
  const [lang, setLang] = useState('es');
  const formatoRef = useRef(null);
  const aboutRef = useRef(null);
  const eventoInfoRef = useRef(null);
  const extraInfoRef = useRef(null);
  const teamsRef = useRef(null);

  const scrollToFormato = () => {
    formatoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToTeams = () => {
    teamsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AnimatedBackground />
      <TopBar
        onFormatoClick={scrollToFormato}
        onInfoClick={scrollToAbout}
        onTeamsClick={scrollToTeams}
        lang={lang}
        setLang={setLang}
      />
      <Header lang={lang} />
      <MapaSection lang={lang} />
      <FormatoSection ref={formatoRef} lang={lang} />
      <AboutSection ref={aboutRef} lang={lang} />
      <ExtraInfoSection ref={extraInfoRef} lang={lang} />
      {/* SponsorSection debajo de Información adicional, en cuadro destacado, fondo sólido para legibilidad */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '0',
        marginBottom: '2.5rem'
      }}>
        <div
          className="animate__animated animate__fadeIn"
          style={{
            background: 'none', // Quita el fondo negro
            borderRadius: 28,
            boxShadow: 'none', // Quita la sombra
            padding: '2.5rem 1.5rem 2rem 1.5rem',
            maxWidth: 540,
            width: '100%',
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.3rem',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -30,
              left: -30,
              width: 120,
              height: 120,
              background: 'radial-gradient(circle, #e25822 0%, #23201a 80%)',
              opacity: 0.18,
              borderRadius: '50%',
              zIndex: 0
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -40,
              right: -40,
              width: 140,
              height: 140,
              background: 'radial-gradient(circle, #fff 0%, #e25822 80%)',
              opacity: 0.12,
              borderRadius: '50%',
              zIndex: 0
            }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              zIndex: 2,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '50%',
              padding: '0.5rem'
            }}
          >
            <img
              src={poionakologo}
              alt="Poionako Logo"
              style={{
                width: 110,
                height: 110,
                objectFit: 'contain',
                marginBottom: '0.7rem',
                boxShadow: '0 4px 24px #e2582288, 0 0 0 4px #fff2'
              }}
            />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              color: '#fff',
              fontWeight: 900,
              fontSize: '1.7rem',
              marginBottom: '0.5rem',
              letterSpacing: '1px',
              textShadow: '0 1px 4px #000a',
              background: 'linear-gradient(90deg, #e25822 60%, #fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            <span style={{ color: '#fff', fontWeight: 700, WebkitTextFillColor: 'unset' }}>{translations[lang].sponsorTitle}</span> Poionako
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: '1.18rem',
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.6,
              marginBottom: '0.7rem',
              fontWeight: 600,
              textShadow: '0 1px 8px #000a'
            }}
          >
            {translations[lang].sponsorDesc}<br />
            <span style={{ color: '#f39c12', fontWeight: 700 }}>
              {translations[lang].sponsorFollow}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '0.5rem',
              zIndex: 2
            }}
          >
            <a href="https://www.twitch.tv/poionako" target="_blank" rel="noopener noreferrer" title="Twitch Poionako"
              className="btn btn-outline-light animate__animated animate__fadeIn"
              style={{ borderRadius: '50%', padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #9147ff88', fontSize: 32 }}>
              <i className="bi bi-twitch" style={{ color: '#9147ff' }}></i>
            </a>
            <a href="https://kick.com/poionako" target="_blank" rel="noopener noreferrer" title="Kick Poionako"
              className="btn btn-outline-light animate__animated animate__fadeIn"
              style={{ borderRadius: '50%', padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #53fc1888', fontSize: 32 }}>
              {/* Logo Kick estilo bootstrap */}
              <i className="bi bi-play-circle" style={{ color: '#53fc18' }}></i>
            </a>
            <a href="https://www.youtube.com/@poionako" target="_blank" rel="noopener noreferrer" title="YouTube Poionako"
              className="btn btn-outline-light animate__animated animate__fadeIn"
              style={{ borderRadius: '50%', padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #ff000088', fontSize: 32 }}>
              <i className="bi bi-youtube" style={{ color: '#ff0000' }}></i>
            </a>
            <a href="https://twitter.com/poionako" target="_blank" rel="noopener noreferrer" title="X (Twitter) Poionako"
              className="btn btn-outline-light animate__animated animate__fadeIn"
              style={{ borderRadius: '50%', padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #fff8', fontSize: 32 }}>
              {/* Usa el logo SVG de X (Twitter) directamente */}
              <svg width="28" height="28" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1199.97 0H1079.97L600 529.97L120 0H0L492.03 627.97L0 1227H120L600 697.03L1080 1227H1200L707.97 599.03L1199.97 0Z" fill="#fff"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@poionako" target="_blank" rel="noopener noreferrer" title="TikTok Poionako"
              className="btn btn-outline-light animate__animated animate__fadeIn"
              style={{ borderRadius: '50%', padding: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #fff8', fontSize: 32 }}>
              <i className="bi bi-tiktok" style={{ color: '#fff' }}></i>
            </a>
          </motion.div>
          {/* Bootstrap icons CDN (solo una vez en tu index.html si no está) */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
          />
          {/* Animate.css CDN (solo una vez en tu index.html si no está) */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </div>
      </div>
      <EventoInfoSection ref={eventoInfoRef} lang={lang} />
      <TeamsSection ref={teamsRef} lang={lang} />
      <DiscordBanner lang={lang} />
      <Footer lang={lang} />
      <ChatbotWidget lang={lang} />
      {/* --- CSS RESPONSIVO PARA MOVIL --- */}
      <style>
        {`
          @media (max-width: 900px) {
            .header .logo-glow-container img {
              width: 180px !important;
              height: 180px !important;
            }
            .header {
              padding-top: 1.5rem !important;
            }
          }
          @media (max-width: 700px) {
            .header .logo-glow-container img {
              width: 120px !important;
              height: 120px !important;
              margin-bottom: 0.7rem !important;
            }
            .header {
              padding: 1.2rem 0 0.7rem 0 !important;
              min-height: 10vh !important;
            }
            .reveal section,
            section.reveal {
              flex-direction: column !important;
              padding: 0 0.5rem !important;
              min-height: unset !important;
              margin-top: 2rem !important;
            }
            section.reveal > div,
            .reveal section > div {
              min-width: 0 !important;
              max-width: 100vw !important;
            }
            .logo-glow-container img {
              min-width: 0 !important;
              max-width: 90vw !important;
            }
            .logo-glow-container {
              margin: 0 auto !important;
            }
            h1, h2, h3 {
              font-size: 1.3rem !important;
              margin-bottom: 1rem !important;
            }
            .evento-info-card.reveal {
              min-width: 120px !important;
              max-width: 99vw !important;
              padding: 0.7rem 0.5rem !important;
              font-size: 0.97rem !important;
            }
            .footer {
              font-size: 0.85rem !important;
              padding: 0.7rem 0.2rem !important;
            }
            .discord-banner {
              right: 4vw !important;
              top: unset !important;
              bottom: 16px !important;
              left: 4vw !important;
              width: 92vw !important;
              border-radius: 12px !important;
              padding: 0.6rem 0.7rem !important;
              font-size: 1rem !important;
            }
            .discord-banner span {
              font-size: 1rem !important;
            }
            .discord-banner img {
              width: 22px !important;
              height: 22px !important;
            }
            .nav-btn {
              font-size: 0.98rem !important;
              padding: 0.5rem 0.7rem !important;
              margin: 0 0.1rem !important;
            }
            .TopBar > div {
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
            .evento-info-card.reveal {
              min-width: 110px !important;
              max-width: 99vw !important;
              padding: 0.7rem 0.5rem !important;
              font-size: 0.93rem !important;
            }
            .reveal section,
            section.reveal {
              gap: 1rem !important;
            }
            .reveal section ul,
            section.reveal ul {
              font-size: 1rem !important;
              padding-left: 1em !important;
            }
            .reveal section p,
            section.reveal p {
              font-size: 1rem !important;
            }
            .reveal section .logo-glow-container,
            section.reveal .logo-glow-container {
              margin-bottom: 1rem !important;
            }
            .TeamsSection .reveal,
            .TeamsSection section.reveal {
              gap: 0.5rem !important;
            }
            .TeamsSection .reveal > div,
            .TeamsSection section.reveal > div {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 0.7rem !important;
            }
            .TeamsSection .reveal > div > div,
            .TeamsSection section.reveal > div > div {
              padding: 0.7rem 0.4rem !important;
              min-height: 70px !important;
              font-size: 0.93rem !important;
            }
          }
          @media (max-width: 500px) {
            .evento-info-card.reveal {
              min-width: 90px !important;
              font-size: 0.89rem !important;
              padding: 0.5rem 0.2rem !important;
            }
            .footer {
              font-size: 0.85rem !important;
            }
            .discord-banner {
              font-size: 0.95rem !important;
              padding: 0.5rem 0.5rem !important;
            }
            .TeamsSection .reveal > div,
            .TeamsSection section.reveal > div {
              grid-template-columns: 1fr !important;
              gap: 0.5rem !important;
            }
          }
        `}
      </style>
      {/* --- FIN CSS RESPONSIVO --- */}
    </>
  );
};

export default Home;

const MapaSection = React.forwardRef(({ lang }, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  // Animación: solo flotación horizontal suave, sin desaparecer
  const mapaAnim = {
    initial: { x: 0 },
    animate: {
      x: [0, 18, 0, -18, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeVariants}
      style={{
        maxWidth: 900,
        margin: '0 auto',
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        background: '#23201a',
        boxShadow: '0 8px 32px #000b',
        borderRadius: 24
      }}
    >
      <h2 style={{
        color: 'var(--rust-orange)',
        fontFamily: 'Montserrat, Impact, Arial Black, Arial, sans-serif',
        fontWeight: 900,
        fontSize: '2rem',
        marginBottom: '1rem',
        letterSpacing: '1px',
        textAlign: 'center'
      }}>
        Mapa Rustaco II
      </h2>
      <motion.img
        src={mapaRustacooo}
        alt="Mapa Rustaco Evento"
        initial="initial"
        animate="animate"
        variants={mapaAnim}
        style={{
          width: '100%',
          maxWidth: 520,
          height: 'auto',
          borderRadius: 28,
          background: 'none',
          border: '4px solid #e25822',
          marginBottom: 0,
          boxShadow: '0 8px 32px #e2582288'
        }}
      />
      {/* Mensaje de transmisión oficial debajo del mapa */}
      <div style={{
        marginTop: '1.2rem',
        background: 'rgba(34,34,34,0.97)',
        borderRadius: 18,
        padding: '1.1rem 1.2rem',
        boxShadow: '0 2px 12px #0007',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.12rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: 'center'
      }}>
        <i className="bi bi-twitch" style={{ fontSize: 28, color: '#9147ff' }}></i>
        <span>
          {translations[lang].streamNotice}&nbsp;
          <a
            href="https://www.twitch.tv/rustacoeventos"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#9147ff',
              fontWeight: 800,
              textDecoration: 'underline'
            }}
          >
            twitch.tv/rustacoeventos
          </a>
        </span>
      </div>
    </motion.section>
  );
});

// SponsorSection animado con links y logos bootstrap
const SponsorSection = () => (
  <motion.section
    className="sponsor-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeVariants}
    style={{
      maxWidth: 480,
      margin: '2.5rem auto 0 auto',
      background: 'linear-gradient(120deg, #23201a 80%, #e25822 100%)',
      borderRadius: 22,
      boxShadow: '0 8px 32px #000b',
      padding: '2.2rem 2rem 1.5rem 2rem',
      textAlign: 'center',
      fontFamily: 'Montserrat, Arial, sans-serif',
      color: '#fff',
      position: 'relative',
      border: '2px solid #e25822cc',
      zIndex: 2
    }}
  >
    <div style={{ marginBottom: '1.2rem' }}>
      <img
        src={poionakologo}
        alt="Poionako Logo"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: 120,
          borderRadius: 0,
          objectFit: 'contain',
          boxShadow: 'none',
          background: 'none',
          border: 'none',
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>
    <h3
      style={{
        fontWeight: 900,
        fontSize: '1.35rem',
        color: '#e25822',
        marginBottom: '0.7rem',
        letterSpacing: '1px',
        textShadow: '0 1px 4px #000a'
      }}
    >
      {translations[lang].sponsorTitle} <span style={{ color: '#fff', fontWeight: 700 }}>Poionako</span>
    </h3>
    <div style={{
      fontSize: '1.08rem',
      color: '#fff',
      margin: '1.2rem 0 0.7rem 0',
      textAlign: 'center',
      lineHeight: 1.5
    }}>
      <b style={{ color: '#f39c12', fontSize: '1.15rem' }}>{translations[lang].sponsorAbout || 'Sobre el streamer:'}</b><br />
      {translations[lang].sponsorDesc}<br />
      <span style={{ color: '#e25822', fontWeight: 700 }}>{translations[lang].sponsorFollow}</span>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1.2rem',
      marginTop: '1.2rem'
    }}>
      <a href="https://www.twitch.tv/poionako" target="_blank" rel="noopener noreferrer" title="Twitch Poionako">
        <i className="bi bi-twitch" style={{ fontSize: 32, color: '#9147ff' }}></i>
      </a>
      <a href="https://kick.com/poionako" target="_blank" rel="noopener noreferrer" title="Kick Poionako">
        <i className="bi bi-play-circle" style={{ fontSize: 32, color: '#53fc18' }}></i>
      </a>
      <a href="https://www.youtube.com/@poionako" target="_blank" rel="noopener noreferrer" title="YouTube Poionako">
        <i className="bi bi-youtube" style={{ fontSize: 32, color: '#ff0000' }}></i>
      </a>
      <a href="https://twitter.com/poionako" target="_blank" rel="noopener noreferrer" title="X (Twitter) Poionako">
        <i className="bi bi-twitter-x" style={{ fontSize: 32, color: '#fff' }}></i>
      </a>
      <a href="https://www.tiktok.com/@poionako" target="_blank" rel="noopener noreferrer" title="TikTok Poionako">
        <i className="bi bi-tiktok" style={{ fontSize: 32, color: '#fff' }}></i>
      </a>
    </div>
    {/* Bootstrap icons CDN (solo una vez en tu index.html si no está) */}
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
    />
  </motion.section>
);