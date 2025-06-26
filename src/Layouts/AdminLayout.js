// src/layouts/AdminLayout.jsx
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

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
        overflowX: 'hidden'
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
