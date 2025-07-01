// src/components/StudentSidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBook,
  FaChartBar,
  FaSignOutAlt,
FaVine,
} from 'react-icons/fa';
import logo from '../assets/logo.png';

const StudentSidebar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname.includes(path) ? '#00c6ff' : '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    textDecoration: 'none',
    fontWeight: location.pathname.includes(path) ? '600' : 'normal',
    fontSize: '16px',
    padding: '10px 18px',
    borderRadius: '8px',
    background: location.pathname.includes(path) ? '#1f1f1f' : 'transparent',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  });

  return (
    <div
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#0f1115',
        color: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '30px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1000,
      }}
    >
      <div>
        {/* Logo */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '12px' }}
          />
          <h3 style={{ marginTop: '12px', fontSize: '1.1rem', color: '#00c6ff' }}>
            Student Panel
          </h3>
        </div>

        {/* Nav Links */}
        <nav>
          <Link to="/student-dashboard" style={linkStyle('/student-dashboard')}>
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/student-dashboard/student-message" style={linkStyle('/student-message')}>
            <FaEnvelope /> Messages
          </Link>
           <Link to="/student-dashboard/persona-ai" style={linkStyle('/persona-ai')}>
            <FaVine /> Persona Ai
          </Link>
           <Link to="/student-dashboard/ats-score" style={linkStyle('/ats-score')}>
            <FaBook /> Ats Score
          </Link>
          <Link to="/student-dashboard/courses" style={linkStyle('/courses')}>
            <FaBook /> Courses
          </Link>
          <Link to="/student-dashboard/results" style={linkStyle('/results')}>
            <FaChartBar /> Results
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div>
        <Link to="/" style={{ ...linkStyle('/logout'), color: 'red' }}>
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  );
};

export default StudentSidebar;
