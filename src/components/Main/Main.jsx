import './Main.css';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import SplitText from '../SplitText/SplitText';
import MagicRings from '../MagicRings/MagicRings';
import holaImg from '../../assets/img_main/hola.webp';
import decorLoopsImg from '../../assets/img_main/obj2.webp';
import inicioSinClicImg from '../../assets/img_telefono/inicio_sin clic.png';
import menuEstuImg from '../../assets/img_telefono/menu_estu.png';
import menuExpImg from '../../assets/img_telefono/menu_exp.png';
import menuProyImg from '../../assets/img_telefono/menu_proy.png';
import menuSobreMiImg from '../../assets/img_telefono/menu_sobre mi.png';
import { motion } from 'framer-motion';
import ParagraphMaskAnim from './ParagraphMaskAnim';
import ParagraphMotion from './ParagraphMotion';
import ProjectPreviewCarousel from '../ProjectPreviewCarousel/ProjectPreviewCarousel';

const CONTENT_REVEAL_DELAY_MS = 900;
const PROJECTS_SECTION_ID = 'proyectos';
const PROJECTS_SCROLL_DURATION_MS = 1600;
const ABOUT_ME_SCREEN_INDEX = 0;

const timelineData = [
  {
    title: "Desarrolladora Web Full Stack y Diseñadora UX/UI",
    subtitle: "Marca de Accesorios - AleTarica Joyas",
    description: "Potencié la <strong>identidad de marca</strong> y <strong>productividad empresarial</strong> mediante el diseño de <strong>e-commerce</strong> y el <strong>desarrollo de sistemas internos</strong> optimizados con <strong>PHP y gestión de datos.</strong>",
    tech: "HTML, CSS, JavaScript, PHP, MySQL, Illustrator, Photoshop, After Effects, Figma."
  },
  {
    title: "Diseñadora Gráfica y Textil",
    subtitle: "Fabrica de Merchandising",
    description: "Gestioné el <strong>diseño técnico</strong> y <strong>control de calidad</strong> en <strong>estampación textil (DTF)</strong> e <strong>impresión industrial</strong>, asegurando la excelencia visual en <strong>merchandising</strong> y <strong>regalos empresariales</strong>.",
    tech: "Illustrator, Photoshop."
  },
  {
    title: "Diseñadora Multimedia",
    subtitle: "Marca de Accesorios - Cachetona Accesorios",
    description: "Gestioné la <strong>estrategia visual integral</strong> y <strong>producción de contenido digital</strong>, optimizando la <strong>narrativa de marca</strong> a través de <strong>piezas audiovisuales y fotográficas</strong>.",
    tech: "Adobe Photoshop, Premiere, After Effects, Fotografía."
  }
];

const menuScreens = [
  {
    id: 'sobre-mi',
    image: menuSobreMiImg,
    alt: 'Telefono morado mostrando el menu con Sobre mi seleccionado',
    title: 'Hola!',
    titleImage: holaImg,
    paragraphs: [
      'Soy <strong>Lola Tarica</strong>, una <strong>Diseñadora Multimedia</strong> con un gran amor por el <strong>arte</strong> y la <strong>tecnología</strong>. Por eso, me encargo de generar <strong>experiencias</strong>, <strong>diseños</strong> y <strong>aplicaciones</strong> que transmitan y funcionen. Estoy enfocada en el <strong>diseño y desarrollo web</strong>, el <strong>diseño gráfico</strong> y el <strong>modelado 3D</strong>.',
      'A lo largo de mi carrera me he llenado de <strong>herramientas</strong> y <strong>conocimientos</strong> para poder llevar a cabo todas las ideas que tengo, desde la más <strong>loca</strong> y <strong>desafiante</strong>, hasta la más <strong>básica</strong> y <strong>funcional</strong>. Lo cual no me permite parar de buscar, porque <strong>las ideas no paran de llegar</strong>, y cada una es una <strong>nueva aventura</strong> que quiero vivir.',
    ],
  },
  {
    id: 'experiencia',
    image: menuExpImg,
    alt: 'Telefono morado mostrando el menu con Experiencia seleccionada',
    title: 'Experiencia',
    paragraphs: [
      'Participe en proyectos visuales y web donde combine diseno, identidad de marca y desarrollo frontend.',
      'Me gusta resolver interfaces con detalle, cuidando tanto la estetica como la experiencia de uso.',
    ],
  },
  {
    id: 'estudios',
    image: menuEstuImg,
    alt: 'Telefono morado mostrando el menu con Estudios seleccionado',
    title: 'Estudios',
    paragraphs: [
      'En mi carrera como <strong>Diseñadora Multimeida</strong> aprendí a conceptualizar y crear identidades de marca desde cero, aplicando <strong>diseño gráfico</strong> y <strong>retoque digital avanzado</strong>. <strong>Edición de video, motion graphics, modelado y animación 3D y creación de entornos para videojuegos.</strong> <strong>Programación, gestión de bases de datos, UX/UI y Marketing Digital.</strong>',
    ],
  },
  {
    id: 'proyectos',
    image: menuProyImg,
    alt: 'Telefono morado mostrando el menu con Proyectos seleccionado',
    title: 'Proyectos',
    paragraphs: [
      'Descubre una selección de proyectos de diseño y desarrollo en la galería de abajo.',
    ],
  },
];

