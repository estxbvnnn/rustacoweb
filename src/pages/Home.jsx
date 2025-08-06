import React, { useRef, useEffect, useState } from 'react';
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
import { motion } from 'framer-motion';

// Importa el fondo
import fondo from '../assets/img/fondo.jpg';

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
    formato1: 'Rustaco II contará con <b>112 jugadores</b> participando en el evento.',
    formato2: '14 equipos formados por 8 jugadores lucharán por el primer puesto.',
    formato3: 'Cada equipo tendrá su propia isla donde podrán construir y equiparse estratégicamente para el enfrentamiento final.',
    sobreTitulo: 'Sobre Rustaco',
    sobreTexto: 'Rustaco fue formado por un grupo de amigos con experiencia brutal en Rust, que han decidido crear torneos y eventos competitivos para la comunidad LATAM.',
    eventoTitulo: 'Rustaco II',
    equiposParticipantes: 'Equipos participantes',
    equiposTexto: 'Los equipos participantes serán anunciados próximamente. Por ahora, todos los equipos están a confirmar.',
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
    inscripcionesFechas: 'del 6 de Agosto 15:00 GMT-4 hasta el 10 de Septiembre 16:00 GMT-4',
    inscripcionesMsg: '¡No te quedes fuera! Inscribe tu equipo y participa en Rustaco II.',
  },
  en: {
    formato: 'Format',
    sobre: 'About Rustaco',
    equipos: 'Teams',
    stats: 'Stats',
    infoAdicional: 'Additional Information',
    infoAdicionalTexto: 'We will soon announce more details about prizes, special guests, and surprises for the community. Stay tuned to our social networks!',
    formatoTitulo: 'Format - Rustaco II',
    formato1: 'Rustaco II will feature <b>112 players</b> participating in the event.',
    formato2: '14 teams of 8 players will compete for first place.',
    formato3: 'Each team will have its own island to build and prepare strategically for the final showdown.',
    sobreTitulo: 'About Rustaco',
    sobreTexto: 'Rustaco was formed by a group of friends with brutal Rust experience, who decided to create tournaments and competitive events for the LATAM community.',
    eventoTitulo: 'Rustaco II',
    equiposParticipantes: 'Participating Teams',
    equiposTexto: 'Participating teams will be announced soon. For now, all teams are to be confirmed.',
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
    inscripcionesFechas: 'from August 6th 15:00 GMT-4 to September 10th 16:00 GMT-4',
    inscripcionesMsg: "Don't miss out! Register your team and participate in Rustaco II.",
  },
  pt: {
    formato: 'Formato',
    sobre: 'Sobre o Rustaco',
    equipos: 'Equipes',
    stats: 'Estatísticas',
    infoAdicional: 'Informações adicionais',
    infoAdicionalTexto: 'Em breve anunciaremos mais detalhes sobre prêmios, convidados especiais e surpresas para a comunidade. Fique ligado em nossas redes sociais!',
    formatoTitulo: 'Formato - Rustaco II',
    formato1: 'O Rustaco II contará com <b>112 jogadores</b> participando do evento.',
    formato2: '14 equipes formadas por 8 jogadores disputarão o primeiro lugar.',
    formato3: 'Cada equipe terá sua própria ilha para construir e se equipar estrategicamente para o confronto final.',
    sobreTitulo: 'Sobre o Rustaco',
    sobreTexto: 'O Rustaco foi formado por um grupo de amigos com grande experiência em Rust, que decidiram criar torneios e eventos competitivos para a comunidade LATAM.',
    eventoTitulo: 'Rustaco II',
    equiposParticipantes: 'Equipes participantes',
    equiposTexto: 'As equipes participantes serão anunciadas em breve. Por enquanto, todas as equipes estão a confirmar.',
    equipo: 'Equipe',
    aConfirmar: 'A confirmar',
    discord1: 'Entre no nosso Discord',
    discord2: 'Clique aqui para entrar no servidor',
    footer: 'Rustaco Eventos — Inspirado em Rust. Todos os direitos reservados.',
    equiposLabel: 'Equipes',
    equiposDesc: 'Total de equipes participantes no evento.',
    jugadoresEquipo: 'Jogadores por equipe',
    jugadoresEquipoDesc: 'Cada equipe será composta por 8 jogadores.',
    jugadores: 'Jogadores',
    jugadoresDesc: 'Participantes confirmados para o Rustaco 2.',
    hora: 'Hora',
    horaDesc: 'Horário de início do evento (horário do Chile).',
    modo: 'Modo',
    modoDesc: 'O evento será realizado em formato competitivo.',
    verReglas: 'Ver Regras',
    fecha: 'Datas',
    fechaDesc: 'Datas do evento Rustaco II.',
    inscripcionesBtn: 'Inscrições abertas AGORA!',
    inscripcionesFechas: 'de 6 de agosto 15:00 GMT-4 até 10 de setembro 16:00 GMT-4',
    inscripcionesMsg: 'Não fique de fora! Inscreva sua equipe e participe do Rustaco II.',
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

// Modifica el logo y los botones en TopBar para usar motion
const TopBar = ({ onFormatoClick, onInfoClick, onTeamsClick, lang, setLang }) => (
  <div
    style={{
      width: '100%',
      minHeight: '80px',
      background: 'linear-gradient(90deg, #181818 60%, #e25822 120%)',
      boxShadow: '0 2px 12px #0008',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
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
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        minWidth: 0,
      }}>
        <motion.img
          src={logo}
          alt="Rustaco Logo"
          variants={logoAnim}
          initial="initial"
          animate="animate"
          style={{
            borderRadius: '50%',
            width: 64,
            height: 64,
            objectFit: 'cover',
            boxShadow: '0 1px 12px #0007',
          }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginLeft: '2rem'
        }}>
          <motion.button className="nav-btn" onClick={onFormatoClick} variants={btnAnim} initial="initial" animate="animate">
            {translations[lang].formato}
          </motion.button>
          <motion.button className="nav-btn" onClick={onInfoClick} variants={btnAnim} initial="initial" animate="animate">
            {translations[lang].sobre}
          </motion.button>
          <motion.button className="nav-btn" onClick={onTeamsClick} variants={btnAnim} initial="initial" animate="animate">
            {translations[lang].equipos}
          </motion.button>
          <motion.a href="/events" className="nav-btn" variants={btnAnim} initial="initial" animate="animate">
            {translations[lang].stats}
          </motion.a>
          <motion.div style={{ display: 'inline-block' }} variants={btnAnim} initial="initial" animate="animate">
            <Link to="/reglas" className="nav-btn">
              {translations[lang].verReglas}
            </Link>
          </motion.div>
          <motion.div style={{ display: 'inline-block' }} variants={btnAnim} initial="initial" animate="animate">
            <LoginSteam />
          </motion.div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {/* ...selector de idioma... */}
        <motion.button
          onClick={() => setLang('es')}
          variants={btnAnim}
          initial="initial"
          animate="animate"
          style={{
            background: lang === 'es' ? '#e25822' : '#23201a',
            border: 'none',
            borderRadius: 6,
            padding: 2,
            cursor: 'pointer',
            marginRight: 2,
            boxShadow: lang === 'es' ? '0 0 0 2px #e25822' : 'none',
            transition: 'box-shadow 0.2s'
          }}
          title="Español LATAM"
        >
          <img src={flagChile} alt="Chile" style={{ width: 26, height: 18, verticalAlign: 'middle', display: 'block' }} />
        </motion.button>
        <motion.button
          onClick={() => setLang('en')}
          variants={btnAnim}
          initial="initial"
          animate="animate"
          style={{
            background: lang === 'en' ? '#3a4bd8' : '#23201a',
            border: 'none',
            borderRadius: 6,
            padding: 2,
            cursor: 'pointer',
            marginRight: 2,
            boxShadow: lang === 'en' ? '0 0 0 2px #3a4bd8' : 'none',
            transition: 'box-shadow 0.2s'
          }}
          title="English USA"
        >
          <img src={flagUSA} alt="USA" style={{ width: 26, height: 18, verticalAlign: 'middle', display: 'block' }} />
        </motion.button>
        <motion.button
          onClick={() => setLang('pt')}
          variants={btnAnim}
          initial="initial"
          animate="animate"
          style={{
            background: lang === 'pt' ? '#27ae60' : '#23201a',
            border: 'none',
            borderRadius: 6,
            padding: 2,
            cursor: 'pointer',
            boxShadow: lang === 'pt' ? '0 0 0 2px #27ae60' : 'none',
            transition: 'box-shadow 0.2s'
          }}
          title="Português Brasil"
        >
          <img src={flagBrazil} alt="Brasil" style={{ width: 26, height: 18, verticalAlign: 'middle', display: 'block' }} />
        </motion.button>
      </div>
    </div>
  </div>
);

