import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Traducciones para Applys
const translations = {
  es: {
    procesoTitulo: 'Proceso de Inscripción - Rustaco II',
    aceptarBtn: 'Acepto y deseo inscribir a mi equipo',
    inscripcionTitulo: 'Inscripción al Torneo Rustaco II',
    inscripcionDesc: 'Completa todos los campos para inscribir a tu equipo.',
    inscripcionNota: '¡Recuerda que la inscripción es competitiva y será revisada por el staff!',
    nombreEquipo: 'Nombre del Equipo *',
    placeholderEquipo: 'Ejemplo: Rustaco Warriors',
    capitan: 'Capitán del Equipo *',
    placeholderCapitan: 'Nombre completo del capitán',
    participantes: 'Participantes del Equipo (8 jugadores, capitán incluido) *',
    nombre: 'Nombre',
    steamid: 'SteamID64',
    twitch: 'Canal de Transmisión',
    discord: 'Discord del Capitán *',
    placeholderDiscord: 'Ejemplo: usuario#1234',
    porque: '¿Por qué debe participar tu equipo? *',
    placeholderPorque: 'Cuéntanos por qué tu equipo merece un lugar en Rustaco II...',
    estrategia: 'Estrategia o preparación especial',
    placeholderEstrategia: 'Describe brevemente la preparación, entrenamientos, roles, etc.',
    terminos: 'Confirmo que he leído y acepto los',
    terminosLink: 'términos y condiciones',
    terminosFinal: 'y me comprometo a respetar todas las reglas del evento.',
    enviar: 'Enviar inscripción',
    errorTerminos: 'Debes aceptar los términos y condiciones para inscribirte.',
    errorCampos: 'Completa todos los campos obligatorios.',
    errorEnvio: 'Error al enviar la inscripción.',
    cargando: 'Cargando...',
    loginRequerido: 'Debes logearte primero para poder ingresar al proceso de inscripción',
    volverHome: 'Volver al Home',
    enviadoTitulo: '¡Inscripción enviada!',
    enviadoMsg: 'Tu equipo ha sido inscrito correctamente.\nPronto recibirás novedades en Discord o por correo electrónico.\n¡Gracias por confiar en Rustaco Eventos!',
    aceptarTerminosTitulo: 'Antes de continuar, debes aceptar los términos y condiciones del evento:',
    aceptarTerminosLista: [
      'He leído y acepto el reglamento oficial del torneo Rustaco II.',
      'Me comprometo a que todos los datos entregados son verídicos y que los integrantes del equipo están informados y de acuerdo con la inscripción.',
      'Entiendo que el incumplimiento de las reglas puede resultar en la descalificación del equipo y/o sanciones.',
      'Acepto que la administración podrá contactarme vía Discord para cualquier comunicación oficial.',
      'Declaro que todos los participantes tienen cuenta de Steam y cumplen los requisitos del evento.',
      'La organización se reserva el derecho de admisión y puede solicitar información adicional si lo estima conveniente.',
      'Nota: El proceso de inscripción es competitivo y la selección de equipos será realizada por el staff de Rustaco en base a los datos entregados y el cumplimiento de los requisitos.'
    ]
  },
  en: {
    procesoTitulo: 'Registration Process - Rustaco II',
    aceptarBtn: 'I accept and want to register my team',
    inscripcionTitulo: 'Tournament Registration - Rustaco II',
    inscripcionDesc: 'Fill in all fields to register your team.',
    inscripcionNota: 'Remember that registration is competitive and will be reviewed by the staff!',
    nombreEquipo: 'Team Name *',
    placeholderEquipo: 'Example: Rustaco Warriors',
    capitan: 'Team Captain *',
    placeholderCapitan: "Captain's full name",
    participantes: 'Team Participants (8 players, including captain) *',
    nombre: 'Name',
    steamid: 'SteamID64',
    twitch: 'Streaming Channel',
    discord: "Captain's Discord *",
    placeholderDiscord: 'Example: user#1234',
    porque: 'Why should your team participate? *',
    placeholderPorque: 'Tell us why your team deserves a spot in Rustaco II...',
    estrategia: 'Strategy or special preparation',
    placeholderEstrategia: 'Briefly describe preparation, training, roles, etc.',
    terminos: 'I confirm that I have read and accept the',
    terminosLink: 'terms and conditions',
    terminosFinal: 'and I commit to respect all event rules.',
    enviar: 'Submit Registration',
    errorTerminos: 'You must accept the terms and conditions to register.',
    errorCampos: 'Please complete all required fields.',
    errorEnvio: 'Error submitting registration.',
    cargando: 'Loading...',
    loginRequerido: 'You must log in first to start the registration process',
    volverHome: 'Back to Home',
    enviadoTitulo: 'Registration sent!',
    enviadoMsg: 'Your team has been successfully registered.\nYou will soon receive updates via Discord or email.\nThank you for trusting Rustaco Events!',
    aceptarTerminosTitulo: 'Before continuing, you must accept the event terms and conditions:',
    aceptarTerminosLista: [
      'I have read and accept the official rules of the Rustaco II tournament.',
      'I commit that all provided data is true and that all team members are informed and agree with the registration.',
      'I understand that breaking the rules may result in team disqualification and/or sanctions.',
      'I accept that the administration may contact me via Discord for any official communication.',
      'I declare that all participants have a Steam account and meet the event requirements.',
      'The organization reserves the right of admission and may request additional information if deemed necessary.',
      'Note: The registration process is competitive and team selection will be made by Rustaco staff based on the provided data and compliance with requirements.'
    ]
  },
  pt: {
    procesoTitulo: 'Processo de Inscrição - Rustaco II',
    aceptarBtn: 'Aceito e desejo inscrever minha equipe',
    inscripcionTitulo: 'Inscrição no Torneio Rustaco II',
    inscripcionDesc: 'Preencha todos os campos para inscrever sua equipe.',
    inscripcionNota: 'Lembre-se que a inscrição é competitiva e será revisada pela equipe!',
    nombreEquipo: 'Nome da Equipe *',
    placeholderEquipo: 'Exemplo: Rustaco Warriors',
    capitan: 'Capitão da Equipe *',
    placeholderCapitan: 'Nome completo do capitão',
    participantes: 'Participantes da Equipe (8 jogadores, incluindo capitão) *',
    nombre: 'Nome',
    steamid: 'SteamID64',
    twitch: 'Canal de Transmissão',
    discord: 'Discord do Capitão *',
    placeholderDiscord: 'Exemplo: usuario#1234',
    porque: 'Por que sua equipe deve participar? *',
    placeholderPorque: 'Conte por que sua equipe merece uma vaga no Rustaco II...',
    estrategia: 'Estratégia ou preparação especial',
    placeholderEstrategia: 'Descreva brevemente a preparação, treinamentos, funções, etc.',
    terminos: 'Confirmo que li e aceito os',
    terminosLink: 'termos e condições',
    terminosFinal: 'e me comprometo a respeitar todas as regras do evento.',
    enviar: 'Enviar inscrição',
    errorTerminos: 'Você deve aceitar os termos e condições para se inscrever.',
    errorCampos: 'Preencha todos os campos obrigatórios.',
    errorEnvio: 'Erro ao enviar a inscrição.',
    cargando: 'Carregando...',
    loginRequerido: 'Você deve fazer login primeiro para iniciar o processo de inscrição',
    volverHome: 'Voltar ao início',
    enviadoTitulo: 'Inscrição enviada!',
    enviadoMsg: 'Sua equipe foi inscrita com sucesso.\nEm breve você receberá novidades no Discord ou por e-mail.\nObrigado por confiar na Rustaco Eventos!',
    aceptarTerminosTitulo: 'Antes de continuar, você deve aceitar os termos e condições do evento:',
    aceptarTerminosLista: [
      'Li e aceito o regulamento oficial do torneio Rustaco II.',
      'Comprometo-me que todos os dados fornecidos são verdadeiros e que os integrantes da equipe estão informados e de acordo com a inscrição.',
      'Entendo que o descumprimento das regras pode resultar na desclassificação da equipe e/ou sanções.',
      'Aceito que a administração poderá me contatar via Discord para qualquer comunicação oficial.',
      'Declaro que todos os participantes têm conta Steam e cumprem os requisitos do evento.',
      'A organização reserva o direito de admissão e pode solicitar informações adicionais se considerar necessário.',
      'Nota: O processo de inscrição é competitivo e a seleção das equipes será feita pela equipe Rustaco com base nos dados fornecidos e no cumprimento dos requisitos.'
    ]
  }
};

