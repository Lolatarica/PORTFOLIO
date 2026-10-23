// Evento para liberar la "puerta" de scroll del celular (ver Main.jsx).
// Se dispara cuando alguien elige ir a una sección de más abajo a propósito.
export const SCROLL_GATE_UNLOCK_EVENT = 'portfolio:unlock-scroll';

export const unlockScrollGate = () => {
  window.dispatchEvent(new Event(SCROLL_GATE_UNLOCK_EVENT));
};