// Botón profesional de Login Steam SOLO en la TopBar
const ADMIN_STEAM_IDS = [
  '76561198416933402',
  '76561198067186042',
  '76561199220103836',
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

const InscripcionBanner = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [lang, setLang] = useState('es'); // Añade el estado de idioma aquí si no lo tienes

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

  // Usa el idioma del Home si lo tienes, si no, usa el estado local
  const currentLang = typeof window !== 'undefined' && window.__LANG ? window.__LANG : lang;

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
        title={translations[currentLang].inscripcionesBtn}
      >
        {translations[currentLang].inscripcionesBtn}<br />
        <span style={{ fontWeight: 700, fontSize: '1.08rem', color: '#b3cfff' }}>
          {translations[currentLang].inscripcionesFechas}
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
        {translations[currentLang].inscripcionesMsg}
      </span>
      {/* ...el resto del modal y mensaje se puede dejar oculto o eliminar si no se usa */}
    </motion.div>
  );
};

const fadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.39, 0.575, 0.565, 1] } }
};

// Reemplaza los principales bloques por motion.div/motion.section/motion.header
const Header = () => {
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
        justifyContent: 'center'
      }}
    >
      <motion.div
        className="logo-glow-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src={logo}
          alt="Rustaco Logo"
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 2px 18px #000a',
            margin: '0 auto',
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 2
          }}
        />
        <div className="logo-glow-bg"></div>
      </motion.div>
      <InscripcionBanner />
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
        background: 'rgba(24,24,24,0.93)',
        borderRadius: '24px',
        boxShadow: '0 4px 32px #000a',
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
      value: '14',
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
      value: lang === 'es' ? '112' : '112',
      icon: '🎮',
      description: translations[lang].jugadoresDesc
    },
    {
      label: translations[lang].hora,
      value: '17:00 (GMT-4)',
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
        background: 'rgba(24,24,24,0.97)',
        borderRadius: '28px',
        boxShadow: '0 6px 32px #000b',
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
              boxShadow: '0 2px 12px #000a',
              background: '#23201a',
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
              background: 'linear-gradient(135deg, #23201a 70%, #e2582222 100%)',
              borderRadius: '16px',
              boxShadow: '0 2px 12px #000a, 0 0 0 1.5px #e25822cc',
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

  useEffect(() => {
    if (ref) ref.current = sectionRef.current;
  }, [ref]);

  const teams = Array.from({ length: 14 }, (_, i) => ({
    name: `${translations[lang].equipo} ${i + 1}`,
    status: translations[lang].aConfirmar
  }));

  const firstRow = teams.slice(0, 7);
  const secondRow = teams.slice(7, 14);

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
          gridTemplateColumns: 'repeat(7, 1fr)',
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
              background: 'linear-gradient(135deg, #23201a 70%, #3a4bd8 100%)',
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
              overflow: 'hidden'
            }}
          >
            <span style={{
              fontSize: '1.3rem',
              color: '#b3cfff',
              fontWeight: 900,
              textShadow: '1px 1px 8px #23272a'
            }}>
              {team.name}
            </span>
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
          </div>
        ))}
      </div>
      {/* Segunda fila */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1.7rem',
          width: '100%',
          marginTop: '1.2rem'
        }}
      >
        {secondRow.map((team, idx) => (
          <div
            key={team.name + '-' + (idx + 7)}
            className="reveal"
            style={{
              background: 'linear-gradient(135deg, #23201a 70%, #3a4bd8 100%)',
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
              overflow: 'hidden'
            }}
          >
            <span style={{
              fontSize: '1.3rem',
              color: '#b3cfff',
              fontWeight: 900,
              textShadow: '1px 1px 8px #23272a'
            }}>
              {team.name}
            </span>
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
          </div>
        ))}
      </div>
    </motion.section>
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