const initialPlayers = Array.from({ length: 8 }, () => ({
  name: '',
  steamid: '',
  twitch: ''
}));

const fadeIn = (delay = 0) => ({
  animation: `fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both`,
  animationDelay: `${delay}s`
});

const flagChile = "https://flagcdn.com/w20/cl.png";
const flagUSA = "https://flagcdn.com/w20/us.png";
const flagBrazil = "https://flagcdn.com/w20/br.png";

const Applys = () => {
  const [user, setUser] = useState(undefined); // undefined para loading
  const [players, setPlayers] = useState(initialPlayers);
  const [teamName, setTeamName] = useState('');
  const [captain, setCaptain] = useState('');
  const [discord, setDiscord] = useState('');
  const [why, setWhy] = useState('');
  const [strategy, setStrategy] = useState('');
  const [terms, setTerms] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('es');
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.rustaco.site/api/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data && data.steamid ? data : null))
      .catch(() => setUser(null));
  }, []);

  const handlePlayerChange = useCallback((idx, field, value) => {
    setPlayers(players => {
      const updated = [...players];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!terms) {
      setError(translations[lang].errorTerminos);
      return;
    }
    if (!teamName || !captain || !discord || players.some(p => !p.name || !p.steamid || !p.twitch)) {
      setError(translations[lang].errorCampos);
      return;
    }
    fetch('https://www.rustaco.site/api/apply', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamName,
        captain,
        discord,
        players,
        why,
        strategy
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setSubmitted(true);
        } else {
          setError(data.error || translations[lang].errorEnvio);
        }
      })
      .catch(() => setError(translations[lang].errorEnvio));
  };

  // Selector de idioma arriba a la derecha
  const LangSelector = (
    <div style={{
      position: 'absolute',
      top: 18,
      right: 18,
      display: 'flex',
      gap: 6,
      zIndex: 10
    }}>
      <button
        onClick={() => setLang('es')}
        style={{
          background: lang === 'es' ? '#e25822' : '#23201a',
          border: 'none',
          borderRadius: 6,
          padding: 2,
          cursor: 'pointer',
          marginRight: 2,
          boxShadow: lang === 'es' ? '0 0 0 2px #e25822' : 'none',
          transition: 'box-shadow 0.2s'
        }}
        title="Español LATAM"
      >
        <img src={flagChile} alt="Chile" style={{ width: 22, height: 15, verticalAlign: 'middle', display: 'block' }} />
      </button>
      <button
        onClick={() => setLang('en')}
        style={{
          background: lang === 'en' ? '#3a4bd8' : '#23201a',
          border: 'none',
          borderRadius: 6,
          padding: 2,
          cursor: 'pointer',
          marginRight: 2,
          boxShadow: lang === 'en' ? '0 0 0 2px #3a4bd8' : 'none',
          transition: 'box-shadow 0.2s'
        }}
        title="English USA"
      >
        <img src={flagUSA} alt="USA" style={{ width: 22, height: 15, verticalAlign: 'middle', display: 'block' }} />
      </button>
      <button
        onClick={() => setLang('pt')}
        style={{
          background: lang === 'pt' ? '#27ae60' : '#23201a',
          border: 'none',
          borderRadius: 6,
          padding: 2,
          cursor: 'pointer',
          boxShadow: lang === 'pt' ? '0 0 0 2px #27ae60' : 'none',
          transition: 'box-shadow 0.2s'
        }}
        title="Português Brasil"
      >
        <img src={flagBrazil} alt="Brasil" style={{ width: 22, height: 15, verticalAlign: 'middle', display: 'block' }} />
      </button>
    </div>
  );

  if (user === undefined) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '4rem auto',
        background: 'rgba(24,24,24,0.97)',
        borderRadius: 24,
        boxShadow: '0 8px 32px #000b',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        position: 'relative'
      }}>
        {LangSelector}
        <div style={fadeIn(0.1)}>
          <span className="loader" style={{
            display: 'inline-block',
            width: 38, height: 38,
            border: '4px solid #e25822',
            borderTop: '4px solid #23201a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: 18
          }} />
          <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#b3cfff' }}>{translations[lang].cargando}</div>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '4rem auto',
        background: 'rgba(24,24,24,0.97)',
        borderRadius: 24,
        boxShadow: '0 8px 32px #000b',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        position: 'relative'
      }}>
        {LangSelector}
        <h2 style={{ color: '#e25822', fontWeight: 900, fontSize: '2rem', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
          {translations[lang].loginRequerido}
        </h2>
        <button
          onClick={() => history.push('/')}
          style={{
            marginTop: 24,
            background: 'linear-gradient(90deg, #27ae60 60%, #e25822 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.08rem',
            padding: '0.7rem 2.2rem',
            border: 'none',
            borderRadius: 12,
            boxShadow: '0 2px 8px #0007',
            cursor: 'pointer',
            letterSpacing: '1px',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
            ...fadeIn(0.2)
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {translations[lang].volverHome}
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '4rem auto',
        background: 'linear-gradient(120deg, #23201a 80%, #27ae60 100%)',
        borderRadius: 28,
        boxShadow: '0 8px 32px #000b',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        border: '2px solid #27ae60cc',
        position: 'relative'
      }}>
        {LangSelector}
        <div style={{ fontSize: 54, marginBottom: 18, animation: 'fadeInUp 0.8s' }}>🎉</div>
        <h2 style={{ color: '#27ae60', fontWeight: 900, fontSize: '2rem', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
          {translations[lang].enviadoTitulo}
        </h2>
        <p style={{ color: '#b3cfff', fontSize: '1.13rem', marginBottom: 18, ...fadeIn(0.2) }}>
          {translations[lang].enviadoMsg.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
        </p>
        <button
          onClick={() => history.push('/')}
          style={{
            marginTop: 24,
            background: 'linear-gradient(90deg, #e25822 60%, #23201a 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.08rem',
            padding: '0.7rem 2.2rem',
            border: 'none',
            borderRadius: 12,
            boxShadow: '0 2px 8px #0007',
            cursor: 'pointer',
            letterSpacing: '1px',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
            ...fadeIn(0.3)
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {translations[lang].volverHome}
        </button>
        <style>
          {`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(40px);}
              100% { opacity: 1; transform: none;}
            }
          `}
        </style>
      </div>
    );
  }

  if (!acceptTerms) {
    return (
      <div style={{
        maxWidth: 700,
        margin: '4rem auto',
        background: 'linear-gradient(120deg, #23201a 80%, #7289da 100%)',
        borderRadius: 32,
        boxShadow: '0 8px 32px #000b',
        padding: '2.8rem 2.2rem',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        textAlign: 'center',
        border: '2px solid #7289da88',
        position: 'relative'
      }}>
        {LangSelector}
        <div style={{
          fontSize: 48,
          marginBottom: 18,
          animation: 'fadeInDown 0.8s'
        }}>📝</div>
        <h1 style={{
          color: '#e25822',
          fontWeight: 900,
          fontSize: '2.1rem',
          marginBottom: '1.5rem',
          letterSpacing: '2px',
          textShadow: '0 2px 18px #000a',
          ...fadeIn(0.1)
        }}>
          {translations[lang].procesoTitulo}
        </h1>
        <div style={{
          background: 'rgba(34,34,34,0.97)',
          borderRadius: 18,
          padding: '1.5rem 1.2rem',
          marginBottom: '1.5rem',
          fontSize: '1.13rem',
          color: '#fff',
          boxShadow: '0 2px 12px #0007',
          textAlign: 'left',
          border: '1.5px solid #7289da88',
          ...fadeIn(0.2)
        }}>
          <b style={{ color: '#27ae60' }}>{translations[lang].aceptarTerminosTitulo}</b>
          <ul style={{ margin: '1.1rem 0 0 1.2rem', fontSize: '1.08rem', color: '#f39c12', lineHeight: 1.7 }}>
            {translations[lang].aceptarTerminosLista.map((item, idx) => (
              <li key={idx} style={idx === 6 ? { color: '#b3cfff' } : {}}>{item}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setAcceptTerms(true)}
          style={{
            background: 'linear-gradient(90deg, #27ae60 60%, #23201a 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.18rem',
            padding: '0.9rem 2.5rem',
            border: 'none',
            borderRadius: 14,
            boxShadow: '0 2px 12px #0007',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
            letterSpacing: '1px',
            marginTop: 8,
            ...fadeIn(0.3)
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {translations[lang].aceptarBtn}
        </button>
        <style>
          {`
            @keyframes fadeInDown {
              0% { opacity: 0; transform: translateY(-40px);}
              100% { opacity: 1; transform: none;}
            }
          `}
        </style>
      </div>
    );
  }

  // Banner superior profesional
  const Banner = () => (
    <div style={{
      background: 'linear-gradient(90deg, #23201a 70%, #27ae60 100%)',
      borderRadius: 22,
      boxShadow: '0 8px 32px #000b',
      padding: '2rem 2.2rem',
      marginBottom: '2.2rem',
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'Montserrat, Arial, sans-serif',
      border: '2px solid #27ae60cc',
      position: 'relative'
    }}>
      <h1 style={{
        color: '#27ae60',
        fontWeight: 900,
        fontSize: '2.2rem',
        marginBottom: '1.2rem',
        letterSpacing: '2px',
        textShadow: '0 2px 18px #000a'
      }}>
        {translations[lang].inscripcionTitulo}
      </h1>
      <p style={{
        color: '#b3cfff',
        fontSize: '1.18rem',
        fontWeight: 500,
        marginBottom: 0
      }}>
        {translations[lang].inscripcionDesc}<br />
        <span style={{ color: '#e25822', fontWeight: 700 }}>{translations[lang].inscripcionNota}</span>
      </p>
      {LangSelector}
    </div>
  );

  // Layout profesional para el formulario, con checkbox de términos abajo
  if (user && !submitted && acceptTerms) {
    return (
      <div style={{
        maxWidth: 900,
        margin: '4rem auto',
        background: 'linear-gradient(120deg, #23201a 80%, #e25822 100%)',
        borderRadius: 32,
        boxShadow: '0 8px 32px #000b',
        padding: '2.5rem 2.5rem',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        border: '2px solid #e25822cc',
        animation: 'fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both',
        position: 'relative'
      }}>
        {Banner()}
        <form onSubmit={handleSubmit} style={{ marginTop: 0 }}>
          {/* Nombre del equipo y capitán */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: 24
          }}>
            <div>
              <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>{translations[lang].nombreEquipo}</label>
              <input
                type="text"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e25822',
                  marginTop: 6,
                  fontSize: '1.08rem',
                  background: '#181818',
                  color: '#fff',
                  boxShadow: '0 1px 8px #0007'
                }}
                required
                placeholder={translations[lang].placeholderEquipo}
              />
            </div>
            <div>
              <label style={{ fontWeight: 700, color: '#7289da', fontSize: '1.09rem' }}>{translations[lang].capitan}</label>
              <input
                type="text"
                value={captain}
                onChange={e => setCaptain(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #7289da',
                  marginTop: 6,
                  fontSize: '1.08rem',
                  background: '#181818',
                  color: '#fff',
                  boxShadow: '0 1px 8px #0007'
                }}
                required
                placeholder={translations[lang].placeholderCapitan}
              />
            </div>
          </div>
          {/* Participantes del equipo */}
          <div style={{
            marginBottom: 24,
            background: 'rgba(34,34,34,0.97)',
            borderRadius: 18,
            padding: '1.5rem 1.2rem',
            boxShadow: '0 2px 12px #0007'
          }}>
            <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem', marginBottom: 12, display: 'block' }}>
              {translations[lang].participantes}
            </label>
            <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {players.map((player, idx) => (
                <li key={idx} style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 700, color: '#b3cfff', fontSize: '1.08rem', marginBottom: 6 }}>
                    {translations[lang].nombre} {idx + 1}.
                  </div>
                  <input
                    type="text"
                    value={player.name}
                    onChange={e => handlePlayerChange(idx, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: 8,
                      border: '1.5px solid #7289da',
                      fontSize: '1.05rem',
                      background: '#181818',
                      color: '#fff',
                      marginBottom: 4
                    }}
                    required
                    placeholder={translations[lang].nombre}
                  />
                  <input
                    type="text"
                    value={player.steamid}
                    onChange={e => handlePlayerChange(idx, 'steamid', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: 8,
                      border: '1.5px solid #7289da',
                      fontSize: '1.05rem',
                      background: '#181818',
                      color: '#fff',
                      marginBottom: 4
                    }}
                    required
                    placeholder={translations[lang].steamid}
                  />
                  <input
                    type="text"
                    value={player.twitch}
                    onChange={e => handlePlayerChange(idx, 'twitch', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: 8,
                      border: '1.5px solid #7289da',
                      fontSize: '1.05rem',
                      background: '#181818',
                      color: '#fff'
                    }}
                    required
                    placeholder={translations[lang].twitch}
                  />
                </li>
              ))}
            </ol>
          </div>
          {/* Discord del capitán */}
          <div style={{
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
          }}>
            <div>
              <label style={{ fontWeight: 700, color: '#7289da', fontSize: '1.09rem' }}>{translations[lang].discord}</label>
              <input
                type="text"
                value={discord}
                onChange={e => setDiscord(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #7289da',
                  marginTop: 6,
                  fontSize: '1.08rem',
                  background: '#181818',
                  color: '#fff',
                  boxShadow: '0 1px 8px #0007'
                }}
                required
                placeholder={translations[lang].placeholderDiscord}
              />
            </div>
          </div>
          {/* Preguntas adicionales */}
          <div style={{
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            <div>
              <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>{translations[lang].porque}</label>
              <textarea
                value={why}
                onChange={e => setWhy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e25822',
                  marginTop: 6,
                  fontSize: '1.08rem',
                  background: '#181818',
                  color: '#fff',
                  minHeight: 60,
                  boxShadow: '0 1px 8px #0007'
                }}
                required
                placeholder={translations[lang].placeholderPorque}
              />
            </div>
            <div>
              <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>{translations[lang].estrategia}</label>
              <textarea
                value={strategy}
                onChange={e => setStrategy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: 8,
                  border: '1.5px solid #e25822',
                  marginTop: 6,
                  fontSize: '1.08rem',
                  background: '#181818',
                  color: '#fff',
                  minHeight: 60,
                  boxShadow: '0 1px 8px #0007'
                }}
                placeholder={translations[lang].placeholderEstrategia}
              />
            </div>
          </div>
          {/* Checkbox de términos */}
          <div style={{
            marginBottom: 18,
            background: 'rgba(34,34,34,0.97)',
            borderRadius: 12,
            padding: '1rem 1.2rem',
            boxShadow: '0 1px 8px #0007'
          }}>
            <label style={{ fontWeight: 700, color: '#27ae60', fontSize: '1.09rem' }}>
              <input
                type="checkbox"
                checked={terms}
                onChange={e => setTerms(e.target.checked)}
                style={{ marginRight: 8, accentColor: '#e25822' }}
                required
              />
              {translations[lang].terminos}{' '}
              <a href="/reglas" target="_blank" rel="noopener noreferrer" style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 700 }}>
                {translations[lang].terminosLink}
              </a>{' '}
              {translations[lang].terminosFinal}
            </label>
          </div>
          {error && (
            <div style={{
              color: '#e25822',
              fontWeight: 700,
              marginBottom: 18,
              background: '#23201a',
              borderRadius: 10,
              padding: '0.7rem 1.2rem',
              boxShadow: '0 1px 8px #e2582288'
            }}>{error}</div>
          )}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #27ae60 60%, #23201a 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.18rem',
              padding: '0.9rem 2.5rem',
              border: 'none',
              borderRadius: 14,
              boxShadow: '0 2px 12px #0007',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s',
              letterSpacing: '1px',
              marginTop: 8
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {translations[lang].enviar}
          </button>
        </form>
        <style>
          {`
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(40px);}
              100% { opacity: 1; transform: none;}
            }
            @keyframes fadeInDown {
              0% { opacity: 0; transform: translateY(-40px);}
              100% { opacity: 1; transform: none;}
            }
          `}
        </style>
      </div>
    );
  }

  return null;
};

export default Applys;