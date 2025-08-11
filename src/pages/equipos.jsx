import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fondo from "../assets/img/fondo.jpg";
import cantosogangLogo from "../assets/img/cantosogang.webp";
import juninLogo from "../assets/img/juninlogo.png";
import salomonLogo from "../assets/img/salomonlogo.png";
import mcompanyvLogo from "../assets/img/mcompanyvlogo.png";
import aaaaLogo from "../assets/img/AAAA.png";

// Animación de fade-in
const fadeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.39, 0.575, 0.565, 1] } }
};

const cantosoChannels = [
  { url: "https://www.twitch.tv/lukasito", name: "Lukasito" },
  { url: "https://www.twitch.tv/adriidr", name: "Adriidr" },
  { url: "https://www.twitch.tv/02tez", name: "02tez" },
  { url: "https://www.twitch.tv/murloc_cg", name: "Murloc_cg" },
  { url: "https://www.twitch.tv/nadiahq", name: "Nadiahq" },
  { url: "https://www.twitch.tv/edinz_", name: "Edinz_" },
  { url: "https://www.twitch.tv/v2unstoppable", name: "V2Unstoppable" },
  { url: "https://kick.com/poionako", name: "Poionako" }
];

const team2Channels = [
  { url: "https://www.twitch.tv/junin", name: "Junin" },
  { url: "https://www.twitch.tv/toddynho", name: "Toddynho" },
  { url: "https://www.twitch.tv/r3crutatv", name: "R3crutatv" },
  { url: "https://www.twitch.tv/dubomtv", name: "Dubomtv" },
  { url: "https://www.twitch.tv/andrerossi", name: "Andrerossi" },
  { url: "https://www.twitch.tv/mtx1__", name: "Mtx1__" },
  { url: "https://www.twitch.tv/rubyhub", name: "Rubyhub" },
  { url: "https://www.twitch.tv/sh0cker", name: "Sh0cker" }
];

const teamLagtamChannels = [
  { url: "https://www.twitch.tv/salomonl96_", name: "salomonl96_", tipo: "twitch" },
  { url: "https://www.twitch.tv/morganelia", name: "morganelia", tipo: "twitch" },
  { url: "https://www.twitch.tv/yopickeosola", name: "yopickeosola", tipo: "twitch" },
  { url: "https://www.twitch.tv/eldestinydbl", name: "eldestinydbl", tipo: "twitch" },
  { url: "https://www.twitch.tv/noscopeaim", name: "noscopeaim", tipo: "twitch" },
  { url: "https://www.twitch.tv/wavesxs0314", name: "wavesxs0314", tipo: "twitch" },
  { url: "https://www.twitch.tv/notcarlitoxcr", name: "notcarlitoxcr", tipo: "twitch" },
  { url: "https://www.twitch.tv/vacnekopp", name: "vacnekopp", tipo: "twitch" }
];

const teamMCVChannels = [
  { url: "https://www.twitch.tv/mcompanyv", name: "mcompanyv", tipo: "twitch" },
  { url: "https://www.twitch.tv/renepilon", name: "renepilon", tipo: "twitch" },
  { url: "https://www.twitch.tv/mk33l", name: "mk33l", tipo: "twitch" },
  { url: "https://www.twitch.tv/joe100val", name: "joe100val", tipo: "twitch" },
  { url: "https://www.twitch.tv/naviix19", name: "naviix19", tipo: "twitch" },
  { url: "https://www.twitch.tv/crazita", name: "crazita", tipo: "twitch" },
  { url: "https://www.twitch.tv/fuegales", name: "fuegales", tipo: "twitch" },
  { url: "https://www.twitch.tv/tilteada", name: "tilteada", tipo: "twitch" }
];

const teamAAAAChannels = [
  { url: "https://kick.com/04-mauri", name: "04-mauri", tipo: "kick" },
  { url: "https://www.twitch.tv/lichaafps", name: "lichaafps", tipo: "twitch" },
  { url: "https://kick.com/1matuh", name: "1matuh", tipo: "kick" },
  { url: "https://kick.com/papats", name: "papats", tipo: "kick" },
  { url: "https://www.twitch.tv/nbfacu", name: "nbfacu", tipo: "twitch" },
  { url: "https://www.twitch.tv/tinigoo", name: "tinigoo", tipo: "twitch" },
  { url: "https://www.twitch.tv/elchuecoo19", name: "elchuecoo19", tipo: "twitch" },
  { url: "https://www.twitch.tv/zisaac18", name: "zisaac18", tipo: "twitch" }
];

