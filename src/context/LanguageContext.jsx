import React from 'react';

/**
 * Idioma global del sitio (es / en / pt) con persistencia en localStorage.
 * Se comparte entre todas las páginas mediante contexto de React.
 */

const SUPPORTED = ['es', 'en', 'pt'];
const STORAGE_KEY = 'rw-lang';

// locale para formateo de fechas según idioma
export const DATE_LOCALE = { es: 'es-CL', en: 'en-US', pt: 'pt-BR' };

const LanguageContext = React.createContext({ lang: 'es', setLang: () => {} });

function readInitialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) return saved;
    const nav = (window.navigator.language || '').slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(nav)) return nav;
  } catch (e) {
    /* localStorage puede no estar disponible */
  }
  return 'es';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = React.useState(readInitialLang);

  const setLang = React.useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignorar */
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = React.useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return React.useContext(LanguageContext);
}

/** Devuelve el diccionario de strings del idioma activo. */
export function useT() {
  const { lang } = useLang();
  return STRINGS[lang] || STRINGS.es;
}

/** Formatea una fecha ISO según el idioma indicado. */
export function formatDate(value, lang = 'es') {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString(DATE_LOCALE[lang] || DATE_LOCALE.es, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/* ============================================================
   DICCIONARIO DE TEXTOS
   ============================================================ */

export const STRINGS = {
  /* ─────────────────────────── ESPAÑOL ─────────────────────────── */
  es: {
    // navegación / común
    navHome: 'Inicio',
    navStore: 'Store',
    navRules: 'Reglas',
    navMaps: 'Maps',
    navLeaderboard: 'Stats',
    navSupport: 'Soporte',
    navDiscord: 'Discord',
    navConnect: 'Síguenos',
    navTagline: 'Servidor competitivo de Rust',
    comingSoon: 'Próximamente',
    login: 'Iniciar sesión',
    footerRights: '© Rustaco — Todos los derechos reservados.',

    // Maps
    mapsKicker: 'Mapas del servidor',
    mapsTitle: 'Maps',
    mapsSubtitle:
      'Información del servidor y votación del próximo mapa. El mapa se renueva en cada map wipe para mantener el juego fresco.',
    mapsTag: 'No BPs Wipes',
    mapsLocation: 'Confidencial',
    mapsLocationLabel: 'Ubicación',
    mapsVoteTitle: 'Upcoming Vote Map',
    mapsSoonTitle: 'Próximamente',
    mapsSoonText:
      'La votación del próximo mapa estará disponible aquí antes del siguiente wipe. Los candidatos y la fecha de votación se anunciarán en nuestro Discord.',
    mapsDiscordBtn: 'Seguir anuncios en Discord',

    // Reglas
    rulesKicker: 'Juega limpio',
    rulesTitle: 'Reglas del servidor',
    rulesIntroPre: 'Reglamento oficial de',
    rulesIntroPost:
      '. Al conectarte aceptas cumplir estas normas en su totalidad. Su desconocimiento no exime de su cumplimiento.',
    rulesNoticeTitle: 'El staff aplica el espíritu de las reglas',
    rulesNoticeText:
      'El equipo puede sancionar conductas que vayan contra el espíritu de este reglamento aunque no estén listadas literalmente. Si recibiste una sanción y crees que fue un error, apela abriendo un ticket en nuestro Discord con tu evidencia.',
    rulesAppeal: 'Apelar en Discord',

    // Leaderboard
    lbKicker: 'Top 50 del wipe',
    lbTitle: 'Stats',
    lbSubtitle:
      'Kills, muertes, KDR, farmeo y raideo de los mejores jugadores del servidor. Haz clic en un jugador para ver su perfil completo.',
    lbLoading: 'Cargando estadísticas...',
    lbEmpty: 'Aún no hay registros este wipe.',
    lbNoResults: 'Sin resultados para',
    lbSearch: 'Buscar jugador...',
    lbColPlayer: 'Jugador',
    lbNoResources: 'Sin recursos registrados.',
    lbResGroups: {
      Resources: 'Recursos',
      Farming: 'Cultivo',
      Raid: 'Raid',
      Loot: 'Botín',
    },

    // Perfil
    profLoading: 'Cargando perfil...',
    profLoginTitle: 'Inicia sesión',
    profLoginText:
      'Conéctate con tu cuenta de Steam para ver tu perfil, tus estadísticas del servidor y abrir tickets de soporte.',
    profLoginBtn: 'Iniciar sesión con Steam',
    profAdminBadge: 'Admin',
    profCopySteamId: 'Copiar SteamID',
    profAdminPanel: 'Panel admin',
    profLogout: 'Cerrar sesión',
    profMyTickets: 'Mis tickets',
    profNewTicket: 'Nuevo ticket',
    profTicketsLoading: 'Cargando tickets...',
    profNoTickets: 'No tienes tickets. Crea uno si necesitas ayuda del staff.',
    profTicketsError: 'No se pudieron cargar tus tickets.',
    profMsgOne: 'mensaje',
    profMsgMany: 'mensajes',
    profUpdated: 'Actualizado',

    // Tickets (formulario / hilo)
    tkCategory: 'Categoría',
    tkSubject: 'Asunto',
    tkSubjectPh: 'Resumen corto del problema',
    tkMessage: 'Mensaje',
    tkMessagePh:
      'Describe tu problema con el máximo detalle posible: qué pasó, cuándo, nombres de jugadores involucrados, evidencia, etc.',
    tkCreate: 'Crear ticket',
    tkSending: 'Enviando...',
    tkCancel: 'Cancelar',
    tkErrSubject: 'El asunto debe tener al menos 4 caracteres.',
    tkErrMessage: 'El mensaje debe tener al menos 10 caracteres.',
    tkErrCreate: 'No se pudo crear el ticket.',
    tkErrConn: 'Error de conexión. Inténtalo nuevamente.',
    tkLoading: 'Cargando ticket...',
    tkUnavailable: 'Ticket no disponible.',
    tkBack: 'Volver',
    tkCreated: 'Creado',
    tkReplyPh: 'Escribe tu respuesta...',
    tkReplyClosedPh: 'Responder reabre la conversación (staff)...',
    tkReply: 'Responder',
    tkCloseTicket: 'Cerrar ticket',
    tkReopen: 'Reabrir',
    tkMarkAnswered: 'Marcar respondido',
    tkClosedNote: 'Este ticket está cerrado. Si necesitas más ayuda, crea uno nuevo.',
    tkStaff: 'Staff',
    ticketCat: {
      general: 'Soporte general',
      report: 'Reporte de jugador',
      appeal: 'Apelación de ban',
      store: 'Tienda / Compras',
      bug: 'Bug del servidor',
      other: 'Otro',
    },
    ticketStatus: { open: 'Abierto', answered: 'Respondido', closed: 'Cerrado' },

    // Admin
    admChecking: 'Verificando acceso...',
    admRestrictedTitle: 'Acceso restringido',
    admRestrictedText: 'Inicia sesión con una cuenta de administrador para acceder al panel.',
    admNoPermTitle: 'Sin permisos',
    admNoPermPre: 'Tu cuenta',
    admNoPermPost:
      'no tiene permisos de administrador. Si crees que es un error, contacta al staff por Discord.',
    admGoProfile: 'Ir a mi perfil',
    admKicker: 'Panel administrativo',
    admTitle: 'Gestión de tickets',
    admOpen: 'Abiertos',
    admAnswered: 'Respondidos',
    admClosed: 'Cerrados',
    admTotal: 'Total',
    admTabTickets: 'Tickets',
    admTabUsers: 'Usuarios',
    admFilterAll: 'Todos',
    admAllCategories: 'Todas las categorías',
    admSearchTickets: 'Asunto, nombre o SteamID...',
    admTicketsLoading: 'Cargando tickets...',
    admNoTickets: 'No hay tickets con estos filtros.',
    admUsersTitle: 'Usuarios autenticados',
    admUsersLoading: 'Cargando usuarios...',
    admNoUsers: 'Sin usuarios registrados desde el último reinicio del servidor.',
    admLastLogin: 'Último login',
    admDeleteConfirm: (id) => `¿Eliminar definitivamente el ticket #${id} y toda su conversación?`,
    admDeleteError: 'No se pudo eliminar el ticket.',
  },

  /* ─────────────────────────── ENGLISH ─────────────────────────── */
  en: {
    navHome: 'Home',
    navStore: 'Store',
    navRules: 'Rules',
    navMaps: 'Maps',
    navLeaderboard: 'Stats',
    navSupport: 'Support',
    navDiscord: 'Discord',
    navConnect: 'Connect with us',
    navTagline: 'Competitive Modded Rust',
    comingSoon: 'Coming soon',
    login: 'Sign in',
    footerRights: '© Rustaco — All rights reserved.',

    mapsKicker: 'Server maps',
    mapsTitle: 'Maps',
    mapsSubtitle:
      'Server information and next map vote. The map is renewed on every map wipe to keep the game fresh.',
    mapsTag: 'No BPs Wipes',
    mapsLocation: 'Confidential',
    mapsLocationLabel: 'Location',
    mapsVoteTitle: 'Upcoming Vote Map',
    mapsSoonTitle: 'Coming soon',
    mapsSoonText:
      'The next map vote will be available here before the next wipe. Candidates and the vote date will be announced on our Discord.',
    mapsDiscordBtn: 'Follow announcements on Discord',

    rulesKicker: 'Play fair',
    rulesTitle: 'Server rules',
    rulesIntroPre: 'Official ruleset for',
    rulesIntroPost:
      '. By connecting you agree to follow these rules in full. Not knowing them does not exempt you from complying.',
    rulesNoticeTitle: 'Staff enforces the spirit of the rules',
    rulesNoticeText:
      'The team may sanction behavior that goes against the spirit of this ruleset even if it is not listed literally. If you received a sanction and believe it was a mistake, appeal by opening a ticket on our Discord with your evidence.',
    rulesAppeal: 'Appeal on Discord',

    lbKicker: 'Top 50 of the wipe',
    lbTitle: 'Stats',
    lbSubtitle:
      "Kills, deaths, KDR, farming and raiding of the server's best players. Click a player to see their full profile.",
    lbLoading: 'Loading stats...',
    lbEmpty: 'No records this wipe yet.',
    lbNoResults: 'No results for',
    lbSearch: 'Search player...',
    lbColPlayer: 'Player',
    lbNoResources: 'No resources recorded.',
    lbResGroups: {
      Resources: 'Resources',
      Farming: 'Farming',
      Raid: 'Raid',
      Loot: 'Loot',
    },

    profLoading: 'Loading profile...',
    profLoginTitle: 'Sign in',
    profLoginText:
      'Sign in with your Steam account to see your profile, your server stats and open support tickets.',
    profLoginBtn: 'Sign in with Steam',
    profAdminBadge: 'Admin',
    profCopySteamId: 'Copy SteamID',
    profAdminPanel: 'Admin panel',
    profLogout: 'Sign out',
    profMyTickets: 'My tickets',
    profNewTicket: 'New ticket',
    profTicketsLoading: 'Loading tickets...',
    profNoTickets: "You have no tickets. Create one if you need staff help.",
    profTicketsError: 'Could not load your tickets.',
    profMsgOne: 'message',
    profMsgMany: 'messages',
    profUpdated: 'Updated',

    tkCategory: 'Category',
    tkSubject: 'Subject',
    tkSubjectPh: 'Short summary of the problem',
    tkMessage: 'Message',
    tkMessagePh:
      'Describe your issue in as much detail as possible: what happened, when, names of players involved, evidence, etc.',
    tkCreate: 'Create ticket',
    tkSending: 'Sending...',
    tkCancel: 'Cancel',
    tkErrSubject: 'The subject must be at least 4 characters.',
    tkErrMessage: 'The message must be at least 10 characters.',
    tkErrCreate: 'Could not create the ticket.',
    tkErrConn: 'Connection error. Please try again.',
    tkLoading: 'Loading ticket...',
    tkUnavailable: 'Ticket unavailable.',
    tkBack: 'Back',
    tkCreated: 'Created',
    tkReplyPh: 'Write your reply...',
    tkReplyClosedPh: 'Replying reopens the conversation (staff)...',
    tkReply: 'Reply',
    tkCloseTicket: 'Close ticket',
    tkReopen: 'Reopen',
    tkMarkAnswered: 'Mark answered',
    tkClosedNote: 'This ticket is closed. If you need more help, create a new one.',
    tkStaff: 'Staff',
    ticketCat: {
      general: 'General support',
      report: 'Player report',
      appeal: 'Ban appeal',
      store: 'Store / Purchases',
      bug: 'Server bug',
      other: 'Other',
    },
    ticketStatus: { open: 'Open', answered: 'Answered', closed: 'Closed' },

    admChecking: 'Checking access...',
    admRestrictedTitle: 'Restricted access',
    admRestrictedText: 'Sign in with an administrator account to access the panel.',
    admNoPermTitle: 'No permissions',
    admNoPermPre: 'Your account',
    admNoPermPost:
      'does not have administrator permissions. If you think this is a mistake, contact the staff on Discord.',
    admGoProfile: 'Go to my profile',
    admKicker: 'Admin panel',
    admTitle: 'Ticket management',
    admOpen: 'Open',
    admAnswered: 'Answered',
    admClosed: 'Closed',
    admTotal: 'Total',
    admTabTickets: 'Tickets',
    admTabUsers: 'Users',
    admFilterAll: 'All',
    admAllCategories: 'All categories',
    admSearchTickets: 'Subject, name or SteamID...',
    admTicketsLoading: 'Loading tickets...',
    admNoTickets: 'No tickets with these filters.',
    admUsersTitle: 'Authenticated users',
    admUsersLoading: 'Loading users...',
    admNoUsers: 'No users registered since the last server restart.',
    admLastLogin: 'Last login',
    admDeleteConfirm: (id) => `Permanently delete ticket #${id} and its entire conversation?`,
    admDeleteError: 'Could not delete the ticket.',
  },

  /* ────────────────────────── PORTUGUÊS ────────────────────────── */
  pt: {
    navHome: 'Início',
    navStore: 'Store',
    navRules: 'Regras',
    navMaps: 'Maps',
    navLeaderboard: 'Stats',
    navSupport: 'Suporte',
    navDiscord: 'Discord',
    navConnect: 'Siga-nos',
    navTagline: 'Servidor competitivo de Rust',
    comingSoon: 'Em breve',
    login: 'Entrar',
    footerRights: '© Rustaco — Todos os direitos reservados.',

    mapsKicker: 'Mapas do servidor',
    mapsTitle: 'Maps',
    mapsSubtitle:
      'Informações do servidor e votação do próximo mapa. O mapa é renovado a cada map wipe para manter o jogo fresco.',
    mapsTag: 'No BPs Wipes',
    mapsLocation: 'Confidencial',
    mapsLocationLabel: 'Localização',
    mapsVoteTitle: 'Upcoming Vote Map',
    mapsSoonTitle: 'Em breve',
    mapsSoonText:
      'A votação do próximo mapa estará disponível aqui antes do próximo wipe. Os candidatos e a data da votação serão anunciados no nosso Discord.',
    mapsDiscordBtn: 'Seguir anúncios no Discord',

    rulesKicker: 'Jogue limpo',
    rulesTitle: 'Regras do servidor',
    rulesIntroPre: 'Regulamento oficial de',
    rulesIntroPost:
      '. Ao conectar você aceita cumprir estas regras na íntegra. Desconhecê-las não isenta do seu cumprimento.',
    rulesNoticeTitle: 'O staff aplica o espírito das regras',
    rulesNoticeText:
      'A equipe pode punir condutas que vão contra o espírito deste regulamento mesmo que não estejam listadas literalmente. Se você recebeu uma punição e acredita que foi um erro, apele abrindo um ticket no nosso Discord com sua evidência.',
    rulesAppeal: 'Apelar no Discord',

    lbKicker: 'Top 50 do wipe',
    lbTitle: 'Stats',
    lbSubtitle:
      'Kills, mortes, KDR, farm e raid dos melhores jogadores do servidor. Clique em um jogador para ver seu perfil completo.',
    lbLoading: 'Carregando estatísticas...',
    lbEmpty: 'Ainda não há registros neste wipe.',
    lbNoResults: 'Sem resultados para',
    lbSearch: 'Buscar jogador...',
    lbColPlayer: 'Jogador',
    lbNoResources: 'Sem recursos registrados.',
    lbResGroups: {
      Resources: 'Recursos',
      Farming: 'Plantio',
      Raid: 'Raid',
      Loot: 'Loot',
    },

    profLoading: 'Carregando perfil...',
    profLoginTitle: 'Entrar',
    profLoginText:
      'Conecte-se com sua conta Steam para ver seu perfil, suas estatísticas do servidor e abrir tickets de suporte.',
    profLoginBtn: 'Entrar com Steam',
    profAdminBadge: 'Admin',
    profCopySteamId: 'Copiar SteamID',
    profAdminPanel: 'Painel admin',
    profLogout: 'Sair',
    profMyTickets: 'Meus tickets',
    profNewTicket: 'Novo ticket',
    profTicketsLoading: 'Carregando tickets...',
    profNoTickets: 'Você não tem tickets. Crie um se precisar de ajuda do staff.',
    profTicketsError: 'Não foi possível carregar seus tickets.',
    profMsgOne: 'mensagem',
    profMsgMany: 'mensagens',
    profUpdated: 'Atualizado',

    tkCategory: 'Categoria',
    tkSubject: 'Assunto',
    tkSubjectPh: 'Resumo curto do problema',
    tkMessage: 'Mensagem',
    tkMessagePh:
      'Descreva seu problema com o máximo de detalhes possível: o que aconteceu, quando, nomes dos jogadores envolvidos, evidências, etc.',
    tkCreate: 'Criar ticket',
    tkSending: 'Enviando...',
    tkCancel: 'Cancelar',
    tkErrSubject: 'O assunto deve ter pelo menos 4 caracteres.',
    tkErrMessage: 'A mensagem deve ter pelo menos 10 caracteres.',
    tkErrCreate: 'Não foi possível criar o ticket.',
    tkErrConn: 'Erro de conexão. Tente novamente.',
    tkLoading: 'Carregando ticket...',
    tkUnavailable: 'Ticket indisponível.',
    tkBack: 'Voltar',
    tkCreated: 'Criado',
    tkReplyPh: 'Escreva sua resposta...',
    tkReplyClosedPh: 'Responder reabre a conversa (staff)...',
    tkReply: 'Responder',
    tkCloseTicket: 'Fechar ticket',
    tkReopen: 'Reabrir',
    tkMarkAnswered: 'Marcar respondido',
    tkClosedNote: 'Este ticket está fechado. Se precisar de mais ajuda, crie um novo.',
    tkStaff: 'Staff',
    ticketCat: {
      general: 'Suporte geral',
      report: 'Denúncia de jogador',
      appeal: 'Apelação de ban',
      store: 'Loja / Compras',
      bug: 'Bug do servidor',
      other: 'Outro',
    },
    ticketStatus: { open: 'Aberto', answered: 'Respondido', closed: 'Fechado' },

    admChecking: 'Verificando acesso...',
    admRestrictedTitle: 'Acesso restrito',
    admRestrictedText: 'Entre com uma conta de administrador para acessar o painel.',
    admNoPermTitle: 'Sem permissões',
    admNoPermPre: 'Sua conta',
    admNoPermPost:
      'não tem permissões de administrador. Se você acha que é um erro, contate o staff pelo Discord.',
    admGoProfile: 'Ir para meu perfil',
    admKicker: 'Painel administrativo',
    admTitle: 'Gestão de tickets',
    admOpen: 'Abertos',
    admAnswered: 'Respondidos',
    admClosed: 'Fechados',
    admTotal: 'Total',
    admTabTickets: 'Tickets',
    admTabUsers: 'Usuários',
    admFilterAll: 'Todos',
    admAllCategories: 'Todas as categorias',
    admSearchTickets: 'Assunto, nome ou SteamID...',
    admTicketsLoading: 'Carregando tickets...',
    admNoTickets: 'Não há tickets com estes filtros.',
    admUsersTitle: 'Usuários autenticados',
    admUsersLoading: 'Carregando usuários...',
    admNoUsers: 'Nenhum usuário registrado desde a última reinicialização do servidor.',
    admLastLogin: 'Último login',
    admDeleteConfirm: (id) => `Excluir permanentemente o ticket #${id} e toda a sua conversa?`,
    admDeleteError: 'Não foi possível excluir o ticket.',
  },
};
