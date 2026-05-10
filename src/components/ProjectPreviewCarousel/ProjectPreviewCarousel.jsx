import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import projects from '../../data/projects';
import './ProjectPreviewCarousel.css';



function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

export default function ProjectPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);
  const navigate = useNavigate();

  const wrapperRef     = useRef(null);
  const sectionRef     = useRef(null);
  const trackRef       = useRef(null);
  const activeIndexRef = useRef(0);

  /* ── compute translateX so the active card is centered ── */
  const computeOffset = useCallback((index) => {
    const track   = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    const card = track.children[index];
    if (!card) return;
    const sectionW = section.offsetWidth;
    const cardW    = card.offsetWidth;
    const cardLeft = card.offsetLeft;
    setTrackOffset(sectionW / 2 - cardLeft - cardW / 2);
  }, []);

  /* ── navigate ── */
  const goTo = useCallback((index) => {
    const next = clamp(index, 0, projects.length - 1);
    activeIndexRef.current = next;
    setActiveIndex(next);
    computeOffset(next);
  }, [computeOffset]);

  /* ── initial + resize ── */
  useLayoutEffect(() => { computeOffset(0); }, [computeOffset]);

  useEffect(() => {
    const handleResize = () => computeOffset(activeIndexRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [computeOffset]);

  /* ── scroll → índice (sticky wrapper) ── */
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const wrapperTop = wrapper.offsetTop;
      const progress   = window.scrollY - wrapperTop;
      if (progress < 0) return;
      const step    = window.innerHeight * 0.45;
      const index   = Math.floor(progress / step);
      const clamped = clamp(index, 0, projects.length - 1);
      if (clamped !== activeIndexRef.current) goTo(clamped);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [goTo]);

  /* ── keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(activeIndexRef.current + 1);
      if (e.key === 'ArrowLeft')  goTo(activeIndexRef.current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  const active = projects[activeIndex];

  return (
    <div
      ref={wrapperRef}
      className="ppc__wrapper"
      style={{ height: `calc(${projects.length} * 100svh)` }}
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
              onClick={() => { if (index === activeIndex) navigate(`/proyecto/${project.id}`); }}
              aria-label={`Ver proyecto ${project.name}`}
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
          <span className="ppc__bar-name">{active.name}</span>
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
