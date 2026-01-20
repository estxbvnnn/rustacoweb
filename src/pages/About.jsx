import React, { useState } from 'react';
import '../assets/home-dark.css';
import rustgamedark from '../assets/img/rustgamedark.jpg';
import rustaco2logo from '../assets/img/rustaco2.png';
import logorustaco from '../assets/img/logorustaco.png';
import rustypot from '../assets/img/rustypot.png';
import poionakologo from '../assets/img/poionakologo.png';
import { Link } from 'react-router-dom';

const flagChile = "https://flagcdn.com/w20/cl.png";
const flagUSA = "https://flagcdn.com/w20/us.png";
const flagBrazil = "https://flagcdn.com/w20/br.png";

const translations = {
    es: {
        title: 'Rustaco — Evento LATAM',
        subtitle: 'Nacido entre amigos para hacer crecer la comunidad',
        historiaTitle: 'Nuestra historia',
        historia: 'Rustaco nació como un proyecto entre amigos jugadores y streamers de la región LATAM con la intención de profesionalizar y acercar la experiencia de torneos a toda la comunidad. Nuestro objetivo es ofrecer eventos transparentes, competitivos y entretenidos que enseñen a otras comunidades cómo se organizan torneos escalables y sostenibles.',
        formatoTitle: 'Formato del torneo',
        formatoBullets: [
            'Equipos de 8 jugadores (rol completo para competir).',
            'Cada equipo dispone de su propia isla / área base asignada en el mapa.',
            'Duración: 4 días de evento con contenido por ERAS; cada ERA introduce cambios y objetivos.',
            'Servidor: configuración a x2.0 de farmeo — recursos y componentes ajustados para ritmo competitivo.',
            '+$2000 a repartir en prize pool.'
        ],
        participarTitle: 'Cómo participar',
        participar: 'Para postular a Rustaco debes iniciar sesión con Steam y completar el formulario de inscripción. Los equipos confirmados aparecerán en la sección de Equipos y podrán ser contactados por la organización para verificación.',
        verEquipos: 'Ver Equipos',
        iniciarSteam: 'Iniciar sesión (Steam)',
        postular: 'Postular'
    },
    en: {
        title: 'Rustaco — LATAM Event',
        subtitle: 'Born among friends to grow the community',
        historiaTitle: 'Our story',
        historia: 'Rustaco started as a project between friends (players and streamers) in LATAM to professionalize and bring tournament experience to the community. We aim to run transparent, competitive and entertaining events that teach other communities how to run scalable tournaments.',
        formatoTitle: 'Tournament format',
        formatoBullets: [
            '8-player teams (full competitive roster).',
            'Each team receives a dedicated island / base area on the map.',
            'Duration: 4 days of event with ERA-based content; each ERA introduces new objectives.',
            'Server: x2.0 gathering — resources and components tuned for competitive pace.',
            '+$2000 prize pool to distribute among top teams.'
        ],
        participarTitle: 'How to join',
        participar: 'To apply to Rustaco you must sign in with Steam and complete the registration form. Confirmed teams will appear in the Teams section and may be contacted by the organization for verification.',
        verEquipos: 'See Teams',
        iniciarSteam: 'Sign in (Steam)',
        postular: 'Apply'
    },
    pt: {
        title: 'Rustaco — Evento LATAM',
        subtitle: 'Nascido entre amigos para crescer a comunidade',
        historiaTitle: 'Nossa história',
        historia: 'Rustaco nasceu como um projeto entre amigos jogadores e streamers da região LATAM com a intenção de profissionalizar e aproximar a experiência de torneios para toda comunidade. Nosso objetivo é oferecer eventos transparentes, competitivos e divertidos que ensinem outras comunidades a organizar torneios escaláveis e sustentáveis.',
        formatoTitle: 'Formato do torneio',
        formatoBullets: [
            'Times de 8 jogadores (escalão completo para competir).',
            'Cada time possui sua própria ilha / área base no mapa.',
            'Duração: 4 dias de evento com conteúdo por ERAS; cada ERA introduz mudanças e objetivos.',
            'Servidor: configuração x2.0 de farm — recursos e componentes ajustados para ritmo competitivo.',
            '+$2000 em prize pool para distribuir entre os melhores times.'
        ],
        participarTitle: 'Como participar',
        participar: 'Para se inscrever no Rustaco você deve entrar com Steam e completar o formulário de inscrição. Times confirmados aparecerão na seção de Equipes e poderão ser contatados pela organização para verificação.',
        verEquipos: 'Ver Equipes',
        iniciarSteam: 'Entrar (Steam)',
        postular: 'Inscrever-se'
    }
};

