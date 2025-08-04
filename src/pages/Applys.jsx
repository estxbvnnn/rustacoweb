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

  // Nuevo: banner superior profesional
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
      border: '2px solid #27ae60cc'
    }}>
      <h1 style={{
        color: '#27ae60',
        fontWeight: 900,
        fontSize: '2.2rem',
        marginBottom: '1.2rem',
        letterSpacing: '2px',
        textShadow: '0 2px 18px #000a'
      }}>
        Inscripción al Torneo Rustaco II
      </h1>
      <p style={{
        color: '#b3cfff',
        fontSize: '1.18rem',
        fontWeight: 500,
        marginBottom: 0
      }}>
        Completa todos los campos para inscribir a tu equipo.<br />
        <span style={{ color: '#e25822', fontWeight: 700 }}>¡Recuerda que la inscripción es competitiva y será revisada por el staff!</span>
      </p>
    </div>
  );

  // Nuevo: card para cada jugador
  const PlayerCard = ({ idx, player, onChange }) => (
    <div style={{
      background: 'linear-gradient(120deg, #23201a 80%, #7289da 100%)',
      borderRadius: 14,
      boxShadow: '0 2px 12px #7289da88',
      padding: '1.1rem 1rem',
      marginBottom: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      borderLeft: '5px solid #7289da'
    }}>
      <div style={{ fontWeight: 700, color: '#b3cfff', fontSize: '1.08rem', marginBottom: 4 }}>
        Jugador {idx + 1}
      </div>
      <input
        type="text"
        value={player.name}
        onChange={e => onChange(idx, 'name', e.target.value)}
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
        placeholder="Nombre"
      />
      <input
        type="text"
        value={player.steamid}
        onChange={e => onChange(idx, 'steamid', e.target.value)}
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
        placeholder="SteamID64"
      />
      <input
        type="text"
        value={player.twitch}
        onChange={e => onChange(idx, 'twitch', e.target.value)}
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
        placeholder="Canal de Twitch"
      />
    </div>
  );

  // Nuevo: layout profesional para el formulario
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
        animation: 'fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both'
      }}>
        <Banner />
        <form onSubmit={handleSubmit} style={{ marginTop: 0 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: 24
          }}>
            <div>
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
            <div>
              <label style={{ fontWeight: 700, color: '#7289da', fontSize: '1.09rem' }}>Discord del Capitán *</label>
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
                placeholder="Ejemplo: usuario#1234"
              />
            </div>
          </div>
          <div style={{
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            <div>
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
            <div>
              <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>¿Por qué debe participar tu equipo? *</label>
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
          </div>
          <div style={{
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            <div>
              <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem' }}>Estrategia o preparación especial</label>
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
            <div>
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
          </div>
          <div style={{
            marginBottom: 24,
            background: 'rgba(34,34,34,0.97)',
            borderRadius: 18,
            padding: '1.5rem 1.2rem',
            boxShadow: '0 2px 12px #0007'
          }}>
            <label style={{ fontWeight: 700, color: '#f39c12', fontSize: '1.09rem', marginBottom: 12, display: 'block' }}>
              Participantes del Equipo (8 jugadores, capitán incluido) *
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.2rem'
            }}>
              {players.map((p, idx) => (
                <PlayerCard key={idx} idx={idx} player={p} onChange={handlePlayerChange} />
              ))}
            </div>
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
  }

  return null; // En caso de que ninguna condición se cumpla
};

export default Applys;
