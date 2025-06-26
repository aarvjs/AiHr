// src/components/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png'; // change this if needed

const AdminSidebar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname.includes(path) ? '#00c6ff' : '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    textDecoration: 'none',
    fontWeight: location.pathname.includes(path) ? 'bold' : 'normal',
    fontSize: '1rem',
    padding: '10px 15px',
    borderRadius: '8px',
    background: location.pathname.includes(path) ? '#1a1a1a' : 'transparent',
    transition: 'all 0.2s',
  });

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: '#0f1115',
      color: '#fff',
      padding: '25px 20px',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '60px', borderRadius: '10px' }} />
          <h3 style={{ marginTop: '10px', fontSize: '1.1rem', color: '#00c6ff' }}>Admin Panel</h3>
        </div>

        <nav>
          <Link to="/admin-dashboard" style={linkStyle('/admin-dashboard')}>
            <FaTachometerAlt /> Dashboard
          </Link>
         <Link to="/admin-dashboard/admin-student" style={linkStyle('/admin-student')}>
  <FaUserGraduate /> Students
</Link>

          <Link to="/admin-dashboard/manage-teachers" style={linkStyle('/manage-teachers')}>
            <FaChalkboardTeacher /> Teachers
          </Link>
          <Link to="/admin-dashboard/messages" style={linkStyle('/messages')}>
            <FaEnvelope /> Messages
          </Link>
        </nav>
      </div>

      <Link to="/" style={{ ...linkStyle('/logout'), color: 'red' }}>
        <FaSignOutAlt /> Logout
      </Link>
    </div>
  );
};

export default AdminSidebar;
