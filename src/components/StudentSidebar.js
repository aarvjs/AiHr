import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBook,
  FaChartBar,
  FaSignOutAlt,
  FaVine,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import logo from '../assets/logo.png';

const StudentSidebar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // controls sidebar visibility

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(false);
        setVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inject keyframes
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes slideInSidebar {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      @keyframes slideOutSidebar {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleOpen = () => {
    setVisible(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); // triggers slideOut
    setTimeout(() => setVisible(false), 500); // match duration of animation
  };

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

  const SidebarContent = () => (
    <div
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#0f1115',
        color: '#fff',
        padding: '30px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
            <FaVine /> Persona AI
          </Link>
          <Link to="/student-dashboard/ats-score" style={linkStyle('/ats-score')}>
            <FaBook /> ATS Score
          </Link>
          <Link to="/student-dashboard/resume-generato" style={linkStyle('/resume-generato')}>
            <FaBook /> Resume Generator
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

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={open ? handleClose : handleOpen}
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 1100,
            backgroundColor: '#0f1115',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile ? (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
          <SidebarContent />
        </div>
      ) : (
        visible && (
          <>
            {/* Overlay */}
            <div
              onClick={handleClose}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
              }}
            />

            {/* Animated Sidebar */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '250px',
                height: '100vh',
                backgroundColor: '#0f1115',
                color: '#fff',
                zIndex: 1000,
                boxShadow: '4px 0 10px rgba(0,0,0,0.2)',
                animation: `${open ? 'slideInSidebar' : 'slideOutSidebar'} 0.5s ease forwards`,
              }}
            >
              <SidebarContent />
            </div>
          </>
        )
      )}
    </>
  );
};

export default StudentSidebar;
