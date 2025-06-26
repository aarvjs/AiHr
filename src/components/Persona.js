import React, { useEffect, useState } from 'react';
// import  Lottie  from 'lottie-react';
import Lottie from 'lottie-react';


import animationData from '../assets/ai.json';
import PersonaImg from '../assets/ai.jpg';

const Persona = () => {
  const [typedText, setTypedText] = useState('');
const fullText = "I'm Persona";

useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setTypedText(fullText.slice(0, index + 1));
    index++;
    if (index > fullText.length) index = 0;
  }, 700);
  return () => clearInterval(interval);
}, []);


  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '60px 8%',
    backgroundColor: 'black',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  };

  const leftStyle = {
    flex: 1,
    minWidth: '300px',
    marginBottom: '30px',
    zIndex: 2,
  };

  const headingStyle = {
    fontSize: '2.8rem',
    marginBottom: '20px',
    color: '#ffffff',
    lineHeight: '1.2',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const highlighted = {
    color: '#00c6ff',
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#cccccc',
    marginBottom: '20px',
  };

  const listStyle = {
    paddingLeft: '20px',
    color: '#00c6ff',
    fontSize: '1rem',
    marginBottom: '10px',
  };

  const rightStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '300px',
    position: 'relative',
    zIndex: 2,
  };

  const cardStyle = {
    backgroundColor: '#111111',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 0 20px #00c6ff88',
    animation: 'float 4s ease-in-out infinite',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '15px',
  };

  const buttonStyle = {
    marginTop: '30px',
    padding: '12px 30px',
    borderRadius: '25px',
    border: '1px solid #fff',
    // background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
    background:'transparent',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };

  const circleStyle = {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #0033ff55, #00000000)',
    left: '-150px',
    bottom: '-200px',
    zIndex: 0,
  };

  const keyframes = `
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0); }
    }

    button:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      h2 { font-size: 2rem !important; }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframes}</style>
      <div style={circleStyle}></div>

      <div style={leftStyle}>
    <h2 style={headingStyle}>
  <div
    style={{
      height: '60px',
      width: '60px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 0 10px rgba(0, 198, 255, 0.3)',
      marginRight: '12px'
    }}
  >
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ height: '50px', width: '50px' }}
    />
  </div>

  {/* Typewriter text with yellow 'Persona' */}
  <span>
    {typedText.startsWith("I'm ") ? (
      <>
        {"I'm "}
        <span style={{ color: '#FFD700' }}>{typedText.slice(4)}</span>
      </>
    ) : (
      typedText
    )}
  </span>
</h2>

        <p style={paragraphStyle}>
          Meet Persona, your intelligent AI-HR designed to assist and uplift your educational and administrative experience.
        </p>

        <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
          <li style={listStyle}>Understands student behavior and adapts</li>
          <li style={listStyle}>Helps teachers in attendance and progress</li>
          <li style={listStyle}>Empowers admins with intelligent reporting</li>
        </ul>

        <button style={buttonStyle}>Try Persona</button>
      </div>

      <div style={rightStyle}>
        <div style={cardStyle}>
          <img src={PersonaImg} alt="AI Persona" style={imageStyle} />
        </div>
      </div>
    </div>
  );
};

export default Persona;
