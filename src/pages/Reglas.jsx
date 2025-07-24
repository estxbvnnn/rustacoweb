import React from 'react';
import { useHistory } from 'react-router-dom';
import ammoGrenadeLauncherHE from '../assets/img/ammo.grenadelauncher.he.png';
import ammoRocketHV from '../assets/img/ammo.rocket.hv.png';
import grenadeF1 from '../assets/img/grenade.f1.png';
import eraPrimitivo from '../assets/img/primitivo.png';
import eraTier1 from '../assets/img/tier1.png';
import eraTier2 from '../assets/img/tier2.png';
import eraTier3 from '../assets/img/tier3.png';
import eraRaids from '../assets/img/raids.png';
import samsite from '../assets/img/samsite.png';
import flameturret from '../assets/img/flameturret.png';
import autoturret from '../assets/img/autoturret.png';
import guntrap from '../assets/img/guntrap.png';
import buildingexterior from '../assets/img/buildingexterior.png';
import heavyHelmet from '../assets/img/heavy.plate.helmet.png';
import heavyJacket from '../assets/img/heavy.plate.jacket.png';
import heavyPants from '../assets/img/heavy.plate.pants.png';
import scope8x from '../assets/img/weapon.mod.8x.scope.png';
import scope16x from '../assets/img/weapon.mod.16x.scope.png';
import rifleL96 from '../assets/img/rifle.l96.png';
import muzzleBoost from '../assets/img/weapon.mod.muzzleboost.png';
import oilFilterSilencer from '../assets/img/weapon.mod.oilfiltersilencer.png';
import silencer from '../assets/img/weapon.mod.silencer.png';
import sodaCanSilencer from '../assets/img/weapon.mod.sodacansilencer.png';
import sulfurOre from '../assets/img/sulfur.ore.png';
import hqMetalOre from '../assets/img/hq.metal.ore.png';
import armoredDoor from '../assets/img/door.hinged.toptier.png';
import armoredDoubleDoor from '../assets/img/door.double.hinged.toptier.png';
import stone from '../assets/img/stones.png';
import metalOre from '../assets/img/metal.ore.png';
import wood from '../assets/img/wood.png';
import metalFragments from '../assets/img/metal.fragments.png';
import mapaRustacooo from '../assets/img/maparustacooo.png';

const SideAnimation = ({ side = 'left' }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      [side]: 0,
      height: '100%',
      width: 70,
      pointerEvents: 'none',
      zIndex: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
      background: 'none'
    }}
  >
    <div
      style={{
        width: 12,
        height: '80%',
        margin: 'auto',
        borderRadius: 18,
        background: side === 'left'
          ? 'linear-gradient(180deg, #e25822 0%, #23201a 100%)'
          : 'linear-gradient(180deg, #7289da 0%, #23201a 100%)',
        boxShadow: side === 'left'
          ? '0 0 32px 8px #e2582255, 0 0 0 0 #0000'
          : '0 0 32px 8px #7289da55, 0 0 0 0 #0000',
        animation: `sideGlow-${side} 2.5s ease-in-out infinite alternate`
      }}
    />
    <style>
      {`
        @keyframes sideGlow-left {
          0% { box-shadow: 0 0 32px 8px #e2582255, 0 0 0 0 #0000; }
          100% { box-shadow: 0 0 64px 24px #e25822cc, 0 0 0 0 #0000; }
        }
        @keyframes sideGlow-right {
          0% { box-shadow: 0 0 32px 8px #7289da55, 0 0 0 0 #0000; }
          100% { box-shadow: 0 0 64px 24px #7289dacc, 0 0 0 0 #0000; }
        }
      `}
    </style>
  </div>
);

const fadeInDelay = delay => ({
  animation: `fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both`,
  animationDelay: `${delay}s`
});

const iconStyle = {
  width: 38,
  height: 38,
  objectFit: 'contain',
  verticalAlign: 'middle',
  marginRight: 10,
  background: '#181818',
  borderRadius: 8,
  boxShadow: '0 1px 8px #0007',
  transition: 'transform 0.3s cubic-bezier(.39,.575,.565,1), box-shadow 0.3s cubic-bezier(.39,.575,.565,1)',
  willChange: 'transform'
};

