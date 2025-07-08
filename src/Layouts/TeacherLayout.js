// src/layouts/TeacherLayout.jsx
import React from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import { Outlet } from 'react-router-dom';
import Chatbot from '../components/Chatbot'; // ✅ Adjust if your path is different


const TeacherLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar />

      <div style={{
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#fff',
        width: '100%',
        position: 'relative',
      }}>
        <Outlet />

        {/* ✅ Chatbot - Fixed at bottom-right */}
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


export default TeacherLayout;
