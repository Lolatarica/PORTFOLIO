import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HamburgerNav.css';

const navLinks = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto',  href: '#contacto' },
  { label: 'Blog',      to: '/blog' },
];

export default function HamburgerNav() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  const handleAnchorClick = (href) => {
    close();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <button
        className={`hamburger-btn${isOpen ? ' hamburger-btn--open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="hamburger-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-label="Navegación principal"
          >
            <ul className="hamburger-overlay__list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.35 }}
                >
                  {link.href ? (
                    <a
                      className="hamburger-overlay__link"
                      href={link.href}
                      onClick={() => handleAnchorClick(link.href)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      className="hamburger-overlay__link hamburger-overlay__link--soon"
                      to={link.to}
                      onClick={close}
                    >
                      {link.label}
                      <span className="hamburger-overlay__badge">pronto</span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
