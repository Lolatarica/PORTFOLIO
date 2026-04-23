import React, { useEffect, useState } from 'react';
import './TypingEffect.css';

const TypingEffect = ({ text, speed = 80, className = '' }) => {
  const chars = Array.from(text);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCount(i);
      if (i >= chars.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`typing-effect ${className}`}>
      {chars.slice(0, count).join('')}
      <span className="typing-cursor">|</span>
    </span>
  );
};

export default TypingEffect;