const eraCardStyle = {
  background: 'linear-gradient(120deg, #23201a 80%, #3a4bd8 100%)',
  borderRadius: '14px',
  boxShadow: '0 2px 16px #000a',
  padding: '1.2rem 1.2rem',
  marginBottom: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  borderLeft: '5px solid #7289da',
  transition: 'transform 0.2s cubic-bezier(.39,.575,.565,1), box-shadow 0.2s cubic-bezier(.39,.575,.565,1)'
};

const reglaCardStyle = {
  background: 'linear-gradient(120deg, #23201a 80%, #2d2d2d 100%)',
  borderRadius: '18px',
  boxShadow: '0 8px 32px #000b',
  padding: '2.1rem 2.2rem',
  marginBottom: '2.2rem',
  borderLeft: '7px solid var(--rust-orange)',
  borderRight: '2px solid #7289da55',
  transition: 'box-shadow 0.2s, transform 0.2s',
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden'
};

const eras = [
  {
    nombre: "Era Primitivo",
    imagen: eraPrimitivo,
    descripcion: "Comienzo del evento con armas y herramientas primitivas."
  },
  {
    nombre: "Era Tier 1",
    imagen: eraTier1,
    descripcion: "Acceso a equipamiento y armas de Tier 1."
  },
  {
    nombre: "Era Tier 2",
    imagen: eraTier2,
    descripcion: "Se habilitan armas y objetos de Tier 2."
  },
  {
    nombre: "Era Tier 3",
    imagen: eraTier3,
    descripcion: "Desbloqueo de todo el arsenal y equipamiento de Tier 3."
  },
  {
    nombre: "Era Raids",
    imagen: eraRaids,
    descripcion: "Comienza la era de raideos, se habilitan los ataques a las Bases MAIN."
  }
];

