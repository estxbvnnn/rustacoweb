import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/home-dark.css";

import ammoGrenadeLauncherHE from "../assets/img/ammo.grenadelauncher.he.png";
import ammoRocketHV from "../assets/img/ammo.rocket.hv.png";
import grenadeF1 from "../assets/img/grenade.f1.png";
import eraPrimitivo from "../assets/img/primitivo.png";
import eraTier1 from "../assets/img/tier1.png";
import eraTier2 from "../assets/img/tier2.png";
import eraTier3 from "../assets/img/tier3.png";
import samsite from "../assets/img/samsite.png";
import flameturret from "../assets/img/flameturret.png";
import autoturret from "../assets/img/autoturret.png";
import guntrap from "../assets/img/guntrap.png";
import buildingexterior from "../assets/img/buildingexterior.png";
import heavyHelmet from "../assets/img/heavy.plate.helmet.png";
import heavyJacket from "../assets/img/heavy.plate.jacket.png";
import heavyPants from "../assets/img/heavy.plate.pants.png";
import scope8x from "../assets/img/weapon.mod.8x.scope.png";
import scope16x from "../assets/img/weapon.mod.16x.scope.png";
import rifleL96 from "../assets/img/rifle.l96.png";
import oilFilterSilencer from "../assets/img/weapon.mod.oilfiltersilencer.png";
import silencer from "../assets/img/weapon.mod.silencer.png";
import sodaCanSilencer from "../assets/img/weapon.mod.sodacansilencer.png";
import sulfurOre from "../assets/img/sulfur.ore.png";
import hqMetalOre from "../assets/img/hq.metal.ore.png";
import armoredDoor from "../assets/img/door.hinged.toptier.png";
import armoredDoubleDoor from "../assets/img/door.double.hinged.toptier.png";
import stone from "../assets/img/stones.png";
import metalOre from "../assets/img/metal.ore.png";
import wood from "../assets/img/wood.png";
import metalFragments from "../assets/img/metal.fragments.png";
import shotgunM4 from "../assets/img/shotgun.m4.png";
import logo from "../assets/img/logorustaco.png";
// import reglasPdf from "../assets/docs/reglas-rustaco.pdf"; // ⬅ ELIMINAR/COMENTAR ESTA LÍNEA

const SideAnimation = ({ side = "left" }) => (
  <div className={`side-animation ${side}`} aria-hidden>
    <div className="glow-pill" />
  </div>
);

const iconStyle = {
  width: 38,
  height: 38,
  objectFit: "contain",
  verticalAlign: "middle",
  marginRight: 10,
  background: "#181818",
  borderRadius: 8,
  boxShadow: "0 1px 8px #0007",
  transition: "transform 0.3s cubic-bezier(.39,.575,.565,1), box-shadow 0.3s cubic-bezier(.39,.575,.565,1)",
  willChange: "transform",
};

const eraCardStyle = {
  background: "linear-gradient(120deg, #23201a 80%, #3a4bd8 100%)",
  borderRadius: "14px",
  boxShadow: "0 2px 16px #000a",
  padding: "1.2rem 1.2rem",
  marginBottom: "1.2rem",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  borderLeft: "5px solid #7289da",
  transition: "transform 0.2s cubic-bezier(.39,.575,.565,1), box-shadow 0.2s cubic-bezier(.39,.575,.565,1)",
};

