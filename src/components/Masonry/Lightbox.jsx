import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Icon } from '@iconify/react';
import './Lightbox.css';

export default function Lightbox({ src, alt, name, tools = [], originRect, onClose }) {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const cardRef = useRef(null);
  const closeRef = useRef(null);
  const target = useRef({});

  useEffect(() => {
    const overlay = overlayRef.current;
    const img = imgRef.current;
    const card = cardRef.current;
    const closeBtn = closeRef.current;
    if (!overlay || !img || !card) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = vw * 0.70;
    const maxH = vh * 0.80;
    const aspect = originRect.height / originRect.width;
    let targetW = maxW;
    let targetH = targetW * aspect;
    if (targetH > maxH) { targetH = maxH; targetW = targetH / aspect; }
    targetW = Math.round(targetW);
    targetH = Math.round(targetH);

    const cardH = card.offsetHeight;
    const totalH = targetH + cardH;
    const targetLeft = Math.round((vw - targetW) / 2);
    const blockTop = Math.round((vh - totalH) / 2);
    target.current = { left: targetLeft, top: blockTop, width: targetW, height: targetH };

    gsap.set(img, { left: originRect.left, top: originRect.top, width: originRect.width, height: originRect.height, borderRadius: 12 });
    gsap.set(card, { left: targetLeft, top: blockTop + targetH, width: targetW, opacity: 0, y: 12 });

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(img, { left: targetLeft, top: blockTop, width: targetW, height: targetH, borderRadius: '10px 10px 0 0', duration: 0.48, ease: 'power3.out' }, 0)
      .to(card, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, 0.38)
      .to(closeBtn, { opacity: 1, duration: 0.2 }, 0.3);

    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const img = imgRef.current;
    const card = cardRef.current;
    const closeBtn = closeRef.current;
    if (!overlay || !img) return;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to([closeBtn, card], { opacity: 0, duration: 0.15 })
      .to(overlay, { opacity: 0, duration: 0.32, ease: 'power2.in' }, 0)
      .to(img, { left: originRect.left, top: originRect.top, width: originRect.width, height: originRect.height, borderRadius: 12, duration: 0.38, ease: 'power3.in' }, 0);;
  }, [onClose, originRect]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  return createPortal(
    <div ref={overlayRef} className="lightbox-overlay" onClick={handleClose}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
      <div
        ref={cardRef}
        className="lightbox-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-card__left">
          {name && <span className="lightbox-card__name">{name}</span>}
          {tools.length > 0 && (
            <div className="lightbox-card__icons">
              {tools.map((icon, i) => (
                <Icon key={i} icon={icon} className="lightbox-card__icon" />
              ))}
            </div>
          )}
        </div>
        <button className="lightbox-card__btn" onClick={handleClose}>
          Ver más
        </button>
      </div>
      <button ref={closeRef} className="lightbox-close" onClick={handleClose} aria-label="Cerrar">
        ✕
      </button>
    </div>,
    document.body
  );
}
