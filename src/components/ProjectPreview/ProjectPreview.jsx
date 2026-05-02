import React, { useEffect, useRef, useState } from "react";
import Masonry from "../Masonry/Masonry";
import posterPrismoImg from "./projects_img/poster_prismo_opt.jpg";
import griegoImg from "./projects_img/griego_img_opt.jpg";
import celularImg from "./projects_img/celular_opt.jpg";
import preview3Img from "./projects_img/3_opt.jpg";
import fondoImg from "./fondo_proj_preview.webp";
import "./ProjectPreview.css";

const projects = [
  { id: 1, img: posterPrismoImg, alt: "Poster Prismo",      name: "Prismo",           tools: ["logos:figma", "logos:adobe-illustrator"] },
  { id: 2, img: griegoImg,       alt: "Proyecto Griego",   name: "Proyecto Griego",  tools: ["logos:adobe-photoshop", "logos:adobe-illustrator"] },
  { id: 3, img: celularImg,      alt: "Preview Celular",   name: "App Móvil",        tools: ["logos:figma", "logos:adobe-after-effects"] },
  { id: 4, img: preview3Img,     alt: "Proyecto Visual 3", name: "Visual III",       tools: ["logos:adobe-illustrator", "logos:adobe-photoshop"] },
  { id: 5, img: griegoImg,       alt: "Proyecto Griego 2", name: "Proyecto Griego 2",tools: ["logos:adobe-photoshop", "logos:adobe-illustrator"] },
  { id: 6, img: posterPrismoImg, alt: "Poster Prismo 2",   name: "Prismo II",        tools: ["logos:figma", "logos:adobe-illustrator"] },
  { id: 7, img: celularImg,      alt: "Preview Celular 2", name: "App Móvil II",     tools: ["logos:figma", "logos:adobe-after-effects"] },
  { id: 8, img: preview3Img,     alt: "Proyecto Visual 3", name: "Visual IV",        tools: ["logos:adobe-illustrator", "logos:adobe-photoshop"] },
];

export default function ProjectPreview({ activeCategory = "programacion" }) {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);
  const categories = [
    { id: "diseno-grafico", label: "Diseño Gráfico" },
    { id: "programacion", label: "Programación" },
    { id: "3d", label: "3D" },
  ];

  const categoryDescriptions = {
    "diseno-grafico": "Creo identidades visuales, piezas gráficas y sistemas de diseño que comunican con precisión y generan impacto inmediato.",
    "programacion": "Trabajo de forma híbrida entre el diseño y el desarrollo para generar piezas visuales magnéticas y comunicadores potentes.",
    "3d": "Modelo y animo entornos y objetos 3D que llevan las ideas al siguiente nivel, desde renders hasta assets para videojuegos.",
  };

  const [currentCategory, setCurrentCategory] = useState(activeCategory);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const parallaxElement = parallaxRef.current;

    if (!sectionElement || !parallaxElement) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;

    const updateParallax = () => {
      animationFrameId = 0;

      if (reduceMotionQuery.matches) {
        parallaxElement.style.setProperty("--projects-reveal-y", "0px");
        parallaxElement.style.setProperty("--projects-reveal-opacity", "1");
        return;
      }

      const rect = sectionElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const revealStart = viewportHeight * 0.96;
      const revealEnd = viewportHeight * 0.16;
      const revealRange = revealStart - revealEnd;
      const rawProgress = (revealStart - rect.top) / revealRange;
      const revealProgress = Math.max(0, Math.min(1, rawProgress));
      const easedRevealProgress = revealProgress ** 1.45;
      const revealDistance = mediaQuery.matches ? 180 : 340;
      const translateY = (1 - easedRevealProgress) * revealDistance;
      const opacity = 0.04 + (easedRevealProgress * 0.96);

      parallaxElement.style.setProperty("--projects-reveal-y", `${translateY.toFixed(2)}px`);
      parallaxElement.style.setProperty("--projects-reveal-opacity", opacity.toFixed(3));
    };

    const requestUpdate = () => {
      if (animationFrameId !== 0) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mediaQuery.addEventListener("change", requestUpdate);
    reduceMotionQuery.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mediaQuery.removeEventListener("change", requestUpdate);
      reduceMotionQuery.removeEventListener("change", requestUpdate);

      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="project-preview-section"
      data-active-category={currentCategory}
      style={{ backgroundImage: `url(${fondoImg})` }}
    >
      <div ref={parallaxRef} className="project-preview-section__parallax">
        <div className="category-filter-section" aria-label="Filtro de categorías">
          <div className="category-filter__tabs">
            {categories.map((cat, index) => (
              <React.Fragment key={cat.id}>
                {index > 0 && (
                  <span className="category-filter__separator" aria-hidden="true">•</span>
                )}
                <button
                  type="button"
                  className={`category-filter__tab${currentCategory === cat.id ? " category-filter__tab--active" : ""}`}
                  onClick={() => setCurrentCategory(cat.id)}
                >
                  {cat.label}
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="category-filter__text">
            <p className="category-filter__description">
              {categoryDescriptions[currentCategory]}
            </p>
            <p className="category-filter__tagline">
              Si el proyecto no genera un impacto, no es suficiente.
            </p>
          </div>
        </div>
        <Masonry
          items={projects}
          columns={3}
          animateFrom="bottom"
          duration={0.7}
          stagger={0.06}
          ease="power3.out"
          scaleOnHover={true}
          hoverScale={0.97}
          blurToFocus={true}
        />
      </div>
    </section>
  );
}

