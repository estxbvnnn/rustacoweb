import React from 'react';
import { useHistory } from 'react-router-dom';

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
import skullImg from '../assets/img/skull.png';

const Events = () => {
  const history = useHistory();
  const table = 'PlayerStats';
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('PVP');
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [playerDetail, setPlayerDetail] = React.useState(null);
  const [detailLoading, setDetailLoading] = React.useState(false);
  const [detailError, setDetailError] = React.useState('');

  React.useEffect(() => {
    document.body.classList.add('has-video-bg');
    return () => document.body.classList.remove('has-video-bg');
  }, []);

  const headerMeta = {
    Rank: { label: '#', icon: 'trophy' },
    UserId: { label: 'UserId', icon: 'person-badge' },
    LastName: { label: 'Nickname', icon: 'person' },
    Kills: { label: 'Kills', icon: 'crosshair' },
    Deaths: { label: 'Deaths', icon: 'skull' },
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
      items: ['sulfur.ore', 'stones', 'metal.ore', 'hq.metal.ore', 'wood', 'bone.fragments', 'leather', 'scrap']
    },
    {
      title: 'Farming',
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
      items: ['crate_normal_2', 'crate_normal', 'crate_elite']
    }
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

  const buildResourceCards = (shortNames) => (
    shortNames
      .map((shortName) => {
        const resource = playerDetail.resources?.find(
          (item) => item.ShortName === shortName
        );
        const meta = resourceMeta[shortName];
        return {
          ShortName: shortName,
          label: meta?.label || shortName,
          image: meta?.image || '',
          ItemValue: resource ? resource.ItemValue : 0
        };
      })
      .map((resource) => (
        <div key={resource.ShortName} className="resource-card">
          <div
            className="resource-icon"
            aria-label={resource.label}
            title={resource.label}
          >
            {resource.image ? (
              <span className="resource-icon-wrap">
                <img src={resource.image} alt={resource.label} />
              </span>
            ) : (
              <span>{resource.label}</span>
            )}
          </div>
          <div className="resource-value">
            {Number(resource.ItemValue || 0).toLocaleString()}
          </div>
        </div>
      ))
  );

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
      setDetailError('Unable to load player stats.');
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
          setError('stats disponibles en el evento');
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

  return (
    <div className="events-panel">
      <h1 className="events-title">Event Statistics</h1>

      <div className="events-tabs" role="tablist" aria-label="Stats filters">
        {['PVP', 'Resources', 'Farming', 'Raid', 'Loot'].map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`events-tab ${activeFilter === filter ? 'events-tab--active' : ''}`}
            role="tab"
            aria-selected={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading && (
        <div className="events-state">Loading stats...</div>
      )}

      {!loading && error && (
        <div className="events-state events-state--error">{error}</div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="events-state events-state--empty">No records yet.</div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="events-table-wrap">
          <table className="events-table">
            <thead>
              <tr>
                {visibleColumns.map((col) => (
                  <th key={col} className="events-th">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      {col === 'Deaths' ? (
                        <span
                          className="events-header-icon events-header-icon--skull"
                          title={headerMeta[col]?.label || col}
                          aria-label={headerMeta[col]?.label || col}
                        >
                          <img src={skullImg} alt={headerMeta[col]?.label || col} />
                        </span>
                      ) : resourceMeta[col]?.image ? (
                        <span
                          className="events-header-icon"
                          title={resourceMeta[col].label}
                          aria-label={resourceMeta[col].label}
                        >
                          <img src={resourceMeta[col].image} alt={resourceMeta[col].label} />
                        </span>
                      ) : (
                        <>
                          {headerMeta[col]?.icon && (
                            <i className={`bi bi-${headerMeta[col].icon}`} aria-hidden="true" />
                          )}
                          <span className="sr-only">{headerMeta[col]?.label || col}</span>
                        </>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? 'events-row events-row--even' : 'events-row events-row--odd'}
                >
                  {visibleColumns.map((col) => (
                    <td key={`${idx}-${col}`} className="events-td">
                      {table === 'PlayerStats' && col === 'Rank' ? (
                        <span className="events-rank">{idx + 1}</span>
                      ) : table === 'PlayerStats' && col === 'LastName' ? (
                        <button
                          type="button"
                          onClick={() => openPlayerDetail(row)}
                          className="events-player-btn"
                        >
                          {String(row[col] ?? '')}
                        </button>
                      ) : table === 'PlayerStats' && col === 'Deaths' ? (
                        <span>{String(row[col] ?? '')}</span>
                      ) : (
                        String(row[col] ?? '')
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPlayer && (
        <div
          role="presentation"
          onClick={() => setSelectedPlayer(null)}
          className="player-modal-overlay"
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="player-modal"
          >
            <div className="player-modal-header">
              <h2 className="player-modal-title">
                {playerDetail?.player?.LastName || selectedPlayer.LastName || 'Player'}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedPlayer(null)}
                className="player-modal-close"
              >
                Close
              </button>
            </div>

            {detailLoading && (
              <div className="events-state">Loading stats...</div>
            )}

            {!detailLoading && detailError && (
              <div className="events-state events-state--error">{detailError}</div>
            )}

            {!detailLoading && !detailError && playerDetail && (
              <div className="player-modal-body">
                <div className="stats-grid">
                  {[
                    { label: 'Kills', value: playerDetail.player?.Kills, icon: 'crosshair' },
                    { label: 'Deaths', value: playerDetail.player?.Deaths, icon: 'skull' },
                    { label: 'KDR', value: playerDetail.player?.KDR, icon: 'bar-chart' }
                  ].map((item) => (
                    <div key={item.label} className="stat-card">
                      <div className="stat-label">
                        <i className={`bi bi-${item.icon}`} aria-hidden="true" />
                        {item.label}
                      </div>
                      <div className="stat-value">{String(item.value ?? 0)}</div>
                    </div>
                  ))}
                </div>

                {playerDetail.resources?.length === 0 ? (
                  <div className="events-state">No resources recorded.</div>
                ) : (
                  resourceSections.map((section) => (
                    <div key={section.title} className="resource-section">
                      <h3 className="resource-title">{section.title}</h3>
                      <div className="resource-grid">
                        {buildResourceCards(section.items)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <button onClick={() => history.push('/')} className="events-back-btn">
        Back to home
      </button>
    </div>
  );
};

export default Events;
