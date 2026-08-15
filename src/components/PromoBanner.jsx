import React from 'react';
import rustypotLogo from '../assets/img/rustypotlogo.png';

// ─── EDITA AQUÍ EL ENLACE Y EL CÓDIGO ──────────────────────────────────────
const PROMO_URL = 'https://rustypot.com/';
const PROMO_CODE = 'RUSTACO';
const PROMO_REWARD = '$1 FREE';
// ───────────────────────────────────────────────────────────────────────────

/**
 * Banner flotante (abajo a la izquierda) tipo afiliado: logo de Rustypot +
 * "CODE RUSTACO · $1 FREE". Enlaza a Rustypot en una pestaña nueva.
 */
export default function PromoBanner() {
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    // pequeña entrada tras cargar la página
    const timer = setTimeout(() => setEntered(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      className={`rw-promo-banner ${entered ? 'rw-promo-banner--in' : ''}`}
      href={PROMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rustypot — código ${PROMO_CODE} ${PROMO_REWARD}`}
    >
      <span className="rw-promo-banner-logo">
        <img src={rustypotLogo} alt="Rustypot" />
      </span>
      <span className="rw-promo-banner-text">
        <span className="rw-promo-banner-code">
          CODE <em>{PROMO_CODE}</em>
        </span>
        <span className="rw-promo-banner-reward">{PROMO_REWARD}</span>
      </span>
    </a>
  );
}
