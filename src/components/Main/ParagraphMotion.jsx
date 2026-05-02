import { motion } from 'framer-motion';

export default function ParagraphMotion({ html, className = '', delay = 0.2 }) {
  return (
    <motion.p
      className={className}
      style={{ willChange: 'opacity, transform' }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
