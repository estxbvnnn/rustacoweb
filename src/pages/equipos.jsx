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

const normalizeUrl = (url) => {
  const safeUrl = String(url || "").trim();
  if (!safeUrl) return "";
  if (/^https?:\/\//i.test(safeUrl)) return safeUrl;
  return `https://${safeUrl}`;
};

const getPlatformLabel = (url) => {
  const clean = String(url || "").toLowerCase();
  if (clean.includes("twitch.tv")) return "Twitch";
  if (clean.includes("kick.com")) return "Kick";
  if (clean.includes("youtube.com") || clean.includes("youtu.be")) return "YouTube";
  return "Link";
};

export default function Equipos() {
  React.useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => document.body.classList.remove("has-video-bg");
  }, []);

  const teams = [
    {
      name: "CaptainMyko Team",
      captain: "Captain Myko",
      avatarSeed: "captainmyko",
      platform: "twitch",
      url: "https://www.twitch.tv/captainmyko",
      members: [
        { name: "Captain Myko", url: "https://www.twitch.tv/captainmyko" },
        { name: "FunjiRust", url: "https://www.twitch.tv/funjirust" },
        { name: "NiniRust", url: "https://www.twitch.tv/ninirust" },
        { name: "FunkerLive", url: "https://www.twitch.tv/funkerlive" },
        { name: "Donfladi", url: "https://www.twitch.tv/donfladi" },
        { name: "Kris_siie", url: "https://www.twitch.tv/kris_siie" },
        { name: "Maafgaming", url: "https://www.twitch.tv/maafgaming" },
        { name: "L0vis", url: "https://www.twitch.tv/l0visl" },
        { name: "Kamin", url: "https://www.twitch.tv/kaminrust" },
        { name: "Schmollkorn", url: "https://www.twitch.tv/schmollk0rn" },
      ],
    },
    {
      name: "Alexdieci Team",
      captain: "alexdieci",
      platform: "twitch",
      url: "https://www.twitch.tv/alexdieci",
      members: [
        { name: "alexdieci", url: "https://www.twitch.tv/alexdieci" },
        { name: "noizee", url: "https://www.twitch.tv/noizeettv" },
        { name: "aroscapodellatrap", url: "https://www.twitch.tv/arostv_" },
        { name: "pataisi", url: "https://www.twitch.tv/patashishi" },
        { name: "tifi", url: "https://www.twitch.tv/tifi___" },
        { name: "i.am.miky", url: "https://www.twitch.tv/mmmikyy" },
        { name: "tommykzn", url: "https://twitch.tv/tommyykzn" },
        { name: "zyrexrustt", url: "https://www.twitch.tv/zyrexrustt" },
        { name: "lsd_rust", url: "https://www.twitch.tv/lsd_rust" },
        { name: "nogard98", url: "http://twitch.tv/nogardttv" },
      ],
    },
    {
      name: "SalomonL96 Team",
      captain: "SalomonL96",
      avatarSeed: "salomonl96_",
      platform: "twitch",
      url: "https://www.twitch.tv/salomonl96_",
      members: [
        { name: "SalomonL96", url: "https://www.twitch.tv/salomonl96_" },
        { name: "NoScopeAim", url: "https://www.twitch.tv/noscopeaim" },
        { name: "Vicky", url: "https://www.twitch.tv/vickyperez3" },
        { name: "Fridavh", url: "https://www.twitch.tv/fridavh" },
        { name: "Mateopsz", url: "https://kick.com/mateopsz" },
        { name: "killerfounn", url: "https://www.twitch.tv/killerfounn" },
        { name: "smylls", url: "https://kick.com/smyllss" },
        { name: "andres", url: "https://www.twitch.tv/andres_448" },
        { name: "Singlaso", url: "https://www.twitch.tv/singlaso" },
        { name: "Karinios0", url: "https://kick.com/karinios0" },
      ],
    },
    {
      name: "Wideok Team",
      captain: "Wide",
      avatarSeed: "wideok",
      platform: "twitch",
      url: "https://www.twitch.tv/wideok",
      members: [
        { name: "Wide", url: "https://www.twitch.tv/wideok" },
        { name: "vangog", url: "https://www.twitch.tv/vangogrst" },
        { name: "whokashin", url: "https://www.twitch.tv/whokashin" },
        { name: "Scresh", url: "https://www.youtube.com/@Screshasio" },
        { name: "mikonine", url: "https://twitch.tv/mikonine" },
        { name: "karameliwe", url: "https://www.twitch.tv/karameliwe" },
        { name: "bolna777", url: "https://www.twitch.tv/bolna777" },
        { name: "BONE5", url: "https://www.youtube.com/@BONE5" },
        { name: "Gerter Pol", url: "https://www.youtube.com/channel/UCHnhl7v5GlxiQ9sHlWHOPwQ" },
        { name: "sorbonn3", url: "https://www.twitch.tv/sorbonn3" },
      ],
    },
    {
      name: "JITA Team",
      captain: "JITA",
      avatarSeed: "jita____",
      platform: "twitch",
      url: "https://www.twitch.tv/jita____",
      members: [
        { name: "Caritas", url: "https://www.twitch.tv/tvcaritas" },
        { name: "RafaaaGF", url: "https://kick.com/rafaaagf" },
        { name: "thebanankiller", url: "https://www.twitch.tv/thebanankiller03" },
        { name: "JITA", url: "https://www.twitch.tv/jita____" },
        { name: "Gaucho", url: "https://www.twitch.tv/gaucho_08" },
        { name: "Marquitos", url: "https://www.twitch.tv/xmarquitos22" },
        { name: "LOOPEEZ_4", url: "https://www.twitch.tv/loopeez_4" },
        { name: "Taparrajas", url: "https://www.twitch.tv/ramondeverano" },
        { name: "Zurreitor", url: "https://www.twitch.tv/zurreitor" },
        { name: "COKEIN", url: "https://kick.com/c0kein" },
      ],
    },
    {
      name: "Tchubi Team",
      captain: "tchubi",
      platform: "twitch",
      url: "https://www.twitch.tv/tchubi",
      image: tchubiLogo,
      members: [
        { name: "sh0cker", url: "twitch.tv/sh0cker" },
        { name: "yse_flor", url: "twitch.tv/yse_flor" },
        { name: "rubyhub", url: "twitch.tv/rubyhub" },
        { name: "b3ckbr", url: "twitch.tv/b3ckbr" },
        { name: "lipee_brr", url: "twitch.tv/lipee_brr" },
        { name: "1stompz", url: "twitch.tv/1stompz" },
        { name: "badzinho1", url: "twitch.tv/badzinho1" },
        { name: "neeo01", url: "twitch.tv/neeo01" },
        { name: "tchubi", url: "twitch.tv/tchubi" },
        { name: "blood__rust", url: "twitch.tv/blood__rust" },
      ],
    },
    {
      name: "Poionako Team",
      captain: "Poionako",
      avatarSeed: "poionako",
      platform: "kick",
      url: "https://kick.com/poionako",
      image: poionakoLogo,
      members: [
        { name: "Poionako", url: "https://kick.com/poionako" },
        { name: "Company", url: "https://kick.com/mcompanyv" },
        { name: "Basik", url: "https://kick.com/basiklr" },
        { name: "ApologiZe", url: "https://kick.com/apologiize" },
        { name: "Raulkelok", url: "https://kick.com/raulkelok" },
        { name: "xLibano", url: "https://kick.com/xlibano" },
        { name: "Uruguayo28", url: "https://kick.com/Uruguayo28" },
        { name: "Itrol", url: "https://kick.com/itrol" },
        { name: "Zerito", url: "https://kick.com/zeritoo" },
        { name: "Mardecoira14", url: "https://kick.com/mardecoira14" },
      ],
    },
    {
      name: "Lukasito Team",
      captain: "lukasito",
      platform: "twitch",
      url: "https://www.twitch.tv/lukasito",
      members: [
        { name: "lukasito", url: "https://www.twitch.tv/lukasito" },
        { name: "EdinZ", url: "https://www.twitch.tv/edinz_" },
        { name: "ferb", url: "https://www.twitch.tv/ferb" },
        { name: "spinky", url: "https://www.twitch.tv/spinky_r" },
        { name: "Donkey", url: "https://www.twitch.tv/donkeystn" },
        { name: "playback", url: "https://www.twitch.tv/playbackkr" },
        { name: "silas", url: "https://www.twitch.tv/silaszz_" },
        { name: "adriidr", url: "https://www.twitch.tv/adriidr" },
        { name: "Vection", url: "https://www.twitch.tv/vectiong" },
        { name: "Dilanzito", url: "https://kick.com/dilanzito" },
      ],
    },
    {
      name: "Babayaga Team",
      captain: "BabaYaga",
      avatarSeed: "babayaga__0",
      platform: "twitch",
      url: "https://www.twitch.tv/babayaga__0",
      members: [
        { name: "KAL", url: "https://www.twitch.tv/kalrust" },
        { name: "Quitrix", url: "https://www.twitch.tv/qutr1ixx" },
        { name: "Ducky", url: "https://www.youtube.com/channel/UCAuitwN3fz-rlY_viIljImQ" },
        { name: "999Rust", url: "https://www.twitch.tv/999rust" },
        { name: "Justin", url: "https://www.twitch.tv/justinn1111" },
        { name: "Skiaa", url: "https://www.twitch.tv/skiaaaa_" },
        { name: "AOM", url: "https://www.twitch.tv/aomtv__" },
        { name: "BabaYaga", url: "https://www.twitch.tv/babayaga__0" },
        { name: "Weffwey", url: "https://www.youtube.com/@Weffwey" },
        { name: "Zoozrust", url: "https://www.twitch.tv/zoozrust" },
      ],
    },
    {
      name: "Deowasd Team",
      captain: "deowasd",
      platform: "kick",
      url: "https://kick.com/deowasd",
      image: deowasdLogo,
      members: [
        { name: "luleee04", url: "https://kick.com/luleee04" },
        { name: "xzeenn", url: "https://kick.com/xzeenn" },
        { name: "deowasd", url: "https://kick.com/deowasd" },
        { name: "chichor", url: "https://kick.com/chichor" },
        { name: "skylane77", url: "https://kick.com/skylane77" },
        { name: "ch1mu21", url: "https://kick.com/ch1mu21" },
        { name: "marzze-y2k", url: "https://kick.com/marzze-y2k" },
        { name: "chooww", url: "https://kick.com/chooww" },
        { name: "krakenpez", url: "https://kick.com/krakenpez" },
        { name: "kzeco", url: "https://kick.com/kzeco" },
      ],
    },
  ].map((team) => ({
    ...team,
    image: team.image || getAvatarFromPlatform(team.platform, team.avatarSeed || team.captain),
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
              <div className="team-modal-meta">
                <div className="team-roster-captain">
                  <span className="team-roster-label">Captain</span>
                  <span className="team-roster-value">{selectedTeam.captain}</span>
                </div>
                <span className={`team-platform-badge team-platform-${selectedTeam.platform || "link"}`}>
                  {getPlatformLabel(selectedTeam.url)}
                </span>
              </div>
              <div className="team-roster-main-link-wrap">
                <a className="team-main-link" href={normalizeUrl(selectedTeam.url)} target="_blank" rel="noopener noreferrer">
                  {selectedTeam.url}
                </a>
              </div>
              <div className="team-roster-title">Roster</div>
              <ul className="team-roster-list">
                {(selectedTeam.members || []).map((member, idx) => (
                  <li key={`${selectedTeam.name}-${member.name}`} className="team-roster-item">
                    <span className="team-roster-index">#{String(idx + 1).padStart(2, "0")}</span>
                    <a className="team-roster-link" href={normalizeUrl(member.url)} target="_blank" rel="noopener noreferrer">
                      <span className="team-roster-member-row">
                        <span className="team-roster-member">{member.name}</span>
                        <span className={`team-platform-badge team-platform-${getPlatformLabel(member.url).toLowerCase()}`}>
                          {getPlatformLabel(member.url)}
                        </span>
                      </span>
                      <span className="team-roster-url">{member.url}</span>
                    </a>
                  </li>
                ))}
              </ul>
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
