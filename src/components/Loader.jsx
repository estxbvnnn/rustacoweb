import React from 'react';
import logoNuevo from '../assets/img/logonuevo.png';
import { useT } from '../context/LanguageContext.jsx';

const HEX_POINTS = '50,4 91,27 91,73 50,96 9,73 9,27';

/**
 * Pantalla de carga de entrada al sitio. Muestra el logo en un anillo
 * hexagonal giratorio con barra de progreso, y se desvanece cuando la
 * página está lista (mínimo de tiempo para una entrada elegante).
 */
export default function Loader() {
  const t = useT();
  const [pct, setPct] = React.useState(0);
  const [state, setState] = React.useState('loading'); // loading | hiding | gone
  const loadedRef = React.useRef(
    typeof document !== 'undefined' && document.readyState === 'complete'
  );

  React.useEffect(() => {
    const onLoad = () => {
      loadedRef.current = true;
    };
    window.addEventListener('load', onLoad);

    const MIN = 1300; // ms mínimo visible
    const start = performance.now();
    let raf;
    let current = 0;
    let hideTimer;

    const step = (now) => {
      const elapsed = now - start;
      const ready = loadedRef.current && elapsed >= MIN;
      const target = ready ? 100 : Math.min(92, (elapsed / MIN) * 92);
      current += (target - current) * 0.14;
      if (current > 99.6) current = 100;
      setPct(Math.round(current * 10) / 10);

      if (current >= 100 && ready) {
        hideTimer = setTimeout(() => setState('hiding'), 320);
        return; // detener el bucle
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  React.useEffect(() => {
    if (state !== 'hiding') return undefined;
    setPct(100);
    document.body.classList.add('rw-loading-done');
    const tmr = setTimeout(() => setState('gone'), 650);
    return () => clearTimeout(tmr);
  }, [state]);

  if (state === 'gone') return null;

  return (
    <div
      className={`rw-loader ${state === 'hiding' ? 'rw-loader--hide' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="rw-loader-glow" />
      <div className="rw-loader-inner">
        <div className="rw-loader-logo">
          <svg className="rw-loader-hex rw-loader-hex--a" viewBox="0 0 100 100" aria-hidden="true">
            <polygon points={HEX_POINTS} />
          </svg>
          <svg className="rw-loader-hex rw-loader-hex--b" viewBox="0 0 100 100" aria-hidden="true">
            <polygon points={HEX_POINTS} />
          </svg>
          <img className="rw-loader-img" src={logoNuevo} alt="Rustaco" />
        </div>

        <span className="rw-loader-tagline">{t.navTagline}</span>

        <div className="rw-loader-bar">
          <div className="rw-loader-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="rw-loader-pct">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}