const teams = [
  {
    name: "Team cG",
    logo: cantosogangLogo,
    channels: cantosoChannels
  },
  {
    name: "Team Junin",
    logo: juninLogo,
    channels: team2Channels
  },
  {
    name: "Team Lagtam",
    logo: salomonLogo,
    channels: teamLagtamChannels
  },
  {
    name: "Team MCV",
    logo: mcompanyvLogo,
    channels: teamMCVChannels
  },
  {
    name: "Team AAAA",
    logo: aaaaLogo,
    channels: teamAAAAChannels
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    name: `Team ${i + 5}`
  }))
];

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

const TeamCard = ({ team, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: idx * 0.08 }}
    style={{
      background: team.channels
        ? `linear-gradient(135deg, #23201a 70%, ${idx === 0 ? "#e25822" : "#9147ff"} 100%)`
        : "linear-gradient(135deg, #23201a 70%, #3a4bd8 100%)",
      borderRadius: "22px",
      boxShadow: team.channels
        ? `0 4px 24px ${idx === 0 ? "#e25822cc" : "#9147ffcc"}, 0 0 0 3px #fff2`
        : "0 2px 12px #000a, 0 0 0 1.5px #7289da88",
      padding: "2.2rem 1.2rem",
      minHeight: 260,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between", // Cambia a space-between para alinear todo igual
      border: "none",
      fontFamily: "Montserrat, Arial, sans-serif",
      fontWeight: 700,
      fontSize: "1.18rem",
      color: "#fff",
      letterSpacing: "1px",
      position: "relative",
      overflow: "visible"
    }}
  >
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      {team.logo && (
        <div style={{
          borderRadius: "50%",
          width: 90,
          height: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
          boxShadow: "none",
          background: "none"
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
      <span style={{
        fontSize: "1.35rem",
        color: "#fff",
        fontWeight: 900,
        textShadow: "1px 1px 12px #23272a",
        marginBottom: team.channels ? 8 : 0,
        letterSpacing: "1.5px",
        textAlign: "center"
      }}>
        {team.name}
      </span>
    </div>
    {team.channels && (
      <div style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8
      }}>
        <span style={{
          color: "#f39c12",
          fontWeight: 700,
          fontSize: "1.09rem",
          marginBottom: 2,
          letterSpacing: "1px",
          textAlign: "center"
        }}>
          Canales de transmisión
        </span>
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
      </div>
    )}
  </motion.div>
);

const Equipos = () => (
  <div style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
    <AnimatedBackground />
    {/* Botón volver al inicio */}
    <div style={{
      position: "fixed",
      top: 32,
      right: 40,
      zIndex: 10
    }}>
      <Link to="/" style={{
        background: "linear-gradient(90deg, #27ae60 60%, #e25822 100%)",
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.08rem",
        padding: "0.7rem 1.7rem",
        border: "none",
        borderRadius: 12,
        boxShadow: "0 2px 8px #0007",
        cursor: "pointer",
        letterSpacing: "1px",
        textDecoration: "none",
        transition: "background 0.2s, transform 0.2s"
      }}>
        <span style={{ marginRight: 8, fontSize: 18 }}>🏠</span>
        Volver al inicio
      </Link>
    </div>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeVariants}
      style={{
        padding: "3rem 0 2rem 0",
        position: "relative",
        zIndex: 3,
        maxWidth: 1200,
        margin: "0 auto"
      }}
    >
      <h1 style={{
        color: "#fff",
        fontWeight: 900,
        fontSize: "2.5rem",
        letterSpacing: "2px",
        textAlign: "center",
        marginBottom: "2.5rem",
        textShadow: "2px 2px 12px #000b"
      }}>
        <span style={{
          background: "linear-gradient(90deg, #e25822 60%, #fff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Equipos del Torneo
        </span>
      </h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2.2rem",
          maxWidth: 1100,
          margin: "0 auto"
        }}
      >
        {teams.map((team, idx) => (
          <TeamCard team={team} idx={idx} key={team.name + idx} />
        ))}
      </motion.div>
    </motion.div>
    {/* --- CSS RESPONSIVO --- */}
    <style>
      {`
        @media (max-width: 900px) {
          h1 {
            font-size: 1.5rem !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.2rem !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 0.7rem !important;
          }
          .equipos-card {
            padding: 1.1rem 0.5rem !important;
            font-size: 0.97rem !important;
          }
        }
      `}
    </style>
    {/* --- FIN CSS RESPONSIVO --- */}
  </div>
);

export default Equipos;

