import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fondo from "../assets/img/fondo.jpg";
import cantosogangLogo from "../assets/img/cantosogang.webp";
import juninLogo from "../assets/img/juninlogo.png";
import salomonLogo from "../assets/img/salomonlogo.png";
import mcompanyvLogo from "../assets/img/mcompanyvlogo.png";
import aaaaLogo from "../assets/img/AAAA.png";
import teamOTLogo from "../assets/img/teamlogoot.webp";
import losmuchachoslogo from "../assets/img/losmuchachoslogo.webp";

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
  { url: "https://www.twitch.tv/playbackkr", name: "playbackkr" },
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
  { url: "https://www.twitch.tv/1stompz", name: "1stompz", tipo: "twitch" },
  { url: "https://www.twitch.tv/elchuecoo19", name: "elchuecoo19", tipo: "twitch" },
  { url: "https://www.twitch.tv/zisaac18", name: "zisaac18", tipo: "twitch" }
];

const teamOTChannels = [
  { url: "https://www.twitch.tv/deathwingua", name: "deathwingua", tipo: "twitch" },
  { url: "https://www.twitch.tv/riqqeloff", name: "riqqeloff", tipo: "twitch" },
  { url: "https://www.twitch.tv/hutnik", name: "hutnik", tipo: "twitch" },
  { url: "https://www.twitch.tv/oilrats", name: "oilrats", tipo: "twitch" },
  { url: "https://www.twitch.tv/mango", name: "mango", tipo: "twitch" },
  { url: "https://www.twitch.tv/farmerlucas", name: "farmerlucas", tipo: "twitch" },
  { url: "https://www.twitch.tv/basetradetv", name: "basetradetv", tipo: "twitch" },
  { url: "https://www.twitch.tv/babayaga__0", name: "babayaga__o", tipo: "twitch" }
];

const losMuchachosChannels = [
  { url: "https://www.twitch.tv/spinky_r", name: "spinky_r", tipo: "twitch" },
  { url: "https://www.twitch.tv/spiicyrust", name: "spiicyrust", tipo: "twitch" },
  { url: "https://www.twitch.tv/ferb", name: "ferb", tipo: "twitch" },
  { url: "https://www.twitch.tv/snowmers", name: "snowmers", tipo: "twitch" },
  { url: "https://www.twitch.tv/vectiong", name: "vectiong", tipo: "twitch" },
  { url: "https://www.twitch.tv/skrilla5", name: "skrilla5", tipo: "twitch" },
  { url: "https://www.twitch.tv/winxrust", name: "winxrust", tipo: "twitch" },
  { url: "https://www.twitch.tv/ledoo", name: "ledoo", tipo: "twitch" }
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
    name: "Team OT",
    logo: teamOTLogo,
    channels: teamOTChannels
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
  {
    name: "Team LoS Muchacho's",
    logo: losmuchachoslogo,
    channels: losMuchachosChannels
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    name: `Team ${i + 8}`
  }))
];

// Utilidad: detectar plataforma por URL si no viene en 'tipo'
const platformFromUrl = (url) => {
  if (!url) return 'other';
  if (url.includes("kick.com")) return "kick";
  if (url.includes("twitch.tv")) return "twitch";
  return "other";
};

// Utilidad: metadata de equipo (conteo plataforma)
const teamMeta = (team) => {
  const channels = team.channels || [];
  return channels.reduce(
    (acc, ch) => {
      const t = ch.tipo || platformFromUrl(ch.url);
      if (t === "kick") acc.kick += 1;
      else if (t === "twitch") acc.twitch += 1;
      else acc.other += 1;
      return acc;
    },
    { kick: 0, twitch: 0, other: 0, total: channels.length }
  );
};

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

