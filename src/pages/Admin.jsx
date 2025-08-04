import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ADMIN_STEAM_ID = '76561198416933402'; // Usa el mismo SteamID que en backend y Home.jsx

const Admin = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [applys, setApplys] = useState([]);
  const [loadingApplys, setLoadingApplys] = useState(true);
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
      maxWidth: 700,
      margin: '4rem auto',
      background: 'rgba(24,24,24,0.97)',
      borderRadius: 24,
      boxShadow: '0 8px 32px #000b',
      padding: '2.5rem 2rem',
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'Montserrat, Arial, sans-serif'
    }}>
      <h1 style={{
        color: '#27ae60',
        fontWeight: 900,
        fontSize: '2.2rem',
        marginBottom: '1.5rem',
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
        marginBottom: '1.5rem',
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
      {/* Lista de usuarios autenticados por Steam */}
      <div style={{
        margin: '2.5rem 0 0 0',
        background: '#23201a',
        borderRadius: 14,
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
          <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse', fontSize: '1rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Avatar</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>SteamID</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Último login</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.steamid}>
                  <td style={{ padding: 8 }}>
                    <img src={u.avatar} alt="avatar" style={{ width: 38, height: 38, borderRadius: '50%' }} />
                  </td>
                  <td style={{ padding: 8 }}>{u.steamid}</td>
                  <td style={{ padding: 8 }}>{u.name}</td>
                  <td style={{ padding: 8 }}>{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Lista de solicitudes de inscripción */}
      <div style={{
        margin: '2.5rem 0 0 0',
        background: '#23201a',
        borderRadius: 14,
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
          <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse', fontSize: '1rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Equipo</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Capitán</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Discord</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Jugadores</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Motivo</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Estrategia</th>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #444' }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {applys.map((a, idx) => (
                <tr key={idx}>
                  <td style={{ padding: 8 }}>{a.teamName}</td>
                  <td style={{ padding: 8 }}>{a.captain}</td>
                  <td style={{ padding: 8 }}>{a.discord}</td>
                  <td style={{ padding: 8 }}>
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {a.players.map((p, i) => (
                        <li key={i}>
                          <b>{p.name}</b> <span style={{ color: '#b3cfff' }}>({p.steamid})</span>
                          {p.twitch && <span style={{ color: '#27ae60', marginLeft: 6 }}>Twitch: {p.twitch}</span>}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: 8 }}>{a.why}</td>
                  <td style={{ padding: 8 }}>{a.strategy}</td>
                  <td style={{ padding: 8 }}>{a.submittedAt ? new Date(a.submittedAt).toLocaleString() : '-'}</td>
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
    </div>
  );
};

export default Admin;