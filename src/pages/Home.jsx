import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css";
import "../assets/home-dark.css";
import "../assets/server-theme.css";

import logoNuevo from "../assets/img/logonuevo.png";
import { useLang } from "../context/LanguageContext.jsx";
import { notifyComingSoon } from "../components/ComingSoon.jsx";
import PromoBanner from "../components/PromoBanner.jsx";

// ─── EDITA AQUÍ TUS DATOS ──────────────────────────────────────────────────
const DISCORD_URL = "https://discord.gg/WEjcYM3wRs";
// ───────────────────────────────────────────────────────────────────────────

const translations = {
  es: {
    navStore: "Store",
    navRules: "Reglas",
    navMaps: "Maps",
    navLeaderboard: "Stats",
    navSupport: "Soporte",
    navDiscord: "Discord",
    login: "Iniciar sesión",
    heroTitleA: "Servidor competitivo",
    heroTitleB: "de Rust",
    heroSub:
      "Infraestructura de alto rendimiento, wipes programados y moderación activa. Una experiencia competitiva, estable y justa para todos los jugadores.",
    ctaDiscord: "Unirse al Discord",
    statRate: "Farmeo",
    statGroup: "Grupo",
    statGroupValue: "Sin límite",
    statWipe: "Map wipe",
    statWipeValue: "Semanal",
    statUptime: "Uptime",
    featuresKicker: "Por qué Rustaco",
    featuresTitle: "Hecho para competir",
    features: [
      { icon: "bi-shield-check", title: "Anti-cheat activo", desc: "Detección por capas y staff revisando reportes 24/7. Los cheaters no duran un raid." },
      { icon: "bi-cpu", title: "Alto rendimiento", desc: "Hardware dedicado, tickrate estable y cero lag en raids o despegues de clanes." },
      { icon: "bi-arrow-repeat", title: "Wipes puntuales", desc: "Calendario fijo de wipes. Siempre sabes cuándo empieza el próximo y a qué hora." },
      { icon: "bi-people", title: "Staff dedicado", desc: "Equipo activo dentro del juego y en Discord. Tickets respondidos en minutos, no días." },
      { icon: "bi-trophy", title: "Eventos y rankings", desc: "Leaderboard de kills, KDR y farmeo. Eventos in-game con premios en los wipes." },
      { icon: "bi-people-fill", title: "Comunidad activa", desc: "Jugadores conectados a diario, PvP constante y una comunidad que se mantiene viva wipe tras wipe." },
    ],
    prizeKicker: "Compite y gana",
    prizeTitle: "Cash Cup Wipes",
    prizeSub: "Compite por el prizepool durante los Cash Cup Wipes. Domina el ranking, gana tus enfrentamientos y llévate tu parte del premio.",
    prizePoolLabel: "Prize pool",
    prizePoolValue: "A confirmar",
    nextWipeLabel: "Próximo wipe",
    nextWipeValue: "A confirmar",
    promosKicker: "Apoya el servidor",
    promosTitle: "Store y soporte",
    promoStoreTitle: "Tienda oficial",
    promoStoreText:
      "VIP, kits, skins y queue skip. Cada compra mantiene el servidor en línea y financia los premios de los eventos.",
    promoStoreBtn: "Ir a la Store",
    promoSupportTitle: "Soporte",
    promoSupportText:
      "¿Problemas para conectar, reportes o apelaciones? Abre un ticket y el staff te responde en minutos.",
    promoSupportBtn: "Abrir un ticket",
    ctaTitle: "Únete a la comunidad",
    ctaText:
      "Anuncios de wipe, sorteos, soporte y búsqueda de equipo. Todo pasa en nuestro Discord.",
    footerRights: "© Rustaco — Todos los derechos reservados.",
    footerDisclaimer: "Rustaco no está afiliado a Facepunch Studios.",
  },
  en: {
    navStore: "Store",
    navRules: "Rules",
    navMaps: "Maps",
    navLeaderboard: "Stats",
    navSupport: "Support",
    navDiscord: "Discord",
    login: "Sign in",
    heroTitleA: "Competitive Rust",
    heroTitleB: "server",
    heroSub:
      "High-performance infrastructure, scheduled wipes and active moderation. A competitive, stable and fair experience for every player.",
    ctaDiscord: "Join Discord",
    statRate: "Gather rate",
    statGroup: "Group",
    statGroupValue: "No limit",
    statWipe: "Map wipe",
    statWipeValue: "Weekly",
    statUptime: "Uptime",
    featuresKicker: "Why Rustaco",
    featuresTitle: "Built to compete",
    features: [
      { icon: "bi-shield-check", title: "Active anti-cheat", desc: "Layered detection and staff reviewing reports 24/7. Cheaters don't last a single raid." },
      { icon: "bi-cpu", title: "High performance", desc: "Dedicated hardware, stable tickrate and zero lag during raids or clan fights." },
      { icon: "bi-arrow-repeat", title: "On-time wipes", desc: "Fixed wipe schedule. You always know when the next one starts and at what time." },
      { icon: "bi-people", title: "Dedicated staff", desc: "Active team in-game and on Discord. Tickets answered in minutes, not days." },
      { icon: "bi-trophy", title: "Events & rankings", desc: "Kills, KDR and farm leaderboards. In-game events with prizes every wipe." },
      { icon: "bi-people-fill", title: "Active community", desc: "Players online every day, constant PvP and a community that stays alive wipe after wipe." },
    ],
    prizeKicker: "Compete & win",
    prizeTitle: "Cash Cup Wipes",
    prizeSub: "Compete for the prize pool during the Cash Cup Wipes. Dominate the ranking, win your fights and claim your share of the prize.",
    prizePoolLabel: "Prize pool",
    prizePoolValue: "To be confirmed",
    nextWipeLabel: "Next wipe",
    nextWipeValue: "To be confirmed",
    promosKicker: "Support the server",
    promosTitle: "Store & support",
    promoStoreTitle: "Official store",
    promoStoreText:
      "VIP, kits, skins and queue skip. Every purchase keeps the server online and funds event prizes.",
    promoStoreBtn: "Go to the Store",
    promoSupportTitle: "Support",
    promoSupportText:
      "Connection issues, reports or appeals? Open a ticket and the staff will get back to you in minutes.",
    promoSupportBtn: "Open a ticket",
    ctaTitle: "Join the community",
    ctaText:
      "Wipe announcements, giveaways, support and team finding. It all happens on our Discord.",
    footerRights: "© Rustaco — All rights reserved.",
    footerDisclaimer: "Rustaco is not affiliated with Facepunch Studios.",
  },
  pt: {
    navStore: "Store",
    navRules: "Regras",
    navMaps: "Maps",
    navLeaderboard: "Stats",
    navSupport: "Suporte",
    navDiscord: "Discord",
    login: "Entrar",
    heroTitleA: "Servidor competitivo",
    heroTitleB: "de Rust",
    heroSub:
      "Infraestrutura de alto desempenho, wipes programados e moderação ativa. Uma experiência competitiva, estável e justa para todos os jogadores.",
    ctaDiscord: "Entrar no Discord",
    statRate: "Farm",
    statGroup: "Grupo",
    statGroupValue: "Sem limite",
    statWipe: "Map wipe",
    statWipeValue: "Semanal",
    statUptime: "Uptime",
    featuresKicker: "Por que Rustaco",
    featuresTitle: "Feito para competir",
    features: [
      { icon: "bi-shield-check", title: "Anti-cheat ativo", desc: "Detecção em camadas e staff revisando denúncias 24/7. Cheaters não duram um raid." },
      { icon: "bi-cpu", title: "Alto desempenho", desc: "Hardware dedicado, tickrate estável e zero lag em raids ou brigas de clã." },
      { icon: "bi-arrow-repeat", title: "Wipes pontuais", desc: "Calendário fixo de wipes. Você sempre sabe quando começa o próximo e a que horas." },
      { icon: "bi-people", title: "Staff dedicado", desc: "Equipe ativa no jogo e no Discord. Tickets respondidos em minutos, não dias." },
      { icon: "bi-trophy", title: "Eventos e rankings", desc: "Leaderboard de kills, KDR e farm. Eventos in-game com prêmios em todos os wipes." },
      { icon: "bi-people-fill", title: "Comunidade ativa", desc: "Jogadores online todos os dias, PvP constante e uma comunidade que se mantém viva wipe após wipe." },
    ],
    prizeKicker: "Compita e ganhe",
    prizeTitle: "Cash Cup Wipes",
    prizeSub: "Compita pelo prizepool durante os Cash Cup Wipes. Domine o ranking, vença seus confrontos e leve sua parte do prêmio.",
    prizePoolLabel: "Prize pool",
    prizePoolValue: "A confirmar",
    nextWipeLabel: "Próximo wipe",
    nextWipeValue: "A confirmar",
    promosKicker: "Apoie o servidor",
    promosTitle: "Store e suporte",
    promoStoreTitle: "Loja oficial",
    promoStoreText:
      "VIP, kits, skins e queue skip. Cada compra mantém o servidor online e financia os prêmios dos eventos.",
    promoStoreBtn: "Ir para a Store",
    promoSupportTitle: "Suporte",
    promoSupportText:
      "Problemas para conectar, denúncias ou apelações? Abra um ticket e o staff responde em minutos.",
    promoSupportBtn: "Abrir um ticket",
    ctaTitle: "Junte-se à comunidade",
    ctaText:
      "Anúncios de wipe, sorteios, suporte e busca de time. Tudo acontece no nosso Discord.",
    footerRights: "© Rustaco — Todos os direitos reservados.",
    footerDisclaimer: "Rustaco não é afiliado à Facepunch Studios.",
  },
};

