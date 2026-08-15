import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles.css';
import '../assets/home-dark.css';
import '../assets/server-theme.css';

import logoNuevo from '../assets/img/logonuevo.png';
import { useLang, useT, formatDate } from '../context/LanguageContext.jsx';

const DISCORD_URL = 'https://discord.gg/WEjcYM3wRs';

// Los textos (label) se toman del idioma activo; aquí solo id + icono.
export const TICKET_CATEGORIES = [
  { id: 'general', icon: 'bi-question-circle' },
  { id: 'report', icon: 'bi-flag' },
  { id: 'appeal', icon: 'bi-shield-exclamation' },
  { id: 'store', icon: 'bi-cart3' },
  { id: 'bug', icon: 'bi-bug' },
  { id: 'other', icon: 'bi-three-dots' },
];

export const TICKET_STATUS = {
  open: { className: 'rw-badge--open', icon: 'bi-envelope-open' },
  answered: { className: 'rw-badge--answered', icon: 'bi-reply' },
  closed: { className: 'rw-badge--closed', icon: 'bi-check-circle' },
};

export function categoryMeta(id) {
  return TICKET_CATEGORIES.find((cat) => cat.id === id) || TICKET_CATEGORIES[TICKET_CATEGORIES.length - 1];
}

export function statusMeta(status) {
  return { status, ...(TICKET_STATUS[status] || TICKET_STATUS.open) };
}

// re-export para compatibilidad con imports existentes
export { formatDate };

async function readJsonSafe(response) {
  try {
    return await response.json();
  } catch (e) {
    return null;
  }
}

/* ───────────────── Formulario: nuevo ticket ───────────────── */

function NewTicketForm({ onCreated, onCancel }) {
  const t = useT();
  const [category, setCategory] = React.useState('general');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');

  const subjectOk = subject.trim().length >= 4;
  const messageOk = message.trim().length >= 10;

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!subjectOk) {
      setError(t.tkErrSubject);
      return;
    }
    if (!messageOk) {
      setError(t.tkErrMessage);
      return;
    }

    setSending(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, subject: subject.trim(), message: message.trim() }),
      });
      const data = await readJsonSafe(response);
      if (!response.ok) {
        setError(data?.error || t.tkErrCreate);
        return;
      }
      onCreated(data.id);
    } catch (e) {
      setError(t.tkErrConn);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="rw-ticket-form" onSubmit={submit}>
      <div className="rw-form-row">
        <label className="rw-form-field">
          <span className="rw-form-label">{t.tkCategory}</span>
          <select
            className="rw-input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {TICKET_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{t.ticketCat[cat.id]}</option>
            ))}
          </select>
        </label>
        <label className="rw-form-field rw-form-field--grow">
          <span className="rw-form-label">
            {t.tkSubject} <em>({subject.trim().length}/100)</em>
          </span>
          <input
            className="rw-input"
            type="text"
            maxLength={100}
            placeholder={t.tkSubjectPh}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </label>
      </div>

      <label className="rw-form-field">
        <span className="rw-form-label">
          {t.tkMessage} <em>({message.trim().length}/2000)</em>
        </span>
        <textarea
          className="rw-input rw-input--area"
          maxLength={2000}
          rows={6}
          placeholder={t.tkMessagePh}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>

      {error && (
        <div className="rw-form-error">
          <i className="bi bi-exclamation-circle" /> {error}
        </div>
      )}

      <div className="rw-form-actions">
        <button
          className="rw-btn rw-btn--primary rw-btn--sm"
          type="submit"
          disabled={sending || !subjectOk || !messageOk}
        >
          {sending ? t.tkSending : (
            <>
              <i className="bi bi-send" /> {t.tkCreate}
            </>
          )}
        </button>
        <button className="rw-btn rw-btn--ghost rw-btn--sm" type="button" onClick={onCancel}>
          {t.tkCancel}
        </button>
      </div>
    </form>
  );
}

/* ───────────────── Conversación de un ticket ───────────────── */

