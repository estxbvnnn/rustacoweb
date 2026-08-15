import React from 'react';
import '../assets/styles.css';
import '../assets/home-dark.css';
import '../assets/server-theme.css';

import { useT } from '../context/LanguageContext.jsx';

import stonesImg from '../assets/img/stones.png';
import sulfurOreImg from '../assets/img/sulfur.ore.png';
import hqMetalOreImg from '../assets/img/hq.metal.ore.png';
import metalOreImg from '../assets/img/metal.ore.png';
import woodImg from '../assets/img/wood.png';
import clothImg from '../assets/img/Cloth_icon.webp';
import boneFragmentsImg from '../assets/img/Bone_Fragments_icon.webp';
import leatherImg from '../assets/img/Leather.webp';
import scrapImg from '../assets/img/Scrap_icon.webp';
import greenBerryImg from '../assets/img/rust-green-berry.webp';
import redBerryImg from '../assets/img/rust-red-berry.webp';
import blueBerryImg from '../assets/img/rust-blue-berry.webp';
import blackBerryImg from '../assets/img/rust-black-berry.webp';
import yellowBerryImg from '../assets/img/rust-yellow-berry.webp';
import whiteBerryImg from '../assets/img/rust-white-berry.webp';
import cornImg from '../assets/img/rust-corn-300x300.webp';
import pumpkinImg from '../assets/img/rust-pumpkin-300x300.webp';
import potatoImg from '../assets/img/rust-potato.webp';
import wheatImg from '../assets/img/rust-wheat-300x300.webp';
import mushroomImg from '../assets/img/rust-mushroom-300x300.webp';
import rocketBasicImg from '../assets/img/rust-ammo-rocket-basic-300x300.webp';
import rocketHvImg from '../assets/img/rust-ammo-rocket-hv-300x300.webp';
import rocketFireImg from '../assets/img/rust-ammo-rocket-fire-300x300.webp';
import explosiveTimedImg from '../assets/img/rust-explosive-timed-300x300.webp';
import rifleExplosiveImg from '../assets/img/rust-ammo-rifle-explosive-300x300.webp';
import crateNormal2Img from '../assets/img/radtown-crate-normal-2.avif';
import crateNormalImg from '../assets/img/radtown-crate-normal.avif';
import crateEliteImg from '../assets/img/radtown-crate-elite.avif';