// Home component
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
      <Header />
      {/* Ya no muestres <LoginSteam /> aquí */}
      <MapaSection />
      <FormatoSection ref={formatoRef} lang={lang} />
      <AboutSection ref={aboutRef} lang={lang} />
      <ExtraInfoSection ref={extraInfoRef} lang={lang} />
      <SponsorSection /> 
      <EventoInfoSection ref={eventoInfoRef} lang={lang} />
      <TeamsSection ref={teamsRef} lang={lang} />
      <DiscordBanner lang={lang} />
      <Footer lang={lang} />
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
              font-size: 0.95rem !important;
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

const MapaSection = React.forwardRef((props, ref) => {
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
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
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
      </h2>
      <img
        src={mapaRustacooo}
        alt=""
        style={{
          width: '100%',
          maxWidth: 520,
          height: 'auto',
          borderRadius: 18,
          boxShadow: '0 4px 24px #000a',
          background: '#181818'
        }}
      />
    </motion.section>
  );
});

// SponsorSection animado
const SponsorSection = () => (
  <motion.section
    className="sponsor-section"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeVariants}
    style={{
      maxWidth: 440,
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
        textShadow: '0 1px 8px #000a'
      }}
    >
      Evento sponsored by <span style={{ color: '#fff', fontWeight: 700 }}>Poionako</span>
    </h3>
    {/* ...existing code for sponsor links... */}
  </motion.section>
);