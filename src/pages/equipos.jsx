import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import rustgamedark from "../assets/img/rustgamedark.jpg";
import '../assets/home-dark.css';
import cantosogangLogo from "../assets/img/cantosogang.webp";
import juninLogo from "../assets/img/juninlogo.png";
import salomonLogo from "../assets/img/salomonlogo.png";
import mcompanyvLogo from "../assets/img/mcompanyvlogo.png";
import aaaaLogo from "../assets/img/AAAA.png";
import teamOTLogo from "../assets/img/teamlogoot.webp";
import losmuchachoslogo from "../assets/img/losmuchachoslogo.webp";
import teamotmainlogo from "../assets/img/teamotmainlogo.png";
import teamlstlogo from "../assets/img/teamlstlogo.png";
import srLogo from "../assets/img/srlogo.png";
import logononames from "../assets/img/logononames.jpg";

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
  { url: "https://www.twitch.tv/oilrats", name: "oilrats" },
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

const teamOTMainChannels = [
  { url: "https://www.twitch.tv/dinling", name: "dinling", tipo: "twitch" },
  { url: "https://www.twitch.tv/tonzaot", name: "tonzaot", tipo: "twitch" },
  { url: "https://www.twitch.tv/hat_rust", name: "hat_rust", tipo: "twitch" },
  { url: "https://www.twitch.tv/pangsquared", name: "pangsquared", tipo: "twitch" },
  { url: "https://www.twitch.tv/sndeluxe", name: "sndeluxe", tipo: "twitch" },
  { url: "https://www.twitch.tv/joeespo", name: "joeespo", tipo: "twitch" },
  { url: "https://www.twitch.tv/tazzos", name: "tazzos", tipo: "twitch" },
  { url: "https://www.twitch.tv/toxrust", name: "toxrust", tipo: "twitch" }
];

const teamLSTChannels = [
  { url: "https://www.twitch.tv/7trunks_", name: "7trunks_", tipo: "twitch" },
  { url: "https://kick.com/pipenux", name: "pipenux", tipo: "kick" },
  { url: "https://www.twitch.tv/anaanashei", name: "anaanashei", tipo: "twitch" },
  { url: "https://www.twitch.tv/raiden23x", name: "raiden23x", tipo: "twitch" },
  { url: "https://kick.com/santy3249", name: "santy3249", tipo: "kick" },
  { url: "https://www.twitch.tv/cinquestellew", name: "cinquestellew", tipo: "twitch" },
  { url: "https://www.twitch.tv/bolivianoamazonico", name: "bolivianoamazonico", tipo: "twitch" },
  { url: "https://www.twitch.tv/606rust", name: "606rust", tipo: "twitch" }
];

export const TEAMS = [
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
  {
    name: "Team OT Main",
    logo: teamotmainlogo,
    channels: teamOTMainChannels
  },
  {
    name: "Team LST",
    logo: teamlstlogo,
    channels: teamLSTChannels
  },
  {
    name: "Team SR",
    logo: srLogo,
    channels: [
      { url: "https://www.twitch.tv/kjj_j", name: "kj", tipo: "twitch" },
      { url: "https://www.twitch.tv/lazh94", name: "lazh", tipo: "twitch" },
      { url: "https://www.twitch.tv/xechoklez", name: "xECHOKLEz", tipo: "twitch" },
      { url: "https://www.twitch.tv/xlarturolx", name: "arturo", tipo: "twitch" },
      { url: "https://www.twitch.tv/king_hoppen", name: "hoppen", tipo: "twitch" },
      { url: "https://www.twitch.tv/liontrol", name: "ares", tipo: "twitch" },
      { url: "https://www.twitch.tv/mythear", name: "mythear", tipo: "twitch" },
      { url: "https://www.twitch.tv/peppadig_", name: "peppa", tipo: "twitch" }
    ]
  },
  {
    name: "NONAMES",
    logo: logononames,
    channels: [
      { url: "https://www.twitch.tv/trytum", name: "trytum", tipo: "twitch" },
      { url: "https://www.twitch.tv/jita____", name: "jita____", tipo: "twitch" },
      { url: "https://www.twitch.tv/thebanankiller03", name: "thebanankiller03", tipo: "twitch" },
      { url: "https://www.twitch.tv/elprote", name: "elprote", tipo: "twitch" },
      { url: "https://www.twitch.tv/moousas", name: "moousas", tipo: "twitch" },
      { url: "https://www.twitch.tv/unluckyk0z4", name: "unluckyk0z4", tipo: "twitch" },
      { url: "https://www.twitch.tv/ramondeverano", name: "ramondeverano", tipo: "twitch" },
      { url: "https://www.twitch.tv/gaucho_08", name: "gaucho_08", tipo: "twitch" }
    ]
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    name: `Team ${i + 10}`
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
  <div className="animated-bg" aria-hidden>
    <div className="animated-bg-image" style={{ backgroundImage: `url(${rustgamedark})` }} />
    <div className="animated-bg-overlay" />
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
      className="team-card"
    >
      <div aria-hidden className="team-decor" />

      <div className="team-header">
        {team.logo && (
          <div className="team-logo">
            <img src={team.logo} alt={`${team.name} Logo`} loading="lazy" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
          </div>
        )}
        <div>
          <div className="team-name">{team.name}</div>
          {!confirmed && <div className="team-status">A confirmar</div>}
        </div>
      </div>

      <div className="team-badges">
        <div className="badge"><svg width="16" height="16" viewBox="0 0 32 32" aria-hidden><rect width="32" height="32" rx="7" fill="#9147ff" /></svg> Twitch {meta.twitch}</div>
        <div className="badge"><svg width="16" height="16" viewBox="0 0 32 32" aria-hidden><rect width="32" height="32" rx="7" fill="#53fc18" /></svg> Kick {meta.kick}</div>
      </div>

      <div className="team-cta">{confirmed ? 'Click para ver canales' : 'Próximamente'}</div>
    </motion.div>
  );
};

