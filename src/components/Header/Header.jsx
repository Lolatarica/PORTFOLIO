import React from 'react';
import './Header.css';
import TypingEffect from './TypingEffect';
import './TypingEffect.css';
import nombreImg from '../../assets/img_header/nombre.webp';
import bienvenidoImg from '../../assets/img_header/bienvenido.webp';
import estrellaImg from '../../assets/img_header/estrella.webp';
import espiralImg from '../../assets/img_header/espiral.webp';
import exclamacionImg from '../../assets/img_header/exclamacion.webp';

const Header = () => {
  return (
    <header id="inicio" className="main-header">
      <div className="header-art" aria-hidden="true">
        <TypingEffect
          className="header-kicker"
          text="Diseñadora Multimedia"
          speed={90}
        />
        <img className="header-nombre" src={nombreImg} alt="" />
        <img className="header-bienvenido" src={bienvenidoImg} alt="" />
        <img className="header-estrella" src={estrellaImg} alt="" />
        <img className="header-espiral" src={espiralImg} alt="" />
        <img className="header-exclamacion" src={exclamacionImg} alt="" />
      </div>
      <div className="visually-hidden">
        <h2>Diseñadora Multimedia</h2>
        <h1>Lola Tarica</h1>
        <p>Bienvenido a mi portfolio</p>
      </div>
    </header>
  );
};

export default Header;