export function TicketThread({ ticketId, currentUser, onChanged, onBack, allowAdminActions = false }) {
  const { lang } = useLang();
  const t = useT();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [reply, setReply] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [actionError, setActionError] = React.useState('');

  const load = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, { credentials: 'include' });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setError(json?.error || t.tkUnavailable);
        setData(null);
        return;
      }
      setData(json);
    } catch (e) {
      setError(t.tkErrConn);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [ticketId, t]);

  React.useEffect(() => {
    load();
  }, [load]);

  const sendReply = async (event) => {
    event.preventDefault();
    if (reply.trim().length < 2 || sending) return;
    setSending(true);
    setActionError('');
    try {
      const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply.trim() }),
      });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setActionError(json?.error || t.tkErrConn);
        return;
      }
      setReply('');
      await load();
      if (onChanged) onChanged();
    } catch (e) {
      setActionError(t.tkErrConn);
    } finally {
      setSending(false);
    }
  };

  const closeTicket = async () => {
    setActionError('');
    try {
      const response = await fetch(`/api/tickets/${ticketId}/close`, {
        method: 'POST',
        credentials: 'include',
      });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setActionError(json?.error || t.tkErrConn);
        return;
      }
      await load();
      if (onChanged) onChanged();
    } catch (e) {
      setActionError(t.tkErrConn);
    }
  };

  const setStatus = async (status) => {
    setActionError('');
    try {
      const response = await fetch(`/api/admin/tickets/${ticketId}/status`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setActionError(json?.error || t.tkErrConn);
        return;
      }
      await load();
      if (onChanged) onChanged();
    } catch (e) {
      setActionError(t.tkErrConn);
    }
  };

  if (loading) {
    return (
      <div className="rw-lb-state" style={{ border: 'none' }}>
        <span className="rw-spinner" />
        <div>{t.tkLoading}</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <div className="rw-lb-state rw-lb-state--error">{error || t.tkUnavailable}</div>
        {onBack && (
          <button className="rw-btn rw-btn--ghost rw-btn--sm" style={{ marginTop: 12 }} onClick={onBack} type="button">
            <i className="bi bi-arrow-left" /> {t.tkBack}
          </button>
        )}
      </div>
    );
  }

  const { ticket, messages } = data;
  const status = statusMeta(ticket.Status);
  const cat = categoryMeta(ticket.Category);
  const isClosed = ticket.Status === 'closed';

  return (
    <div className="rw-thread">
      <div className="rw-thread-head">
        {onBack && (
          <button className="rw-btn rw-btn--ghost rw-btn--sm" onClick={onBack} type="button">
            <i className="bi bi-arrow-left" /> {t.tkBack}
          </button>
        )}
        <div className="rw-thread-title">
          <h3>
            <span className="rw-thread-id">#{ticket.Id}</span> {ticket.Subject}
          </h3>
          <div className="rw-thread-meta">
            <span className={`rw-badge ${status.className}`}>
              <i className={`bi ${status.icon}`} /> {t.ticketStatus[ticket.Status]}
            </span>
            <span className="rw-badge rw-badge--cat">
              <i className={`bi ${cat.icon}`} /> {t.ticketCat[cat.id]}
            </span>
            <span className="rw-thread-date">{t.tkCreated}: {formatDate(ticket.CreatedAt, lang)}</span>
          </div>
        </div>
      </div>

      <div className="rw-thread-messages">
        {messages.map((msg) => {
          const mine = currentUser && String(msg.SteamId) === String(currentUser.steamid);
          return (
            <div
              key={msg.Id}
              className={`rw-msg ${msg.IsAdmin ? 'rw-msg--admin' : ''} ${mine ? 'rw-msg--mine' : ''}`}
            >
              <div className="rw-msg-avatar">
                {msg.Avatar ? <img src={msg.Avatar} alt="" /> : <i className="bi bi-person-circle" />}
              </div>
              <div className="rw-msg-content">
                <div className="rw-msg-author">
                  <strong>{msg.UserName}</strong>
                  {Boolean(msg.IsAdmin) && (
                    <span className="rw-badge rw-badge--staff">
                      <i className="bi bi-shield-fill-check" /> {t.tkStaff}
                    </span>
                  )}
                  <span className="rw-msg-date">{formatDate(msg.CreatedAt, lang)}</span>
                </div>
                <p>{msg.Body}</p>
              </div>
            </div>
          );
        })}
      </div>

      {actionError && (
        <div className="rw-form-error">
          <i className="bi bi-exclamation-circle" /> {actionError}
        </div>
      )}

      {!isClosed || allowAdminActions ? (
        <form className="rw-thread-reply" onSubmit={sendReply}>
          <textarea
            className="rw-input rw-input--area"
            rows={3}
            maxLength={2000}
            placeholder={isClosed ? t.tkReplyClosedPh : t.tkReplyPh}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
          />
          <div className="rw-form-actions">
            <button
              className="rw-btn rw-btn--primary rw-btn--sm"
              type="submit"
              disabled={sending || reply.trim().length < 2}
            >
              {sending ? t.tkSending : (
                <>
                  <i className="bi bi-send" /> {t.tkReply}
                </>
              )}
            </button>
            {!isClosed && (
              <button className="rw-btn rw-btn--ghost rw-btn--sm" type="button" onClick={closeTicket}>
                <i className="bi bi-check-circle" /> {t.tkCloseTicket}
              </button>
            )}
            {allowAdminActions && (
              <span className="rw-thread-adminactions">
                {ticket.Status !== 'open' && (
                  <button className="rw-btn rw-btn--ghost rw-btn--sm" type="button" onClick={() => setStatus('open')}>
                    {t.tkReopen}
                  </button>
                )}
                {ticket.Status !== 'answered' && (
                  <button className="rw-btn rw-btn--ghost rw-btn--sm" type="button" onClick={() => setStatus('answered')}>
                    {t.tkMarkAnswered}
                  </button>
                )}
              </span>
            )}
          </div>
        </form>
      ) : (
        <div className="rw-thread-closed">
          <i className="bi bi-lock" /> {t.tkClosedNote}
        </div>
      )}
    </div>
  );
}

