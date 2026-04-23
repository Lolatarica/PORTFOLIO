import { motion } from 'framer-motion';

export default function ParagraphMotion({ html, className = '' }) {
  return (
    <motion.p
      className={className}
      style={{ willChange: 'opacity, transform' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
