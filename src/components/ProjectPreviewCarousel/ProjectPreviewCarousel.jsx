import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import projects from '../../data/projects';
import './ProjectPreviewCarousel.css';

// Cuánto scroll vertical (en alturas de pantalla) ocupa cada proyecto
const SCROLL_PER_CARD = 0.6;
// Un gesto de scroll = un proyecto. El gesto termina tras esta pausa sin rueda.
const GESTURE_END_MS = 180;
// Tiempo mínimo entre un paso y el siguiente
const MIN_STEP_MS = 550;
// Cuánto hay que girar la rueda para avanzar
const WHEEL_THRESHOLD = 30;
// Con scroll táctil o barra: al soltar, se acomoda en el proyecto más cercano
const SETTLE_DELAY_MS = 140;

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

export default function ProjectPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const navigate = useNavigate();

  const wrapperRef     = useRef(null);
  const sectionRef     = useRef(null);
  const trackRef       = useRef(null);
  const activeIndexRef = useRef(0);

  /* ── translateX para que la tarjeta activa quede centrada ── */
  const computeOffset = useCallback((index) => {
    const track   = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    const card = track.children[index];
    if (!card) return;
    setTrackOffset(section.offsetWidth / 2 - card.offsetLeft - card.offsetWidth / 2);
  }, []);

  const setIndex = useCallback((index) => {
    const next = clamp(index, 0, projects.length - 1);
    activeIndexRef.current = next;
    setActiveIndex(next);
    computeOffset(next);
  }, [computeOffset]);

  /* ── dónde empieza el carrusel y cuánto scroll ocupa cada proyecto ── */
  const getScrollRange = useCallback(() => {
    const start = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    const perCard = window.innerHeight * SCROLL_PER_CARD;
    return { start, perCard, end: start + (projects.length - 1) * perCard };
  }, []);

  /* ── ir a un proyecto: la sección está fija (sticky), así que el salto de
       scroll no se ve; lo que se ve es el deslizamiento del track ── */
  const goTo = useCallback((index) => {
    const next = clamp(index, 0, projects.length - 1);
    const { start, perCard } = getScrollRange();
    setIndex(next);
    window.scrollTo({ top: start + next * perCard, behavior: 'auto' });
  }, [getScrollRange, setIndex]);

  useLayoutEffect(() => { computeOffset(0); }, [computeOffset]);

  /* ── rueda: un gesto = un proyecto ── */
  useEffect(() => {
    let gestureActive = false;
    let gestureTimeoutId = 0;
    let lastStepAt = 0;
    let accumulated = 0;

    const endGestureSoon = () => {
      window.clearTimeout(gestureTimeoutId);
      gestureTimeoutId = window.setTimeout(() => {
        gestureActive = false;
        accumulated = 0;
      }, GESTURE_END_MS);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return;
      const direction = Math.sign(e.deltaY);
      if (direction === 0) return;

      const { start, end } = getScrollRange();
      const y = window.scrollY;
      const index = activeIndexRef.current;

      // Entrando desde arriba o desde abajo: aterriza justo en el borde del carrusel
      if (direction > 0 && y < start - 1) {
        if (y + e.deltaY > start) {
          e.preventDefault();
          window.scrollTo({ top: start, behavior: 'smooth' });
        }
        return;
      }
      if (direction < 0 && y > end + 1) {
        if (y + e.deltaY < end) {
          e.preventDefault();
          window.scrollTo({ top: end, behavior: 'smooth' });
        }
        return;
      }

      // En los extremos, el scroll sigue normal hacia afuera
      if ((direction < 0 && index === 0) || (direction > 0 && index === projects.length - 1)) return;

      e.preventDefault();
      endGestureSoon();
      if (gestureActive) return;

      if (Math.sign(accumulated) !== direction) accumulated = 0;
      accumulated += e.deltaY;
      if (Math.abs(accumulated) < WHEEL_THRESHOLD) return;

      const now = performance.now();
      if (now - lastStepAt < MIN_STEP_MS) return;

      lastStepAt = now;
      gestureActive = true;
      accumulated = 0;
      goTo(index + direction);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.clearTimeout(gestureTimeoutId);
    };
  }, [getScrollRange, goTo]);

  /* ── scroll táctil, barra o teclado: sigue el proyecto más cercano y al soltar se acomoda ── */
  useEffect(() => {
    let settleTimeoutId = 0;

    const nearestIndex = () => {
      const { start, perCard } = getScrollRange();
      return clamp(Math.round((window.scrollY - start) / perCard), 0, projects.length - 1);
    };

    const onScroll = () => {
      const { start, end } = getScrollRange();
      const y = window.scrollY;
      if (y < start - 1 || y > end + 1) return;

      const index = nearestIndex();
      if (index !== activeIndexRef.current) setIndex(index);

      window.clearTimeout(settleTimeoutId);
      settleTimeoutId = window.setTimeout(() => {
        const { start: s, perCard } = getScrollRange();
        const target = s + nearestIndex() * perCard;
        if (Math.abs(window.scrollY - target) > 1) window.scrollTo({ top: target, behavior: 'auto' });
      }, SETTLE_DELAY_MS);
    };

    const onResize = () => computeOffset(activeIndexRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(settleTimeoutId);
    };
  }, [getScrollRange, setIndex, computeOffset]);

  /* ── teclado: ← → solo con el carrusel en pantalla ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return;

      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect || rect.top > 1 || rect.bottom < window.innerHeight - 1) return;

      e.preventDefault();
      goTo(activeIndexRef.current + (e.key === 'ArrowRight' ? 1 : -1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  const active = projects[activeIndex];

  return (
    <div
      ref={wrapperRef}
      className="ppc__wrapper"
      style={{ height: `calc(100svh + ${(projects.length - 1) * SCROLL_PER_CARD * 100}svh)` }}
    >
    <section
      ref={sectionRef}
      id="proyectos"
      className="ppc"
      aria-label="Galería de proyectos"
    >
      {/* ── stage ── */}
      <div className="ppc__stage">
        <div
          ref={trackRef}
          className="ppc__track"
          style={{ transform: `translateX(${trackOffset}px)` }}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`ppc__card${index === activeIndex ? ' ppc__card--active' : ''}`}
              onClick={() => {
                if (index === activeIndex) navigate(`/proyecto/${project.id}`);
                else goTo(index);
              }}
              aria-label={index === activeIndex ? `Ver proyecto ${project.name}` : `Ir al proyecto ${project.name}`}
            >
              <img
                src={project.img}
                alt={project.alt}
                loading="lazy"
                className="ppc__card-img"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── barra inferior ── */}
      <div className="ppc__bar">
        <div className="ppc__bar-info">
          <span className="ppc__bar-index" aria-hidden="true">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <span key={active.id} className="ppc__bar-name">{active.name}</span>
          <span className="ppc__bar-tools" aria-hidden="true">
            {active.tools.map((icon) => (
              <Icon key={icon} icon={icon} className="ppc__bar-icon" />
            ))}
          </span>
        </div>
      </div>

    </section>
    </div>
  );
}
