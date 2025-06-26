// src/components/NewSection.js
import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import BoyAnimation from '../assets/boy.json';

const NewSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(null); // track hover

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stars = [
    { top: '5%', left: '3%', text: 'Confidence' },
    { top: '20%', left: '7%', text: 'Leadership' },
    { top: '35%', left: '2%', text: 'Growth' },
    { top: '50%', left: '6%', text: 'Communication' },
    { top: '65%', left: '4%', text: 'Public Speaking' },
    { top: '80%', left: '8%', text: 'Emotional EQ' },
    { top: '10%', left: '95%', text: 'AI Skills' },
    { top: '30%', left: '90%', text: 'Soft Skills' },
    { top: '60%', left: '92%', text: 'Teamwork' },
    { top: '85%', left: '96%', text: 'Presentation' },
  ];

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '70px 5vw',
    backgroundColor: '#000',
    color: '#fff',
    gap: '150px',
    // opacity: isVisible ? 1 : 0,
    // transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
    // transition: 'all 1s ease',
    flexWrap: 'wrap',
    overflow: 'hidden',
  };

  const animationWrapper = {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'bounce 3s infinite',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.25)',
    background: '#0a0a0a',
    zIndex: 2,
  };

  const contentStyle = {
    flex: 1,
    maxWidth: '600px',
    textAlign: 'left',
    zIndex: 2,
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '20px',
    textShadow: '0 0 12px rgba(0,255,255,0.3), 0 0 20px rgba(255,255,255,0.1)',
  };

  const paragraphStyle = {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#ccf1ff',
    opacity: 0.95,
    textShadow: '0 0 8px rgba(0,200,255,0.1)',
    marginBottom: '15px',
  };

  const buttonStyle = {
    background: 'transparent',
    color: '#fff',
    padding: '12px 30px',
    border: '1px solid #fff',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '30px',
    transition: 'transform 0.3s ease',
    alignSelf: 'flex-start',
  };

  const starsWrapper = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  };

  const starBaseStyle = {
    position: 'absolute',
    width: '3px',
    height: '3px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: '0 0 8px #00ffff',
    pointerEvents: 'auto',
    cursor: 'pointer',
  };

  const tooltipBaseStyle = {
    position: 'absolute',
    top: '-25px',
    left: '10px',
    backgroundColor: '#111',
    color: '#00eaff',
    padding: '3px 8px',
    fontSize: '0.6rem',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    zIndex: 10,
    transition: 'opacity 0.3s ease',
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div ref={sectionRef} style={containerStyle}>

        {/* Stars */}
        <div style={starsWrapper}>
          {stars.map((star, index) => (
            <div
              key={index}
              style={{
                ...starBaseStyle,
                top: star.top,
                left: star.left,
              }}
              onMouseEnter={() => setHoveredStar(index)}
              onMouseLeave={() => setHoveredStar(null)}
            >
              {hoveredStar === index && (
                <div style={tooltipBaseStyle}>
                  {star.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Animation */}
        <div style={animationWrapper}>
          <Lottie animationData={BoyAnimation} loop={true} style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* Text */}
        <div style={contentStyle}>
          <h2 style={headingStyle}>Why is Personality Development important?</h2>
          <p style={paragraphStyle}>
            Personality Development (PDP) empowers students with the confidence, soft skills, and mindset required in the real world.
          </p>
          <p style={paragraphStyle}>
            It’s not just about academic excellence – PDP helps improve communication, leadership, emotional intelligence, and self-growth.
          </p>
          <p style={paragraphStyle}>
            EduMantra brings PDP directly to your screen – taught by experienced professionals and powered by AI-based tools.
          </p>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default NewSection;
