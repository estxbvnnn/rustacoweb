import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ADMIN_STEAM_ID = '76561198416933402'; // Usa el mismo SteamID que en backend y Home.jsx

const ApplyDetailModal = ({ apply, user, onClose }) => {
  if (!apply) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(24,24,24,0.93)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: 700,
        width: '100%',
        background: 'linear-gradient(120deg, #23201a 80%, #e25822 100%)',
        borderRadius: 32,
        boxShadow: '0 8px 32px #000b',
        padding: '2.5rem 2.5rem',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        border: '2px solid #e25822cc',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: '#e25822',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.5rem 1.2rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0007'
          }}
        >
          Cerrar
        </button>
        <h2 style={{
          color: '#27ae60',
          fontWeight: 900,
          fontSize: '2rem',
          marginBottom: '1.2rem',
          letterSpacing: '2px',
          textShadow: '0 2px 18px #000a'
        }}>
          Solicitud de inscripción
        </h2>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={user?.avatar} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #7289da' }} />
            <span style={{ color: '#b3cfff', fontWeight: 700 }}>{apply.submittedByName}</span>
            <span style={{ color: '#fff', fontSize: '0.95rem' }}>({apply.submittedBy})</span>
          </div>
          <span style={{ color: '#e0e0e0', fontSize: '1.05rem', marginLeft: 8 }}>
            Fecha: {apply.submittedAt ? new Date(apply.submittedAt).toLocaleString() : '-'}
          </span>
        </div>
        <div style={{ marginBottom: 18 }}>
          <b style={{ color: '#f39c12' }}>Equipo:</b> {apply.teamName}<br />
          <b style={{ color: '#f39c12' }}>Capitán:</b> {apply.captain}<br />
          <b style={{ color: '#7289da' }}>Discord:</b> {apply.discord}
        </div>
        <div style={{ marginBottom: 18 }}>
          <b style={{ color: '#f39c12' }}>¿Por qué debe participar tu equipo?</b>
          <div style={{
            background: '#181818',
            borderRadius: 10,
            padding: '0.7rem 1.2rem',
            marginTop: 6,
            color: '#fff'
          }}>{apply.why}</div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <b style={{ color: '#f39c12' }}>Estrategia o preparación especial</b>
          <div style={{
            background: '#181818',
            borderRadius: 10,
            padding: '0.7rem 1.2rem',
            marginTop: 6,
            color: '#fff'
          }}>{apply.strategy}</div>
        </div>
        <div style={{
          marginBottom: 18,
          background: 'rgba(34,34,34,0.97)',
          borderRadius: 18,
          padding: '1.5rem 1.2rem',
          boxShadow: '0 2px 12px #0007'
        }}>
          <b style={{ color: '#f39c12', marginBottom: 12, display: 'block' }}>
            Participantes del Equipo (8 jugadores, capitán incluido)
          </b>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.2rem'
          }}>
            {apply.players.map((p, idx) => (
              <div key={idx} style={{
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
                <div style={{ color: '#fff', fontWeight: 600 }}>Nombre: <span style={{ color: '#b3cfff' }}>{p.name}</span></div>
                <div style={{ color: '#fff', fontWeight: 600 }}>SteamID: <span style={{ color: '#b3cfff' }}>{p.steamid}</span></div>
                <div style={{ color: '#fff', fontWeight: 600 }}>Twitch: <span style={{ color: '#27ae60' }}>{p.twitch}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [applys, setApplys] = useState([]);
  const [loadingApplys, setLoadingApplys] = useState(true);
  const [deletingIdx, setDeletingIdx] = useState(null);
  const [showApplyDetail, setShowApplyDetail] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch('https://www.rustaco.site/api/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser(data && data.steamid ? data : null);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (user && user.steamid === ADMIN_STEAM_ID) {
      fetch('https://www.rustaco.site/api/admin/users', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setUsers(Array.isArray(data) ? data : []);
          setLoadingUsers(false);
        })
        .catch(() => setLoadingUsers(false));
      fetch('https://www.rustaco.site/api/admin/applys', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          setApplys(Array.isArray(data) ? data : []);
          setLoadingApplys(false);
        })
        .catch(() => setLoadingApplys(false));
    }
  }, [user]);

  // Nuevo: Eliminar solicitud de inscripción
  const handleDeleteApply = idx => {
    if (!window.confirm('¿Seguro que deseas eliminar esta solicitud?')) return;
    setDeletingIdx(idx);
    fetch(`https://www.rustaco.site/api/admin/applys/${idx}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setApplys(applys => applys.filter((_, i) => i !== idx));
        }
        setDeletingIdx(null);
      })
      .catch(() => setDeletingIdx(null));
  };

  if (checking) {
    return <div style={{ color: '#fff', textAlign: 'center', margin: '2rem' }}>Cargando...</div>;
  }

  if (!user || user.steamid !== ADMIN_STEAM_ID) {
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
        <h2 style={{ color: '#e25822', fontWeight: 900, fontSize: '2rem', marginBottom: '1.5rem' }}>
          Acceso denegado
        </h2>
        <p>No tienes permisos para ver este panel.</p>
        <button
          onClick={() => history.push('/')}
          style={{
            marginTop: 24,
            background: '#e25822',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
            padding: '0.7rem 2rem',
            border: 'none',
            borderRadius: 10,
            boxShadow: '0 2px 8px #0007',
            cursor: 'pointer',
            letterSpacing: '1px',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s'
          }}
        >
          Volver al Home
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1100,
      margin: '4rem auto',
      background: 'rgba(24,24,24,0.97)',
      borderRadius: 32,
      boxShadow: '0 8px 32px #000b',
      padding: '2.5rem 2rem',
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'Montserrat, Arial, sans-serif',
      border: '2px solid #27ae60cc'
    }}>
      <h1 style={{
        color: '#27ae60',
        fontWeight: 900,
        fontSize: '2.5rem',
        marginBottom: '2rem',
        letterSpacing: '2px',
        textShadow: '0 2px 18px #000a'
      }}>
        Admin Panel
      </h1>
      <div style={{
        background: 'linear-gradient(90deg, #23201a 70%, #27ae60 100%)',
        borderRadius: 14,
        boxShadow: '0 2px 12px #27ae6088',
        padding: '1.2rem 1rem',
        marginBottom: '2.5rem',
        fontSize: '1.18rem',
        fontWeight: 600,
        color: '#fff',
        letterSpacing: '1px',
        textShadow: '0 1px 8px #000a',
        border: '1.5px solid #27ae60cc'
      }}>
        Bienvenido, {user.name} <br />
        Aquí puedes gestionar el evento y ver información exclusiva de administración.
      </div>
      {/* Usuarios autenticados por Steam */}
      <div style={{
        margin: '2.5rem 0 0 0',
        background: '#23201a',
        borderRadius: 18,
        boxShadow: '0 2px 12px #0007',
        padding: '1.2rem 1rem',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}>
        <h2 style={{ color: '#e25822', fontWeight: 800, fontSize: '1.3rem', marginBottom: 18 }}>
          Usuarios registrados por Steam
        </h2>
        {loadingUsers ? (
          <div>Cargando usuarios...</div>
        ) : users.length === 0 ? (
          <div>No hay usuarios registrados aún.</div>
        ) : (
          <table style={{
            width: '100%',
            color: '#fff',
            borderCollapse: 'collapse',
            fontSize: '1rem',
            background: '#181818',
            borderRadius: 12,
            overflow: 'hidden',
            marginBottom: 24
          }}>
            <thead style={{ background: '#23201a' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #27ae60', fontWeight: 700 }}>Avatar</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #27ae60', fontWeight: 700 }}>SteamID</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #27ae60', fontWeight: 700 }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #27ae60', fontWeight: 700 }}>Último login</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.steamid} style={{ background: '#23201a' }}>
                  <td style={{ padding: 10 }}>
                    <img src={u.avatar} alt="avatar" style={{ width: 38, height: 38, borderRadius: '50%', border: '2px solid #7289da' }} />
                  </td>
                  <td style={{ padding: 10 }}>{u.steamid}</td>
                  <td style={{ padding: 10 }}>{u.name}</td>
                  <td style={{ padding: 10 }}>{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Solicitudes de inscripción */}
      <div style={{
        margin: '2.5rem 0 0 0',
        background: '#23201a',
        borderRadius: 18,
        boxShadow: '0 2px 12px #0007',
        padding: '1.2rem 1rem',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}>
        <h2 style={{ color: '#27ae60', fontWeight: 800, fontSize: '1.3rem', marginBottom: 18 }}>
          Solicitudes de inscripción
        </h2>
        {loadingApplys ? (
          <div>Cargando solicitudes...</div>
        ) : applys.length === 0 ? (
          <div>No hay solicitudes de inscripción aún.</div>
        ) : (
          <table style={{
            width: '100%',
            color: '#fff',
            borderCollapse: 'collapse',
            fontSize: '1rem',
            background: '#181818',
            borderRadius: 12,
            overflow: 'hidden'
          }}>
            <thead style={{ background: '#23201a' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #e25822', fontWeight: 700 }}>Equipo</th>
                <th style={{ textAlign: 'left', padding: 10, borderBottom: '2px solid #e25822', fontWeight: 700 }}>Postulante</th>
                <th style={{ textAlign: 'center', padding: 10, borderBottom: '2px solid #e25822', fontWeight: 700 }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {applys.map((a, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#23201a' : '#181818' }}>
                  <td style={{ padding: 10 }}>{a.teamName}</td>
                  <td style={{ padding: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img src={users.find(u => u.steamid === a.submittedBy)?.avatar} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #7289da' }} />
                      <span style={{ color: '#b3cfff', fontWeight: 700 }}>{a.submittedByName}</span>
                      <span style={{ color: '#fff', fontSize: '0.95rem' }}>({a.submittedBy})</span>
                    </div>
                  </td>
                  <td style={{ padding: 10, textAlign: 'center' }}>
                    <button
                      onClick={() => setShowApplyDetail({ apply: a, user: users.find(u => u.steamid === a.submittedBy) })}
                      style={{
                        background: 'linear-gradient(90deg, #27ae60 60%, #e25822 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        padding: '0.5rem 1.2rem',
                        border: 'none',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px #0007',
                        cursor: 'pointer',
                        letterSpacing: '1px',
                        textDecoration: 'none',
                        transition: 'background 0.2s, transform 0.2s',
                        marginRight: 8
                      }}
                    >
                      Ver Apply
                    </button>
                    <button
                      onClick={() => handleDeleteApply(idx)}
                      disabled={deletingIdx === idx}
                      style={{
                        background: deletingIdx === idx ? '#aaa' : 'linear-gradient(90deg, #e25822 60%, #27ae60 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        padding: '0.5rem 1.2rem',
                        border: 'none',
                        borderRadius: 8,
                        boxShadow: '0 2px 8px #0007',
                        cursor: deletingIdx === idx ? 'not-allowed' : 'pointer',
                        letterSpacing: '1px',
                        textDecoration: 'none',
                        transition: 'background 0.2s, transform 0.2s'
                      }}
                    >
                      {deletingIdx === idx ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button
        onClick={() => history.push('/')}
        style={{
          marginTop: 32,
          background: '#e25822',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1rem',
          padding: '0.7rem 2rem',
          border: 'none',
          borderRadius: 10,
          boxShadow: '0 2px 8px #0007',
          cursor: 'pointer',
          letterSpacing: '1px',
          textDecoration: 'none',
          transition: 'background 0.2s, transform 0.2s'
        }}
      >
        Volver al Home
      </button>
      <span style={{
        color: '#b3cfff',
        fontSize: '1.05rem',
        fontWeight: 500,
        display: 'block',
        marginTop: '1.2rem',
        opacity: 0.85
      }}>
        (Solo visible para el usuario administrador)
      </span>
      <style>
        {`
          table {
            border-radius: 12px;
            overflow: hidden;
          }
          th, td {
            vertical-align: top;
          }
          tr:hover {
            background: #2d2d2d !important;
          }
          button:hover:not(:disabled) {
            transform: scale(1.07);
            background: linear-gradient(90deg, #27ae60 60%, #e25822 100%);
          }
        `}
      </style>
      {showApplyDetail && (
        <ApplyDetailModal
          apply={showApplyDetail.apply}
          user={showApplyDetail.user}
          onClose={() => setShowApplyDetail(null)}
        />
      )}
    </div>
  );
};

export default Admin;