// Modal con detalle de canales
export const TeamModal = ({ team, onClose }) => {
  if (!team) return null;
  const meta = teamMeta(team);

  return (
    <div className="team-modal-backdrop" onClick={onClose}>
      <motion.div className="team-modal" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }}>
        <button onClick={onClose} aria-label="Cerrar" className="close-btn" style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', color: '#fff', fontSize: 26, cursor: 'pointer' }}>×</button>

        <div className="modal-header">
          {team.logo && <img src={team.logo} alt={`${team.name} Logo`} loading="lazy" style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 12px #0008' }} />}
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: 0.5 }}>{team.name}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 12 }}>
              <span style={{ color: '#b3cfff' }}>Twitch: {meta.twitch}</span>
              <span style={{ color: '#d6ffd6' }}>Kick: {meta.kick}</span>
            </div>
          </div>
        </div>

        <div className="modal-channels">
          {(team.channels || []).map((ch, i) => {
            const t = ch.tipo || platformFromUrl(ch.url);
            const isKick = t === 'kick';
            return (
              <a key={i} className="channel-row" href={ch.url} target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden><rect width="32" height="32" rx="7" fill={isKick ? '#53fc18' : '#9147ff'} /></svg>
                <span style={{ flex: 1, wordBreak: 'break-word' }}>{ch.name}</span>
                <span style={{ fontSize: 12, opacity: 0.9 }}>{isKick ? 'Kick' : 'Twitch'}</span>
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

  // use shared TEAMS data

  // Cálculo profesional de filtros/orden
  const filtered = useMemo(() => {
    let list = TEAMS.map(t => ({
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
    <div className="page-container">
      <AnimatedBackground />

      <div className="page-hud">
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
          <span style={{ marginRight: 8 }}>🏠</span> Inicio
        </Link>
      </div>

      <motion.div initial="hidden" animate="visible" variants={fadeVariants} style={{ padding: '6.5rem 0 2.5rem 0', position: 'relative', zIndex: 3, maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '2.2rem', letterSpacing: '2px', textAlign: 'center', marginBottom: '2rem', textShadow: '2px 2px 12px #000b' }}>
          <span style={{ background: 'linear-gradient(90deg, #e25822 60%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Equipos del Torneo</span>
        </h1>

        <div className="filters-panel">
          <input type="search" placeholder="Buscar equipo o canal..." value={query} onChange={(e) => setQuery(e.target.value)} className="search-input" />
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="select-input" title="Filtrar por plataforma">
            <option value="all">Todas</option>
            <option value="twitch">Twitch</option>
            <option value="kick">Kick</option>
          </select>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 800, fontSize: 13 }}>
            <input type="checkbox" checked={confirmedOnly} onChange={(e) => setConfirmedOnly(e.target.checked)} /> Confirmados
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select-input" title="Ordenar">
            <option value="featured">Destacados</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeVariants} className="team-grid">
          {filtered.map((team, idx) => (
            <TeamCard key={team.name + idx} team={team} idx={idx} onOpen={setOpenTeam} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="empty-state">No se encontraron equipos con esos filtros.</div>
        )}
      </motion.div>

      {openTeam && <TeamModal team={openTeam} onClose={() => setOpenTeam(null)} />}
    </div>
  );
};

export default Equipos;