/* ───────────────── Página de perfil ───────────────── */

export default function Profile() {
  const { lang } = useLang();
  const t = useT();
  const [user, setUser] = React.useState(undefined);
  const [stats, setStats] = React.useState(null);
  const [tickets, setTickets] = React.useState([]);
  const [ticketsLoading, setTicketsLoading] = React.useState(true);
  const [ticketsError, setTicketsError] = React.useState('');
  const [view, setView] = React.useState({ type: 'list' }); // list | new | detail
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add('has-video-bg');
    return () => document.body.classList.remove('has-video-bg');
  }, []);

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

  const loadTickets = React.useCallback(async () => {
    setTicketsLoading(true);
    setTicketsError('');
    try {
      const response = await fetch('/api/tickets', { credentials: 'include' });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setTicketsError(json?.error || t.profTicketsError);
        setTickets([]);
        return;
      }
      setTickets(Array.isArray(json?.tickets) ? json.tickets : []);
    } catch (e) {
      setTicketsError(t.tkErrConn);
      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  }, [t]);

  React.useEffect(() => {
    if (!user || !user.steamid) return undefined;
    loadTickets();

    let active = true;
    fetch(`/api/player-stats?userId=${encodeURIComponent(user.steamid)}`, { credentials: 'include' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active) setStats(data?.player || null);
      })
      .catch(() => {
        if (active) setStats(null);
      });
    return () => {
      active = false;
    };
  }, [user, loadTickets]);

  const logout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      // ignorar: igualmente redirigimos
    }
    window.location.href = '/';
  };

  const copySteamId = () => {
    const text = String(user.steamid);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rw-page">
      <main className="rw-lb-main">
        {user === undefined && (
          <div className="rw-lb-state" style={{ maxWidth: 560 }}>
            <span className="rw-spinner" />
            <div>{t.profLoading}</div>
          </div>
        )}

        {user === null && (
          <div className="rw-login-card">
            <i className="bi bi-steam rw-login-icon" />
            <h1>{t.profLoginTitle}</h1>
            <p>{t.profLoginText}</p>
            <a className="rw-btn rw-btn--primary" href="/auth/steam">
              <i className="bi bi-steam" /> {t.profLoginBtn}
            </a>
          </div>
        )}

        {user && (
          <div className="rw-profile">
            {/* ── Cabecera de perfil ── */}
            <section className="rw-profile-card">
              <div className="rw-profile-id">
                {user.avatar ? (
                  <img className="rw-profile-avatar" src={user.avatar} alt="" />
                ) : (
                  <span className="rw-profile-avatar rw-profile-avatar--empty">
                    <i className="bi bi-person" />
                  </span>
                )}
                <div>
                  <h1>
                    {user.name}
                    {user.isAdmin && (
                      <span className="rw-badge rw-badge--staff" style={{ marginLeft: 10 }}>
                        <i className="bi bi-shield-fill-check" /> {t.profAdminBadge}
                      </span>
                    )}
                  </h1>
                  <button className="rw-profile-steamid" onClick={copySteamId} type="button" title={t.profCopySteamId}>
                    <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'}`} /> {user.steamid}
                  </button>
                </div>
              </div>
              <div className="rw-profile-actions">
                {user.isAdmin && (
                  <Link className="rw-btn rw-btn--primary rw-btn--sm" to="/admin">
                    <i className="bi bi-speedometer2" /> {t.profAdminPanel}
                  </Link>
                )}
                <button className="rw-btn rw-btn--ghost rw-btn--sm" onClick={logout} type="button">
                  <i className="bi bi-box-arrow-right" /> {t.profLogout}
                </button>
              </div>
            </section>

            {/* ── Stats del juego ── */}
            <section className="rw-profile-stats">
              <div className="rw-modal-stat">
                <i className="bi bi-crosshair" />
                <strong>{stats ? String(stats.Kills ?? 0) : '—'}</strong>
                <span>Kills</span>
              </div>
              <div className="rw-modal-stat">
                <i className="bi bi-heartbreak" />
                <strong>{stats ? String(stats.Deaths ?? 0) : '—'}</strong>
                <span>Deaths</span>
              </div>
              <div className="rw-modal-stat">
                <i className="bi bi-bar-chart" />
                <strong>{stats ? String(stats.KDR ?? 0) : '—'}</strong>
                <span>KDR</span>
              </div>
            </section>

            {/* ── Tickets ── */}
            <section className="rw-panel">
              <div className="rw-panel-head">
                <h2>
                  <i className="bi bi-ticket-detailed" /> {t.profMyTickets}
                </h2>
                {view.type === 'list' && (
                  <button
                    className="rw-btn rw-btn--primary rw-btn--sm"
                    onClick={() => setView({ type: 'new' })}
                    type="button"
                  >
                    <i className="bi bi-plus-lg" /> {t.profNewTicket}
                  </button>
                )}
              </div>

              {view.type === 'new' && (
                <NewTicketForm
                  onCreated={(id) => {
                    loadTickets();
                    setView({ type: 'detail', id });
                  }}
                  onCancel={() => setView({ type: 'list' })}
                />
              )}

              {view.type === 'detail' && (
                <TicketThread
                  ticketId={view.id}
                  currentUser={user}
                  onChanged={loadTickets}
                  onBack={() => setView({ type: 'list' })}
                />
              )}

              {view.type === 'list' && (
                <>
                  {ticketsLoading && (
                    <div className="rw-lb-state" style={{ border: 'none' }}>
                      <span className="rw-spinner" />
                      <div>{t.profTicketsLoading}</div>
                    </div>
                  )}

                  {!ticketsLoading && ticketsError && (
                    <div className="rw-lb-state rw-lb-state--error">{ticketsError}</div>
                  )}

                  {!ticketsLoading && !ticketsError && tickets.length === 0 && (
                    <div className="rw-lb-state" style={{ border: 'none' }}>
                      <i className="bi bi-inbox" style={{ fontSize: '1.6rem', display: 'block', marginBottom: 8 }} />
                      {t.profNoTickets}
                    </div>
                  )}

                  {!ticketsLoading && !ticketsError && tickets.length > 0 && (
                    <div className="rw-ticket-list">
                      {tickets.map((ticket) => {
                        const status = statusMeta(ticket.Status);
                        const cat = categoryMeta(ticket.Category);
                        const msgCount = Number(ticket.Messages) || 0;
                        return (
                          <button
                            key={ticket.Id}
                            type="button"
                            className="rw-ticket-item"
                            onClick={() => setView({ type: 'detail', id: ticket.Id })}
                          >
                            <span className="rw-ticket-item-icon">
                              <i className={`bi ${cat.icon}`} />
                            </span>
                            <span className="rw-ticket-item-main">
                              <strong>
                                <span className="rw-thread-id">#{ticket.Id}</span> {ticket.Subject}
                              </strong>
                              <span className="rw-ticket-item-sub">
                                {t.ticketCat[cat.id]} · {msgCount} {msgCount === 1 ? t.profMsgOne : t.profMsgMany} · {t.profUpdated} {formatDate(ticket.UpdatedAt, lang)}
                              </span>
                            </span>
                            <span className={`rw-badge ${status.className}`}>
                              <i className={`bi ${status.icon}`} /> {t.ticketStatus[ticket.Status]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="rw-footer">
        <div className="rw-footer-brand">
          <img src={logoNuevo} alt="Rustaco" />
          <span>{t.footerRights}</span>
        </div>
        <nav className="rw-footer-links">
          <Link to="/">{t.navHome}</Link>
          <Link to="/maps">{t.navMaps}</Link>
          <Link to="/events">{t.navLeaderboard}</Link>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">{t.navDiscord}</a>
        </nav>
      </footer>
    </div>
  );
}
