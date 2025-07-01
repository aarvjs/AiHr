import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';

const StudentLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar />
      <div style={{
        marginLeft: '250px',
        // padding: '30px',
        minHeight: '100vh',
        width: '100%',
        background: '#f9f9f9',
        overflowX:'hidden',
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
