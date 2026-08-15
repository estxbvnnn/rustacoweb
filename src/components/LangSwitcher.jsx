import React from 'react';
import { useLang } from '../context/LanguageContext.jsx';

const flagChile = 'https://flagcdn.com/w20/cl.png';
const flagUSA = 'https://flagcdn.com/w20/us.png';
const flagBrazil = 'https://flagcdn.com/w20/br.png';

const FLAGS = [
  { code: 'es', src: flagChile, label: 'Español' },
  { code: 'en', src: flagUSA, label: 'English' },
  { code: 'pt', src: flagBrazil, label: 'Português' },
];

/** Selector de idioma (banderas) para la navbar. Igual que en el inicio. */
export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="rw-langs">
      {FLAGS.map((flag) => (
        <button
          key={flag.code}
          type="button"
          className={`rw-lang-btn ${lang === flag.code ? 'rw-lang-btn--active' : ''}`}
          onClick={() => setLang(flag.code)}
          title={flag.label}
          aria-label={flag.label}
          aria-pressed={lang === flag.code}
        >
          <img src={flag.src} alt={flag.label} style={{ width: 22, height: 15, display: 'block' }} />
        </button>
      ))}
    </div>
  );
}
