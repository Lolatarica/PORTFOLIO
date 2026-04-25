import React from "react";
import Masonry from "../Masonry/Masonry";
import posterPrismoImg from "./poster_prismo.jpg";
import fondoImg from "./fondo_proj_preview.webp";
import "./ProjectPreview.css";

const projects = [
  { id: 1, img: posterPrismoImg, alt: "Proyecto 1" },
  { id: 2, img: posterPrismoImg, alt: "Proyecto 2" },
  { id: 3, img: posterPrismoImg, alt: "Proyecto 3" },
  { id: 4, img: posterPrismoImg, alt: "Proyecto 4" },
  { id: 5, img: posterPrismoImg, alt: "Proyecto 5" },
  { id: 6, img: posterPrismoImg, alt: "Proyecto 6" },
  { id: 7, img: posterPrismoImg, alt: "Proyecto 7" },
  { id: 8, img: posterPrismoImg, alt: "Proyecto 8" },
  { id: 9, img: posterPrismoImg, alt: "Proyecto 9" },
];

export default function ProjectPreview() {
  return (
    <section
      className="project-preview-section"
      style={{ backgroundImage: `url(${fondoImg})` }}
    >
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
    </section>
  );
}

