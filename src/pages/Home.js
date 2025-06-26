// src/components/Home.js
import React, { useEffect, useState } from 'react';
import FogEffect from '../components/FogEffect';
import NewSection from '../components/NewSection';
import Chatbot from '../components/Chatbot';
import Teacher from '../assets/teacher.jpg'
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';
import Persona from '../components/Persona';
import AnimatedCircles from '../components/AnimetedCircle';

const Home = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const title = "Personality Development";

  useEffect(() => {
    const interval = setInterval(() => {
      setText(title.slice(0, index + 1));
      setIndex((prev) => {
        if (prev === title.length) return 0;
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [index]);

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 5vw',
    overflow: 'hidden',
  };

  const leftContentStyle = {
    maxWidth: '50%',
    textAlign: 'left',
    position: 'relative',
    zIndex: 2,
  };

  const headingStyle = {
    fontSize: '3.4rem',
    fontWeight: 'bold',
    margin: 0,
    lineHeight: 1.1,
    background: 'linear-gradient(90deg, #ffffff, #a0d2ff)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 15px rgba(100, 180, 255, 0.5)',
    opacity: 0,
    animation: 'fadeSlide 1s ease forwards',
    animationDelay: '0.2s'
  };

  const subheadingStyle = {
    fontSize: '2rem',
    fontWeight: 300,
    margin: '20px 0',
    color: '#b1d9ff',
    textShadow: '0 0 10px rgba(100, 180, 255, 0.3)',
    opacity: 0,
    animation: 'fadeSlide 1s ease forwards',
    animationDelay: '0.5s'
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    lineHeight: 1.8,
    maxWidth: '600px',
    opacity: 0,
    marginTop: '20px',
    color: '#e6f1ff',
    textShadow: '0 0 5px rgba(100, 180, 255, 0.2)',
    animation: 'fadeSlide 1s ease forwards',
    animationDelay: '0.8s'
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, rgba(100, 180, 255, 0.3), rgba(70, 150, 230, 0.2))',
    color: '#fff',
    border: '1px solid rgba(100, 180, 255, 0.5)',
    borderRadius: '30px',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '30px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 0 15px rgba(100, 180, 255, 0.3)',
    opacity: 0,
    animation: 'fadeSlide 1s ease forwards',
    animationDelay: '1.1s'
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={containerStyle}>
        <div style={leftContentStyle}>
          <h1 style={headingStyle}>{text}</h1>

          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: 0,
            animation: 'fadeSlide 1s ease forwards',
            animationDelay: '0.5s'
          }}>
            <span style={{ color: '#4DB6AC' }}>Edu</span>
            <svg width="110" height="40" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="55" fontFamily="Poppins, sans-serif" fontSize="55" fill="#FFD700" fontWeight="600">
                Mantra
              </text>
            </svg>
          </h2>

          <p style={paragraphStyle}>
            Edu<span style={{ fontWeight: 'bold' }}>Mantra</span> is your personal gateway to AI-powered learning and PDP excellence.
            We've built a smart online system where students can take classes from college teachers, track their growth using AI,
            and even get job-ready with ATS-optimized tools. Whether you're a student, teacher, or a career coach —
            EduMantra connects everyone into one powerful and intelligent platform.
          </p>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Explore College
          </button>
        </div>

        <FogEffect />
        <Chatbot/>
      </div>
      <NewSection/>
      <Persona/>
      <AnimatedCircles/>
      
      <TeamSection/>
      <Footer/>
    </>
  );
};

export default Home;
