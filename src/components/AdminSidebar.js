// src/components/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaEnvelope,
  FaSignOutAlt
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import profile from '../assets/teacher.jpg';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? '#007bff' : '#444',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '5px',
    textDecoration: 'none',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    fontSize: '1rem',
    padding: '12px 16px',
    borderRadius: '12px',
    background: isActive(path) ? '#e0f0ff' : 'transparent',
    transition: 'all 0.3s ease',
    justifyContent: 'flex-start',
    transform: isActive(path) ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isActive(path) ? '0 2px 6px rgba(0,0,0,0.1)' : 'none'
  });

  const sidebarStyle = {
    width: '260px',
    height: '100vh',
    background: 'linear-gradient(135deg, #e0f7fa, #c8f7dc)',
    color: '#333',
    padding: '20px 15px',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    zIndex: 1000
  };

  const navLink = (to, icon, label) => (
    <Link
      to={to}
      style={{ ...linkStyle(to) }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#f0faff';
        e.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(e) => {
        if (!isActive(to)) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {icon} {label}
    </Link>
  );

  return (
    <div style={sidebarStyle}>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px'
        }}>
          <img src={logo} alt="Logo" style={{ width: '190px', borderRadius: '12px', height: '90px' }} />
        </div>

        <hr style={{ height: '1px', width: '90%', backgroundColor: '#eee', opacity: '0.2', marginTop: '10px' }} />

        <nav>
          {navLink('/admin-dashboard', <FaTachometerAlt />, 'Dashboard')}
          {navLink('/admin-dashboard/admin-student', <FaUserGraduate />, 'Students')}
          {navLink('/admin-dashboard/manage-teachers', <FaChalkboardTeacher />, 'Teachers')}
          {navLink('/admin-dashboard/messages', <FaEnvelope />, 'Messages')}
          {navLink('/admin-dashboard/ai', <FaEnvelope />, 'Persona AI')}
          {navLink('/', <FaSignOutAlt />, 'Logout')}
        </nav>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #b2f4bb, #d0f4e0)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
        width: '100%',
        height: '260px',
        marginBottom: '30px'
      }}>
        <img
          src={profile}
          alt="Admin"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
