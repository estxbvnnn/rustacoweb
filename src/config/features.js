/**
 * Flags de funcionalidades del frontend.
 *
 * LOGIN_ENABLED
 *   false -> se ocultan todos los accesos visibles al login de Steam:
 *            el botón de la navbar y las tarjetas de /profile y /admin.
 *   true  -> vuelve a mostrarse todo, sin necesidad de tocar nada más.
 *
 * Para reactivar el login: cambiá el valor a `true` y volvé a compilar
 * (`npm run build`).
 *
 * Nota: esto solo oculta la interfaz. Las rutas del backend (/auth/steam)
 * siguen existiendo; si necesitás bloquearlas de verdad, hay que
 * deshabilitarlas también en src/server.js.
 */
export const LOGIN_ENABLED = false;
