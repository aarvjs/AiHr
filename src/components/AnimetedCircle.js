// src/components/AnimatedCircles.js

import React, { useState } from 'react';
import carriimg from '../assets/man.jpeg';
import succsing from '../assets/man.jpeg';
import missionImage from '../assets/man.jpeg';

import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function AnimatedCircles() {
  return (
    <div style={styles.wrapper}>
      {/* Left Side: Floating Circles */}
      <div style={styles.circlesContainer} className="circles-container">
        <Circle image={carriimg} style={{ top: '5%', left: '15%', zIndex: 3 }} size={200} delay="0s" />
        <Circle image={succsing} style={{ top: '43%', left: '50%', zIndex: 2 }} size={160} delay="1.5s" />
        <Circle image={missionImage} style={{ top: '74%', left: '30%', zIndex: 1 }} size={140} delay="3s" />
      </div>

      {/* Right Side: Text Content */}
      <div style={styles.textContent}>
        <h2 style={styles.heading}>Allenhouse Business School PDP</h2>
        <p style={styles.paragraph}>
          The Professional Development Program (PDP) at Allenhouse Business School is designed to elevate students into
          future-ready professionals. With a blend of academic knowledge and practical skills, our PDP aims to build leadership,
          communication, and strategic thinking abilities to thrive in competitive environments.
        </p>

        {/* Social Media Icons */}
        <div style={styles.socialContainer}>
          <HoverIcon Icon={FaLinkedin} label="Mr. Rajeev Sharma" />
          <HoverIcon Icon={FaInstagram} label="Ms. Priya Mehra" />
          <HoverIcon Icon={FaFacebook} label="Dr. Anil Kumar" />
        </div>
      </div>
    </div>
  );
}

// Circle Image Animation
function Circle({ image, style, size, delay }) {
  return (
    <div
      style={{
        ...styles.circle,
        ...style,
        width: size,
        height: size,
        animationDelay: delay,
        animationName: 'moveSideways',
        animationDuration: '4s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
      }}
      className="circle"
    >
      <img src={image} style={{ ...styles.image, borderRadius: '50%' }} alt="circle" />
    </div>
  );
}

// Social icon with hover tooltip
function HoverIcon({ Icon, label }) {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      style={styles.iconWrapper}
    >
      <Icon size={24} color="white" />
      {showLabel && <div style={styles.tooltip}>{label}</div>}
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#000',
    padding: '50px 5%',
    color: '#fff',
    gap: '30px',
  },
  circlesContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '300px',
    height: '560px',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 0 20px #001f4d',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  textContent: {
    flex: 1,
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '10px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#00c6ff',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#cccccc',
    textAlign: 'justify',
    marginBottom: '40px',
  },
  socialContainer: {
    display: 'flex',
    gap: '20px',
  },
  iconWrapper: {
    height: '45px',
    width: '45px',
    borderRadius: '50%',
    backgroundColor: '#00c6ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  tooltip: {
    position: 'absolute',
    top: '-30px',
    backgroundColor: '#222',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
  },
};

// Keyframes and responsiveness
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes moveSideways {
    0% { transform: translateX(0); }
    100% { transform: translateX(20px); }
  }

  @media (max-width: 768px) {
    .circles-container {
      display: none !important;
    }

    .text-content {
      text-align: center !important;
    }
  }
`;
document.head.appendChild(styleTag);
