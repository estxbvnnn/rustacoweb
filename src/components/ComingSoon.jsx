import React from 'react';
import { useT } from '../context/LanguageContext.jsx';

const EVENT = 'rw-coming-soon';

/** Dispara el aviso global "Próximamente". */
export function notifyComingSoon() {
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Toast global que muestra "Próximamente". Se monta una sola vez en App. */
export default function ComingSoonToast() {
  const t = useT();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let timer;
    const onEvt = () => {
      setShow(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShow(false), 2400);
    };
    window.addEventListener(EVENT, onEvt);
    return () => {
      window.removeEventListener(EVENT, onEvt);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`rw-toast ${show ? 'rw-toast--show' : ''}`} role="status" aria-live="polite">
      <i className="bi bi-hourglass-split" aria-hidden="true" /> {t.comingSoon}
    </div>
  );
}
