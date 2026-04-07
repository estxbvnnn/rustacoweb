import React from "react";
import { Link } from "react-router-dom";
import "../assets/home-dark.css";

import lootroomTextLogo from "../assets/img/lootroomlogo.png";
import rustypotTextLogo from "../assets/img/rustypotlogo.png";
import syvarLogo from "../assets/img/syvarlogo.png";
import tchubiLogo from "../assets/img/tchubilogo.webp";
import deowasdLogo from "../assets/img/deologo.webp";
import poionakoLogo from "../assets/img/poionakologo.png";

const getAvatarFromPlatform = (platform, username) => {
  const safeUser = String(username || "").trim().toLowerCase();
  if (!safeUser) return "";
  return `https://unavatar.io/${platform}/${safeUser}`;
};

export default function Equipos() {
  React.useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => document.body.classList.remove("has-video-bg");
  }, []);

  const teams = [
    {
      name: "CaptainMyko Team",
      captain: "captainmyko",
      platform: "twitch",
      url: "https://www.twitch.tv/captainmyko",
    },
    {
      name: "Alexdieci Team",
      captain: "alexdieci",
      platform: "twitch",
      url: "https://www.twitch.tv/alexdieci",
    },
    {
      name: "SalomonL96 Team",
      captain: "salomonl96_",
      platform: "twitch",
      url: "https://www.twitch.tv/salomonl96_",
    },
    {
      name: "Wideok Team",
      captain: "wideok",
      platform: "twitch",
      url: "https://www.twitch.tv/wideok",
    },
    {
      name: "Trytum Team",
      captain: "trytum",
      platform: "twitch",
      url: "https://www.twitch.tv/trytum",
    },
    {
      name: "Tchubi Team",
      captain: "tchubi",
      platform: "kick",
      url: "https://kick.com/tchubi",
      image: tchubiLogo,
    },
    {
      name: "Poionako Team",
      captain: "poionako",
      platform: "kick",
      url: "https://kick.com/poionako",
      image: poionakoLogo,
    },
    {
      name: "Lukasito Team",
      captain: "lukasito",
      platform: "twitch",
      url: "https://www.twitch.tv/lukasito",
    },
    {
      name: "Babayaga Team",
      captain: "babayaga__0",
      platform: "twitch",
      url: "https://www.twitch.tv/babayaga__0",
    },
    {
      name: "Deowasd Team",
      captain: "deowasd",
      platform: "kick",
      url: "https://kick.com/deowasd",
      image: deowasdLogo,
    },
  ].map((team) => ({
    ...team,
    image: team.image || getAvatarFromPlatform(team.platform, team.captain),
  }));

  const [selectedTeam, setSelectedTeam] = React.useState(null);

  return (
    <div className="home-dark has-video-bg page-with-topbar">
      <header className="TopBar">
        <nav className="TopBar-links" aria-label="Navigation">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/reglas" className="nav-btn">Rules</Link>
          <Link to="/equipos" className="nav-btn">Teams</Link>
        </nav>
      </header>

      <main className="teams-page">
        <h1 className="reglas-title">Teams</h1>

        <div className="teams-grid">
          {teams.map((team, idx) => (
            <button
              key={`${team.name}-${idx}`}
              className="team-card"
              type="button"
              onClick={() => setSelectedTeam(team)}
            >
              {team.image ? (
                <img
                  className="team-logo"
                  src={team.image}
                  alt={team.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.querySelector(".team-logo--placeholder");
                    if (fallback) fallback.style.display = "block";
                  }}
                />
              ) : (
                <div className="team-logo team-logo--placeholder" aria-hidden />
              )}
              <div className="team-logo team-logo--placeholder" aria-hidden style={{ display: "none" }} />
              <div className="team-name">{team.name}</div>
            </button>
          ))}
        </div>
      </main>

      {selectedTeam && (
        <div className="team-modal-overlay" onClick={() => setSelectedTeam(null)} role="presentation">
          <div className="team-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="team-modal-header">
              <span>{selectedTeam.name}</span>
              <button className="team-modal-close" onClick={() => setSelectedTeam(null)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="team-modal-body">
              Captain: {selectedTeam.captain}
              <br />
              <a href={selectedTeam.url} target="_blank" rel="noopener noreferrer">
                {selectedTeam.url}
              </a>
            </div>
          </div>
        </div>
      )}

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
        </div>
      </footer>
    </div>
  );
}