export default function Home() {
  const { lang } = useLang();
  const t = translations[lang];

  React.useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => document.body.classList.remove("has-video-bg");
  }, []);

  return (
    <div className="rw-page">
      <main>
        {/* ───────── HERO ───────── */}
        <section className="rw-hero">
          <img className="rw-hero-logo" src={logoNuevo} alt="Rustaco" />
          <h1>
            {t.heroTitleA} <em>{t.heroTitleB}</em>
          </h1>
          <p className="rw-hero-sub">{t.heroSub}</p>

          <div className="rw-hero-actions">
            <a className="rw-btn rw-btn--discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <i className="bi bi-discord" /> {t.ctaDiscord}
            </a>
            <button className="rw-btn rw-btn--ghost" type="button" onClick={notifyComingSoon}>
              <i className="bi bi-cart3" /> {t.navStore}
            </button>
          </div>

          <div className="rw-hero-stats">
            <div className="rw-hero-stat">
              <strong>
                2<em>x</em>
              </strong>
              <span>{t.statRate}</span>
            </div>
            <div className="rw-hero-stat">
              <strong>{t.statGroupValue}</strong>
              <span>{t.statGroup}</span>
            </div>
            <div className="rw-hero-stat">
              <strong>{t.statWipeValue}</strong>
              <span>{t.statWipe}</span>
            </div>
            <div className="rw-hero-stat">
              <strong>
                99.9<em>%</em>
              </strong>
              <span>{t.statUptime}</span>
            </div>
          </div>
        </section>

        {/* ───────── FEATURES ───────── */}
        <section className="rw-section" id="features">
          <div className="rw-container">
            <div className="rw-section-head">
              <span className="rw-section-kicker">{t.featuresKicker}</span>
              <h2>{t.featuresTitle}</h2>
            </div>
            <div className="rw-features">
              {t.features.map((f) => (
                <div className="rw-feature" key={f.title}>
                  <div className="rw-feature-icon">
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PRIZEPOOL ───────── */}
        <section className="rw-section rw-section--alt" id="prizepool">
          <div className="rw-container">
            <div className="rw-section-head">
              <span className="rw-section-kicker">{t.prizeKicker}</span>
              <h2>{t.prizeTitle}</h2>
              <p>{t.prizeSub}</p>
            </div>
            <div className="rw-prize">
              <div className="rw-prize-main">
                <span className="rw-prize-icon">
                  <i className="bi bi-trophy-fill" />
                </span>
                <div className="rw-prize-text">
                  <span className="rw-prize-label">{t.prizePoolLabel}</span>
                  <strong className="rw-prize-value">{t.prizePoolValue}</strong>
                </div>
              </div>
              <div className="rw-prize-wipe">
                <i className="bi bi-calendar-event" />
                <span>{t.nextWipeLabel}</span>
                <strong>{t.nextWipeValue}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── STORE / SUPPORT ───────── */}
        <section className="rw-section" id="store">
          <div className="rw-container">
            <div className="rw-section-head">
              <span className="rw-section-kicker">{t.promosKicker}</span>
              <h2>{t.promosTitle}</h2>
            </div>
            <div className="rw-promos">
              <article className="rw-promo rw-promo--store">
                <div className="rw-promo-icon">
                  <i className="bi bi-cart3" />
                </div>
                <h3>{t.promoStoreTitle}</h3>
                <p>{t.promoStoreText}</p>
                <button className="rw-btn rw-btn--primary" type="button" onClick={notifyComingSoon}>
                  <i className="bi bi-cart3" /> {t.promoStoreBtn}
                </button>
              </article>
              <article className="rw-promo rw-promo--support">
                <div className="rw-promo-icon">
                  <i className="bi bi-headset" />
                </div>
                <h3>{t.promoSupportTitle}</h3>
                <p>{t.promoSupportText}</p>
                <a className="rw-btn rw-btn--discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-headset" /> {t.promoSupportBtn}
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ───────── DISCORD CTA ───────── */}
        <section className="rw-cta">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <a className="rw-btn rw-btn--discord" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-discord" /> {t.ctaDiscord}
          </a>
        </section>
      </main>

      <footer className="rw-footer">
        <div className="rw-footer-brand">
          <img src={logoNuevo} alt="Rustaco" loading="lazy" decoding="async" />
          <span>
            {t.footerRights}
            <small style={{ display: "block", opacity: 0.7 }}>{t.footerDisclaimer}</small>
          </span>
        </div>
        <nav className="rw-footer-links">
          <button type="button" className="rw-footer-linkbtn" onClick={notifyComingSoon}>{t.navStore}</button>
          <Link to="/maps">{t.navMaps}</Link>
          <Link to="/events">{t.navLeaderboard}</Link>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">Discord</a>
        </nav>
      </footer>

      <PromoBanner />
    </div>
  );
}