const reglas = [
  {
    titulo: "1. Formato general",
    descripcion: (
      <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
        <li><b>112 jugadores</b> en total.</li>
        <li><b>Equipos de 8 participantes</b>.</li>
        <li>Se realizarán <b>diversos eventos especiales</b> durante el evento.</li>
        <li><b>Fishing Bandits</b>.</li>
      </ul>
    )
  },
{
  titulo: "2. Ítems prohibidos durante el evento",
  descripcion: (
    <div>
      Durante el evento, los siguientes ítems estarán <b>totalmente prohibidos</b> y no podrán ser usados bajo ninguna circunstancia:
      <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
        <li>
          <img src={heavyHelmet} alt="Heavy Plate Helmet" style={iconStyle} />
          <img src={heavyJacket} alt="Heavy Plate Jacket" style={iconStyle} />
          <img src={heavyPants} alt="Heavy Plate Pants" style={iconStyle} />
          Armaduras pesadas (<b>Heavy Plate Helmet, Jacket y Pants</b>)
        </li>
        <li>
          <img src={scope8x} alt="8x Scope" style={iconStyle} />
          <img src={scope16x} alt="16x Scope" style={iconStyle} />
          Mira 8x (<b>8x Scope</b>) y Mira 16x (<b>16x Scope</b>)
        </li>
        <li>
          <img src={rifleL96} alt="Rifle L96" style={iconStyle} />
          Rifle L96 (<b>L96 Rifle</b>)
        </li>
        <li>
          <img src={muzzleBoost} alt="Muzzle Boost" style={iconStyle} />
          Muzzle Boost (<b>Bocacha de aceleración</b>)
        </li>
        <li>
          <img src={oilFilterSilencer} alt="Oil Filter Silencer" style={iconStyle} />
          Oil Filter Silencer (<b>Silenciador de filtro de aceite</b>)
        </li>
        <li>
          <img src={silencer} alt="Silencer" style={iconStyle} />
          Silencer (<b>Silenciador estándar</b>)
        </li>
        <li>
          <img src={sodaCanSilencer} alt="Soda Can Silencer" style={iconStyle} />
          Soda Can Silencer (<b>Silenciador de lata</b>)
        </li>
        <li>
          <img src={armoredDoor} alt="Armored Door" style={iconStyle} />
          <img src={armoredDoubleDoor} alt="Armored Double Door" style={iconStyle} />
          Puertas blindadas (<b>Armored Door</b> e <b>Armored Double Door</b>)
        </li>
      </ul>
      <span style={{ color: "#f39c12" }}>
        El uso de cualquiera de estos ítems resultará en sanción inmediata para el jugador y/o el equipo.
      </span>
    </div>
  )
},
{
  titulo: "2.1. Reducción de daño de explosivos a jugadores",
  descripcion: (
    <div>
      El daño recibido por jugadores de los siguientes explosivos será <b>reducido considerablemente</b> durante el evento:
      <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
        <li>
          <img src={ammoGrenadeLauncherHE} alt="40mm Grenade" style={iconStyle} />
          40mm Grenade (<b>Granada lanzagranadas</b>)
        </li>
        <li>
          <img src={ammoRocketHV} alt="High Velocity Rocket" style={iconStyle} />
          High Velocity Rocket (<b>Cohete de alta velocidad</b>)
        </li>
        <li>
          <img src={grenadeF1} alt="F1 Grenade" style={iconStyle} />
          Granada F1 (<b>F1 Grenade</b>)
        </li>
      </ul>
      <span style={{ color: "#f39c12" }}>
        Estos explosivos seguirán causando daño al BradleyAPC normalmente, pero el daño a jugadores será reducido para evitar muertes instantáneas y fomentar el combate.
      </span>
    </div>
  )
},
  {
    titulo: "3. Recursos",
    descripcion: (
      <div>
        El farmeo de recursos minerales estará configurado a <b>x2.0</b> durante todo el evento.
        <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
          <img src={sulfurOre} alt="Sulfur Ore" style={iconStyle} title="Sulfur Ore" />
          <img src={hqMetalOre} alt="HQ Metal Ore" style={iconStyle} title="HQ Metal Ore" />
          <img src={stone} alt="Stone" style={iconStyle} title="Stone" />
          <img src={metalOre} alt="Metal Ore" style={iconStyle} title="Metal Ore" />
        </div>
        <span style={{ color: "#f39c12", display: 'block', marginTop: 8 }}>
          Todos los minerales, recursos, componenentes, etc, tendran multiplicador x2.0.
        </span>
      </div>
    )
  },
  {
    titulo: "4. Mejoras de building",
    descripcion: (
      <div>
        Las mejoras de building del evento solo estarán permitidas hasta <b>metal</b> (no se permite HQ).
        <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
          <img src={wood} alt="Wood" style={iconStyle} title="Wood" />
          <img src={stone} alt="Stone" style={iconStyle} title="Stone" />
          <img src={metalFragments} alt="Metal Fragments" style={iconStyle} title="Metal Fragments" />
        </div>
        <span style={{ color: "#f39c12", display: 'block', marginTop: 8 }}>
          No está permitido mejorar estructuras a HQ (High Quality Metal).
        </span>
      </div>
    )
  },
  {
    titulo: "5. Mecánica principal: Sistema de Dogtags",
    descripcion: (
      <span>
        Cada jugador, al ser eliminado, soltará un <b>dogtag</b> (placa identificatoria). Los equipos deberán recolectar los dogtags de sus rivales y depositarlos en el <b>armario principal</b> de su base para que sean contabilizados. <br />
        <span style={{ color: "#f39c12" }}>Solo los dogtags depositados correctamente sumarán puntos para el equipo.</span>
      </span>
    )
  },
  {
    titulo: "6. Eliminación por destrucción del TC",
    descripcion: (
      <span>
        Durante la <b>era de raideos</b>, si el <b>TC (armario principal)</b> de tu equipo es destruido, <span style={{ color: "#e25822", fontWeight: 700 }}>tu equipo quedará eliminado</span> del evento.
      </span>
    )
  },
  {
    titulo: "7. Estructura y reglas de las islas y bases",
    descripcion: (
      <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
        <li>
          Cada isla cuenta con:
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
            <li>Un espacio designado para la <b>base principal (main)</b>.</li>
            <li>Un área específica para la <b>zona de huerto/garage</b> (9x8).</li>
            <li>Una <b>entrada a metro</b> exclusiva para cada isla.</li>
          </ul>
        </li>
        <li>
          La <b>base main</b> debe construirse únicamente en el espacio asignado (14x14). <br />
          <span style={{ color: "#f39c12" }}>No está permitido sobrepasar los límites de la zona asignada, incluyendo la zona de huerto.</span>
        </li>
        <li>
          El <b>TC (armario principal)</b> de la base main debe ser accesible en todo momento. Solo puede estar protegido por puertas o ventanas, <b>no puede estar completamente cerrado ni grifeado</b>.
        </li>
        <li>
          El <b>TC</b> puede ser movido en caso de ser necesario, pero <b>debe solicitarse el cambio a la administración</b>. <br />
          <span style={{ color: "#f39c12" }}>El TC main solo podrá ser cambiado hasta 1 hora antes del inicio de la era de raideos.</span>
        </li>
      </ul>
    )
  },
  {
    titulo: "8. Evento por Eras",
    descripcion: (
      <div>
        <div style={{ marginBottom: 18 }}>
          El evento está estructurado en <b>eras</b>, cada una con sus propias reglas y restricciones. A medida que avanza el evento, se habilitan nuevos objetos, armas y mecánicas para todos los equipos. 
          <br /><br />
          <b>IMPORTANTE:</b> Presta atención a los anuncios de la organización para saber cuándo comienza cada era y qué está permitido en cada una. ¡Planifica tu estrategia en función de la era actual!
        </div>
        <div>
          <h3 style={{
            color: '#7289da',
            fontWeight: 800,
            fontSize: '1.15rem',
            margin: '1.2rem 0 0.7rem 0',
            textAlign: 'left',
            letterSpacing: '1px'
          }}>
            Eras del Evento
          </h3>
          {eras.map((era, idx) => (
            <div key={idx} style={eraCardStyle}>
              <img
                src={era.imagen}
                alt={era.nombre}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: 'contain',
                  borderRadius: 12,
                  background: '#181818',
                  boxShadow: '0 1px 8px #0007'
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.08rem', color: '#b3cfff', marginBottom: 4 }}>
                  {era.nombre}
                </div>
                <div style={{ fontSize: '1.01rem', color: '#e0e0e0' }}>
                  {era.descripcion}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    titulo: "9. Límite de SAM Turrets y Torretas de Fuego",
    descripcion: (
      <div>
        Cada base puede tener un máximo de <b>1 SAM Turret</b> colocada. Las <b>Torretas de Fuego</b> siguen estando totalmente prohibidas durante el evento.
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
          <span>
            <img src={samsite} alt="SAM Site" style={iconStyle} />
            <b>SAM Turret</b> (máx. 1 por base)
          </span>
          <span>
            <img src={flameturret} alt="Flame Turret" style={iconStyle} />
            <b>Torretas de Fuego</b> prohibidas
          </span>
        </div>
      </div>
    )
  },
  {
    titulo: "10. Límite de torretas y trampas",
    descripcion: (
      <div>
        El uso de torretas está limitado a un máximo de <b>12 Auto Turrets</b> y <b>12 Escopetas Trampa</b> por equipo.
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
          <span>
            <img src={autoturret} alt="Auto Turret" style={iconStyle} />
            <b>Auto Turret</b> (máx. 12)
          </span>
          <span>
            <img src={guntrap} alt="Gun Trap" style={iconStyle} />
            <b>Escopeta Trampa</b> (máx. 12)
          </span>
        </div>
      </div>
    )
  },
  {
    titulo: "11. Parcelas especiales alrededor del mapa",
    descripcion: (
      <div>
        Por los alrededores del mapa, cerca de los monumentos principales, habrá <b>mini parcelas</b> que los equipos podrán tomar y construir lo que deseen dentro de esa base. Estas parcelas podrán ser raideadas en cualquier momento del evento, sin restricción de era.
        <div style={{ marginTop: 14 }}>
          <img
            src={buildingexterior}
            alt="Mini parcela exterior"
            style={{
              width: 120,
              height: 120,
              objectFit: 'contain',
              borderRadius: 12,
              background: '#181818',
              boxShadow: '0 1px 8px #0007',
              display: 'block',
              margin: '12px auto 0 auto'
            }}
          />
        </div>
      </div>
    )
  },
  {
    titulo: "12. Apartado de Raids",
    descripcion: (
      <div>
        Para raidear la <b>base main</b> de otro equipo, solo está permitido hacerlo durante la <b>ERA RAIDS</b>. 
        <br />
        Las alianzas (merge) están permitidas únicamente para raideos, con un máximo de 3 equipos aliados. No se permite el merge raid de más de 3 equipos bajo ninguna circunstancia.
        <br />
        <span style={{ color: "#f39c12" }}>
          La comunicación entre equipos aliados durante los raideos debe realizarse exclusivamente por el chat de voz del juego. No está permitido el uso de otros medios de comunicación externos para coordinar raids.
        </span>
      </div>
    )
  },
  {
    titulo: "13. Eventos durante el evento",
    descripcion: (
      <div>
        Durante todo el evento se realizarán diferentes <b>eventos especiales</b> para todos los equipos y jugadores, incluyendo:
        <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
          <li>Convoys</li>
          <li>Crates Guards</li>
          <li>Cargo Plane Crash</li>
          <li>TYardEvent</li>
          <li>AirfieldEvent</li>
          <li>Roams Event</li>
          <li>Armored Train</li>
          <li>Sputnik</li>
          <li>Eventos customs</li>
        </ul>
        <span style={{ color: "#f39c12" }}>
          La participación en estos eventos es opcional pero recomendada para obtener ventajas y recompensas.
        </span>
      </div>
    )
  },
  {
    titulo: "14. Comunicación oficial",
    descripcion: (
      <div>
        Toda la comunicación será a través del <b>Discord oficial</b> de Rustaco. 
        <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
          <li>Cada equipo debe estar presente en su canal de voz asignado durante el evento.</li>
          <li>Cada equipo contará con un chat privado para coordinar y comunicar todo lo necesario.</li>
          <li>Los anuncios y avisos importantes se harán únicamente por Discord.</li>
        </ul>
        <span style={{ color: "#f39c12" }}>
          Es responsabilidad de los capitanes y jugadores estar atentos a los canales oficiales.
        </span>
      </div>
    )
  },
  {
    titulo: "15. Stream obligatorio",
    descripcion: (
      <div>
        Por cada equipo, obligatoria mente deben haber de 4-5 intengrantes (ideal que todos) <b>streameando el evento</b> durante su participación.
        <b> El capitan de equipo debe estar transmitiendo si o si.</b>
        <br />
        <span style={{ color: "#f39c12" }}>
          El mapa estará lo más optimizado posible para que todos puedan stremear sin problemas de rendimiento. El incumplimiento de esta norma puede resultar en sanciones o descalificación.
        </span>
      </div>
    )
  },
  {
    titulo: "16. Toxicidad y ambiente competitivo",
    descripcion: (
      <div>
        El <b>beef</b> (provocaciones y rivalidad) está permitido dentro de un marco competitivo, pero si las peleas o discusiones exceden los límites normales, los involucrados serán muteados del chat del servidor. <br />
        <span style={{ color: "#f39c12" }}>
          Está totalmente prohibido el racismo, xenofobia o cualquier tipo de discriminación. Queremos un ambiente limpio, pero también competitivo.
        </span>
      </div>
    )
  },
  {
    titulo: "17. Uso de la APP Rust+",
    descripcion: (
      <div>
        <b>No está permitido el uso de la aplicación Rust+ durante el evento.</b> <br />
        Queremos fomentar una experiencia <b>vanilla</b> auténtica, donde no sepas en todo momento lo que ocurre en tu base y debas confiar en tu instinto, trabajo en equipo y vigilancia. <br />
        <span style={{ color: "#f39c12" }}>
          La incertidumbre y el factor sorpresa son parte fundamental de la experiencia Rust.
        </span>
      </div>
    )
  },
  {
    titulo: "18. Sistema de tickets",
    descripcion: (
      <div>
        El sistema de <b>tickets</b> estará disponible las 24 horas para solo los capitanes de equipo. Los tickets enviados serán recibidos por la administración y se intentará dar respuesta de forma inmediata.
      </div>
    )
  },
  {
    titulo: "19. Reporte de bugs, glitches o dupeos",
    descripcion: (
      <div>
        En caso de encontrar algún <b>bug, glitch, dupeo</b> u otra irregularidad, debe ser comunicado <b>urgentemente</b> al staff para resolver el asunto lo antes posible. El uso intencional de estos será motivo de descalificación inmediata.
      </div>
    )
  },
  {
    titulo: "20. Nicknames",
    descripcion: (
      <div>
        Todos los participantes deben utilizar su <b>nickname original</b> durante el evento. No se permiten nombres aleatorios, ofensivos ni aquellos que incentiven el odio o la discriminación.
      </div>
    )
  }
];

const Reglas = () => {
  const history = useHistory();

  return (
    <div
      style={{
        maxWidth: 1050,
        margin: '3rem auto',
        background: 'rgba(24,24,24,0.98)',
        borderRadius: 32,
        boxShadow: '0 16px 64px #000c',
        padding: '3.2rem 2.5rem 2.5rem 2.5rem',
        color: '#fff',
        fontFamily: 'Montserrat, Arial, sans-serif',
        border: '2px solid #e2582244',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <SideAnimation side="left" />
      <SideAnimation side="right" />

      <h1
        style={{
          color: 'var(--rust-orange)',
          fontWeight: 900,
          fontSize: '2.8rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          letterSpacing: '2px',
          textShadow: '0 2px 18px #000a',
          zIndex: 2,
          position: 'relative',
          animation: 'fadeInDown 1s cubic-bezier(.39,.575,.565,1) both'
        }}
      >
        Reglas del Evento
      </h1>

      {/* Imagen del mapa entre el título y la regla 1 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
        <img
          src={mapaRustacooo}
          alt="Mapa del evento"
          style={{
            width: '100%',
            maxWidth: 520,
            height: 'auto',
            borderRadius: 18,
            boxShadow: '0 4px 24px #000a',
            background: '#181818'
          }}
        />
      </div>

      <div>
        {reglas.map((regla, idx) => (
          <div
            key={idx}
            style={{
              ...reglaCardStyle,
              ...fadeInDelay(0.1 * idx)
            }}
            className="regla-card"
          >
            <div
              style={{
                fontWeight: 800,
                color: '#f39c12',
                fontSize: '1.22rem',
                marginBottom: 8,
                letterSpacing: '1px',
                textShadow: '0 1px 8px #000a'
              }}
            >
              {regla.titulo}
            </div>
            <div style={{ fontSize: '1.09rem', color: '#e0e0e0', lineHeight: 1.7 }}>
              {regla.descripcion}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '2.5rem',
          padding: '1.2rem',
          background: 'linear-gradient(90deg, #181818 80%, #23201a 100%)',
          borderRadius: 16,
          color: '#b3cfff',
          fontSize: '1.12rem',
          textAlign: 'center',
          boxShadow: '0 2px 12px #0007',
          border: '1.5px solid #7289da44',
          animation: 'fadeInUp 1.2s cubic-bezier(.39,.575,.565,1) both'
        }}
      >
        <b>Nota:</b> El incumplimiento de estas reglas puede resultar en sanciones, expulsión del evento o baneo permanente de futuras competencias.
        <br />
        Para dudas o consultas, contacta a la organización en nuestro{' '}
        <a
          href="https://discord.gg/rustaco"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 600 }}
        >
          Discord oficial
        </a>
        .
      </div>
      <div
        style={{
          marginTop: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          animation: 'fadeInUp 1.4s cubic-bezier(.39,.575,.565,1) both'
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'linear-gradient(90deg, #e25822 60%, #7289da 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.15rem',
            padding: '0.9rem 2.5rem',
            border: 'none',
            borderRadius: 14,
            boxShadow: '0 2px 12px #0007',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
            letterSpacing: '1px'
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Volver arriba
        </button>
        <button
          onClick={() => history.push('/')}
          style={{
            background: 'linear-gradient(90deg, #7289da 60%, #e25822 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.15rem',
            padding: '0.9rem 2.5rem',
            border: 'none',
            borderRadius: 14,
            boxShadow: '0 2px 12px #0007',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.2s',
            letterSpacing: '1px'
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Ir al inicio
        </button>
      </div>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translate3d(0, 40px, 0);
            }
            100% {
              opacity: 1;
              transform: none;
            }
          }
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translate3d(0, -40px, 0);
            }
            100% {
              opacity: 1;
              transform: none;
            }
          }
          .regla-card:hover {
            box-shadow: 0 12px 36px #000c, 0 0 0 0 #0000;
            transform: translateY(-4px) scale(1.015);
          }
          .regla-card img {
            transition: transform 0.3s cubic-bezier(.39,.575,.565,1), box-shadow 0.3s cubic-bezier(.39,.575,.565,1);
          }
          .regla-card img:hover {
            transform: scale(1.18) rotate(-6deg);
            box-shadow: 0 4px 24px #7289da88;
          }
        `}
      </style>
    </div>
  );
}

export default Reglas;