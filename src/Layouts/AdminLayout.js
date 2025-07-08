// src/layouts/AdminLayout.jsx
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import Chatbot from '../components/Chatbot'; 

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{
        marginLeft: '260px',
        padding: '30px',
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#fff',
        width: '100%',
        overflowX: 'hidden',
        position: 'relative'
      }}>
        <Outlet />

        {/* ✅ Chatbot Component - Fixed at bottom right */}
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

export default AdminLayout;
