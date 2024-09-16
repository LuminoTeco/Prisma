import React, { useState, useEffect } from 'react';
import './CSS/Anchor.css'; 
import setinha from '../assets/imgs/setinha.png'

const Anchor = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY < 100);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 800, 
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`anchor-container ${isVisible ? 'show' : ''}`} 
      onClick={handleClick}
    >
      <img src={setinha} alt="" />
    </div>
  );
};

export default Anchor;
