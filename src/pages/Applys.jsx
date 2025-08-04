import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const initialPlayers = Array.from({ length: 8 }, () => ({
  name: '',
  steamid: '',
  twitch: ''
}));

const fadeIn = (delay = 0) => ({
  animation: `fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both`,
  animationDelay: `${delay}s`
});

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
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.rustaco.site/api/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data && data.steamid ? data : null))
      .catch(() => setUser(null));
  }, []);

  const handlePlayerChange = (idx, field, value) => {
    setPlayers(players =>
      players.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!terms) {
      setError('Debes aceptar los términos y condiciones para inscribirte.');
      return;
    }
    if (!teamName || !captain || !discord || players.some(p => !p.name || !p.steamid || !p.twitch)) {
      setError('Completa todos los campos obligatorios.');
      return;
    }
    // --- Enviar solicitud al backend ---
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
          setError(data.error || 'Error al enviar la inscripción.');
        }
      })
      .catch(() => setError('Error al enviar la inscripción.'));
  };

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
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}>
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
          <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#b3cfff' }}>Cargando...</div>
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
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}>
        <h2 style={{ color: '#e25822', fontWeight: 900, fontSize: '2rem', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
          Debes logearte primero para poder ingresar al proceso de inscripción
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
          Volver al Home
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
        border: '2px solid #27ae60cc'
      }}>
        <div style={{ fontSize: 54, marginBottom: 18, animation: 'fadeInUp 0.8s' }}>🎉</div>
        <h2 style={{ color: '#27ae60', fontWeight: 900, fontSize: '2rem', marginBottom: '1.5rem', ...fadeIn(0.1) }}>
          ¡Inscripción enviada!
        </h2>
        <p style={{ color: '#b3cfff', fontSize: '1.13rem', marginBottom: 18, ...fadeIn(0.2) }}>
          Tu equipo ha sido inscrito correctamente.<br />
          Pronto recibirás novedades en Discord o por correo electrónico.<br />
          ¡Gracias por confiar en Rustaco Eventos!
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
          Volver al Home
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

  // Pantalla de aceptación de términos antes del formulario
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
          Proceso de Inscripción - Rustaco II
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
          <b style={{ color: '#27ae60' }}>Antes de continuar, debes aceptar los términos y condiciones del evento:</b>
          <ul style={{ margin: '1.1rem 0 0 1.2rem', fontSize: '1.08rem', color: '#f39c12', lineHeight: 1.7 }}>
            <li>He leído y acepto el <a href="/reglas" target="_blank" rel="noopener noreferrer" style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 700 }}>reglamento oficial</a> del torneo Rustaco II.</li>
            <li>Me comprometo a que todos los datos entregados son verídicos y que los integrantes del equipo están informados y de acuerdo con la inscripción.</li>
            <li>Entiendo que el incumplimiento de las reglas puede resultar en la descalificación del equipo y/o sanciones.</li>
            <li>Acepto que la administración podrá contactarme vía Discord para cualquier comunicación oficial.</li>
            <li>Declaro que todos los participantes tienen cuenta de Steam y cumplen los requisitos del evento.</li>
            <li>La organización se reserva el derecho de admisión y puede solicitar información adicional si lo estima conveniente.</li>
            <li style={{ color: '#b3cfff' }}>
              <b>Nota:</b> El proceso de inscripción es competitivo y la selección de equipos será realizada por el staff de Rustaco en base a los datos entregados y el cumplimiento de los requisitos.
            </li>
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
          Acepto y deseo inscribir a mi equipo
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

  // Formulario de inscripción profesional
  return (
    <div style={{
      maxWidth: 800,
      margin: '4rem auto',
      background: 'linear-gradient(120deg, #23201a 80%, #e25822 100%)',
      borderRadius: 32,
      boxShadow: '0 8px 32px #000b',
      padding: '2.5rem 2.5rem',
      color: '#fff',
      fontFamily: 'Montserrat, Arial, sans-serif',
      border: '2px solid #e25822cc',
      animation: 'fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both'
    }}>
      <div style={{ fontSize: 44, marginBottom: 12, animation: 'fadeInDown 0.7s' }}>🛡️</div>
      <h1 style={{
        color: '#e25822',
        fontWeight: 900,
        fontSize: '2.2rem',
        marginBottom: '1.5rem',
        letterSpacing: '2px',
        textShadow: '0 2px 18px #000a',
        textAlign: 'center'
      }}>
        Inscripción al Torneo Rustaco II
      </h1>
      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 18, ...fadeIn(0.1) }}>
          <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>Nombre del Equipo *</label>
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
            placeholder="Ejemplo: Rustaco Warriors"
          />
        </div>
        <div style={{ marginBottom: 18, ...fadeIn(0.15) }}>
          <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>Capitán del Equipo *</label>
          <input
            type="text"
            value={captain}
            onChange={e => setCaptain(e.target.value)}
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
            placeholder="Nombre completo del capitán"
          />
        </div>
        <div style={{ marginBottom: 18, ...fadeIn(0.18) }}>
          <label style={{ fontWeight: 700, color: '#7289da', fontSize: '1.09rem' }}>Discord del Capitán (será contactado por la administración) *</label>
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
            placeholder="Ejemplo: usuario#1234"
            required
          />
        </div>
        <div style={{ marginBottom: 18, ...fadeIn(0.22) }}>
          <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>Participantes del Equipo (8 jugadores, capitán incluido) *</label>
          <table style={{
            width: '100%',
            marginTop: 8,
            marginBottom: 8,
            borderCollapse: 'collapse',
            background: '#181818',
            borderRadius: 10,
            boxShadow: '0 1px 8px #0007'
          }}>
            <thead>
              <tr>
                <th style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', padding: 6 }}>Nombre</th>
                <th style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', padding: 6 }}>SteamID</th>
                <th style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', padding: 6 }}>Canal de Twitch</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#23201a' : '#181818' }}>
                  <td>
                    <input
                      type="text"
                      value={p.name}
                      onChange={e => handlePlayerChange(idx, 'name', e.target.value)}
                      style={{
                        width: '98%',
                        padding: '0.5rem',
                        borderRadius: 6,
                        border: '1px solid #7289da',
                        background: '#23201a',
                        color: '#fff',
                        boxShadow: '0 1px 4px #0004'
                      }}
                      required
                      placeholder="Nombre"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.steamid}
                      onChange={e => handlePlayerChange(idx, 'steamid', e.target.value)}
                      style={{
                        width: '98%',
                        padding: '0.5rem',
                        borderRadius: 6,
                        border: '1px solid #7289da',
                        background: '#23201a',
                        color: '#fff',
                        boxShadow: '0 1px 4px #0004'
                      }}
                      required
                      placeholder="SteamID64"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={p.twitch}
                      onChange={e => handlePlayerChange(idx, 'twitch', e.target.value)}
                      style={{
                        width: '98%',
                        padding: '0.5rem',
                        borderRadius: 6,
                        border: '1px solid #7289da',
                        background: '#23201a',
                        color: '#fff',
                        boxShadow: '0 1px 4px #0004'
                      }}
                      required
                      placeholder="Canal de Twitch"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginBottom: 18, ...fadeIn(0.25) }}>
          <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>¿Por qué cree que debe participar en este evento? *</label>
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
            placeholder="Cuéntanos por qué tu equipo merece un lugar en Rustaco II..."
          />
        </div>
        <div style={{ marginBottom: 18, ...fadeIn(0.28) }}>
          <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>
            ¿Qué estrategia o preparación especial tiene su equipo para destacar en el torneo?
          </label>
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
            placeholder="Describe brevemente la preparación, entrenamientos, roles, etc."
          />
        </div>
        <div style={{ marginBottom: 18, ...fadeIn(0.3) }}>
          <label style={{ fontWeight: 700, color: '#27ae60', fontSize: '1.09rem' }}>
            <input
              type="checkbox"
              checked={terms}
              onChange={e => setTerms(e.target.checked)}
              style={{ marginRight: 8, accentColor: '#e25822' }}
              required
            />
            Confirmo que he leído y acepto los <a href="/reglas" target="_blank" rel="noopener noreferrer" style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 700 }}>términos y condiciones</a> y me comprometo a respetar todas las reglas del evento.
          </label>
        </div>
        {error && (
          <div style={{ color: '#e25822', fontWeight: 700, marginBottom: 12, ...fadeIn(0.32) }}>{error}</div>
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
            marginTop: 8,
            ...fadeIn(0.35)
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Enviar inscripción
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
};

export default Applys;