// quick facts and detailed features translations
translations.es.quickTitle = 'Datos rápidos';
translations.es.quickItems = [
    'Fecha: Jueves 11 Sep 2025 — 15:00 (GMT-3)',
    'Formato general: Equipos de 8 jugadores',
    'Duración: 4 días de evento — partidas por ERAS',
    'Servidor: x2.0 de farmeo (recursos y componentes)',
    'Reglas: Fair play y verificación de equipos'
];
translations.es.detailedTitle = 'Formato detallado / Características';
translations.es.detailedBullets = [
    'Equipos de 8 jugadores (rol completo para competir).',
    'Cada equipo dispone de su propia isla / área base asignada en el mapa.',
    'Duración: 4 días de evento con contenido por ERAS; cada ERA introduce cambios y objetivos.',
    'Eventos diarios: raids, control de recursos y objetivos especiales por ERA.',
    'Servidor: configuración a x2.0 de farmeo — recursos y componentes ajustados para ritmo competitivo.',
    'Componentes y loot: equilibrados para competición; ajustes específicos por ERA.'
];

translations.en.quickTitle = 'Quick facts';
translations.en.quickItems = [
    'Date: Thursday 11 Sep 2025 — 15:00 (GMT-3)',
    'General format: 8-player teams',
    'Duration: 4 days of event — ERA-based rounds',
    'Server: x2.0 gathering (resources and components)',
    'Rules: Fair play and team verification'
];
translations.en.detailedTitle = 'Detailed format / Features';
translations.en.detailedBullets = [
    '8-player teams (full competitive roster).',
    'Each team receives a dedicated island / base area on the map.',
    'Duration: 4 days of event with ERA-based content; each ERA introduces new objectives.',
    'Daily events: raids, resource control and special ERA objectives.',
    'Server: x2.0 gathering — resources and components tuned for competitive pace.',
    'Components and loot: balanced for competition; ERA-specific adjustments.'
];

translations.pt.quickTitle = 'Dados rápidos';
translations.pt.quickItems = [
    'Data: Quinta 11 Set 2025 — 15:00 (GMT-3)',
    'Formato geral: Times de 8 jogadores',
    'Duração: 4 dias de evento — rodadas por ERAS',
    'Servidor: x2.0 de farm (recursos e componentes)',
    'Regras: Fair play e verificação de times'
];
translations.pt.detailedTitle = 'Formato detalhado / Características';
translations.pt.detailedBullets = [
    'Times de 8 jogadores (escalão completo para competir).',
    'Cada time possui sua própria ilha / área base no mapa.',
    'Duração: 4 dias de evento com conteúdo por ERAS; cada ERA introduz mudanças e objetivos.',
    'Eventos diários: raids, controle de recursos e objetivos especiais por ERA.',
    'Servidor: configuração x2.0 de farm — recursos e componentes ajustados para ritmo competitivo.',
    'Componentes e loot: balanceados para competição; ajustes específicos por ERA.'
];

// back button translations
translations.es.backHome = 'Volver al inicio';
translations.en.backHome = 'Back to Home';
translations.pt.backHome = 'Voltar ao Início';

