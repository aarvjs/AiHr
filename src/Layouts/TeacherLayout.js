// src/layouts/TeacherLayout.jsx
import React from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import { Outlet } from 'react-router-dom';

const TeacherLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar />
      <div style={{
        marginLeft: '260px',
        padding: '30px',
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#fff',
        width: '100%'
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
