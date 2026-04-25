import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Masonry.css';

gsap.registerPlugin(ScrollTrigger);

export default function Masonry({
  items = [],
  columns = 3,
  animateFrom = 'bottom',
  duration = 0.7,
  stagger = 0.06,
  ease = 'power3.out',
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
}) {
  const containerRef = useRef(null);

  // Distribute items across columns
  const columnArrays = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => {
    columnArrays[i % columns].push(item);
  });

  const getFromVars = () => {
    const base = {
      opacity: 0,
      ...(blurToFocus ? { filter: 'blur(10px)' } : {}),
    };
    switch (animateFrom) {
      case 'top':    return { ...base, y: -50 };
      case 'bottom': return { ...base, y: 60 };
      case 'left':   return { ...base, x: -60 };
      case 'right':  return { ...base, x: 60 };
      case 'center': return { ...base, scale: 0.85 };
      case 'random':
        return {
          ...base,
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
        };
      default:       return { ...base, y: 60 };
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.masonry-item');

    const fromVars = getFromVars();
    const toVars = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      ...(blurToFocus ? { filter: 'blur(0px)' } : {}),
      duration,
      ease,
      stagger,
    };

    const anim = gsap.fromTo(cards, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="masonry-grid"
      style={{ '--masonry-columns': columns }}
    >
      {columnArrays.map((col, colIdx) => (
        <div className="masonry-column" key={colIdx}>
          {col.map((item) => (
            <div
              className="masonry-item"
              key={item.id}
              style={scaleOnHover ? { '--hover-scale': hoverScale } : {}}
            >
              <img
                src={item.img}
                alt={item.alt ?? ''}
                className={`masonry-item__img${scaleOnHover ? ' masonry-item__img--hoverable' : ''}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