export default function About() {
    const [lang, setLang] = React.useState('es');

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="home-dark">
            <div className="animated-bg" aria-hidden>
                <div className="animated-bg-image" style={{ backgroundImage: `url(${rustgamedark})` }} />
                <div className="animated-bg-overlay" />
            </div>

            <main style={{ position: 'relative', zIndex: 20, padding: '6.5rem 1rem', minHeight: '80vh', display: 'flex', justifyContent: 'center' }}>
                <div className="panel" style={{ maxWidth: 1100, width: '100%', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                        <img src={logorustaco} alt="Rustaco" style={{ width: 78, height: 78, borderRadius: 12, objectFit: 'cover' }} />
                        <div>
                            <h1 style={{ margin: 0, fontSize: '2rem', color: 'var(--hd-text)', fontWeight: 900 }}>{translations[lang].title}</h1>
                            <div style={{ color: 'var(--hd-muted)', fontWeight: 800, marginTop: 6 }}>{translations[lang].subtitle}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={rustaco2logo} alt="Rustaco II" style={{ width: 96, height: 96, objectFit: 'contain' }} />
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <button className="icon-btn flag" onClick={() => setLang('es')} title="Español"><img src={flagChile} alt="ES" /></button>
                                <button className="icon-btn flag" onClick={() => setLang('en')} title="English"><img src={flagUSA} alt="EN" /></button>
                                <button className="icon-btn flag" onClick={() => setLang('pt')} title="Português"><img src={flagBrazil} alt="PT" /></button>
                            </div>
                        </div>
                    </div>

                    <section style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 18 }}>
                        <div>
                            <h2 style={{ color: 'var(--hd-text)', marginTop: 6, fontSize: '1.25rem' }}>{translations[lang].historiaTitle}</h2>
                            <p className="regla-body" style={{ marginTop: 8 }}>{translations[lang].historia}</p>

                            <h3 style={{ color: 'var(--rust-orange)', marginTop: 18 }}>{translations[lang].formatoTitle}</h3>
                            <ul className="regla-body" style={{ marginTop: 8 }}>
                                {translations[lang].formatoBullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>

                            <h3 style={{ color: 'var(--hd-text)', marginTop: 18 }}>{translations[lang].participarTitle}</h3>
                            <p className="regla-body" style={{ marginTop: 8 }}>{translations[lang].participar}</p>

                            <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                                <Link to="/equipos" className="btn-primary">{translations[lang].verEquipos}</Link>
                                <a href="/auth/steam" className="btn-primary" style={{ background: 'linear-gradient(90deg,#23201a 60%,#27ae60)' }}>{translations[lang].iniciarSteam}</a>
                                <Link to="/applys" className="btn-primary" style={{ background: 'linear-gradient(90deg,#e25822 60%, #7289da)' }}>{translations[lang].postular}</Link>
                            </div>
                        </div>

                        <aside>
                            <div className="reglas-banner" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                    <img src={rustaco2logo} alt="Rustaco II" style={{ width: 56, height: 56, objectFit: 'contain' }} />
                                    <div>
                                        <div style={{ fontWeight: 900 }}>Rustaco II</div>
                                        <div style={{ fontSize: 12, color: 'var(--hd-muted)' }}>Evento Internacional LATAM/US/EU</div>
                                    </div>
                                </div>

                                <div className="panel" style={{ padding: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.03)' }}>
                                    <div style={{ fontWeight: 900, marginBottom: 8 }}>{translations[lang].quickTitle}</div>
                                    <div style={{ color: 'var(--hd-muted)', fontSize: 14 }}>
                                        {translations[lang].quickItems.map((it, i) => (
                                            <div key={i}>{it}</div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: 10 }}>
                                        <div style={{ fontWeight: 900, marginBottom: 6 }}>{translations[lang].detailedTitle}</div>
                                        <ul style={{ color: 'var(--hd-muted)', fontSize: 13, margin: 0, paddingLeft: '1.05rem' }}>
                                            {translations[lang].detailedBullets.map((b, i) => (
                                                <li key={i}>{b}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                                <div style={{ marginTop: 8 }}>
                                                    <div style={{ fontWeight: 900, marginBottom: 8 }}>Sponsors / Colaboradores</div>
                                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', width: '100%' }}>
                                                        <img src={rustypot} alt="Rustypot" style={{ width: 120, height: 48, objectFit: 'contain' }} />
                                                        <img src={poionakologo} alt="Poionako" style={{ width: 84, height: 36, objectFit: 'contain' }} />
                                                        <div style={{ marginLeft: 'auto' }}>
                                                            <Link to="/" className="btn-primary" style={{ padding: '8px 12px' }}>{translations[lang].backHome}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                            </div>
                        </aside>
                    </section>
                </div>
            </main>
        </div>
    );
}