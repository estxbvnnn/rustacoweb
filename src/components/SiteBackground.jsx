import React from 'react';
import logoNuevo from '../assets/img/logonuevo.png';

// NOTA DE RENDIMIENTO
// Cada partícula es un elemento del DOM animado de forma permanente. Las
// cantidades de abajo se bajaron de 132 a 74 elementos en total porque los
// usuarios reportaban caídas de FPS: el costo de compositar tantas capas
// (varias con will-change, que reserva memoria de GPU por elemento) crece
// de forma lineal y se paga en todos los frames, en todas las páginas.
// Si vas a subirlas, medí antes con el panel Rendimiento de Chrome.

// Brasas que suben (deterministas, sin Math.random para render estable)
const EMBERS = Array.from({ length: 20 }, (_, i) => ({
  key: i,
  left: (i * 29 + 5) % 100,
  size: 2 + (i % 4),
  duration: 8 + (i % 10),
  delay: (i * 0.6) % 11,
  drift: ((i % 6) - 2.5) * 34,
}));

// Motas de polvo a la deriva (lentas, tenues)
const DUST = Array.from({ length: 24 }, (_, i) => ({
  key: i,
  left: (i * 43 + 9) % 100,
  top: (i * 67 + 13) % 100,
  size: 1 + (i % 3),
  duration: 16 + (i % 12),
  delay: (i * 1.1) % 14,
  driftX: ((i % 7) - 3) * 26,
}));

// Hexágonos flotantes que giran
const HEXES = Array.from({ length: 8 }, (_, i) => ({
  key: i,
  left: (i * 37 + 4) % 96,
  top: (i * 29 + 6) % 90,
  size: 44 + (i % 5) * 24,
  duration: 24 + (i % 7) * 4,
  delay: (i * 1.2) % 12,
  spin: i % 2 === 0 ? 'rwHexSpin' : 'rwHexSpinRev',
  faint: i % 3 === 0,
}));

// Destellos que titilan
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  key: i,
  left: (i * 47 + 3) % 100,
  top: (i * 59 + 11) % 96,
  size: 1 + (i % 3),
  duration: 3 + (i % 5),
  delay: (i * 0.7) % 8,
}));

// Estelas fugaces diagonales
const STREAKS = Array.from({ length: 4 }, (_, i) => ({
  key: i,
  top: (i * 17 + 6) % 70,
  duration: 5 + (i % 4),
  delay: i * 2.6,
}));

/**
 * Fondo animado y decorado del sitio. Muchas capas superpuestas: base con
 * aurora giratoria, resplandores, rejilla, hexágonos, polvo a la deriva,
 * brasas, destellos, estelas fugaces, barrido de luz y viñeta.
 * Se renderiza una sola vez (global) detrás de todo el contenido.
 */
export default function SiteBackground() {
  return (
    <div className="rw-bg" aria-hidden="true">
      <div className="rw-bg-base" />
      <div className="rw-bg-aurora" />
      <div className="rw-bg-glow rw-bg-glow--1" />
      <div className="rw-bg-glow rw-bg-glow--2" />
      <div className="rw-bg-glow rw-bg-glow--3" />
      <div className="rw-bg-grid" />

      <div className="rw-bg-hexes">
        {HEXES.map((h) => (
          <svg
            key={h.key}
            className={`rw-hex ${h.faint ? 'rw-hex--faint' : ''}`}
            viewBox="0 0 100 100"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              width: h.size,
              height: h.size,
              animationDuration: `${h.duration}s, ${h.duration * 1.4}s`,
              animationDelay: `${h.delay}s, ${h.delay}s`,
              animationName: `rwHexFloat, ${h.spin}`,
            }}
          >
            <polygon points="50,3 93,26 93,74 50,97 7,74 7,26" />
          </svg>
        ))}
      </div>

      <img className="rw-bg-watermark" src={logoNuevo} alt="" />

      <div className="rw-bg-dust">
        {DUST.map((d) => (
          <span
            key={d.key}
            className="rw-dust"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              '--dx': `${d.driftX}px`,
            }}
          />
        ))}
      </div>

      <div className="rw-bg-embers">
        {EMBERS.map((e) => (
          <span
            key={e.key}
            className="rw-ember"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              '--drift': `${e.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="rw-bg-sparks">
        {SPARKS.map((s) => (
          <span
            key={s.key}
            className="rw-spark"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="rw-bg-streaks">
        {STREAKS.map((s) => (
          <span
            key={s.key}
            className="rw-streak"
            style={{
              top: `${s.top}%`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="rw-bg-sweep" />
      <div className="rw-bg-vignette" />
    </div>
  );
}