const getEras = (lang) => [
  {
    nombre: { es: "Era Primitivo", en: "Primitive Era", pt: "Era Primitiva" }[lang],
    imagen: eraPrimitivo,
    descripcion: {
      es: "Comienzo del evento con armas y herramientas primitivas.",
      en: "The event starts with primitive weapons and tools.",
      pt: "Início do evento com armas e ferramentas primitivas.",
    }[lang],
  },
  {
    nombre: { es: "Era Tier 1", en: "Tier 1 Era", pt: "Era Tier 1" }[lang],
    imagen: eraTier1,
    descripcion: {
      es: "Acceso a equipamiento y armas de Tier 1.",
      en: "Access to Tier 1 equipment and weapons.",
      pt: "Acesso a equipamentos e armas de Tier 1.",
    }[lang],
  },
  {
    nombre: { es: "Era Tier 2", en: "Tier 2 Era", pt: "Era Tier 2" }[lang],
    imagen: eraTier2,
    descripcion: {
      es: "Se habilitan armas y objetos de Tier 2.",
      en: "Tier 2 weapons and items are enabled.",
      pt: "Armas e itens de Tier 2 são habilitados.",
    }[lang],
  },
  {
    nombre: { es: "Era Tier 3", en: "Tier 3 Era", pt: "Era Tier 3" }[lang],
    imagen: eraTier3,
    descripcion: {
      es: "Desbloqueo de todo el arsenal y equipamiento de Tier 3.",
      en: "Unlock of all Tier 3 arsenal and equipment.",
      pt: "Desbloqueio de todo o arsenal e equipamentos de Tier 3.",
    }[lang],
  },
  {
    nombre: { es: "Era Raids", en: "Raids Era", pt: "Era Raids" }[lang],
    imagen: eraTier3,
    descripcion: {
      es: "Comienza la era de raideos, se habilitan los ataques a las Bases MAIN.",
      en: "The raiding era begins, attacks on MAIN Bases are enabled.",
      pt: "Começa a era dos raids, ataques às Bases MAIN são permitidos.",
    }[lang],
  },
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
          <li><b>100 jugadores</b> en total.</li>
          <li><b>10 equipos</b> de <b>10 participantes</b> cada uno.</li>
          <li>Se realizarán <b>diversos eventos especiales</b> durante el evento.</li>
          <li><b>Fishing Bandits</b>.</li>
        </ul>
      ),
      en: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li><b>100 players</b> in total.</li>
          <li><b>10 teams</b> of <b>10 participants</b> each.</li>
          <li><b>Various special events</b> will be held during the event.</li>
          <li><b>Fishing Bandits</b>.</li>
        </ul>
      ),
      pt: (
        <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
          <li><b>100 jogadores</b> no total.</li>
          <li><b>10 equipes</b> de <b>10 participantes</b> cada.</li>
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
              Mira 8x (<b>8x Scope</b>)
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
          Durante o evento, os seguintes itens estarán <b>totalmente proibidos</b> e no podrán ser usados bajo ninguna circunstancia:
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
        <div>
          <p>
            El modo del torneo se basa en <b>dogtags únicos por cada jugador</b>. Solo se generan cuando eliminas a un integrante de otro equipo que esté armado o portando un arma equipada; si el rival cae sin armamento, no deja dogtag válido.
          </p>
          <p>
            Una vez recogido, el dogtag debe <b>depositarse en el "altar" situado en la isla de tu equipo</b> para que sume puntos. Los dogtags recuperados de tus propios compañeros se consideran dogtags denegados: sirven para impedir que el enemigo puntúe, pero <b>no otorgan puntos a tu equipo</b>.
          </p>
          <p style={{ color: "#f39c12" }}>
            Solo los dogtags de enemigos depositados correctamente en el altar contabilizarán en el marcador final.
          </p>
        </div>
      ),
      en: (
        <div>
          <p>
            The tournament revolves around <b>unique dogtags for every player</b>. A valid dogtag drops only when you eliminate a member of another team who is armed or has a weapon equipped; downed opponents without weapons do not generate a scoring tag.
          </p>
          <p>
            After collecting it, the dogtag must be <b>deposited in the "altar" located on your team's island</b> to add points. Dogtags recovered from your own teammates are considered denied tags: they prevent the enemy from scoring, but <b>do not award points to your team</b>.
          </p>
          <p style={{ color: "#f39c12" }}>
            Only enemy dogtags deposited correctly in the altar will be recorded on the scoreboard.
          </p>
        </div>
      ),
      pt: (
        <div>
          <p>
            O torneio gira em torno de <b>dogtags únicos para cada jogador</b>. Um dogtag válido só é gerado quando você elimina um membro de outra equipe que esteja armado ou com uma arma equipada; adversários abatidos sem armamento não deixam dogtag que valha pontos.
          </p>
          <p>
            Depois de coletá-lo, o dogtag precisa ser <b>depositado no "altar" localizado na ilha da sua equipe</b> para somar pontos. Dogtags recuperados dos seus companheiros contam como dogtags negados: impedem que o inimigo pontue, mas <b>não concedem pontos para a sua equipe</b>.
          </p>
          <p style={{ color: "#f39c12" }}>
            Somente os dogtags inimigos depositados corretamente no altar serão registrados na pontuação final.
          </p>
        </div>
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
            <b>Restricciones del armario de herramientas de la base principal (TC)</b>
            <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
              <li>El TC debe ser accesible en todo momento.</li>
              <li>
                El acceso al TC se define como:
                <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
                  <li>Debe estar directamente detrás de una puerta, ventana o trampilla de escalera.</li>
                  <li>Debe haber un camino directo a dicha ubicación, que se pueda atravesar independientemente de la altura.</li>
                  <li>Debe ser transitable y accesible, de modo que el jugador pueda situarse donde estaba el TC cuando fue destruido sin destruir ninguna entidad.</li>
                </ul>
              </li>
              <li>No se pueden colocar objetos desplegables delante de los armarios de herramientas, excepto ventanas (por ejemplo: está prohibido colocar una alfombra sobre una ventana).</li>
              <li>Debe haber un camino desde el exterior de la base hasta el TC sin necesidad de destruir ninguna entidad fuera de una puerta/ventana/escalera.</li>
              <li>Cualquier intento de ocultar el TC detrás de cualquier objeto colocable, sellarlo o colocarlo detrás de un búnker está estrictamente prohibido.</li>
            </ul>
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
            <b>Restrictions for the main base Tool Cupboard (TC)</b>
            <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
              <li>The TC must be accessible at all times.</li>
              <li>
                Access to the TC is defined as:
                <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
                  <li>It must be directly behind a door, window, or ladder hatch.</li>
                  <li>There must be a direct path to that location that can be traversed regardless of height.</li>
                  <li>It must be walkable and reachable so that a player can stand where the TC was when it was destroyed without destroying any entity.</li>
                </ul>
              </li>
              <li>No deployable objects may be placed in front of Tool Cupboards, except windows (for example: placing a rug over a window is forbidden).</li>
              <li>There must be a path from the outside of the base to the TC without having to destroy any entity other than a door/window/ladder.</li>
              <li>Any attempt to hide the TC behind any placeable object, seal it, or place it behind a bunker is strictly prohibited.</li>
            </ul>
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
            <b>Restrições do armário de ferramentas da base principal (TC)</b>
            <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'circle' }}>
              <li>O TC deve ser acessível em todo momento.</li>
              <li>
                O acesso ao TC é definido como:
                <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
                  <li>Deve estar diretamente atrás de uma porta, janela ou alçapão de escada.</li>
                  <li>Deve haver um caminho direto até esse local, que possa ser percorrido independentemente da altura.</li>
                  <li>Deve ser transitável e acessível, de modo que o jogador possa se posicionar onde o TC estava quando foi destruído sem destruir nenhuma entidade.</li>
                </ul>
              </li>
              <li>Não é permitido colocar objetos deployables na frente dos armários de ferramentas, exceto janelas (por exemplo: é proibido colocar um tapete sobre uma janela).</li>
              <li>Deve haver um caminho desde o exterior da base até o TC sem precisar destruir nenhuma entidade além de uma porta/janela/escada.</li>
              <li>Qualquer tentativa de esconder o TC atrás de qualquer objeto colocável, selá-lo ou colocá-lo atrás de um bunker é estritamente proibida.</li>
            </ul>
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
          El uso de torretas está limitado a un máximo de <b>12 Auto Turrets</b> y <b>12 Escopetas Trampa</b> por <b>TC</b>.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={autoturret} alt="Auto Turret" style={iconStyle} />
              <b>Auto Turret</b> (máx. 12 por TC)
            </span>
            <span>
              <img src={guntrap} alt="Gun Trap" style={iconStyle} />
              <b>Escopeta Trampa</b> (máx. 12 por TC)
            </span>
          </div>
        </div>
      ),
      en: (
        <div>
          The use of turrets is limited to a maximum of <b>12 Auto Turrets</b> and <b>12 Shotgun Traps</b> per <b>TC</b>.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={autoturret} alt="Auto Turret" style={iconStyle} />
              <b>Auto Turret</b> (max. 12 per TC)
            </span>
            <span>
              <img src={guntrap} alt="Gun Trap" style={iconStyle} />
              <b>Shotgun Trap</b> (max. 12 per TC)
            </span>
          </div>
        </div>
      ),
      pt: (
        <div>
          O uso de torretas está limitado a um máximo de <b>12 Auto Turrets</b> e <b>12 Escopetas Armadilha</b> por <b>TC</b>.
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
            <span>
              <img src={autoturret} alt="Auto Turret" style={iconStyle} />
              <b>Auto Turret</b> (máx. 12 por TC)
            </span>
            <span>
              <img src={guntrap} alt="Armadilha de Escopeta" style={iconStyle} />
              <b>Escopeta Armadilha</b> (máx. 12 por TC)
            </span>
          </div>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "11. Parcelas especiales alrededores del mapa",
      en: "11. Special parcels around the map",
      pt: "11. Parcelas especiais ao redor do mapa"
    },
    descripcion: {
      es: (
        <div>
          Por los alrededores del mapa, cerca de los monumentos principales, habrá <b>mini parcelas</b> que los equipos podrán tomar y construir lo que deseen dentro de esa base. Estas parcelas podrán ser raideadas en cualquier momento del evento, sin restricción de era.
          <br />
          <span style={{ color: "#f39c12", fontWeight: 600 }}>
            Solo se puede construir dentro de la parcela y todo (incluyendo torretas, trampas, etc.) debe colocarse dentro de la parcela.
          </span>
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
          <br />
          <span style={{ color: "#f39c12", fontWeight: 600 }}>
            Building is only allowed inside the parcel and everything (including turrets, traps, etc.) must be placed within the parcel boundaries.
          </span>
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
          <br />
          <span style={{ color: "#f39c12", fontWeight: 600 }}>
            Só é permitido construir dentro da parcela e tudo (incluindo torretas, armadilhas, etc.) deve ser colocado dentro dos limites da parcela.
          </span>
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
          La base del huerto/garage podrá ser raideada a partir de la <b>Era Tier 3</b>.
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
          The garden/garage base may be raided starting from <b>Era Tier 3</b>.
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
          A base do huerto/garage pode ser raidada a partir da <b>Era Tier 3</b>.
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
          Los <b>tugboats</b> spawnearán en cada isla a partir de la <b>Era Tier 3</b>, y desde esa misma era los <b>tugboats serán raidables</b>.
          <br />
          <span style={{ color: "#f39c12" }}>
            Ten en cuenta que los tugboats pueden ser objeto de competición entre equipos; respeta las normas de raid y las alianzas permitidas.
          </span>
        </div>
      ),
      en: (
        <div>
          <b>Tugboats</b> will spawn on each island starting in <b>Era Tier 3</b>, and from that era <b>tugboats will be raidable</b>.
          <br />
          <span style={{ color: "#f39c12" }}>
            Keep in mind tugboats may be contested by teams; respect raid rules and allowed alliances.
          </span>
        </div>
      ),
      pt: (
        <div>
          Os <b>tugboats</b> irão spawnar em cada ilha a partir da <b>Era Tier 3</b>, e a partir dessa era os <b>tugboats serão raidáveis</b>.
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
      es: "12.2. Helicópteros y globos",
      en: "12.2. Helicopters and balloons",
      pt: "12.2. Helicópteros e balões"
    },
    descripcion: {
      es: (
        <div>
          Todos los <b>helicópteros (minicopter, scrap transport & combat) y globos</b> del evento tendrán una <b>reducción del 30% en su vida máxima</b> para equilibrar su dominio aéreo.
          <br />
          <span style={{ color: "#f39c12" }}>
            Procura planificar reparaciones y protegerlos; el ajuste es permanente durante el evento.
          </span>
        </div>
      ),
      en: (
        <div>
          All <b>helicopters (minicopter, scrap transport & combat) and balloons</b> in the event will have a <b>30% reduction to their maximum health</b> to balance aerial dominance.
          <br />
          <span style={{ color: "#f39c12" }}>
            Plan repairs and protect them; the adjustment is permanent throughout the event.
          </span>
        </div>
      ),
      pt: (
        <div>
          Todos os <b>helicópteros (minicopter, scrap transport & combat) e balões</b> do evento terão uma <b>redução de 30% na vida máxima</b> para equilibrar o domínio aéreo.
          <br />
          <span style={{ color: "#f39c12" }}>
            Planeje reparos e proteja-os; o ajuste é permanente durante o evento.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "13. Eventos",
      en: "13. Events",
      pt: "13. Eventos"
    },
    descripcion: {
      es: (
        <div>
          <div style={{ marginBottom: 12 }}>
            Durante los 4 días del evento se realizarán diversos eventos especiales programados por la organización. A continuación se listan los eventos principales que aparecerán en el servidor:
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
            <li><b>Hardpoint</b> — Drops Tags.</li>
            <li><b>Convoys</b> — Drops Tags (recompensas variadas).</li>
            <li><b>Roams</b> — Drops Tags.</li>
            <li><b>Armored Train</b> — Drops Tags (botín especial).</li>
            <li><b>Lockeds Crates</b> — Drops Tags (cajas con distinto contenido).</li>
            <li><b>Sputnik</b> — Drops Tags (eventos únicos de recompensa).</li>
          </ul>
          <div style={{ marginTop: 10, color: '#f39c12' }}>
            Nota: Los detalles exactos (frecuencia, variedad de recompensas y mecánicas específicas) se anunciarán en el Discord oficial y durante el propio evento.
          </div>
        </div>
      ),
      en: (
        <div>
          <div style={{ marginBottom: 12 }}>
            Throughout the 4 days of the event the organizers will run several scheduled special events. Below are the main server events you can expect:
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
            <li><b>Hardpoint</b> — Drops Tags.</li>
            <li><b>Convoys</b> — Drops Tags (varied rewards).</li>
            <li><b>Roams</b> — Drops Tags.</li>
            <li><b>Armored Train</b> — Drops Tags (special loot).</li>
            <li><b>Lockeds Crates</b> — Drops Tags (crates with varied contents).</li>
            <li><b>Sputnik</b> — Drops Tags (unique reward events).</li>
          </ul>
          <div style={{ marginTop: 10, color: '#f39c12' }}>
            Note: Exact details (timing, reward variety and specific mechanics) will be announced on the official Discord and during the event itself.
          </div>
        </div>
      ),
      pt: (
        <div>
          <div style={{ marginBottom: 12 }}>
            Durante os 4 dias do evento, os organizadores realizarão diversos eventos especiais programados. Abaixo estão os principais eventos do servidor que você pode esperar:
          </div>
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
            <li><b>Hardpoint</b> — Drops Tags.</li>
            <li><b>Convoys</b> — Drops Tags (recompensas variadas).</li>
            <li><b>Roams</b> — Drops Tags.</li>
            <li><b>Armored Train</b> — Drops Tags (loot especial).</li>
            <li><b>Lockeds Crates</b> — Drops Tags (caixas com conteúdo variado).</li>
            <li><b>Sputnik</b> — Drops Tags (eventos únicos com recompensa).</li>
          </ul>
          <div style={{ marginTop: 10, color: '#f39c12' }}>
            Nota: Detalhes exatos (cronograma, variedade de recompensas e mecânicas específicas) serão anunciados no Discord oficial e durante o próprio evento.
          </div>
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
          Toda la comunicación operativa será a través del <b>Discord oficial</b> de Rustaco.
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Cada equipo contará con <b>dos canales de voz</b> y <b>un canal de texto</b>; deben mantenerse activos durante cada era y actividad programada.</li>
            <li>Los capitanes tendrán acceso prioritario al sistema de tickets para gestionar emergencias, pausas, reportes de bugs y cualquier incidente relevante junto al staff.</li>
            <li>Existe un canal de anuncios urgentes; cualquier actualización crítica (hotfixes, cambios de horario) solo se publicará allí y debe revisarse constantemente.</li>
            <li>Se habilitará un canal de reportes rápidos para bugs y conflictos; el staff confirmará la recepción dentro de un plazo máximo de 10 minutos.</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            Es responsabilidad de capitanes y jugadores monitorear los canales oficiales y mantener comunicación abierta con la administración en todo momento.
          </span>
        </div>
      ),
      en: (
        <div>
          All operational communication will run through the official Rustaco <b>Discord</b>.
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Each team receives <b>two voice channels</b> plus <b>one text channel</b>; they must remain active throughout every era and scheduled activity.</li>
            <li>Captains receive priority access to the ticketing system to handle emergencies, pauses, bug reports, and any relevant incidents alongside staff.</li>
            <li>There is an urgent-announcement channel; any critical update (hotfixes, schedule changes) will be shared only there and must be checked constantly.</li>
            <li>A quick-report channel is available for bugs and conflicts; staff will acknowledge receipt within a maximum of 10 minutes.</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            Captains and players are responsible for monitoring official channels and keeping communication open with the administration at all times.
          </span>
        </div>
      ),
      pt: (
        <div>
          Toda a comunicação operacional será realizada através do <b>Discord oficial</b> do Rustaco.
          <ul style={{ margin: '10px 0 0 1.5em', padding: 0, listStyle: 'disc' }}>
            <li>Cada equipe contará com <b>dois canais de voz</b> e <b>um canal de texto</b>; eles devem permanecer ativos durante cada era e atividade programada.</li>
            <li>Os capitães terão acesso prioritário ao sistema de tickets para gerir emergências, pausas, reportes de bugs e quaisquer incidentes relevantes com o staff.</li>
            <li>Há um canal de anúncios urgentes; qualquer atualização crítica (hotfixes, ajustes de horário) será publicada apenas ali e deve ser monitorada constantemente.</li>
            <li>Um canal de reportes rápidos estará disponível para bugs e conflitos; o staff confirmará o recebimento em no máximo 10 minutos.</li>
          </ul>
          <span style={{ color: "#f39c12" }}>
            É responsabilidade dos capitães e jogadores monitorar os canais oficiais e manter comunicação aberta com a administração em todo momento.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "14.1. Fair Play y Anti-cheat",
      en: "14.1. Fair Play and Anti-cheat",
      pt: "14.1. Fair Play e Anti-cheat"
    },
    descripcion: {
      es: (
        <div>
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
            <li>Se prohíbe estrictamente el uso de software externo, macros o modificaciones de cliente que otorguen ventaja competitiva.</li>
            <li>El staff puede solicitar grabaciones, POV o transmisión inmediata en caso de sospecha; negarse implica descalificación automática.</li>
            <li>Los jugadores deben reportar de inmediato cualquier comportamiento sospechoso o bug que pueda explotarse.</li>
            <li>Cada participante debe jugar exclusivamente con su cuenta principal; cualquier cambio de identidad o uso de cuentas alternas implica expulsión del equipo.</li>
          </ul>
          <span style={{ color: '#f39c12', display: 'block', marginTop: 8 }}>
            La integridad competitiva es prioritaria: cualquier intento de abuso o trampa conlleva sanciones máximas.
          </span>
        </div>
      ),
      en: (
        <div>
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
            <li>External software, macros, or client modifications that grant a competitive advantage are strictly forbidden.</li>
            <li>Staff may request recordings, POV, or immediate live streaming if suspicious activity arises; refusal leads to instant disqualification.</li>
            <li>Players must promptly report any suspicious behavior or exploit-prone bug.</li>
            <li>Every participant must play exclusively on their main account; identity swaps or alternate accounts lead to team expulsion.</li>
          </ul>
          <span style={{ color: '#f39c12', display: 'block', marginTop: 8 }}>
            Competitive integrity is paramount: any attempt at abuse or cheating carries maximum penalties.
          </span>
        </div>
      ),
      pt: (
        <div>
          <ul style={{ margin: 0, paddingLeft: '1.5em', listStyle: 'disc' }}>
            <li>É estritamente proibido o uso de software externo, macros ou modificações de cliente que concedam vantagem competitiva.</li>
            <li>A equipe pode solicitar gravações, POV ou transmissão imediata em caso de suspeita; recusar implica desclassificação imediata.</li>
            <li>Os jogadores devem reportar imediatamente qualquer comportamento suspeito ou bug passível de exploração.</li>
            <li>Cada participante deve jogar exclusivamente com sua conta principal; mudança de identidade ou uso de contas alternativas implica expulsão da equipe.</li>
          </ul>
          <span style={{ color: '#f39c12', display: 'block', marginTop: 8 }}>
            A integridade competitiva é prioridade: qualquer tentativa de abuso ou trapaça acarretará penalidades máximas.
          </span>
        </div>
      )
    }
  },
  {
    titulo: {
      es: "14.2. Sanciones y procedimientos",
      en: "14.2. Sanctions and Procedures",
      pt: "14.2. Sanções e procedimentos"
    },
    descripcion: {
      es: (
        <div>
          <ol style={{ margin: 0, paddingLeft: '1.5em' }}>
            <li><b>Advertencia formal:</b> se registra en Discord y queda notificada al capitán. Reiterar la falta escala la sanción.</li>
            <li><b>Sanción temporal:</b> suspensión del jugador (o del equipo, según el caso) por un periodo definido por el staff.</li>
            <li><b>Expulsión definitiva:</b> expulsión inmediata del evento sin derecho a reincorporación.</li>
          </ol>
          <p style={{ marginTop: 12 }}>
            Cada sanción será comunicada en el canal de capitanes junto con el detalle del incidente y los pasos para apelar. Las apelaciones deben iniciarse dentro de los <b>15 minutos</b> posteriores a la notificación. El staff podrá revisar evidencias adicionales y emitir un veredicto final en un plazo máximo de 60 minutos.
          </p>
          <p style={{ color: '#f39c12' }}>
            La reincidencia en conductas graves (cheats, toxicidad extrema, sabotaje) acorta el proceso: se aplicará expulsión directa sin paso previo por advertencia.
          </p>
        </div>
      ),
      en: (
        <div>
          <ol style={{ margin: 0, paddingLeft: '1.5em' }}>
            <li><b>Formal warning:</b> recorded in Discord and notified to the captain. Repeating the offense escalates the sanction.</li>
            <li><b>Temporary sanction:</b> suspension of the player (or the team, if applicable) for a period defined by staff.</li>
            <li><b>Permanent expulsion:</b> immediate removal from the event with no right to rejoin.</li>
          </ol>
          <p style={{ marginTop: 12 }}>
            Each sanction is communicated through the captains' channel, including incident details and appeal steps. Appeals must start within <b>15 minutes</b> of the notification. Staff may review additional evidence and deliver a final verdict within 60 minutes.
          </p>
          <p style={{ color: '#f39c12' }}>
            Recurring severe behaviors (cheating, extreme toxicity, sabotage) shorten the process: direct expulsion will be applied without prior warning.
          </p>
        </div>
      ),
      pt: (
        <div>
          <ol style={{ margin: 0, paddingLeft: '1.5em' }}>
            <li><b>Advertência formal:</b> registrada no Discord e notificada ao capitão. Repetir a infração faz a sanção escalar.</li>
            <li><b>Sanção temporária:</b> suspensão do jogador (ou da equipe, conforme o caso) por um período definido pelo staff.</li>
            <li><b>Expulsão definitiva:</b> remoção imediata do evento sem direito de retorno.</li>
          </ol>
          <p style={{ marginTop: 12 }}>
            Cada sanção será comunicada no canal de capitães juntamente com os detalhes do incidente e os passos para apelação. As apelações devem começar dentro de <b>15 minutos</b> após a notificação. O staff poderá revisar evidências extras e emitir um veredito final em até 60 minutos.
          </p>
          <p style={{ color: '#f39c12' }}>
            A reincidência em condutas graves (cheats, toxicidade extrema, sabotagem) encurta o processo: será aplicada expulsão direta sem advertência prévia.
          </p>
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
          <b>El stream es obligatorio durante todo el tiempo en que las dogtags estén activas. No estar en directo durante este período será motivo de sanción (ban).
          Una vez que las dogtags se desactiven, los jugadores podrán continuar off stream, pero deberán grabar su gameplay en todo momento.
          No grabar no conlleva una sanción directa; sin embargo, perjudica exclusivamente al jugador en caso de existir un reporte, ya que la falta de evidencia puede jugar en su contra.</b>
        </div>
      ),
      en: (
        <div>
          <b>Streaming is mandatory for as long as the dog tags are active. Failure to stream during this period will result in a penalty (ban).
          Once the dog tags are deactivated, players may continue off stream, but must record their gameplay at all times.
          Failure to record does not result in a direct penalty; however, it exclusively harms the player in the event of a report, as the lack of evidence can work against them.</b>
        </div>
      ),
      pt: (
        <div>
          <b>A transmissão é obrigatória durante todo o tempo em que as dogtags estiverem ativas. Não estar ao vivo durante esse período será motivo para sanção (banimento).
          Uma vez que as dogtags forem desativadas, os jogadores poderão continuar fora da transmissão, mas deverão gravar sua jogabilidade em todos os momentos.
          Não gravar não acarreta uma sanção direta; no entanto, prejudica exclusivamente o jogador em caso de denúncia, uma vez que a falta de provas pode jogar contra ele.</b>
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
            Está totalmente proibido o racismo, xenofobia ou qualquer tipo de discriminação. Queremos um ambiente limpo, mas também competitivo.
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
            A incerteza e o fator sorpresa são partes fundamentais da experiência Rust.
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
  const rawTitle = (typeof regla.titulo === "object" ? regla.titulo[lang] : regla.titulo) || "";
  return rawTitle.replace(/^\s*\d+(\.\d+)*\s*[\.\-:]?\s*/, "");
};

export default function Reglas() {
  const history = useHistory();
  const [lang, setLang] = React.useState("es");

  React.useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => document.body.classList.remove("has-video-bg");
  }, []);

  return (
    <div className="home-dark page-with-topbar">
      <header
        className="rules-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <nav className="TopBar-links TopBar-links--left" aria-label="Navegación">
          <Link to="/reglas" className="nav-btn">Rules</Link>
          <Link to="/equipos" className="nav-btn">Teams</Link>
          {/* eliminar el botón/link de Stats aquí */}
          <div style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              className="nav-btn"
              onClick={() => history.push("/")}
              title={lang === "es" ? "Home" : lang === "en" ? "Home" : "Início"}
            >
              {lang === "es" ? "Home" : lang === "en" ? "Home" : "Início"}
            </button>

            <div className="hud-flags" aria-label="Language">
              <button
                onClick={() => setLang("es")}
                title="Español LATAM"
                className={`icon-btn flag ${lang === "es" ? "lang-btn-active" : ""}`}
                style={{ fontWeight: 700, fontSize: 12, color: "#fff" }}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                title="English USA"
                className={`icon-btn flag ${lang === "en" ? "lang-btn-active" : ""}`}
                style={{ fontWeight: 700, fontSize: 12, color: "#fff" }}
              >
                EN
              </button>
              <button
                onClick={() => setLang("pt")}
                title="Português Brasil"
                className={`icon-btn flag ${lang === "pt" ? "lang-btn-active" : ""}`}
                style={{ fontWeight: 700, fontSize: 12, color: "#fff" }}
              >
                BR
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main style={{ position: "relative", zIndex: 20, padding: "2.6rem 1rem 3rem" }}>
        <div className="panel home-dark" style={{ marginTop: 0 }}>
          <SideAnimation side="left" />
          <SideAnimation side="right" />

          <h1 className="reglas-title" style={{ zIndex: 2, position: "relative" }}>
            {lang === "es" ? "Reglas del Evento" : lang === "en" ? "Event Rules" : "Regras do Evento"}
          </h1>

          <div className="reglas-banner" role="note">
            <span className="reglas-banner-icon">📘</span>
            <div className="reglas-banner-text">
              {lang === "es" && "Gracias por participar en Rustaco III. Estas directrices buscan una competencia justa, segura y respetuosa para todos."}
              {lang === "en" && "Thanks for joining Rustaco III. These guidelines aim for a fair, safe and respectful competition for everyone."}
              {lang === "pt" && "Obrigado por participar do Rustaco III. Estas diretrizes visam uma competição justa, segura e respeitosa para todos."}
            </div>
          </div>

          <div className="reglas-content">
            <div>
              {reglas.map((regla, idx) => (
                <div key={idx} id={`rule-${idx + 1}`} className="regla-card">
                  <div className="regla-header">
                    <span className="regla-header-dot" aria-hidden />
                    <div className="regla-header-title">{getRuleTitle(regla, lang)}</div>
                  </div>

                  <div className="regla-body">
                    {typeof regla.descripcion === "object" ? regla.descripcion[lang] : regla.descripcion}
                  </div>
                </div>
              ))}

              <div className="reglas-note">
                <b>{lang === "es" ? "Código de conducta:" : lang === "en" ? "Code of conduct:" : "Código de conduta:"}</b>{" "}
                {lang === "es" && (
                  <>
                    Te pedimos mantener un trato respetuoso y seguir estas directrices. El incumplimiento puede derivar en medidas correctivas, incluida la exclusión del evento.
                    {" "}Para soporte o consultas, utiliza nuestro{" "}
                    <a href="https://discord.rustaco.site" target="_blank" rel="noopener noreferrer" style={{ color: "#7289da", textDecoration: "underline", fontWeight: 600 }}>
                      Discord oficial
                    </a>.
                  </>
                )}
                {lang === "en" && (
                  <>
                    Please remain respectful and follow these guidelines. Non-compliance may lead to corrective measures, including removal from the event.
                    {" "}For support or questions, use our{" "}
                    <a href="https://discord.rustaco.site" target="_blank" rel="noopener noreferrer" style={{ color: "#7289da", textDecoration: "underline", fontWeight: 600 }}>
                      official Discord
                    </a>.
                  </>
                )}
                {lang === "pt" && (
                  <>
                    Pedimos que mantenha o respeito e siga estas diretrizes. O não cumprimento pode resultar em medidas corretivas, incluindo exclusão do evento.
                    {" "}Para suporte ou dúvidas, utilize nosso{" "}
                    <a href="https://discord.rustaco.site" target="_blank" rel="noopener noreferrer" style={{ color: "#7289da", textDecoration: "underline", fontWeight: 600 }}>
                      Discord oficial
                    </a>.
                  </>
                )}
              </div>

              <div className="reglas-cta-row">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="reglas-cta primary">
                  {lang === "es" ? "Volver arriba" : lang === "en" ? "Back to top" : "Voltar ao topo"}
                </button>
                <button onClick={() => history.push("/")} className="reglas-cta secondary">
                  {lang === "es" ? "Ir al inicio" : lang === "en" ? "Go to Home" : "Ir para o início"}
                </button>
              </div>

              <style>
                {`
                  @media print {
                    body * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 11px; color: #888; }
                    .regla-card { break-inside: avoid; page-break-inside: avoid; box-shadow: none !important; border-right: 1px solid #ddd !important; }
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}