// Tarjeta de equipo profesional con motion + badges
const TeamCard = ({ team, idx, onOpen }) => {
  const meta = teamMeta(team);
  const confirmed = !!(team.channels && team.channels.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => confirmed && onOpen(team)}
      style={{
        background: confirmed
          ? `linear-gradient(135deg, #23201a 70%, ${idx === 0 ? "#e25822" : "#3a4bd8"} 100%)`
          : "linear-gradient(135deg, #23201a 70%, #2e2e2e 100%)",
        borderRadius: 18,
        boxShadow: confirmed
          ? `0 10px 28px ${idx === 0 ? "#e25822aa" : "#3a4bd8aa"}, 0 0 0 2px #ffffff22`
          : "0 10px 28px #0009, 0 0 0 1px #ffffff18",
        padding: "1.6rem 1.1rem",
        minHeight: 210,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
        color: "#fff",
        cursor: confirmed ? "pointer" : "default",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Glow decorativo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -40,
          background: confirmed ? "radial-gradient(800px 120px at 0% 0%, #ffffff08, transparent)" : "transparent",
          pointerEvents: "none"
        }}
      />
      {/* Header: logo + nombre */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {team.logo && (
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#0008",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 2px 12px #000a, 0 0 0 2px #ffffff22"
            }}
          >
            <img
              src={team.logo}
              alt={`${team.name} Logo`}
              loading="lazy"
              style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            />
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: 1 }}>
            {team.name}
          </span>
          {!confirmed && (
            <span
              title="A confirmar"
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#fff",
                background: "linear-gradient(90deg,#666,#999)",
                padding: "2px 8px",
                borderRadius: 999,
                border: "1px solid #ffffff33",
                letterSpacing: 0.5
              }}
            >
              A confirmar
            </span>
          )}
        </div>
      </div>

      {/* Badges de plataformas */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#0008",
          border: "1px solid #ffffff1e",
          color: "#b3cfff",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 800
        }}>
          <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden>
            <rect width="32" height="32" rx="7" fill="#9147ff" />
          </svg>
          Twitch {meta.twitch}
        </span>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#0008",
          border: "1px solid #ffffff1e",
          color: "#d6ffd6",
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 800
        }}>
          <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden>
            <rect width="32" height="32" rx="7" fill="#53fc18" />
          </svg>
          Kick {meta.kick}
        </span>
      </div>

      {/* CTA */}
      <div style={{ height: 32 }}>
        {confirmed ? (
          <span style={{ fontSize: 13, color: "#ffffffd9", opacity: 0.9 }}>
            Click para ver canales
          </span>
        ) : (
          <span style={{ fontSize: 13, color: "#ffffffb3" }}>
            Próximamente
          </span>
        )}
      </div>
    </motion.div>
  );
};

