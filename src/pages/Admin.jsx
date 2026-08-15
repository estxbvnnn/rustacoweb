import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles.css';
import '../assets/home-dark.css';
import '../assets/server-theme.css';

import { useLang, useT, formatDate } from '../context/LanguageContext.jsx';
import { LOGIN_ENABLED } from '../config/features.js';
import {
  TICKET_CATEGORIES,
  TicketThread,
  categoryMeta,
  statusMeta,
} from './Profile.jsx';

async function readJsonSafe(response) {
  try {
    return await response.json();
  } catch (e) {
    return null;
  }
}

export default function Admin() {
  const { lang } = useLang();
  const t = useT();
  const [user, setUser] = React.useState(undefined);
  const [tab, setTab] = React.useState('tickets'); // tickets | users

  // tickets
  const [tickets, setTickets] = React.useState([]);
  const [counts, setCounts] = React.useState({ open: 0, answered: 0, closed: 0 });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [selectedId, setSelectedId] = React.useState(null);
  const [deleteError, setDeleteError] = React.useState('');

  // usuarios
  const [users, setUsers] = React.useState([]);
  const [usersLoading, setUsersLoading] = React.useState(false);

  const STATUS_FILTERS = [
    { id: '', label: t.admFilterAll },
    { id: 'open', label: t.admOpen },
    { id: 'answered', label: t.admAnswered },
    { id: 'closed', label: t.admClosed },
  ];

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

  const isAdmin = Boolean(user && user.isAdmin);

  const loadTickets = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (categoryFilter) params.set('category', categoryFilter);
      if (search.trim()) params.set('q', search.trim());
      const response = await fetch(`/api/admin/tickets?${params.toString()}`, { credentials: 'include' });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setError(json?.error || t.admTicketsLoading);
        setTickets([]);
        return;
      }
      setTickets(Array.isArray(json?.tickets) ? json.tickets : []);
      if (json?.counts) setCounts(json.counts);
    } catch (e) {
      setError(t.tkErrConn);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, search, t]);

  React.useEffect(() => {
    if (!isAdmin) return;
    loadTickets();
  }, [isAdmin, loadTickets]);

  React.useEffect(() => {
    if (!isAdmin || tab !== 'users') return undefined;
    let active = true;
    setUsersLoading(true);
    fetch('/api/admin/users', { credentials: 'include' })
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => {
        if (active) setUsers(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setUsers([]);
      })
      .finally(() => {
        if (active) setUsersLoading(false);
      });
    return () => {
      active = false;
    };
  }, [isAdmin, tab]);

  const deleteTicket = async (id) => {
    if (!window.confirm(t.admDeleteConfirm(id))) {
      return;
    }
    setDeleteError('');
    try {
      const response = await fetch(`/api/admin/tickets/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const json = await readJsonSafe(response);
      if (!response.ok) {
        setDeleteError(json?.error || t.admDeleteError);
        return;
      }
      if (selectedId === id) setSelectedId(null);
      loadTickets();
    } catch (e) {
      setDeleteError(t.tkErrConn);
    }
  };

  return (
    <div className="rw-page">
      <main className="rw-lb-main">
        {user === undefined && (
          <div className="rw-lb-state" style={{ maxWidth: 560 }}>
            <span className="rw-spinner" />
            <div>{t.admChecking}</div>
          </div>
        )}

        {user === null && (
          <div className="rw-login-card">
            <i className="bi bi-shield-lock rw-login-icon" />
            <h1>{LOGIN_ENABLED ? t.admRestrictedTitle : t.loginDisabledTitle}</h1>
            <p>{LOGIN_ENABLED ? t.admRestrictedText : t.loginDisabledText}</p>
            {LOGIN_ENABLED && (
              <a className="rw-btn rw-btn--primary" href="/auth/steam">
                <i className="bi bi-steam" /> {t.profLoginBtn}
              </a>
            )}
          </div>
        )}

        {user && !isAdmin && (
          <div className="rw-login-card">
            <i className="bi bi-shield-x rw-login-icon" />
            <h1>{t.admNoPermTitle}</h1>
            <p>
              {t.admNoPermPre} <b>{user.name}</b> {t.admNoPermPost}
            </p>
            <Link className="rw-btn rw-btn--ghost" to="/profile">
              <i className="bi bi-person" /> {t.admGoProfile}
            </Link>
          </div>
        )}

        {isAdmin && (
          <div className="rw-profile">
            <div className="rw-lb-head" style={{ marginBottom: '1.6rem' }}>
              <span className="rw-section-kicker">{t.admKicker}</span>
              <h1>{t.admTitle}</h1>
            </div>

            {/* ── Contadores ── */}
            <section className="rw-admin-stats">
              <div className="rw-admin-stat rw-admin-stat--open">
                <strong>{counts.open}</strong>
                <span>{t.admOpen}</span>
              </div>
              <div className="rw-admin-stat rw-admin-stat--answered">
                <strong>{counts.answered}</strong>
                <span>{t.admAnswered}</span>
              </div>
              <div className="rw-admin-stat rw-admin-stat--closed">
                <strong>{counts.closed}</strong>
                <span>{t.admClosed}</span>
              </div>
              <div className="rw-admin-stat">
                <strong>{counts.open + counts.answered + counts.closed}</strong>
                <span>{t.admTotal}</span>
              </div>
            </section>

            {/* ── Tabs panel ── */}
            <div className="rw-lb-tabs" style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>
              <button
                type="button"
                className={`rw-lb-tab ${tab === 'tickets' ? 'rw-lb-tab--active' : ''}`}
                onClick={() => setTab('tickets')}
              >
                <i className="bi bi-ticket-detailed" /> {t.admTabTickets}
              </button>
              <button
                type="button"
                className={`rw-lb-tab ${tab === 'users' ? 'rw-lb-tab--active' : ''}`}
                onClick={() => setTab('users')}
              >
                <i className="bi bi-people" /> {t.admTabUsers}
              </button>
            </div>

            {tab === 'tickets' && (
              <section className="rw-panel">
                {/* filtros */}
                <div className="rw-admin-filters">
                  <div className="rw-lb-tabs">
                    {STATUS_FILTERS.map((filter) => (
                      <button
                        key={filter.id || 'all'}
                        type="button"
                        className={`rw-lb-tab ${statusFilter === filter.id ? 'rw-lb-tab--active' : ''}`}
                        onClick={() => setStatusFilter(filter.id)}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  <select
                    className="rw-input rw-input--inline"
                    value={categoryFilter}
                    onChange={(event) => setCategoryFilter(event.target.value)}
                    aria-label={t.admAllCategories}
                  >
                    <option value="">{t.admAllCategories}</option>
                    {TICKET_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{t.ticketCat[cat.id]}</option>
                    ))}
                  </select>
                  <div className="rw-lb-search">
                    <i className="bi bi-search" aria-hidden="true" />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={t.admSearchTickets}
                      aria-label={t.admSearchTickets}
                    />
                  </div>
                </div>

                {deleteError && (
                  <div className="rw-form-error">
                    <i className="bi bi-exclamation-circle" /> {deleteError}
                  </div>
                )}

                {loading && (
                  <div className="rw-lb-state" style={{ border: 'none' }}>
                    <span className="rw-spinner" />
                    <div>{t.admTicketsLoading}</div>
                  </div>
                )}

                {!loading && error && (
                  <div className="rw-lb-state rw-lb-state--error">{error}</div>
                )}

                {!loading && !error && tickets.length === 0 && (
                  <div className="rw-lb-state" style={{ border: 'none' }}>
                    <i className="bi bi-inbox" style={{ fontSize: '1.6rem', display: 'block', marginBottom: 8 }} />
                    {t.admNoTickets}
                  </div>
                )}

                {!loading && !error && tickets.length > 0 && (
                  <div className="rw-ticket-list">
                    {tickets.map((ticket) => {
                      const status = statusMeta(ticket.Status);
                      const cat = categoryMeta(ticket.Category);
                      return (
                        <div key={ticket.Id} className="rw-ticket-item rw-ticket-item--admin">
                          <button
                            type="button"
                            className="rw-ticket-item-open"
                            onClick={() => setSelectedId(ticket.Id)}
                          >
                            <span className="rw-ticket-item-icon">
                              {ticket.Avatar ? <img src={ticket.Avatar} alt="" /> : <i className={`bi ${cat.icon}`} />}
                            </span>
                            <span className="rw-ticket-item-main">
                              <strong>
                                <span className="rw-thread-id">#{ticket.Id}</span> {ticket.Subject}
                              </strong>
                              <span className="rw-ticket-item-sub">
                                {ticket.UserName} ({ticket.SteamId}) · {t.ticketCat[cat.id]} · {Number(ticket.Messages) || 0} msg · {formatDate(ticket.UpdatedAt, lang)}
                              </span>
                            </span>
                            <span className={`rw-badge ${status.className}`}>
                              <i className={`bi ${status.icon}`} /> {t.ticketStatus[ticket.Status]}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="rw-icon-btn rw-icon-btn--danger"
                            title={t.admDeleteConfirm(ticket.Id)}
                            onClick={() => deleteTicket(ticket.Id)}
                          >
                            <i className="bi bi-trash3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {tab === 'users' && (
              <section className="rw-panel">
                <div className="rw-panel-head">
                  <h2>
                    <i className="bi bi-people" /> {t.admUsersTitle}
                  </h2>
                </div>
                {usersLoading ? (
                  <div className="rw-lb-state" style={{ border: 'none' }}>
                    <span className="rw-spinner" />
                    <div>{t.admUsersLoading}</div>
                  </div>
                ) : users.length === 0 ? (
                  <div className="rw-lb-state" style={{ border: 'none' }}>
                    {t.admNoUsers}
                  </div>
                ) : (
                  <div className="rw-ticket-list">
                    {users.map((entry) => (
                      <div key={entry.steamid} className="rw-ticket-item" style={{ cursor: 'default' }}>
                        <span className="rw-ticket-item-icon">
                          {entry.avatar ? <img src={entry.avatar} alt="" /> : <i className="bi bi-person-circle" />}
                        </span>
                        <span className="rw-ticket-item-main">
                          <strong>{entry.name}</strong>
                          <span className="rw-ticket-item-sub">
                            {entry.steamid} · {t.admLastLogin}: {formatDate(entry.lastLogin, lang)}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </main>

      {/* ── Modal detalle de ticket ── */}
      {isAdmin && selectedId !== null && (
        <div
          role="presentation"
          onClick={() => setSelectedId(null)}
          className="rw-modal-overlay"
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="rw-modal"
          >
            <div className="rw-modal-header">
              <h2 className="rw-modal-title">
                <i className="bi bi-ticket-detailed" aria-hidden="true" />
                Ticket #{selectedId}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rw-modal-close"
                aria-label="Cerrar"
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
            <div className="rw-modal-body">
              <TicketThread
                ticketId={selectedId}
                currentUser={user}
                onChanged={loadTickets}
                allowAdminActions
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
