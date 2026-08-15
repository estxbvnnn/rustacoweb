import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../context/LanguageContext.jsx';
import { LOGIN_ENABLED } from '../config/features.js';

/**
 * Botón de sesión para la navbar: muestra "Iniciar sesión" (Steam) o el
 * avatar + nombre del usuario autenticado con enlace a su perfil.
 * El texto de login se toma del idioma activo (o del prop loginLabel).
 */
export default function UserMenu({ loginLabel }) {
  const t = useT();
  const [user, setUser] = React.useState(undefined); // undefined = cargando, null = sin sesión

  React.useEffect(() => {
    let active = true;
    fetch('/api/user', { credentials: 'include' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active) setUser(data && data.steamid ? data : null);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => {
      active = false;
    };
  }, []);

  // Con el login oculto no se muestra nada mientras no haya sesión (ni el
  // skeleton de carga, para evitar un parpadeo en la navbar). Las sesiones
  // ya iniciadas siguen viendo su avatar.
  if (!LOGIN_ENABLED && !user) {
    return null;
  }

  if (user === undefined) {
    return <span className="rw-user-skeleton" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <a className="rw-btn rw-btn--ghost rw-btn--sm" href="/auth/steam">
        <i className="bi bi-steam" /> {loginLabel || t.login}
      </a>
    );
  }

  return (
    <Link to="/profile" className="rw-user-chip" title="Steam">
      {user.avatar ? (
        <img src={user.avatar} alt="" />
      ) : (
        <i className="bi bi-person-circle" aria-hidden="true" />
      )}
      <span>{user.name}</span>
      {user.isAdmin && (
        <i className="bi bi-shield-fill-check rw-user-admin" title="Administrador" aria-label="Administrador" />
      )}
    </Link>
  );
}