// Modal con detalle de canales
const TeamModal = ({ team, onClose }) => {
  if (!team) return null;
  const meta = teamMeta(team);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        padding: "1rem"
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        style={{
          width: "min(92vw, 560px)",
          background: "linear-gradient(180deg, rgba(35,32,26,0.98), rgba(35,32,26,0.92))",
          borderRadius: 18,
          boxShadow: "0 12px 48px #000c, 0 0 0 2px #ffffff22",
          padding: "1.2rem",
          color: "#fff",
          fontFamily: "Montserrat, Arial, sans-serif",
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 26,
            cursor: "pointer",
            lineHeight: 1
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          {team.logo && (
            <img
              src={team.logo}
              alt={`${team.name} Logo`}
              loading="lazy"
              style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", boxShadow: "0 2px 12px #0008" }}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: 900, fontSize: "1.2rem", letterSpacing: 0.5 }}>{team.name}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 6, fontSize: 12 }}>
              <span style={{ color: "#b3cfff" }}>Twitch: {meta.twitch}</span>
              <span style={{ color: "#d6ffd6" }}>Kick: {meta.kick}</span>
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 8,
          maxHeight: 320,
          overflowY: "auto",
          paddingRight: 4,
          marginTop: 6
        }}>
          {(team.channels || []).map((ch, i) => {
            const t = ch.tipo || platformFromUrl(ch.url);
            const isKick = t === "kick";
            return (
              <a
                key={i}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(0,0,0,0.18)",
                  border: "1px solid #ffffff22",
                  borderRadius: 12,
                  padding: "0.55rem 0.7rem",
                  color: isKick ? "#d6ffd6" : "#e1d4ff",
                  fontWeight: 800,
                  textDecoration: "none",
                  letterSpacing: 0.4
                }}
              >
                <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden>
                  <rect width="32" height="32" rx="7" fill={isKick ? "#53fc18" : "#9147ff"} />
                </svg>
                <span style={{ flex: 1, wordBreak: "break-word" }}>{ch.name}</span>
                <span style={{ fontSize: 12, opacity: 0.9 }}>{isKick ? "Kick" : "Twitch"}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

const Equipos = () => {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all"); // all | twitch | kick
  const [confirmedOnly, setConfirmedOnly] = useState(false);
  const [sort, setSort] = useState("featured"); // featured | az
  const [openTeam, setOpenTeam] = useState(null);

  // Fuente original de equipos
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
      name: "Team OT",
      logo: teamOTLogo,
      channels: teamOTChannels
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
    {
      name: "Team LoS Muchacho's",
      logo: losmuchachoslogo,
      channels: losMuchachosChannels
    },
    ...Array.from({ length: 9 }, (_, i) => ({
      name: `Team ${i + 8}`
    }))
  ];

  // Cálculo profesional de filtros/orden
  const filtered = useMemo(() => {
    let list = teams.map(t => ({
      ...t,
      _meta: teamMeta(t)
    }));

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        (t.channels || []).some(ch => (ch.name || "").toLowerCase().includes(q))
      );
    }

    if (confirmedOnly) {
      list = list.filter(t => t._meta.total > 0);
    }

    if (platform !== "all") {
      list = list.filter(t =>
        (t.channels || []).some(ch => (ch.tipo || platformFromUrl(ch.url)) === platform)
      );
    }

    if (sort === "az") {
      list = list.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
    }
    // featured mantiene el orden original
    return list;
  }, [query, platform, confirmedOnly, sort]);

  return (
    <div style={{ minHeight: "100vh", position: "relative", zIndex: 2 }}>
      <AnimatedBackground />

      {/* Barra superior: volver + Glass toolbar */}
      <div style={{ position: "fixed", top: 18, right: 20, left: 20, zIndex: 10, display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{
          background: "linear-gradient(90deg, #27ae60 60%, #e25822 100%)",
          color: "#fff",
          fontWeight: 800,
          fontSize: "0.98rem",
          padding: "0.55rem 1.1rem",
          border: "none",
          borderRadius: 10,
          boxShadow: "0 2px 10px #0009",
          textDecoration: "none",
          letterSpacing: 0.6
        }}>
          <span style={{ marginRight: 8 }}>🏠</span> Inicio
        </Link>

        <div style={{
          flex: 1,
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "flex-end",
          background: "rgba(15,15,15,0.45)",
          border: "1px solid #ffffff22",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 12,
          padding: "0.5rem 0.6rem",
          boxShadow: "0 8px 32px #000a"
        }}>
          <input
            type="search"
            placeholder="Buscar equipo o canal..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: 180,
              background: "rgba(0,0,0,0.25)",
              border: "1px solid #ffffff22",
              borderRadius: 10,
              padding: "0.55rem 0.7rem",
              color: "#fff",
              outline: "none",
              fontWeight: 700,
              letterSpacing: 0.3
            }}
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            title="Filtrar por plataforma"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid #ffffff22",
              color: "#fff",
              fontWeight: 800,
              borderRadius: 10,
              padding: "0.55rem 0.7rem",
              outline: "none",
              letterSpacing: 0.4
            }}
          >
            <option value="all">Todas</option>
            <option value="twitch">Twitch</option>
            <option value="kick">Kick</option>
          </select>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", fontWeight: 800, fontSize: 13 }}>
            <input
              type="checkbox"
              checked={confirmedOnly}
              onChange={(e) => setConfirmedOnly(e.target.checked)}
            />
            Confirmados
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            title="Ordenar"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid #ffffff22",
              color: "#fff",
              fontWeight: 800,
              borderRadius: 10,
              padding: "0.55rem 0.7rem",
              outline: "none",
              letterSpacing: 0.4
            }}
          >
            <option value="featured">Destacados</option>
            <option value="az">A-Z</option>
          </select>
        </div>
      </div>

      {/* Contenido */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
        style={{
          padding: "6.5rem 0 2.5rem 0",
          position: "relative",
          zIndex: 3,
          maxWidth: 1200,
          margin: "0 auto"
        }}
      >
        <h1 style={{
          color: "#fff",
          fontWeight: 900,
          fontSize: "2.2rem",
          letterSpacing: "2px",
          textAlign: "center",
          marginBottom: "2rem",
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

        {/* Grid de equipos */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.6rem",
            maxWidth: 1100,
            margin: "0 auto"
          }}
        >
          {filtered.map((team, idx) => (
            <TeamCard key={team.name + idx} team={team} idx={idx} onOpen={setOpenTeam} />
          ))}
        </motion.div>

        {/* Estado vacío */}
        {filtered.length === 0 && (
          <div style={{ color: "#fff", opacity: 0.85, textAlign: "center", marginTop: 24, fontWeight: 700 }}>
            No se encontraron equipos con esos filtros.
          </div>
        )}
      </motion.div>

      {/* Modal */}
      {openTeam && <TeamModal team={openTeam} onClose={() => setOpenTeam(null)} />}

      {/* --- CSS RESPONSIVO --- */}
      <style>
        {`
          @media (max-width: 1100px) {
            div[style*="grid-template-columns: repeat(4"] {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
          @media (max-width: 900px) {
            h1 { font-size: 1.6rem !important; }
            div[style*="grid-template-columns: repeat(3"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 600px) {
            div[style*="grid-template-columns: repeat(2"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
      {/* --- FIN CSS RESPONSIVO --- */}
    </div>
  );
};

export default Equipos;

