import './Main.css';
import { useEffect, useRef, useState } from 'react';
import {
  SiBlender,
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPhp,
  SiReact,
} from 'react-icons/si';
import {
  TbBrandAdobeAfterEffect,
  TbBrandAdobeIllustrator,
  TbBrandAdobePhotoshop,
  TbBrandAdobePremier,
} from 'react-icons/tb';
import SplitText from '../SplitText/SplitText';
import MagicRings from '../MagicRings/MagicRings';
import holaImg from '../../assets/img_main/hola.webp';
import decorLoopsImg from '../../assets/img_main/obj2.webp';
import inicioSinClicImg from '../../assets/img_telefono/inicio_sin clic.png';
import menuEstuImg from '../../assets/img_telefono/menu_estu.png';
import menuExpImg from '../../assets/img_telefono/menu_exp.png';
import menuSobreMiImg from '../../assets/img_telefono/menu_sobre mi.png';
import ParagraphMaskAnim from './ParagraphMaskAnim';
import ParagraphMotion from './ParagraphMotion';
import ProjectPreview from '../ProjectPreview/ProjectPreview';

const CONTENT_REVEAL_DELAY_MS = 900;

const timelineData = [
  {
    title: "Desarrolladora Web Full Stack y Diseñadora UX/UI",
    subtitle: "Marca de Accesorios - AleTarica Joyas",
    description: "Lideré el diseño UX y desarrollo integral de plataformas e-commerce, potenciando la identidad visual de la marca. Desarrollé aplicaciones web internas a medida para escalar la gestión y la productividad empresarial. Optimicé los flujos operativos implementando soluciones backend eficientes con PHP y bases de datos.",
    tech: "HTML, CSS, JavaScript, PHP, MySQL, Illustrator, Photoshop, After Effects, Figma."
  },
  {
    title: "Diseñadora Gráfica y Textil",
    subtitle: "Fabrica de Merchandising",
    description: "Gestioné el diseño y las adaptaciones gráficas técnicas para estampado textil e impresión industrial DTF. Garanticé el control de calidad en la producción de merchandising y regalos empresariales, asegurando que cada producto final cumpla con los más altos estándares técnicos y visuales.",
    tech: "Illustrator, Photoshop."
  },
  {
    title: "Diseñadora Multimedia",
    subtitle: "Marca de Accesorios - Cachetona Accesorios",
    description: "Dirigí la estrategia visual de la marca, abarcando desde la fotografía de producto hasta la edición de video para redes sociales. Creé contenido multimedia de alto impacto que fortaleció la identidad de marca en plataformas digitales.",
    tech: "Adobe Photoshop, Premiere, After Effects, Fotografía.",
    glow: true
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
      'En mi carrera como Diseñadora Multimeida aprendí a conceptualizar y crear identidades de marca desde cero, aplicando diseño gráfico y retoque digital avanzado. Edición de video, motion graphics, modelado y animación 3D y creación de entornos para videojuegos. Programación, gestión de bases de datos, UX/UI y Marketing Digital.',
    ],
  },
];

const studiesPrograms = [
  { label: 'Adobe Photoshop', Icon: TbBrandAdobePhotoshop },
  { label: 'Adobe Illustrator', Icon: TbBrandAdobeIllustrator },
  { label: 'Adobe After Effects', Icon: TbBrandAdobeAfterEffect },
  { label: 'Adobe Premiere', Icon: TbBrandAdobePremier },
  { label: 'Figma', Icon: SiFigma },
  { label: 'Blender', Icon: SiBlender },
];

const studiesFrameworks = [
  { label: 'HTML', Icon: SiHtml5 },
  { label: 'CSS', Icon: SiCss },
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'React', Icon: SiReact },
  { label: 'PHP', Icon: SiPhp },
  { label: 'MySQL', Icon: SiMysql },
];

export default function Main() {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const isMagicRingsDimmed = isContentVisible;

  const categories = [
    { id: 'diseno-grafico', label: 'Diseño Gráfico' },
    { id: 'programacion', label: 'Programación' },
    { id: '3d', label: '3D' },
  ];

  const categoryDescriptions = {
    'diseno-grafico': 'Creo identidades visuales, piezas gráficas y sistemas de diseño que comunican con precisión y generan impacto inmediato.',
    'programacion': 'Trabajo de forma híbrida entre el diseño y el desarrollo para generar piezas visuales magnéticas y comunicadores potentes.',
    '3d': 'Modelo y animo entornos y objetos 3D que llevan las ideas al siguiente nivel, desde renders hasta assets para videojuegos.',
  };

  const [activeCategory, setActiveCategory] = useState('programacion');

  const currentScreen =
    selectedMenuIndex === null
      ? {
          image: inicioSinClicImg,
          alt: 'Telefono morado con una foto y mensaje para iniciar el portfolio',
        }
      : menuScreens[selectedMenuIndex];

  const currentContent = selectedMenuIndex === null ? null : menuScreens[selectedMenuIndex];

  const openMenu = () => {
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
          {currentContent && (
            <article
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
                              <p className="custom-timeline__desc">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : currentContent.id === 'estudios' ? (
                      <div className="estudios-layout">
                        <div className="estudios-description">
                          <SplitText
                            className="intro-section__paragraph"
                            text={currentContent.paragraphs[0]}
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
                        </div>
                        <div className="estudios-columns estudios-columns--separated">
                          <div className="estudios-col">
                            <h3 className="custom-timeline__title estudios-col-title">PROGRAMAS</h3>
                            <ul className="estudios-list">
                              {studiesPrograms.map(({ label, Icon }) => (
                                <li key={label} className="estudios-list__item" aria-label={label} title={label}>
                                  <span className="estudios-list__icon" aria-hidden="true">
                                    <Icon />
                                  </span>
                                  <span className="estudios-list__label">{label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="estudios-col">
                            <h3 className="custom-timeline__title estudios-col-title">LENGUAJES</h3>
                            <ul className="estudios-list">
                              {studiesFrameworks.map(({ label, Icon }) => (
                                <li key={label} className="estudios-list__item" aria-label={label} title={label}>
                                  <span className="estudios-list__icon" aria-hidden="true">
                                    <Icon />
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
                            <ParagraphMotion key={`${currentContent.id}-paragraph-motion`} html={paragraph} className="intro-section__paragraph" />
                          );
                        }
                        if (currentContent.id === 'sobre-mi' && index === 1) {
                          return (
                            <ParagraphMaskAnim key={`${currentContent.id}-paragraph-mask`} html={paragraph} className="intro-section__paragraph" />
                          );
                        }
                        return (
                          <SplitText
                            key={`${currentContent.id}-paragraph-${index}`}
                            className="intro-section__paragraph"
                            text={paragraph}
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
      <section className="category-filter-section" aria-label="Filtro de categorías">
        <div className="category-filter__tabs">
          {categories.map((cat, index) => (
            <>
              {index > 0 && (
                <span key={`sep-${cat.id}`} className="category-filter__separator" aria-hidden="true">•</span>
              )}
              <button
                key={cat.id}
                type="button"
                className={`category-filter__tab${activeCategory === cat.id ? ' category-filter__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            </>
          ))}
        </div>
        <div className="category-filter__text">
          <p className="category-filter__description">
            {categoryDescriptions[activeCategory]}
          </p>
          <p className="category-filter__tagline">
            Si el proyecto no genera una reacción inmediata, no es suficiente.
          </p>
        </div>
      </section>
      <ProjectPreview />
    </div>
  );
}