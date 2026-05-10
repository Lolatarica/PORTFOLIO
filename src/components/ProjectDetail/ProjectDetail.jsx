import { useParams, useNavigate } from 'react-router-dom';
import projects from '../../data/projects';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="pd">
        <button className="pd__back" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver
        </button>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Proyecto no encontrado.</p>
      </div>
    );
  }

  const [mainImg, ...secondaryImgs] = project.images;

  return (
    <div className="pd">
      <button className="pd__back" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Volver
      </button>

      <div className="pd__layout">
        {/* ── Columna izquierda: info ── */}
        <div className="pd__info">
          <h1 className="pd__title">{project.name}</h1>
          <div className="pd__meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <p className="pd__desc">{project.description}</p>
        </div>

        {/* ── Columna derecha: imágenes ── */}
        <div className="pd__images">
          <img
            src={mainImg}
            alt={project.alt}
            className="pd__img-main"
          />

          {secondaryImgs.length > 0 && (
            <div className="pd__img-row">
              {secondaryImgs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.name} imagen ${i + 2}`}
                  className="pd__img-secondary"
                />
              ))}
            </div>
          )}

          {project.caption && (
            <p className="pd__caption">{project.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
