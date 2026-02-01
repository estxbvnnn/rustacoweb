import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css";
import "../assets/home-dark.css";

import logoNuevo from "../assets/img/logonuevo.png";
import lootroomTextLogo from "../assets/img/lootroomlogo.png";
import syvarLogo from "../assets/img/syvarlogo.png";
import rustypotTextLogo from "../assets/img/rustypotlogo.png";
import prizepoolImg from "../assets/img/prizepool.png";

const sponsorLogos = [
  { src: lootroomTextLogo, alt: "Lootroom", width: 170 },
  { src: rustypotTextLogo, alt: "Rustypot", width: 150 },
  { src: syvarLogo, alt: "Syvar", width: 150 },
];

export default function Home() {
  const [showStatsNotice, setShowStatsNotice] = React.useState(false);

  React.useEffect(() => {
    if (!showStatsNotice) return;
    const t = setTimeout(() => setShowStatsNotice(false), 3500);
    return () => clearTimeout(t);
  }, [showStatsNotice]);

  React.useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => document.body.classList.remove("has-video-bg");
  }, []);

  return (
    <div className="home-dark has-video-bg">
      <header className="TopBar TopBar--home">
        <nav className="TopBar-links TopBar-links--left" aria-label="Navegación">
          <Link to="/reglas" className="nav-btn">Rules</Link>
          <Link to="/equipos" className="nav-btn">Teams</Link>
          <button
            type="button"
            className="nav-btn"
            onClick={() => setShowStatsNotice(true)}
          >
            Stats
          </button>
        </nav>
      </header>

      {showStatsNotice && (
        <div
          className="stats-alert"
          role="alert"
          onClick={() => setShowStatsNotice(false)}
        >
          Player stats will be available on event day
        </div>
      )}

      <main className="home-hero">
        <img className="home-hero-logo" src={logoNuevo} alt="Rustaco" />
        <div
          style={{
            marginTop: "0.4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "0.6rem 1.6rem",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78), rgba(226,88,34,0.42))",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.8)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                textTransform: "uppercase",
                fontSize: "0.78rem",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.88)",
                fontWeight: 800,
              }}
            >
              Rustaco III
            </span>
            <span
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "1.15rem",
                letterSpacing: "1px",
                textShadow: "0 2px 10px #000",
              }}
            >
              March 12 to March 15
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: "0.9rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "0.5rem 1.2rem",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78), rgba(114,137,218,0.32))",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 10px 28px rgba(0,0,0,0.8)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img
              src={prizepoolImg}
              alt="Prize Pool"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
            <span
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.98rem",
                letterSpacing: "0.5px",
                textShadow: "0 2px 10px #000",
              }}
            >
              $1K Dollars to the winner + Lootroom prizes
            </span>
          </div>
        </div>
      </main>

      <footer
        style={{
          position: "relative",
          zIndex: 20,
          padding: "0.9rem 1.5rem 1.6rem",
          color: "#b3cfff",
          fontSize: "0.95rem",
          marginTop: "auto",
          background:
            "linear-gradient(90deg, rgba(8,8,10,0.78), rgba(226,88,34,0.18), rgba(114,137,218,0.12))",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 -10px 34px rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: "0.6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontWeight: 600 }}>© Derechos reservados Rustaco Events</div>

          <a
            href="https://discord.rustaco.site"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.45rem 1.3rem",
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #5865f2 0%, #3a4bd8 60%, #23201a 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(0,0,0,0.7)",
            }}
          >
            Discord
          </a>
        </div>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img
            src={syvarLogo}
            alt="Syvar"
            style={{
              width: 140,
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
          <a
            href="https://lootroom.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={lootroomTextLogo}
              alt="Lootroom"
              style={{
                width: 160,
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </a>

          <a
            href="https://rustypot.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={rustypotTextLogo}
              alt="Rustypot"
              style={{
                width: 130,
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}