const studiesPrograms = [
  { label: 'Adobe Photoshop', icon: 'skill-icons:photoshop' },
  { label: 'Adobe Illustrator', icon: 'skill-icons:illustrator' },
  { label: 'Adobe After Effects', icon: 'skill-icons:aftereffects' },
  { label: 'Adobe Premiere', icon: 'skill-icons:premiere' },
  { label: 'Figma', icon: 'logos:figma' },
  { label: 'Blender', icon: 'logos:blender' },
  { label: 'Unity', icon: 'devicon:unity' },
];

const studiesFrameworks = [
  { label: 'HTML', icon: 'devicon:html5' },
  { label: 'CSS', icon: 'devicon:css3' },
  { label: 'JavaScript', icon: 'devicon:javascript' },
  { label: 'React', icon: 'logos:react' },
  { label: 'C#', icon: 'devicon:csharp' },
  { label: 'PHP', icon: 'logos:php' },
  { label: 'MySQL', icon: 'logos:mysql' },
];

export default function Main() {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const contentParallaxRef = useRef(null);
  const projectsScrollAnimationRef = useRef(0);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const isMagicRingsDimmed = isContentVisible;

  const currentScreen =
    selectedMenuIndex === null
      ? {
          image: inicioSinClicImg,
          alt: 'Telefono morado con una foto y mensaje para iniciar el portfolio',
        }
      : menuScreens[selectedMenuIndex];

  const currentContent = selectedMenuIndex === null ? null : menuScreens[selectedMenuIndex];
  const isProjectsOptionSelected = currentContent?.id === PROJECTS_SECTION_ID;

  const scrollToProjects = () => {
    const projectsSection = document.getElementById(PROJECTS_SECTION_ID);

    if (!projectsSection) {
      return;
    }

    setSelectedMenuIndex(menuScreens.length - 1);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      projectsSection.scrollIntoView({ behavior: 'auto', block: 'start' });
      setSelectedMenuIndex(ABOUT_ME_SCREEN_INDEX);
      return;
    }

    const startY = window.scrollY;
    const targetY = window.scrollY + projectsSection.getBoundingClientRect().top;
    const distanceY = targetY - startY;
    const duration = PROJECTS_SCROLL_DURATION_MS;

    if (Math.abs(distanceY) < 2) {
      setSelectedMenuIndex(ABOUT_ME_SCREEN_INDEX);
      return;
    }

    if (projectsScrollAnimationRef.current !== 0) {
      window.cancelAnimationFrame(projectsScrollAnimationRef.current);
      projectsScrollAnimationRef.current = 0;
    }

    let startTime = null;
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);

    const animateScroll = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      window.scrollTo({ top: startY + (distanceY * easedProgress), behavior: 'auto' });

      if (progress < 1) {
        projectsScrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
        return;
      }

      projectsScrollAnimationRef.current = 0;
      setSelectedMenuIndex(ABOUT_ME_SCREEN_INDEX);
    };

    projectsScrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
  };

  const openMenu = () => {
    if (selectedMenuIndex !== null && menuScreens[selectedMenuIndex]?.id === PROJECTS_SECTION_ID) {
      scrollToProjects();
      return;
    }

    setSelectedMenuIndex((currentIndex) => {
      if (currentIndex !== null) {
        return currentIndex;
      }

      return 0;
    });
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const parallaxElement = parallaxRef.current;

    if (!sectionElement || !parallaxElement) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId = 0;

    const updateParallax = () => {
      animationFrameId = 0;

      if (reduceMotionQuery.matches) {
        parallaxElement.style.setProperty('--phone-reveal-y', '0px');
        parallaxElement.style.setProperty('--phone-reveal-opacity', '1');
        return;
      }

      const rect = sectionElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const revealStart = viewportHeight;
      const revealEnd = viewportHeight * 0.18;
      const revealRange = revealStart - revealEnd;
      const rawProgress = (revealStart - rect.top) / revealRange;
      const revealProgress = Math.max(0, Math.min(1, rawProgress));
      const easedRevealProgress = revealProgress ** 1.5;
      const revealDistance = mediaQuery.matches ? 320 : 640;
      const translateY = (1 - easedRevealProgress) * revealDistance;
      const opacity = 0.02 + (easedRevealProgress * 0.98);

      parallaxElement.style.setProperty('--phone-reveal-y', `${translateY.toFixed(2)}px`);
      parallaxElement.style.setProperty('--phone-reveal-opacity', opacity.toFixed(3));
    };

    const requestUpdate = () => {
      if (animationFrameId !== 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    mediaQuery.addEventListener('change', requestUpdate);
    reduceMotionQuery.addEventListener('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      mediaQuery.removeEventListener('change', requestUpdate);
      reduceMotionQuery.removeEventListener('change', requestUpdate);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId = 0;

    const updateContentParallax = () => {
      animationFrameId = 0;
      const contentElement = contentParallaxRef.current;

      if (!contentElement) {
        return;
      }

      if (reduceMotionQuery.matches) {
        contentElement.style.setProperty('--content-reveal-y', '0px');
        return;
      }

      const rect = sectionElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const revealStart = viewportHeight * 0.82;
      const revealEnd = viewportHeight * 0.08;
      const revealRange = revealStart - revealEnd;
      const rawProgress = (revealStart - rect.top) / revealRange;
      const revealProgress = Math.max(0, Math.min(1, rawProgress));
      const easedRevealProgress = revealProgress ** 1.5;
      const revealDistance = mediaQuery.matches ? 200 : 400;
      const translateY = (1 - easedRevealProgress) * revealDistance;

      contentElement.style.setProperty('--content-reveal-y', `${translateY.toFixed(2)}px`);
    };

    const requestContentUpdate = () => {
      if (animationFrameId !== 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateContentParallax);
    };

    updateContentParallax();
    window.addEventListener('scroll', requestContentUpdate, { passive: true });
    window.addEventListener('resize', requestContentUpdate);
    mediaQuery.addEventListener('change', requestContentUpdate);
    reduceMotionQuery.addEventListener('change', requestContentUpdate);

    return () => {
      window.removeEventListener('scroll', requestContentUpdate);
      window.removeEventListener('resize', requestContentUpdate);
      mediaQuery.removeEventListener('change', requestContentUpdate);
      reduceMotionQuery.removeEventListener('change', requestContentUpdate);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedMenuIndex === null || isMenuOpen) {
      return undefined;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setIsMenuOpen(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isMenuOpen, selectedMenuIndex]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsContentVisible(true);
    }, CONTENT_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !isProjectsOptionSelected) {
      return;
    }

    scrollToProjects();
  }, [isMenuOpen, isProjectsOptionSelected]);

  const moveSelection = (direction) => {
    setSelectedMenuIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      const nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        return 0;
      }

      if (nextIndex >= menuScreens.length) {
        return menuScreens.length - 1;
      }

      return nextIndex;
    });
  };

  return (
    <div className="main-container">
      <section ref={sectionRef} className="intro-section" aria-label="Introduccion del portfolio">
        <div
          className={`intro-section__rings${isMagicRingsDimmed ? ' intro-section__rings--dimmed' : ''}`}
          aria-hidden="true"
        >
          <MagicRings
            color="#f8c6ff"
            colorTwo="#84d8ff"
            ringCount={5}
            speed={0.72}
            attenuation={12}
            lineThickness={2.2}
            baseRadius={0.23}
            radiusStep={0.1}
            scaleRate={0.08}
            opacity={0.9}
            blur={1.5}
            noiseAmount={0.04}
            rotation={14}
            ringGap={1.5}
            fadeIn={0.62}
            fadeOut={0.58}
            followMouse
            mouseInfluence={0.12}
            hoverScale={1.06}
            parallax={0.03}
          />
        </div>
        <div className={`intro-section__layout${isMenuOpen ? ' intro-section__layout--menu-open' : ''}`}>
          <div ref={parallaxRef} className="intro-section__parallax">
            <div className={`intro-section__frame${isMenuOpen ? ' intro-section__frame--menu-open' : ''}`}>
              <div
                className={`intro-section__phone-decor${isContentVisible ? ' intro-section__phone-decor--visible' : ''}`}
                aria-hidden="true"
              >
                <img
                  className="intro-section__phone-decor-image intro-section__phone-decor-image--loops"
                  src={decorLoopsImg}
                  alt=""
                />
              </div>
              <div className={`intro-section__phone${isMenuOpen ? ' intro-section__phone--menu-open' : ''}`}>
                <img
                  className="intro-section__image"
                  src={currentScreen.image}
                  alt={currentScreen.alt}
                />
                <button
                  type="button"
                  className="intro-section__control intro-section__control--up"
                  onClick={() => moveSelection(-1)}
                  aria-label="Mover seleccion hacia arriba"
                />
                <button
                  type="button"
                  className="intro-section__control intro-section__control--confirm"
                  onClick={openMenu}
                  aria-label="Abrir menu del telefono"
                />
                <button
                  type="button"
                  className="intro-section__control intro-section__control--down"
                  onClick={() => moveSelection(1)}
                  aria-label="Mover seleccion hacia abajo"
                />
              </div>
            </div>
          </div>
          {currentContent && !isProjectsOptionSelected && (
            <article
              ref={contentParallaxRef}
              className={`intro-section__content${isContentVisible ? ' intro-section__content--menu-open' : ''}`}
              aria-live={isContentVisible ? 'polite' : undefined}
              aria-hidden={isContentVisible ? undefined : true}
            >
              {isContentVisible && currentContent.id !== 'experiencia' && currentContent.id !== 'estudios' && (currentContent.titleImage ? (
                <img
                  key={`${currentContent.id}-title-image`}
                  className="intro-section__title-image"
                  src={currentContent.titleImage}
                  alt={currentContent.title}
                />
              ) : (
                <SplitText
                  key={`${currentContent.id}-title`}
                  className="intro-section__title"
                  text={currentContent.title}
                  delay={40}
                  duration={1.15}
                  ease="power2.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px"
                  textAlign="left"
                  whiteSpace="normal"
                  tag="h2"
                />
              ))}
              {isContentVisible && (
                <>
                  <div className="intro-section__copy">
                    {currentContent.id === 'experiencia' ? (
                      <div className="custom-timeline custom-timeline--animate">
                        {timelineData.map((item, index) => (
                          <div className="custom-timeline__item" key={index}>
                            <div className="custom-timeline__marker">
                              <svg
                                className={`custom-timeline__ring custom-timeline__ring--animated ${item.glow ? 'custom-timeline__ring--glow' : ''}`}
                                style={{ animationDelay: `${0.1 + index * 0.5}s` }}
                                viewBox="0 0 14 14"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect x="4" y="0" width="6" height="2" fill="currentColor"/>
                                <rect x="2" y="2" width="2" height="2" fill="currentColor"/>
                                <rect x="10" y="2" width="2" height="2" fill="currentColor"/>
                                <rect x="0" y="4" width="2" height="6" fill="currentColor"/>
                                <rect x="12" y="4" width="2" height="6" fill="currentColor"/>
                                <rect x="2" y="10" width="2" height="2" fill="currentColor"/>
                                <rect x="10" y="10" width="2" height="2" fill="currentColor"/>
                                <rect x="4" y="12" width="6" height="2" fill="currentColor"/>
                              </svg>
                              {index !== timelineData.length - 1 && (
                                <div
                                  className="custom-timeline__line custom-timeline__line--animated"
                                  style={{ animationDelay: `${0.3 + index * 0.5}s` }}
                                />
                              )}
                            </div>
                            <div
                              className="custom-timeline__content custom-timeline__content--animated"
                              style={{ animationDelay: `${0.3 + index * 0.5}s` }}
                            >
                              <h3 className="custom-timeline__title neon-text">{item.title}</h3>
                              <h4 className="custom-timeline__subtitle">{item.subtitle}</h4>
                              <p className="custom-timeline__desc" dangerouslySetInnerHTML={{ __html: item.description }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : currentContent.id === 'estudios' ? (
                      <div className="estudios-layout">
                        <motion.h2
                          className="custom-timeline__title"
                          initial={{ opacity: 0, y: 32 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        >
                          <a href="https://davinci.edu.ar/carreras/diseno-multimedial" target="_blank" rel="noopener noreferrer" className="estudios-layout__title-link">Diseñadora Multimedia en Escuela DaVinci</a>
                        </motion.h2>
                        <div className="estudios-description">
                          <ParagraphMotion
                            html={currentContent.paragraphs[0]}
                            className="intro-section__paragraph"
                            delay={0.2}
                          />
                        </div>
                        <div className="estudios-columns estudios-columns--separated">
                          <div className="estudios-col">
                            <h3 className="custom-timeline__title estudios-col-title">PROGRAMAS</h3>
                            <ul className="estudios-list">
                              {studiesPrograms.map(({ label, icon }) => (
                                <li key={label} className="estudios-list__item" aria-label={label} title={label}>
                                  <span className="estudios-list__icon" aria-hidden="true">
                                    <Icon icon={icon} />
                                  </span>
                                  <span className="estudios-list__label">{label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="estudios-col">
                            <h3 className="custom-timeline__title estudios-col-title">LENGUAJES</h3>
                            <ul className="estudios-list">
                              {studiesFrameworks.map(({ label, icon }) => (
                                <li key={label} className="estudios-list__item" aria-label={label} title={label}>
                                  <span className="estudios-list__icon" aria-hidden="true">
                                    <Icon icon={icon} />
                                  </span>
                                  <span className="estudios-list__label">{label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      currentContent.paragraphs.map((paragraph, index) => {
                        if (currentContent.id === 'sobre-mi' && index === 0) {
                          return (
                            <ParagraphMotion key={`${currentContent.id}-paragraph-motion`} html={paragraph} className="intro-section__paragraph" delay={0.2} />
                          );
                        }
                        if (currentContent.id === 'sobre-mi' && index === 1) {
                          return (
                            <ParagraphMotion key={`${currentContent.id}-paragraph-mask`} html={paragraph} className="intro-section__paragraph" delay={0.45} />
                          );
                        }
                        return (
                          <SplitText
                            key={`${currentContent.id}-paragraph-${index}`}
                            className="intro-section__paragraph"
                            text={paragraph}
                            allowHtml
                            delay={12}
                            duration={0.9}
                            ease="power2.out"
                            splitType="words"
                            from={{ opacity: 0, y: 18 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0}
                            rootMargin="0px"
                            textAlign="left"
                            whiteSpace="normal"
                            tag="p"
                          />
                        );
                      })
                    )}
                  </div>
                  {currentContent.id === 'sobre-mi' && (
                    <div className="intro-section__actions" aria-label="Acciones principales">
                      <button type="button" className="intro-section__action-button">
                        Contactar!
                      </button>
                      <button type="button" className="intro-section__action-button">
                        Descargar CV
                      </button>
                    </div>
                  )}
                </>
              )}
            </article>
          )}
        </div>
      </section>
      <div id="proyectos">
        <ProjectPreviewCarousel />
      </div>
    </div>
  );
}