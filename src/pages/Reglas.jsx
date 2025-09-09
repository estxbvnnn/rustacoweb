import React from 'react';
import '../assets/home-dark.css';
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
import shotgunM4 from '../assets/img/shotgun.m4.png';
import logo from '../assets/img/logorustaco.png';
import rustGamedark from '../assets/img/rustgamedark.jpg';

// Banderas usadas en la HUD (añadir estas constantes)
const flagChile = "https://flagcdn.com/w20/cl.png";
const flagUSA  = "https://flagcdn.com/w20/us.png";
const flagBrazil = "https://flagcdn.com/w20/br.png";

const SideAnimation = ({ side = 'left' }) => (
  <div className={`side-animation ${side}`} aria-hidden>
    <div className="glow-pill" />
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

const getEras = (lang) => [
  {
    nombre: {
      es: "Era Primitivo",
      en: "Primitive Era",
      pt: "Era Primitiva"
    }[lang],
    imagen: eraPrimitivo,
    descripcion: {
      es: "Comienzo del evento con armas y herramientas primitivas.",
      en: "The event starts with primitive weapons and tools.",
      pt: "Início do evento com armas e ferramentas primitivas."
    }[lang]
  },
  {
    nombre: {
      es: "Era Tier 1",
      en: "Tier 1 Era",
      pt: "Era Tier 1"
    }[lang],
    imagen: eraTier1,
    descripcion: {
      es: "Acceso a equipamiento y armas de Tier 1.",
      en: "Access to Tier 1 equipment and weapons.",
      pt: "Acesso a equipamentos e armas de Tier 1."
    }[lang]
  },
  {
    nombre: {
      es: "Era Tier 2",
      en: "Tier 2 Era",
      pt: "Era Tier 2"
    }[lang],
    imagen: eraTier2,
    descripcion: {
      es: "Se habilitan armas y objetos de Tier 2.",
      en: "Tier 2 weapons and items are enabled.",
      pt: "Armas e itens de Tier 2 são habilitados."
    }[lang]
  },
  {
    nombre: {
      es: "Era Tier 3",
      en: "Tier 3 Era",
      pt: "Era Tier 3"
    }[lang],
    imagen: eraTier3,
    descripcion: {
      es: "Desbloqueo de todo el arsenal y equipamiento de Tier 3.",
      en: "Unlock of all Tier 3 arsenal and equipment.",
      pt: "Desbloqueio de todo o arsenal e equipamentos de Tier 3."
    }[lang]
  },
  {
    nombre: {
      es: "Era Raids",
      en: "Raids Era",
      pt: "Era Raids"
    }[lang],
    imagen: eraRaids,
    descripcion: {
      es: "Comienza la era de raideos, se habilitan los ataques a las Bases MAIN.",
      en: "The raiding era begins, attacks on MAIN Bases are enabled.",
      pt: "Começa a era dos raids, ataques às Bases MAIN são permitidos."
    }[lang]
  }
];

const reglas = [
  {
    titulo: {
      es: "1. Formato general",
      en: "1. General Format",
      pt: "1. Formato Geral"
    },
    descripcion: {
      es: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li><b>128 jugadores</b> en total.</li>
          <li><b>Equipos de 8 participantes</b>.</li>
          <li>Se realizarán <b>diversos eventos especiales</b> durante el evento.</li>
          <li><b>Fishing Bandits</b>.</li>
        </ul>
      ),
      en: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li><b>128 players</b> in total.</li>
          <li><b>Teams of 8 participants</b>.</li>
          <li><b>Various special events</b> will be held during the event.</li>
          <li><b>Fishing Bandits</b>.</li>
        </ul>
      ),
      pt: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li><b>128 jogadores</b> no total.</li>
          <li><b>Equipes de 8 participantes</b>.</li>
          <li><b>Diversos eventos especiais</b> serão realizados durante o evento.</li>
          <li><b>Fishing Bandits</b>.</li>
        </ul>
      )
    }
  },
  {
    titulo: {
      es: "2. Ítems prohibidos durante el evento",
      en: "2. Items Prohibited During the Event",
      pt: "2. Itens Proibidos Durante o Evento"
    },
    descripcion: {
      es: (
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
              <img src={shotgunM4} alt="M4 Shotgun" style={iconStyle} />
              M4 Shotgun (<b>M4 Shotgun</b>)
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
      ),
      en: (
        <div>
          During the event, the following items are <b>completely prohibited</b> and may not be used under any circumstances:
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>
              <img src={heavyHelmet} alt="Heavy Plate Helmet" style={iconStyle} />
              <img src={heavyJacket} alt="Heavy Plate Jacket" style={iconStyle} />
              <img src={heavyPants} alt="Heavy Plate Pants" style={iconStyle} />
              Heavy Plate armor (<b>Heavy Plate Helmet, Jacket and Pants</b>)
            </li>
            <li>
              <img src={scope8x} alt="8x Scope" style={iconStyle} />
              <img src={scope16x} alt="16x Scope" style={iconStyle} />
              8x Scope and 16x Scope
            </li>
            <li>
              <img src={rifleL96} alt="Rifle L96" style={iconStyle} />
              L96 Rifle
            </li>
            <li>
              <img src={shotgunM4} alt="M4 Shotgun" style={iconStyle} />
              M4 Shotgun
            </li>
            <li>
              <img src={muzzleBoost} alt="Muzzle Boost" style={iconStyle} />
              Muzzle Boost
            </li>
            <li>
              <img src={oilFilterSilencer} alt="Oil Filter Silencer" style={iconStyle} />
              Oil Filter Silencer
            </li>
            <li>
              <img src={silencer} alt="Silencer" style={iconStyle} />
              Silencer
            </li>
            <li>
              <img src={sodaCanSilencer} alt="Soda Can Silencer" style={iconStyle} />
              Soda Can Silencer
            </li>
            <li>
              <img src={armoredDoor} alt="Armored Door" style={iconStyle} />
              <img src={armoredDoubleDoor} alt="Armored Double Door" style={iconStyle} />
              Armored Door and Armored Double Door
            </li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            The use of any of these items will result in immediate sanction for the player and/or the team.
          </span>
        </div>
      ),
      pt: (
        <div>
          Durante o evento, os seguintes itens estarão <b>totalmente proibidos</b> e não poderão ser usados sob nenhuma circunstância:
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>
              <img src={heavyHelmet} alt="Heavy Plate Helmet" style={iconStyle} />
              <img src={heavyJacket} alt="Heavy Plate Jacket" style={iconStyle} />
              <img src={heavyPants} alt="Heavy Plate Pants" style={iconStyle} />
              Armaduras pesadas (<b>Heavy Plate Helmet, Jacket e Pants</b>)
            </li>
            <li>
              <img src={scope8x} alt="8x Scope" style={iconStyle} />
              <img src={scope16x} alt="16x Scope" style={iconStyle} />
              Mira 8x e Mira 16x
            </li>
            <li>
              <img src={rifleL96} alt="Rifle L96" style={iconStyle} />
              Rifle L96
            </li>
            <li>
              <img src={shotgunM4} alt="M4 Shotgun" style={iconStyle} />
              M4 Shotgun
            </li>
            <li>
              <img src={muzzleBoost} alt="Muzzle Boost" style={iconStyle} />
              Muzzle Boost
            </li>
            <li>
              <img src={oilFilterSilencer} alt="Oil Filter Silencer" style={iconStyle} />
              Oil Filter Silencer
            </li>
            <li>
              <img src={silencer} alt="Silencer" style={iconStyle} />
              Silencer
            </li>
            <li>
              <img src={sodaCanSilencer} alt="Soda Can Silencer" style={iconStyle} />
              Soda Can Silencer
            </li>
            <li>
              <img src={armoredDoor} alt="Armored Door" style={iconStyle} />
              <img src={armoredDoubleDoor} alt="Armored Double Door" style={iconStyle} />
              Armored Door e Armored Double Door
            </li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            O uso de qualquer um desses itens resultará em sanção imediata para o jogador e/ou a equipe.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "2.1. Reducción de daño de explosivos a jugadores",
      en: "2.1. Reduction of explosive damage to players",
      pt: "2.1. Redução de dano de explosivos para jogadores"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          The damage received by players from the following explosives will be <b>considerably reduced</b> during the event:
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>
              <img src={ammoGrenadeLauncherHE} alt="40mm Grenade" style={iconStyle} />
              40mm Grenade
            </li>
            <li>
              <img src={ammoRocketHV} alt="High Velocity Rocket" style={iconStyle} />
              High Velocity Rocket
            </li>
            <li>
              <img src={grenadeF1} alt="F1 Grenade" style={iconStyle} />
              F1 Grenade
            </li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            These explosives will still deal damage to the BradleyAPC normally, but damage to players will be reduced to prevent instant deaths and encourage combat.
          </span>
        </div>
      ),
      pt: (
        <div>
          O dano recebido pelos jogadores dos seguintes explosivos será <b>consideravelmente reduzido</b> durante o evento:
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>
              <img src={ammoGrenadeLauncherHE} alt="Granada de 40mm" style={iconStyle} />
              Granada de 40mm
            </li>
            <li>
              <img src={ammoRocketHV} alt="Foguete de Alta Velocidade" style={iconStyle} />
              Foguete de Alta Velocidade
            </li>
            <li>
              <img src={grenadeF1} alt="Granada F1" style={iconStyle} />
              Granada F1
            </li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            Esses explosivos continuarão causando dano ao BradleyAPC normalmente, mas o dano aos jogadores será reduzido para evitar mortes instantâneas e incentivar o combate.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "3. Recursos",
      en: "3. Resources",
      pt: "3. Recursos"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          The farming of mineral resources will be set to <b>x2.0</b> throughout the event.
          <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
            <img src={sulfurOre} alt="Sulfur Ore" style={iconStyle} title="Sulfur Ore" />
            <img src={hqMetalOre} alt="HQ Metal Ore" style={iconStyle} title="HQ Metal Ore" />
            <img src={stone} alt="Stone" style={iconStyle} title="Stone" />
            <img src={metalOre} alt="Metal Ore" style={iconStyle} title="Metal Ore" />
          </div>
          <span style={{ color: "#f39c12", display: 'block', marginTop: 8 }}>
            All minerals, resources, components, etc., will have a x2.0 multiplier.
          </span>
        </div>
      ),
      pt: (
        <div>
          A coleta de recursos minerais será configurada para <b>x2.0</b> durante todo o evento.
          <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
            <img src={sulfurOre} alt="Minério de Enxofre" style={iconStyle} title="Minério de Enxofre" />
            <img src={hqMetalOre} alt="Minério HQ" style={iconStyle} title="Minério HQ" />
            <img src={stone} alt="Pedra" style={iconStyle} title="Pedra" />
            <img src={metalOre} alt="Minério de Metal" style={iconStyle} title="Minério de Metal" />
          </div>
          <span style={{ color: "#f39c12", display: 'block', marginTop: 8 }}>
            Todos os minerais, recursos, componentes, etc., terão multiplicador x2.0.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "4. Mejoras de building",
      en: "4. Building Upgrades",
      pt: "4. Melhorias de construção"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          Building upgrades during the event are only allowed up to <b>metal</b> (HQ is not allowed).
          <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
            <img src={wood} alt="Wood" style={iconStyle} title="Wood" />
            <img src={stone} alt="Stone" style={iconStyle} title="Stone" />
            <img src={metalFragments} alt="Metal Fragments" style={iconStyle} title="Metal Fragments" />
          </div>
          <span style={{ color: "#f39c12", display: 'block', marginTop: 8 }}>
            Upgrading structures to HQ (High Quality Metal) is not allowed.
          </span>
        </div>
      ),
      pt: (
        <div>
          As melhorias de construção durante o evento são permitidas apenas até <b>metal</b> (não é permitido HQ).
          <div style={{ display: 'flex', gap: 18, marginTop: 12, flexWrap: 'wrap' }}>
            <img src={wood} alt="Madeira" style={iconStyle} title="Madeira" />
            <img src={stone} alt="Pedra" style={iconStyle} title="Pedra" />
            <img src={metalFragments} alt="Fragmentos de Metal" style={iconStyle} title="Fragmentos de Metal" />
          </div>
          <span style={{ color: "#f39c12", display: 'block', marginTop: 8 }}>
            Não é permitido melhorar estruturas para HQ (Metal de Alta Qualidade).
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "5. Mecánica principal: Sistema de Dogtags",
      en: "5. Main Mechanic: Dogtags System",
      pt: "5. Mecânica principal: Sistema de Dogtags"
    },
    descripcion: {
      es: (
        <span>
          El modo del torneo es mediante <b>dogtags únicos por cada jugador</b>. Cada vez que mates a un jugador, este soltará un dogtag. <br />
          Para que el dogtag cuente para ganar, <b>debe ser depositado en el "altar" de la isla respectiva de cada team</b>. <br />
          <span style={{ color: "#f39c12" }}>Solo los dogtags depositados correctamente en el altar sumarán puntos para el equipo.</span>
        </span>
      ),
      en: (
        <span>
          The tournament mode uses <b>unique dogtags for each player</b>. Every time you kill a player, they will drop a dogtag. <br />
          For the dogtag to count towards victory, <b>it must be deposited in the "altar" located on the respective team's island</b>. <br />
          <span style={{ color: "#f39c12" }}>Only dogtags correctly deposited in the altar will count points for the team.</span>
        </span>
      ),
      pt: (
        <span>
          O modo do torneio utiliza <b>dogtags únicos para cada jogador</b>. Sempre que você eliminar um jogador, ele soltará um dogtag. <br />
          Para que o dogtag conte para a vitória, <b>deve ser depositado no "altar" localizado na ilha respectiva de cada equipe</b>. <br />
          <span style={{ color: "#f39c12" }}>Somente os dogtags depositados corretamente no altar contarão pontos para a equipe.</span>
        </span>
      )
    }
  },
  {
    titulo: {
      es: "6. Eliminación por destrucción del TC",
      en: "6. Elimination by TC destruction",
      pt: "6. Eliminação por destruição do TC"
    },
    descripcion: {
      es: (
        <span>
          Durante la <b>era de raideos</b>, si el <b>TC (armario principal)</b> de tu equipo es destruido, <span style={{ color: "#e25822", fontWeight: 700 }}>tu equipo quedará eliminado</span> del evento.
        </span>
      ),
      en: (
        <span>
          During the <b>raiding era</b>, if your team's <b>TC (main cabinet)</b> is destroyed, <span style={{ color: "#e25822", fontWeight: 700 }}>your team will be eliminated</span> from the event.
        </span>
      ),
      pt: (
        <span>
          Durante a <b>era de raids</b>, se o <b>TC (armário principal)</b> da sua equipe for destruído, <span style={{ color: "#e25822", fontWeight: 700 }}>sua equipe será eliminada</span> do evento.
        </span>
      )
    }
  },
  {
    titulo: {
      es: "7. Estructura y reglas de las islas y bases",
      en: "7. Structure and rules of the islands and bases",
      pt: "7. Estrutura e regras das ilhas e bases"
    },
    descripcion: {
      es: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li>
            Cada isla cuenta con:
            <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
              <li>Un espacio designado para la <b>base principal (main)</b>.</li>
              <li>Un área específica para la <b>zona de huerto/garage</b> (9x8). <span style={{ color: "#f39c12", fontWeight: 700 }}>No se aceptan bases con MultiTC (solo un TC por base principal y huerto).</span></li>
              <li>Una <b>entrada a metro</b> exclusiva para cada isla.</li>
              <li>Un <b>altar exclusivo</b> para cada isla donde el equipo debe depositar sus dogtags para que cuenten.</li>
            </ul>
          </li>
          <li>
            La <b>base main</b> debe construirse únicamente en el espacio asignado (14x14). <br />
            <span style={{ color: "#f39c12" }}>No está permitido sobrepasar los límites de la zona asignada, incluyendo la zona de huerto.</span>
          </li>
          <li>
            El <b>TC (armario principal)</b> de la base main y del huerto/garage debe ser accesible en todo momento. Solo puede estar protegido por puertas o ventanas, <b>no puede estar completamente cerrado ni grifeado</b>.
          </li>
          <li>
            El <b>TC</b> puede ser movido en caso de ser necesario, pero <b>debe solicitarse el cambio a la administración</b>. <br />
            <span style={{ color: "#f39c12" }}>El TC main solo podrá ser cambiado hasta 1 hora antes del inicio de la era de raideos.</span>
          </li>
        </ul>
      ),
      en: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li>
            Each island has:
            <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
              <li>A designated space for the <b>main base</b> (main).</li>
              <li>A specific area for the <b>garden/garage zone</b> (9x8). <span style={{ color: "#f39c12", fontWeight: 700 }}>Bases with MultiTC are not accepted (only one TC per main base and garden).</span></li>
              <li>An exclusive <b>metro entrance</b> for each island.</li>
              <li>An <b>exclusive altar</b> for each island where the team must deposit their dogtags for them to count.</li>
            </ul>
          </li>
          <li>
            The <b>main base</b> must be built only in the assigned space (14x14). <br />
            <span style={{ color: "#f39c12" }}>It is not allowed to exceed the limits of the assigned area, including the garden area.</span>
          </li>
          <li>
            The <b>TC (main cabinet)</b> of the main base and the garden/garage must be accessible at all times. It can only be protected by doors or windows, <b>it cannot be completely closed or grifed</b>.
          </li>
          <li>
            The <b>TC</b> can be moved if necessary, but <b>the change must be requested from the administration</b>. <br />
            <span style={{ color: "#f39c12" }}>The main TC can only be changed up to 1 hour before the start of the raiding era.</span>
          </li>
        </ul>
      ),
      pt: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li>
            Cada ilha possui:
            <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
              <li>Um espaço designado para a <b>base principal</b> (main).</li>
              <li>Uma área específica para a <b>zona de jardim/garagem</b> (9x8). <span style={{ color: "#f39c12", fontWeight: 700 }}>Não são aceitas bases com MultiTC (apenas um TC por base principal e jardim).</span></li>
              <li>Uma <b>entrada de metrô</b> exclusiva para cada ilha.</li>
              <li>Um <b>altar exclusivo</b> para cada ilha onde a equipe deve depositar seus dogtags para que contem.</li>
            </ul>
          </li>
          <li>
            A <b>base principal</b> deve ser construída apenas no espaço designado (14x14). <br />
            <span style={{ color: "#f39c12" }}>Não é permitido ultrapassar os limites da área designada, incluindo a área do jardim.</span>
          </li>
          <li>
            O <b>TC (armário principal)</b> da base principal e do huerto/garage deve ser acessível o tempo todo. Pode estar protegido apenas por portas ou janelas, <b>não pode estar completamente fechado ou grifado</b>.
          </li>
          <li>
            O <b>TC</b> pode ser movido se necessário, mas <b>a mudança deve ser solicitada à administração</b>. <br />
            <span style={{ color: "#f39c12" }}>O TC principal só pode ser trocado até 1 hora antes do início da era de raids.</span>
          </li>
        </ul>
      )
    }
  },
  {
    titulo: {
      es: "8. Evento por Eras",
      en: "8. Event by Eras",
      pt: "8. Evento por Eras"
    },
    descripcion: {
      es: (
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
            {getEras('es').map((era, idx) => (
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
      ),
      en: (
        <div>
          <div style={{ marginBottom: 18 }}>
            The event is structured in <b>eras</b>, each with its own rules and restrictions. As the event progresses, new objects, weapons, and mechanics are enabled for all teams. 
            <br /><br />
            <b>IMPORTANT:</b> Pay attention to the organization's announcements to know when each era begins and what is allowed in each one. Plan your strategy according to the current era!
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
              Event Eras
            </h3>
            {getEras('en').map((era, idx) => (
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
      ),
      pt: (
        <div>
          <div style={{ marginBottom: 18 }}>
            O evento está estruturado em <b>eras</b>, cada uma com suas próprias regras e restrições. À medida que o evento avança, novos objetos, armas e mecânicas são habilitados para todas as equipes. 
            <br /><br />
            <b>IMPORTANTE:</b> Preste atenção aos anúncios da organização para saber quando começa cada era e o que é permitido em cada uma. Planeje sua estratégia com base na era atual!
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
              Eras do Evento
            </h3>
            {getEras('pt').map((era, idx) => (
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
    }
  },
  {
    titulo: {
      es: "9. Límite de SAM Turrets y Torretas de Fuego",
      en: "9. Limit of SAM Turrets and Flame Turrets",
      pt: "9. Limite de SAM Turrets e Torretas de Fogo"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          Each base can have a maximum of <b>1 SAM Turret</b> placed. <b>Flame Turrets</b> remain completely prohibited during the event.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={samsite} alt="SAM Site" style={iconStyle} />
              <b>SAM Turret</b> (max. 1 per base)
            </span>
            <span>
              <img src={flameturret} alt="Flame Turret" style={iconStyle} />
              <b>Flame Turrets</b> prohibited
            </span>
          </div>
        </div>
      ),
      pt: (
        <div>
          Cada base pode ter no máximo <b>1 SAM Turret</b> instalada. As <b>Torretas de Fogo</b> continuam totalmente proibidas durante o evento.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={samsite} alt="SAM Site" style={iconStyle} />
              <b>SAM Turret</b> (máx. 1 por base)
            </span>
            <span>
              <img src={flameturret} alt="Torretas de Fogo" style={iconStyle} />
              <b>Torretas de Fogo</b> proibidas
            </span>
          </div>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "10. Límite de torretas y trampas",
      en: "10. Limit of turrets and traps",
      pt: "10. Limite de torretas e armadilhas"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          The use of turrets is limited to a maximum of <b>12 Auto Turrets</b> and <b>12 Shotgun Traps</b> per team.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={autoturret} alt="Auto Turret" style={iconStyle} />
              <b>Auto Turret</b> (max. 12)
            </span>
            <span>
              <img src={guntrap} alt="Gun Trap" style={iconStyle} />
              <b>Shotgun Trap</b> (max. 12)
            </span>
          </div>
        </div>
      ),
      pt: (
        <div>
          O uso de torretas está limitado a um máximo de <b>12 Auto Turrets</b> e <b>12 Escopetas Armadilha</b> por equipe.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={autoturret} alt="Auto Turret" style={iconStyle} />
              <b>Auto Turret</b> (máx. 12)
            </span>
            <span>
              <img src={guntrap} alt="Armadilha de Escopeta" style={iconStyle} />
              <b>Escopeta Armadilha</b> (máx. 12)
            </span>
          </div>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "11. Parcelas especiales alrededor del mapa",
      en: "11. Special parcels around the map",
      pt: "11. Parcelas especiais ao redor do mapa"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          Around the map, near the main monuments, there will be <b>mini parcels</b> that teams can take and build whatever they want inside that base. These parcels can be raided at any time during the event, without era restriction.
          <div style={{ marginTop: 14 }}>
            <img
              src={buildingexterior}
              alt="Mini parcel exterior"
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
      ),
      pt: (
        <div>
          Nos arredores do mapa, perto dos principais monumentos, haverá <b>mini parcelas</b> que as equipes poderão ocupar e construir o que desejarem dentro dessa base. Essas parcelas poderão ser raidada a qualquer momento do evento, sem restrição de era.
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
    }
  },
  {
    titulo: {
      es: "12. Apartado de Raids",
      en: "12. Raids Section",
      pt: "12. Seção de Raids"
    },
    descripcion: {
      es: (
        <div>
          Para raidear la <b>base main</b> de otro equipo, solo está permitido hacerlo durante la <b>ERA RAIDS</b>. 
          <br />
          Las alianzas (merge) están permitidas únicamente para raideos, con un máximo de 3 equipos aliados. No se permite el merge raid de más de 3 equipos bajo ninguna circunstancia.
          <br />
          <br />
          La base del huerto/garage podrá ser raideada a partir de la <b>Era Tier 2</b>.
          <br />
          <br />
          <b>Counter raids:</b> Cualquier COUNTER RAID deberá dirigirse únicamente a las FOVs enemigas que estén participando activamente en el raid.
          <br />
          <span style={{ color: "#f39c12" }}>
            La comunicación entre equipos aliados durante los raideos debe realizarse exclusivamente por el chat de voz del juego. No está permitido el uso de otros medios de comunicación externos para coordinar raids.
          </span>
        </div>
      ),
      en: (
        <div>
          To raid another team's <b>main base</b>, it is only allowed during the <b>RAIDS ERA</b>. 
          <br />
          Alliances (merges) are only allowed for raiding, with a maximum of 3 allied teams. Merge raiding of more than 3 teams is not allowed under any circumstances.
          <br />
          <br />
          The garden/garage base may be raided starting from <b>Era Tier 2</b>.
          <br />
          <br />
          <b>Counter raids:</b> Any COUNTER RAID must be directed only at enemy FOVs that are actively participating in the raid.
          <br />
          <span style={{ color: "#f39c12" }}>
            Communication between allied teams during raids must be done exclusively through the in-game voice chat. The use of other external communication means to coordinate raids is not allowed.
          </span>
        </div>
      ),
      pt: (
        <div>
          Para raidar a <b>base principal</b> de outra equipe, é permitido apenas durante a <b>ERA DE RAIDS</b>. 
          <br />
          Alianças (merge) são permitidas apenas para raids, com um máximo de 3 equipes aliadas. Não é permitido o merge raid de mais de 3 equipes sob nenhuma circunstância.
          <br />
          <br />
          A base do huerto/garage pode ser raidada a partir da <b>Era Tier 2</b>.
          <br />
          <br />
          <b>Counter raids:</b> Qualquer COUNTER RAID deverá ser direcionado apenas às FOVs inimigas que estejam participando ativamente do raid.
          <br />
          <span style={{ color: "#f39c12" }}>
            A comunicação entre equipes aliadas durante os raids deve ser feita exclusivamente pelo chat de voz do jogo. Não é permitido o uso de outros meios de comunicação externos para coordenar raids.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "12.1. Tugboats",
      en: "12.1. Tugboats",
      pt: "12.1. Tugboats"
    },
    descripcion: {
      es: (
        <div>
          Los <b>tugboats</b> spawnearán en cada isla a partir de la <b>Era Tier 2</b>, y desde esa misma era los <b>tugboats serán raidables</b>.
          <br />
          <span style={{ color: "#f39c12" }}>
            Ten en cuenta que los tugboats pueden ser objeto de competición entre equipos; respeta las normas de raid y las alianzas permitidas.
          </span>
        </div>
      ),
      en: (
        <div>
          <b>Tugboats</b> will spawn on each island starting in <b>Era Tier 2</b>, and from that era <b>tugboats will be raidable</b>.
          <br />
          <span style={{ color: "#f39c12" }}>
            Keep in mind tugboats may be contested by teams; respect raid rules and allowed alliances.
          </span>
        </div>
      ),
      pt: (
        <div>
          Os <b>tugboats</b> irão spawnar em cada ilha a partir da <b>Era Tier 2</b>, e a partir dessa era os <b>tugboats serão raidáveis</b>.
          <br />
          <span style={{ color: "#f39c12" }}>
            Tenha em mente que os tugboats podem ser contestados pelas equipes; respeite as regras de raid e as alianças permitidas.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "13. Eventos durante el evento",
      en: "13. Events during the event",
      pt: "13. Eventos durante o evento"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          Throughout the event, different <b>special events</b> will be held for all teams and players, including:
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Convoys</li>
            <li>Crates Guards</li>
            <li>Cargo Plane Crash</li>
            <li>TYardEvent</li>
            <li>AirfieldEvent</li>
            <li>Roams Event</li>
            <li>Armored Train</li>
            <li>Sputnik</li>
            <li>Custom events</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            Participation in these events is optional but recommended to gain advantages and rewards.
          </span>
        </div>
      ),
      pt: (
        <div>
          Durante todo o evento, diferentes <b>eventos especiais</b> serão realizados para todas as equipes e jogadores, incluindo:
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Convoys</li>
            <li>Crates Guards</li>
            <li>Cargo Plane Crash</li>
            <li>TYardEvent</li>
            <li>AirfieldEvent</li>
            <li>Roams Event</li>
            <li>Armored Train</li>
            <li>Sputnik</li>
            <li>Eventos personalizados</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            A participação nesses eventos é opcional, mas recomendada para obter vantagens e recompensas.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "14. Comunicación oficial",
      en: "14. Official communication",
      pt: "14. Comunicação oficial"
    },
    descripcion: {
      es: (
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
      ),
      en: (
        <div>
          All communication will be through the official Rustaco <b>Discord</b>. 
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Each team must be present in their assigned voice channel during the event.</li>
            <li>Each team will have a private chat to coordinate and communicate everything necessary.</li>
            <li>Announcements and important notices will be made only through Discord.</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            It is the responsibility of the captains and players to pay attention to the official channels.
          </span>
        </div>
      ),
      pt: (
        <div>
          Toda a comunicação será feita através do <b>Discord oficial</b> do Rustaco. 
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Cada equipe deve estar presente em seu canal de voz designado durante o evento.</li>
            <li>Cada equipe terá um chat privado para coordenar e comunicar tudo o que for necessário.</li>
            <li>Anúncios e avisos importantes serão feitos apenas pelo Discord.</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            É responsabilidade dos capitães e jogadores ficarem atentos aos canais oficiais.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "15. Stream obligatorio",
      en: "15. Mandatory Streaming",
      pt: "15. Stream obrigatório"
    },
    descripcion: {
      es: (
        <div>
          <b>Todos los jugadores deben estar transmitiendo el evento en stream durante su participación.</b> No es necesario transmitir en calidad Full HD, pero la transmisión debe ser aceptable y que se vea correctamente.
          <br />
          <span style={{ color: "#f39c12" }}>
            Si por dificultad técnica no puedes stremear, <b>debes grabar tu participación completa</b>. Si la organización solicita evidencia y no tienes grabación, <b>podrás ser sancionado o perjudicado en el evento</b>.
          </span>
          <br />
          <span style={{ color: "#f39c12" }}>
            El incumplimiento de esta norma puede resultar en sanciones o descalificación. El mapa estará lo más optimizado posible para que todos puedan stremear sin problemas de rendimiento.
          </span>
        </div>
      ),
      en: (
        <div>
          <b>All players must be streaming the event during their participation.</b> It is not necessary to stream in Full HD, but the stream must be acceptable and clearly visible.
          <br />
          <span style={{ color: "#f39c12" }}>
            If you have technical difficulties and cannot stream, <b>you must record your entire participation</b>. If the organization requests evidence and you do not have a recording, <b>you may be sanctioned or penalized in the event</b>.
          </span>
          <br />
          <span style={{ color: "#f39c12" }}>
            Failure to comply with this rule may result in sanctions or disqualification. The map will be as optimized as possible so everyone can stream without performance issues.
          </span>
        </div>
      ),
      pt: (
        <div>
          <b>Todos os jogadores devem transmitir o evento ao vivo durante sua participação.</b> Não é necessário transmitir em Full HD, mas a transmissão deve ser aceitável e com boa qualidade de imagem.
          <br />
          <span style={{ color: "#f39c12" }}>
            Se por dificuldade técnica não conseguir fazer stream, <b>deve gravar toda a sua participação</b>. Se a organização solicitar evidências e você não tiver a gravação, <b>poderá ser sancionado ou prejudicado no evento</b>.
          </span>
          <br />
          <span style={{ color: "#f39c12" }}>
            O descumprimento desta regra pode resultar em sanções ou desclassificação. O mapa será otimizado ao máximo para que todos possam transmitir sem problemas de desempenho.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "16. Toxicidad y ambiente competitivo",
      en: "16. Toxicity and competitive environment",
      pt: "16. Toxicidade e ambiente competitivo"
    },
    descripcion: {
      es: (
        <div>
          El <b>beef</b> (provocaciones y rivalidad) está permitido dentro de un marco competitivo, pero si las peleas o discusiones exceden los límites normales, los involucrados serán muteados del chat del servidor. <br />
          <span style={{ color: "#f39c12" }}>
            Está totalmente prohibido el racismo, xenofobia o cualquier tipo de discriminación. Queremos un ambiente limpio, pero también competitivo.
          </span>
        </div>
      ),
      en: (
        <div>
          <b>Beef</b> (provocations and rivalry) is allowed within a competitive framework, but if fights or arguments exceed normal limits, those involved will be muted in the server chat. <br />
          <span style={{ color: "#f39c12" }}>
            Racism, xenophobia, or any kind of discrimination is totally prohibited. We want a clean, but also competitive environment.
          </span>
        </div>
      ),
      pt: (
        <div>
          O <b>beef</b> (provocações e rivalidade) é permitido dentro de um marco competitivo, mas se as brigas ou discussões excederem os limites normais, os envolvidos serão silenciados no chat do servidor. <br />
          <span style={{ color: "#f39c12" }}>
            É totalmente proibido o racismo, xenofobia ou qualquer tipo de discriminação. Queremos um ambiente limpo, mas também competitivo.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "17. Uso de la APP Rust+",
      en: "17. Use of the Rust+ APP",
      pt: "17. Uso do APP Rust+"
    },
    descripcion: {
      es: (
        <div>
          <b>No está permitido el uso de la aplicación Rust+ durante el evento.</b> <br />
          Queremos fomentar una experiencia <b>vanilla</b> auténtica, donde no sepas en todo momento lo que ocurre en tu base y debas confiar en tu instinto, trabajo en equipo y vigilancia. <br />
          <span style={{ color: "#f39c12" }}>
            La incertidumbre y el factor sorpresa son parte fundamental de la experiencia Rust.
          </span>
        </div>
      ),
      en: (
        <div>
          <b>The use of the Rust+ app is not allowed during the event.</b> <br />
          We want to promote an authentic <b>vanilla</b> experience, where you don't know at all times what is happening in your base and have to rely on your instinct, teamwork, and vigilance. <br />
          <span style={{ color: "#f39c12" }}>
            Uncertainty and the surprise factor are fundamental parts of the Rust experience.
          </span>
        </div>
      ),
      pt: (
        <div>
          <b>Não é permitido o uso do aplicativo Rust+ durante o evento.</b> <br />
          Queremos promover uma experiência <b>vanilla</b> autêntica, onde você não saiba o que está acontecendo em sua base o tempo todo e tenha que confiar em seu instinto, trabalho em equipe e vigilância. <br />
          <span style={{ color: "#f39c12" }}>
            A incerteza e o fator surpresa são partes fundamentais da experiência Rust.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "18. Sistema de tickets",
      en: "18. Ticket system",
      pt: "18. Sistema de tickets"
    },
    descripcion: {
      es: (
        <div>
          El sistema de <b>tickets</b> estará disponible las 24 horas para solo los capitanes de equipo. Los tickets enviados serán recibidos por la administración y se intentará dar respuesta de forma inmediata.
        </div>
      ),
      en: (
        <div>
          The <b>ticket</b> system will be available 24/7 for team captains only. Submitted tickets will be received by the administration and a response will be attempted immediately.
        </div>
      ),
      pt: (
        <div>
          O sistema de <b>tickets</b> estará disponível 24 horas por dia apenas para os capitães das equipes. Os tickets enviados serão recebidos pela administração e uma resposta será tentada imediatamente.
        </div>
      )
    }
  },
  {
    titulo: {
      es: "19. Reporte de bugs, glitches o dupeos",
      en: "19. Reporting bugs, glitches, or dupes",
      pt: "19. Reporte de bugs, glitches ou dupes"
    },
    descripcion: {
      es: (
        <div>
          En caso de encontrar algún <b>bug, glitch, dupeo</b> u otra irregularidad, debe ser comunicado <b>urgentemente</b> al staff para resolver el asunto lo antes posible. El uso intencional de estos será motivo de descalificación inmediata.
        </div>
      ),
      en: (
        <div>
          In case of finding any <b>bug, glitch, dupe</b>, or other irregularity, it must be communicated <b>urgently</b> to the staff to resolve the issue as soon as possible. The intentional use of these will result in immediate disqualification.
        </div>
      ),
      pt: (
        <div>
          Ao encontrar algum <b>bug, glitch, dupe</b> ou outra irregularidade, deve ser comunicado <b>urgentemente</b> à equipe para resolver a questão o mais rápido possível. O uso intencional destes será motivo de desclassificação imediata.
        </div>
      )
    }
  },
  {
    titulo: {
      es: "20. Nicknames",
      en: "20. Nicknames",
      pt: "20. Nicknames"
    },
    descripcion: {
      es: (
        <div>
          Todos los participantes deben utilizar su <b>nickname original</b> durante el evento. No se permiten nombres aleatorios, ofensivos ni aquellos que incentiven el odio o la discriminación.
        </div>
      ),
      en: (
        <div>
          All participants must use their <b>original nickname</b> during the event. Random, offensive names, or those that incite hate or discrimination are not allowed.
        </div>
      ),
      pt: (
        <div>
          Todos os participantes devem usar seu <b>nickname original</b> durante o evento. Nomes aleatórios, ofensivos ou que incitem ódio ou discriminação não são permitidos.
        </div>
      )
    }
  }
];

// Utilidad: título por idioma (limpia numeración inicial: 1., 2.1., etc.)
const getRuleTitle = (regla, lang) => {
  const rawTitle = (typeof regla.titulo === 'object' ? regla.titulo[lang] : regla.titulo) || '';
  return rawTitle.replace(/^\s*\d+(\.\d+)*\s*[\.\-:]?\s*/,''); // elimina "1.", "2.1.", etc.
};

const Reglas = () => {
  const history = useHistory();
  const [lang, setLang] = React.useState('es');

  // Al entrar a Reglas, sube al inicio de la página
  React.useEffect(() => {
    // usar RAF para asegurar que el render inicial terminó
    const id = window.requestAnimationFrame(() =>
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    );
    return () => window.cancelAnimationFrame(id);
  }, []);

  const handleHome = () => history.push('/');

  return (
    <>
      {/* HUD profesional fijo arriba */}
      <div className="page-hud">
        <div className="hud-left">
          <img src={logo} alt="Rustaco" className="hud-logo" />
          <div className="hud-title">{lang === 'es' ? 'Reglas del Evento' : lang === 'en' ? 'Event Rules' : 'Regras do Evento'}</div>
        </div>

        <div className="hud-right">
          <button onClick={handleHome} title={lang === 'es' ? 'Inicio' : lang === 'en' ? 'Home' : 'Início'} className="btn-primary">🏠 {lang === 'es' ? 'Inicio' : lang === 'en' ? 'Home' : 'Início'}</button>

          <div className="hud-flags">
            <button onClick={() => setLang('es')} title="Español LATAM" className={`icon-btn flag ${lang === 'es' ? 'lang-btn-active' : ''}`}><img src={flagChile} alt="ES" /></button>
            <button onClick={() => setLang('en')} title="English USA" className={`icon-btn flag ${lang === 'en' ? 'lang-btn-active' : ''}`}><img src={flagUSA} alt="EN" /></button>
            <button onClick={() => setLang('pt')} title="Português Brasil" className={`icon-btn flag ${lang === 'pt' ? 'lang-btn-active' : ''}`}><img src={flagBrazil} alt="PT" /></button>
          </div>
        </div>
      </div>

      {/* Contenedor principal: agrega margen superior para no quedar bajo el HUD */}
      <div className="panel home-dark page-container">
        {/* animated background image */}
        <div className="animated-bg-image" style={{ backgroundImage: `url(${rustGamedark})` }} aria-hidden />
        {/* subtle overlay radials are handled by CSS helper */}
        <div className="decorative-radials" aria-hidden />
        <SideAnimation side="left" />
        <SideAnimation side="right" />

  <h1 className="reglas-title" style={{ zIndex: 2, position: 'relative' }}>
          {lang === 'es' ? 'Reglas del Evento' : lang === 'en' ? 'Event Rules' : 'Regras do Evento'}
        </h1>

        {/* Banner introductorio breve y educado */}
        <div className="reglas-banner" role="note">
          <span className="reglas-banner-icon">📘</span>
          <div className="reglas-banner-text">
            {lang === 'es' && 'Gracias por participar en Rustaco II. Estas directrices buscan una competencia justa, segura y respetuosa para todos.'}
            {lang === 'en' && 'Thanks for joining Rustaco II. These guidelines aim for a fair, safe and respectful competition for everyone.'}
            {lang === 'pt' && 'Obrigado por participar do Rustaco II. Estas diretrizes visam uma competição justa, segura e respeitosa para todos.'}
          </div>
        </div>

        {/* Imagen del mapa entre el título y la regla 1 */}
        <div className="reglas-map">
          <img src={mapaRustacooo} alt="Mapa del evento" />
        </div>

        {/* Contenido en una sola columna (sin TOC lateral) */}
        <div className="reglas-content">
          <div>
            {reglas.map((regla, idx) => (
              <div key={idx} id={`rule-${idx + 1}`} className="regla-card">
                <div className="regla-header">
                  <span className="regla-header-dot" aria-hidden />
                  <div className="regla-header-title">{getRuleTitle(regla, lang)}</div>
                </div>

                <div className="regla-body">
                  {typeof regla.descripcion === 'object' ? regla.descripcion[lang] : regla.descripcion}
                </div>
              </div>
            ))}

            <div className="reglas-note">
              <b>
                {lang === 'es' ? 'Código de conducta:' : lang === 'en' ? 'Code of conduct:' : 'Código de conduta:'}
              </b>{' '}
              {lang === 'es' && (
                <>
                  Te pedimos mantener un trato respetuoso y seguir estas directrices. El incumplimiento puede derivar en medidas correctivas, incluida la exclusión del evento. 
                  Para soporte o consultas, utiliza nuestro{' '}
                  <a href="https://discord.rustaco.site" target="_blank" rel="noopener noreferrer" style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 600 }}>Discord oficial</a>.
                </>
              )}
              {lang === 'en' && (
                <>
                  Please remain respectful and follow these guidelines. Non-compliance may lead to corrective measures, including removal from the event. 
                  For support or questions, use our{' '}
                  <a href="https://discord.rustaco.site" target="_blank" rel="noopener noreferrer" style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 600 }}>official Discord</a>.
                </>
              )}
              {lang === 'pt' && (
                <>
                  Pedimos que mantenha o respeito e siga estas diretrizes. O não cumprimento pode resultar em medidas corretivas, incluindo exclusão do evento. 
                  Para suporte ou dúvidas, utilize nosso{' '}
                  <a href="https://discord.rustaco.site" target="_blank" rel="noopener noreferrer" style={{ color: '#7289da', textDecoration: 'underline', fontWeight: 600 }}>Discord oficial</a>.
                </>
              )}
            </div>

            <div className="reglas-cta-row">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="reglas-cta primary">{lang === 'es' ? 'Volver arriba' : lang === 'en' ? 'Back to top' : 'Voltar ao topo'}</button>
              <button onClick={() => history.push('/')} className="reglas-cta secondary">{lang === 'es' ? 'Ir al inicio' : lang === 'en' ? 'Go to Home' : 'Ir para o início'}</button>
            </div>
          </div>
        </div>

  <style>
          {`
            /* Limpieza de estilos previos del TOC (ya no se usa) */

            /* Mejora de impresión */
            @media print {
              body * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              div[style*="position: fixed"][style*="top: 0"] { display: none !important; }
              a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 11px; color: #888; }
              .regla-card { break-inside: avoid; page-break-inside: avoid; box-shadow: none !important; border-right: 1px solid #ddd !important; }
            }
          `}
        </style>
  </div>
    </>
  );
}

export default Reglas;