// src/components/FogEffect.js
import React, { useEffect, useRef } from 'react';
import './App.css';

const FogEffect = () => {
  const fogRef1 = useRef(null);
  const fogRef2 = useRef(null);
  const fogRef3 = useRef(null);
  const fogRef4 = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate movement away from cursor
      const moveX = (x - centerX) * 0.06;
      const moveY = (y - centerY) * 0.06;
      
      if (fogRef1.current) {
        fogRef1.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
      if (fogRef2.current) {
        fogRef2.current.style.transform = `translate(${moveX * 0.7}px, ${moveY * 0.7}px)`;
      }
      if (fogRef3.current) {
        fogRef3.current.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
      }
      if (fogRef4.current) {
        fogRef4.current.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px)`;
      }
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fog-container">
      {/* Torch light source */}
      <div className="torch-light"></div>
      
      {/* Smoke layers with triangular shape */}
      <div ref={fogRef1} className="fog-layer fog-1"></div>
      <div ref={fogRef2} className="fog-layer fog-2"></div>
      <div ref={fogRef3} className="fog-layer fog-3"></div>
      <div ref={fogRef4} className="fog-layer fog-4"></div>
      
      {/* Floating smoke particles */}
      <div className="smoke-particle particle-1"></div>
      <div className="smoke-particle particle-2"></div>
      <div className="smoke-particle particle-3"></div>
      <div className="smoke-particle particle-4"></div>
      <div className="smoke-particle particle-5"></div>
      <div className="smoke-particle particle-6"></div>
      <div className="smoke-particle particle-7"></div>
      <div className="smoke-particle particle-8"></div>
    </div>
  );
};

export default FogEffect;