const Events = () => {
  const table = 'PlayerStats';
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('PVP');
  const [search, setSearch] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState({ key: 'Kills', direction: 'desc' });
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [playerDetail, setPlayerDetail] = React.useState(null);
  const [detailLoading, setDetailLoading] = React.useState(false);
  const [detailError, setDetailError] = React.useState('');

  const t = useT();

  React.useEffect(() => {
    document.body.classList.add('has-video-bg');
    return () => document.body.classList.remove('has-video-bg');
  }, []);

  const headerMeta = {
    Rank: { label: '#', icon: 'trophy' },
    UserId: { label: 'UserId', icon: 'person-badge' },
    LastName: { label: t.lbColPlayer, icon: 'person' },
    Kills: { label: 'Kills', icon: 'crosshair' },
    Deaths: { label: 'Deaths', icon: 'heartbreak' },
    KDR: { label: 'KDR', icon: 'bar-chart' },
    TotalPlayTime: { label: 'Play Time', icon: 'clock' },
    ShortName: { label: 'Short Name', icon: 'tag' },
    LootType: { label: 'Loot Type', icon: 'boxes' },
    ItemValue: { label: 'Value', icon: 'hash' }
  };

  const columnOrder = {
    PlayerStats: ['Rank', 'LastName', 'Kills', 'Deaths', 'KDR'],
    StatsStorage: ['UserId', 'LootType', 'ShortName', 'ItemValue']
  };

  const resourceMeta = {
    stones: { label: 'Stone', image: stonesImg },
    'sulfur.ore': { label: 'Sulfur Ore', image: sulfurOreImg },
    'hq.metal.ore': { label: 'HQ Metal Ore', image: hqMetalOreImg },
    'metal.ore': { label: 'Metal Ore', image: metalOreImg },
    wood: { label: 'Wood', image: woodImg },
    cloth: { label: 'Cloth', image: clothImg },
    'bone.fragments': { label: 'Bone Fragments', image: boneFragmentsImg },
    leather: { label: 'Leather', image: leatherImg },
    scrap: { label: 'Scrap', image: scrapImg },
    'green.berry': { label: 'Green Berry', image: greenBerryImg },
    'red.berry': { label: 'Red Berry', image: redBerryImg },
    'blue.berry': { label: 'Blue Berry', image: blueBerryImg },
    'black.berry': { label: 'Black Berry', image: blackBerryImg },
    'yellow.berry': { label: 'Yellow Berry', image: yellowBerryImg },
    'white.berry': { label: 'White Berry', image: whiteBerryImg },
    corn: { label: 'Corn', image: cornImg },
    pumpkin: { label: 'Pumpkin', image: pumpkinImg },
    potato: { label: 'Potato', image: potatoImg },
    wheat: { label: 'Wheat', image: wheatImg },
    mushroom: { label: 'Mushroom', image: mushroomImg },
    'ammo.rocket.basic': { label: 'Rocket (Basic)', image: rocketBasicImg },
    'ammo.rocket.hv': { label: 'Rocket (HV)', image: rocketHvImg },
    'ammo.rocket.fire': { label: 'Rocket (Fire)', image: rocketFireImg },
    'explosive.timed': { label: 'Timed Explosive', image: explosiveTimedImg },
    'ammo.rifle.explosive': { label: 'Explosive 5.56', image: rifleExplosiveImg },
    crate_normal_2: { label: 'Normal Crate', image: crateNormal2Img },
    crate_normal: { label: 'Military Crate', image: crateNormalImg },
    crate_elite: { label: 'Elite Crate', image: crateEliteImg }
  };

  const resourceSections = [
    {
      title: 'Resources',
      icon: 'bi-minecart-loaded',
      items: ['sulfur.ore', 'stones', 'metal.ore', 'hq.metal.ore', 'wood', 'bone.fragments', 'leather', 'scrap']
    },
    {
      title: 'Farming',
      icon: 'bi-flower1',
      items: [
        'cloth',
        'green.berry',
        'red.berry',
        'blue.berry',
        'black.berry',
        'yellow.berry',
        'white.berry',
        'corn',
        'pumpkin',
        'potato',
        'wheat',
        'mushroom'
      ]
    },
    {
      title: 'Raid',
      icon: 'bi-fire',
      items: [
        'ammo.rocket.basic',
        'ammo.rocket.hv',
        'ammo.rocket.fire',
        'explosive.timed',
        'ammo.rifle.explosive'
      ]
    },
    {
      title: 'Loot',
      icon: 'bi-box-seam',
      items: ['crate_normal_2', 'crate_normal', 'crate_elite']
    }
  ];

  const tabs = [
    { key: 'PVP', icon: 'bi-crosshair' },
    { key: 'Resources', icon: 'bi-minecart-loaded' },
    { key: 'Farming', icon: 'bi-flower1' },
    { key: 'Raid', icon: 'bi-fire' },
    { key: 'Loot', icon: 'bi-box-seam' }
  ];

  const filterColumns = {
    PVP: ['Rank', 'LastName', 'Kills', 'Deaths', 'KDR'],
    Resources: ['Rank', 'LastName', ...resourceSections[0].items],
    Farming: ['Rank', 'LastName', ...resourceSections[1].items],
    Raid: ['Rank', 'LastName', ...resourceSections[2].items],
    Loot: ['Rank', 'LastName', ...resourceSections[3].items]
  };

  const visibleColumns = React.useMemo(() => {
    const target = filterColumns[activeFilter] || columns;
    return target.filter((col) => columns.includes(col) || col === 'Rank');
  }, [activeFilter, columns]);

  const handleSort = React.useCallback((column) => {
    if (column === 'Rank') {
      return;
    }

    setSortConfig((prev) => {
      if (prev.key === column) {
        return {
          key: column,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return {
        key: column,
        direction: 'desc'
      };
    });
  }, []);

  const sortedRows = React.useMemo(() => {
    if (!Array.isArray(rows) || rows.length === 0 || !sortConfig?.key || sortConfig.key === 'Rank') {
      return rows;
    }

    const { key, direction } = sortConfig;
    const directionFactor = direction === 'asc' ? 1 : -1;

    const asNumber = (value) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    };

    return [...rows].sort((a, b) => {
      const aValue = a?.[key];
      const bValue = b?.[key];

      const aNumber = asNumber(aValue);
      const bNumber = asNumber(bValue);

      if (aNumber !== null && bNumber !== null) {
        return (aNumber - bNumber) * directionFactor;
      }

      return String(aValue ?? '').localeCompare(String(bValue ?? ''), undefined, {
        numeric: true,
        sensitivity: 'base'
      }) * directionFactor;
    });
  }, [rows, sortConfig]);

  // filas con rank fijo según el orden actual; el buscador filtra sin alterar el rank
  const displayRows = React.useMemo(() => {
    const ranked = sortedRows.map((row, idx) => ({ row, rank: idx + 1 }));
    const term = search.trim().toLowerCase();
    if (!term) return ranked;
    return ranked.filter(({ row }) =>
      String(row.LastName ?? '').toLowerCase().includes(term)
    );
  }, [sortedRows, search]);

  // top 3 por kills para el podio (independiente del orden de la tabla)
  const podium = React.useMemo(() => {
    if (!Array.isArray(rows) || rows.length === 0) return [];
    return [...rows]
      .sort((a, b) => Number(b.Kills || 0) - Number(a.Kills || 0))
      .slice(0, 3);
  }, [rows]);

  const openPlayerDetail = async (row) => {
    const userIdFromRow = String(row?.UserId || '').trim();
    const nameFromRow = String(row?.LastName || '').trim();
    const isNumericId = (value) => /^[0-9]{5,20}$/.test(value);
    const userId = isNumericId(userIdFromRow)
      ? userIdFromRow
      : (isNumericId(nameFromRow) ? nameFromRow : '');
    if (!userId) return;

    setSelectedPlayer(row);
    setPlayerDetail(null);
    setDetailError('');
    setDetailLoading(true);

    try {
      const nickname = nameFromRow;
      const response = await fetch(
        `/api/player-stats?userId=${encodeURIComponent(userId)}&nickname=${encodeURIComponent(nickname)}`
      );
      if (!response.ok) {
        throw new Error('Player stats request failed');
      }
      const data = await response.json();
      setPlayerDetail(data);
    } catch (err) {
      setDetailError('No se pudieron cargar las estadísticas del jugador.');
    } finally {
      setDetailLoading(false);
    }
  };

  React.useEffect(() => {
    let isActive = true;

    const loadStats = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/stats?table=${encodeURIComponent(table)}&limit=50`);
        if (!response.ok) {
          throw new Error('Stats request failed');
        }
        const data = await response.json();
        let nextRows = Array.isArray(data.rows) ? data.rows : [];
        let nextColumns = nextRows[0] ? Object.keys(nextRows[0]) : [];

        if (table === 'PlayerStats') {
          const hiddenColumns = new Set([
            'UserId',
            'LastIP',
            'ConnectTime',
            'DisconnectTime',
            'TotalPlayTime',
            'Points',
            'HiddenFromLeaderboard'
          ]);
          nextColumns = nextColumns.filter((col) => !hiddenColumns.has(col));
          nextRows = [...nextRows].sort((a, b) => Number(b.Kills || 0) - Number(a.Kills || 0));
          nextColumns = ['Rank', ...nextColumns];
          setSortConfig({ key: 'Kills', direction: 'desc' });
          setSelectedPlayer(null);
          setPlayerDetail(null);
        }

        if (columnOrder[table]) {
          const order = columnOrder[table];
          const ordered = order.filter((col) => nextColumns.includes(col));
          const remaining = nextColumns.filter((col) => !order.includes(col));
          nextColumns = [...ordered, ...remaining];
        }

        if (isActive) {
          setRows(nextRows);
          setColumns(nextColumns);
        }
      } catch (err) {
        if (isActive) {
          setError('Las estadísticas estarán disponibles durante el wipe.');
          setRows([]);
          setColumns([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadStats();
    return () => {
      isActive = false;
    };
  }, []);

  const renderHeaderCell = (col) => {
    const meta = headerMeta[col];
    const resource = resourceMeta[col];

    if (resource?.image) {
      return (
        <span className="rw-lb-th-inner rw-lb-th-icon" title={resource.label}>
          <img src={resource.image} alt={resource.label} />
        </span>
      );
    }

    return (
      <span className="rw-lb-th-inner">
        {meta?.icon && <i className={`bi bi-${meta.icon}`} aria-hidden="true" />}
        <span>{meta?.label || col}</span>
      </span>
    );
  };

  const renderKdr = (value) => {
    const kdr = Number(value);
    if (!Number.isFinite(kdr)) return String(value ?? '');
    return (
      <span className={kdr >= 1 ? 'rw-lb-kdr--good' : 'rw-lb-kdr--bad'}>
        {String(value)}
      </span>
    );
  };

  return (
    <div className="rw-page">
      <main className="rw-lb-main">
        <div className="rw-lb-head">
          <span className="rw-section-kicker">{t.lbKicker}</span>
          <h1>{t.lbTitle}</h1>
          <p>{t.lbSubtitle}</p>
        </div>

        {loading && (
          <div className="rw-lb-state">
            <span className="rw-spinner" />
            <div>{t.lbLoading}</div>
          </div>
        )}

        {!loading && error && (
          <div className="rw-lb-state rw-lb-state--error">
            <i className="bi bi-exclamation-triangle" style={{ fontSize: '1.4rem', display: 'block', marginBottom: 8 }} />
            {error}
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="rw-lb-state">{t.lbEmpty}</div>
        )}

        {!loading && !error && rows.length > 0 && (
          <>
            {activeFilter === 'PVP' && podium.length === 3 && (
              <div className="rw-podium">
                {[podium[1], podium[0], podium[2]].map((player, visualIdx) => {
                  const place = visualIdx === 1 ? 1 : visualIdx === 0 ? 2 : 3;
                  return (
                    <div key={place} className={`rw-podium-card rw-podium-card--${place}`}>
                      <span className="rw-podium-medal">{place}</span>
                      <button
                        type="button"
                        className="rw-podium-name"
                        onClick={() => openPlayerDetail(player)}
                        title={String(player.LastName ?? '')}
                      >
                        {String(player.LastName ?? '')}
                      </button>
                      <div className="rw-podium-stats">
                        <div className="rw-podium-stat">
                          <strong>{String(player.Kills ?? 0)}</strong>
                          <span>Kills</span>
                        </div>
                        <div className="rw-podium-stat">
                          <strong>{String(player.Deaths ?? 0)}</strong>
                          <span>Deaths</span>
                        </div>
                        <div className="rw-podium-stat">
                          <strong>{String(player.KDR ?? 0)}</strong>
                          <span>KDR</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="rw-lb-controls">
              <div className="rw-lb-tabs" role="tablist" aria-label="Filtros de estadísticas">
                {tabs.map(({ key, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(key)}
                    className={`rw-lb-tab ${activeFilter === key ? 'rw-lb-tab--active' : ''}`}
                    role="tab"
                    aria-selected={activeFilter === key}
                  >
                    <i className={`bi ${icon}`} aria-hidden="true" /> {key === 'PVP' ? 'PVP' : (t.lbResGroups[key] || key)}
                  </button>
                ))}
              </div>

              <div className="rw-lb-search">
                <i className="bi bi-search" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t.lbSearch}
                  aria-label={t.lbSearch}
                />
              </div>
            </div>

            <div className="rw-lb-tablewrap">
              <table className="rw-lb-table">
                <thead>
                  <tr>
                    {visibleColumns.map((col) => (
                      <th
                        key={col}
                        onClick={() => handleSort(col)}
                        className={[
                          col !== 'Rank' ? 'rw-lb-th--sortable' : '',
                          sortConfig.key === col ? 'rw-lb-th--sorted' : ''
                        ].join(' ')}
                      >
                        <span className="rw-lb-th-inner">
                          {renderHeaderCell(col)}
                          {sortConfig.key === col && (
                            <i
                              className={`bi ${sortConfig.direction === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`}
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map(({ row, rank }) => (
                    <tr key={rank}>
                      {visibleColumns.map((col) => (
                        <td key={`${rank}-${col}`}>
                          {col === 'Rank' ? (
                            <span className={`rw-lb-rank ${rank <= 3 ? `rw-lb-rank--${rank}` : ''}`}>
                              {rank}
                            </span>
                          ) : col === 'LastName' ? (
                            <button
                              type="button"
                              onClick={() => openPlayerDetail(row)}
                              className="rw-lb-player"
                            >
                              {String(row[col] ?? '')}
                            </button>
                          ) : col === 'KDR' ? (
                            renderKdr(row[col])
                          ) : (
                            Number.isFinite(Number(row[col]))
                              ? Number(row[col]).toLocaleString()
                              : String(row[col] ?? '')
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {displayRows.length === 0 && (
                <div className="rw-lb-state" style={{ border: 'none' }}>
                  {t.lbNoResults} "{search}".
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {selectedPlayer && (
        <div
          role="presentation"
          onClick={() => setSelectedPlayer(null)}
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
                <i className="bi bi-person-fill" aria-hidden="true" />
                {playerDetail?.player?.LastName || selectedPlayer.LastName || 'Jugador'}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedPlayer(null)}
                className="rw-modal-close"
                aria-label="Cerrar"
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            {detailLoading && (
              <div className="rw-lb-state" style={{ border: 'none' }}>
                <span className="rw-spinner" />
                <div>{t.lbLoading}</div>
              </div>
            )}

            {!detailLoading && detailError && (
              <div className="rw-lb-state rw-lb-state--error" style={{ border: 'none' }}>
                {detailError}
              </div>
            )}

            {!detailLoading && !detailError && playerDetail && (
              <div className="rw-modal-body">
                <div className="rw-modal-statgrid">
                  {[
                    { label: 'Kills', value: playerDetail.player?.Kills, icon: 'crosshair' },
                    { label: 'Deaths', value: playerDetail.player?.Deaths, icon: 'heartbreak' },
                    { label: 'KDR', value: playerDetail.player?.KDR, icon: 'bar-chart' }
                  ].map((item) => (
                    <div key={item.label} className="rw-modal-stat">
                      <i className={`bi bi-${item.icon}`} aria-hidden="true" />
                      <strong>{String(item.value ?? 0)}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                {playerDetail.resources?.length === 0 ? (
                  <div className="rw-lb-state" style={{ border: 'none' }}>
                    {t.lbNoResources}
                  </div>
                ) : (
                  resourceSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="rw-modal-sectiontitle">
                        <span>
                          <i className={`bi ${section.icon}`} aria-hidden="true" /> {t.lbResGroups[section.title] || section.title}
                        </span>
                      </h3>
                      <div className="rw-resource-grid">
                        {section.items.map((shortName) => {
                          const resource = playerDetail.resources?.find(
                            (item) => item.ShortName === shortName
                          );
                          const meta = resourceMeta[shortName];
                          const label = meta?.label || shortName;
                          return (
                            <div key={shortName} className="rw-resource-card" title={label}>
                              {meta?.image && <img src={meta.image} alt={label} />}
                              <strong>{Number(resource?.ItemValue || 0).toLocaleString()}</strong>
                              <span>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
