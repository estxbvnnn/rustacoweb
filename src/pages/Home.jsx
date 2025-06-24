import React from 'react';
import logo from '../assets/img/logorustaco.png';
import '../assets/styles.css';

// Navbar ultra delgada, logo grande y sobresaliente hacia abajo, todo bien alineado
const Navbar = () => (
  <nav
    className="navbar navbar-centered navbar-thin"
    style={{
      position: 'relative',
      minHeight: '32px',
      padding: 0,
      background: 'linear-gradient(90deg, #23201a 80%, #e25822 100%)',
      borderBottom: '2px solid var(--rust-orange)',
      boxShadow: 'var(--rust-shadow)',
      zIndex: 2,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        gap: '2.5rem',
        position: 'relative',
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
      }}
    >
      <a href="/" className="nav-btn">Inicio</a>
      <a href="/events" className="nav-btn">Stats</a>
      <span className="logo-navbar-wrapper">
        <img
          src={logo}
          alt="Rustaco Logo"
          className="logo-animated logo-navbar-overlap"
          height={120}
          width={120}
        />
      </span>
      <a href="/about" className="nav-btn">Nosotros</a>
      <a href="/contact" className="nav-btn">Contacto</a>
    </div>
  </nav>
);

const Header = () => (
  <header className="header" style={{ marginTop: '6.5rem', padding: '0.7rem 0 0.3rem 0' }}>
    <h1 style={{
      fontSize: '2rem',
      color: 'var(--rust-orange)',
      letterSpacing: '2px',
      marginBottom: '0.3rem',
      textShadow: '2px 2px 8px #000a',
      fontWeight: 900,
    }}>
      Bienvenido a Rustaco Eventos
    </h1>
    <p style={{ color: 'var(--rust-accent)', fontSize: '1.1rem', margin: 0 }}>
      Organización profesional de torneos y eventos en el mundo de Rust.
    </p>
  </header>
);

const Footer = () => (
  <footer className="footer">
    &copy; {new Date().getFullYear()} Rustaco Eventos &mdash; Inspirado en Rust. Todos los derechos reservados.
  </footer>
);

const Home = () => (
  <>
    <Navbar />
    <Header />
    {/* Sin flex:1, solo deja el main vacío o elimina si no lo usas */}
    <Footer />
  </>
);

export default Home;