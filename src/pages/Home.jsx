import React, { useRef, useEffect } from 'react';
import logo from '../assets/img/logorustaco.png';
import rustpmc1 from '../assets/img/rustpmc1.png';
import rustpmc2 from '../assets/img/rustpmc2.png';
import rustpmc3 from '../assets/img/rustpmc3.png';
import rustpmc4 from '../assets/img/rustpmc4.png';
import logodiscord from '../assets/img/logodiscord.png';
import '../assets/styles.css';

function useRevealOnScroll(ref, options = {}) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
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

// TopBar: logo a la izquierda y botones a la derecha del logo
const TopBar = ({ onFormatoClick, onInfoClick }) => (
  <div
    style={{
      width: '100%',
      minHeight: '80px',
      background: 'linear-gradient(90deg, #181818 60%, #e25822 120%)',
      boxShadow: '0 2px 12px #0008',
      display: 'flex',
      alignItems: 'center',
      padding: '0 4rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      gap: '2rem'
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      minWidth: 0,
      marginLeft: 0
    }}>
      <img
        src={logo}
        alt="Rustaco Logo"
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
        <button className="nav-btn" onClick={onFormatoClick}>Formato</button>
        <button className="nav-btn" onClick={onInfoClick}>Sobre Rustaco</button>
        <a href="/events" className="nav-btn">Stats</a>
      </div>
    </div>
  </div>
);

const Header = () => {
  const headerRef = useRef(null);
  useRevealOnScroll(headerRef, { threshold: 0.2 });

  return (
    <header
      ref={headerRef}
      className="header reveal"
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
      <div className="logo-glow-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
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
      </div>
    </header>
  );
};

const FormatoSection = React.forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);
  const imgRef = useRef(null);

  useRevealOnScroll(sectionRef, { threshold: 0.15 });
  useRevealOnScroll(titleRef, { threshold: 0.15 });
  useRevealOnScroll(listRef, { threshold: 0.15 });
  useRevealOnScroll(imgRef, { threshold: 0.15 });

  return (
    <section
      ref={node => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="reveal"
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
        <div ref={titleRef} className="reveal">
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
            Formato - Rustaco II
          </h2>
        </div>
        <div ref={listRef} className="reveal">
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
            <li>
              Rustaco II contará con <b>96 streamers</b> participando en el evento.
            </li>
            <li>
              12 equipos formados por 8 jugadores lucharán por el primer puesto.
            </li>
            <li>
              Cada equipo tendrá su propia isla donde podrán construir y equiparse estratégicamente para el enfrentamiento final.
            </li>
          </ul>
        </div>
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
        <div ref={imgRef} className="logo-glow-container reveal">
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
    </section>
  );
});

const AboutSection = React.forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useRevealOnScroll(sectionRef, { threshold: 0.15 });
  useRevealOnScroll(titleRef, { threshold: 0.15 });
  useRevealOnScroll(textRef, { threshold: 0.15 });
  useRevealOnScroll(imgRef, { threshold: 0.15 });

  return (
    <section
      ref={node => {
        sectionRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className="reveal"
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
        <div ref={imgRef} className="logo-glow-container reveal">
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
        <div ref={titleRef} className="reveal">
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
            Sobre Rustaco
          </h2>
        </div>
        <div ref={textRef} className="reveal">
          <p style={{
            color: '#f5f5f5',
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontWeight: 500,
            fontSize: '1.5rem',
            margin: 0,
            maxWidth: 700,
            textAlign: 'left'
          }}>
            Rustaco fue formado por un grupo de amigos con experiencia brutal en Rust, que han decidido crear torneos y eventos competitivos para la comunidad LATAM.
          </p>
        </div>
      </div>
    </section>
  );
});

const ExtraInfoSection = React.forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="reveal"
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
        Información adicional
      </h3>
      <p style={{
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '1.2rem',
        textAlign: 'center',
        margin: 0,
        maxWidth: 700
      }}>
        Pronto anunciaremos más detalles sobre premios, invitados especiales y sorpresas para la comunidad. ¡Mantente atento a nuestras redes sociales!
      </p>
    </section>
  );
});

// Banner flotante Discord (mejor visual y funcional)
const DiscordBanner = () => (
  <a
    href="https://discord.gg/rustaco"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'fixed',
      top: 90, // Justo debajo de la TopBar
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
      <span>Únete a nuestro Discord</span>
      <span style={{
        fontWeight: 500,
        fontSize: '0.97rem',
        color: '#b3cfff',
        marginTop: 2,
        textDecoration: 'underline',
        cursor: 'pointer'
      }}>
        Haz click aquí para entrar al servidor
      </span>
    </span>
  </a>
);

// Equipos participantes (Team 1 a Team 12, todos "A confirmar", sin fondo)
const TeamsSection = React.forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  useRevealOnScroll(sectionRef, { threshold: 0.15 });

  // Teams array
  const teams = [
    { name: 'Team 1', status: 'A confirmar' },
    { name: 'Team 2', status: 'A confirmar' },
    { name: 'Team 3', status: 'A confirmar' },
    { name: 'Team 4', status: 'A confirmar' },
    { name: 'Team 5', status: 'A confirmar' },
    { name: 'Team 6', status: 'A confirmar' },
    { name: 'Team 7', status: 'A confirmar' },
    { name: 'Team 8', status: 'A confirmar' },
    { name: 'Team 9', status: 'A confirmar' },
    { name: 'Team 10', status: 'A confirmar' },
    { name: 'Team 11', status: 'A confirmar' },
    { name: 'Team 12', status: 'A confirmar' },
  ];

  return (
    <section
      ref={sectionRef}
      className="reveal"
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
        Equipos participantes
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.7rem',
          width: '100%',
          marginTop: '1.2rem'
        }}
      >
        {teams.map((team, idx) => (
          <div
            key={team.name}
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
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 6px 24px #7289da88, 0 0 0 1.5px #7289da';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 12px #000a, 0 0 0 1.5px #7289da88';
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
    </section>
  );
});

// ...resto de componentes (EventoInfoSection, Footer, Home) igual...
const EventoInfoSection = React.forwardRef((props, ref) => {
  // ...sin cambios...
  // (mantén tu código actual aquí)
});

const Footer = () => (
  <footer className="footer">
    &copy; {new Date().getFullYear()} Rustaco Eventos &mdash; Inspirado en Rust. Todos los derechos reservados.
  </footer>
);

const Home = () => {
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

  return (
    <>
      <TopBar onFormatoClick={scrollToFormato} onInfoClick={scrollToAbout} />
      <Header />
      <FormatoSection ref={formatoRef} />
      <AboutSection ref={aboutRef} />
      <ExtraInfoSection ref={extraInfoRef} />
      <EventoInfoSection ref={eventoInfoRef} />
      <TeamsSection ref={teamsRef} />
      <DiscordBanner />
      <Footer />
    </>
  );
};

export default Home;