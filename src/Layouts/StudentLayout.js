import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';
import Chatbot from '../components/Chatbot';

const StudentLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen] = useState(!window.innerWidth < 768);
  const [visible, setVisible] = useState(!window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisible(!mobile);
      setOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    if (open) {
      setOpen(false);
      setTimeout(() => setVisible(false), 500); // allow animation to finish
    } else {
      setVisible(true);
      setOpen(true);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar
        open={open}
        visible={visible}
        isMobile={isMobile}
        handleToggle={handleToggle}
      />

      <div
        style={{
          marginLeft: !isMobile && visible ? '250px' : '0px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          width: '100%',
          background: '#f9f9f9',
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        <Outlet />

        {/* ✅ Chatbot - Fixed bottom-right */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999
        }}>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
