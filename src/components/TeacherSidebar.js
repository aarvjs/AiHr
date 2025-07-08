import { Link, useLocation } from 'react-router-dom';
import { FaHome,  FaComments, FaCalendarAlt, FaChartBar, FaSignOutAlt,FaUsers,FaVine } from 'react-icons/fa';
import premiumImg from '../assets/man.jpeg';

const TeacherSidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <FaHome />, path: '/teacher-dashboard' },
    { label: 'Students', icon: <FaUsers />, path: '/teacher-dashboard/teacher-all-student' },
    { label: 'Chats', icon: <FaComments />, path: '/teacher-dashboard/teacher-send-message' },
    { label: 'AI Persona', icon: <FaVine />, path: '/teacher-dashboard/persona-ai' },
    { label: 'Grades', icon: <FaChartBar />, path: '/teacher-dashboard/grades' },
    { label: 'Logout', icon: <FaSignOutAlt />, path: '/' }
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.includes(path);

  return (
    <div
      style={{
        width: '350px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
        padding: '30px 20px',
        boxSizing: 'border-box',
        fontFamily: 'Segoe UI, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              background: 'linear-gradient(to bottom right, #7e30e1, #4a00e0)',
              borderRadius: '5px'
            }}
          ></div>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#5f3dc4' }}>Academy</span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navItems.map(({ label, icon, path }, index) => (
            <Link
              key={index}
              to={path}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '12px',
                color: label === 'Logout' ? '#ff4d4f' : isActive(path) ? '#5f3dc4' : '#333',
                backgroundColor: isActive(path) ? '#f1ecff' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '18px' }}>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Premium Card Section */}
      <div
        style={{
          backgroundColor: '#f5f3ff',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          position: 'relative',
          height:'270px',
          overflow: 'visible', 
          marginTop:'130px',
        }}
      >
        {/* Floating Image */}
        <img
          src={premiumImg} // 👈 replace with your image import
          alt="Premium"
          style={{
            width: '140px',
            height: 'auto',
            position: 'absolute',
            top: '-90px', // pull it above card
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Content below image */}
        <h4 style={{ fontSize: '16px', color: '#5f3dc4', marginTop: '60px', marginBottom: '8px' }}>
          Premium Subscription
        </h4>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '12px' }}>
          Buy Premium and get access to new courses
        </p>
        <button
          style={{
            background: 'linear-gradient(to right, #7e30e1, #4a00e0)',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          More detailed
        </button>
      </div>
    </div>
  );
};

export default TeacherSidebar;
