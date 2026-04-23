import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Este componente permite HTML (negritas, etc) y anima la aparición con máscara
export default function ParagraphMaskAnim({ html, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 40%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 40%)',
        },
        {
          opacity: 1,
          WebkitMaskImage: 'linear-gradient(90deg, black 100%, black 100%)',
          maskImage: 'linear-gradient(90deg, black 100%, black 100%)',
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <p
      ref={ref}
      className={className}
      style={{ willChange: 'opacity, mask-image, -webkit-mask-image' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
