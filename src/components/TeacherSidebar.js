import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen, FaChalkboardTeacher, FaSignOutAlt,FaEnvelope } from 'react-icons/fa';

const TeacherSidebar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname.includes(path) ? '#00c6ff' : '#fff',
    padding: '10px 15px',
    textDecoration: 'none',
    display: 'block',
    borderRadius: '8px',
    background: location.pathname.includes(path) ? '#1a1a1a' : 'transparent',
    marginBottom: '10px'
  });

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: '#0f1115',
      padding: '20px',
      position: 'fixed',
      top: 0,
      left: 0,
      color: '#fff'
    }}>
      <h2 style={{ color: '#00c6ff' }}>Teacher Panel</h2>
      <nav>
        <Link to="/teacher-dashboard" style={linkStyle('/classes')}>
          <FaChalkboardTeacher /> My Classes
        </Link>
        <Link to="/teacher-dashboard/teacher-send-message" style={linkStyle('/send-message')}>
  <FaEnvelope /> Send Message
</Link>
        <Link to="/teacher-dashboard/assignments" style={linkStyle('/assignments')}>
          <FaBookOpen /> Assignments
        </Link>
        <Link to="/" style={{ ...linkStyle('/logout'), color: 'red' }}>
          <FaSignOutAlt /> Logout
        </Link>

      </nav>
    </div>
  );
};

export default TeacherSidebar;
