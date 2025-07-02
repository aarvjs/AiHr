// pages/AdminDashboard.jsx
import React, { useState } from 'react';
import AssignTeacherForm from '../child_components/AssignTeacherCard';
import studentImg from '../assets/boy.gif'; 
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const attendancePercent = 83;

  const programPlan = [
    { title: 'Lesson', time: '40 min' },
    { title: 'Test', time: '15 min / 10 questions' },
    { title: 'Homework', time: 'Nothing is here yet' },
    { title: 'Lesson', time: '25 min' },
  ];

  const barData = [
    { name: '1 week', performance: 100 },
    { name: '2 week', performance: 63 },
    { name: '3 week', performance: 27 },
    { name: '4 week', performance: 81 },
  ];

  const COLORS = ['#3b82f6', '#1e293b'];

  return (
    <div style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Segoe UI',
      color: '#fff',
    }}>
      <h1 style={{ }}>👑 Admin Dashboard</h1>

      {/* 👉 PDP Banner + Assign Card Row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {/* PDP Banner */}
        <div style={{
          flex: 2,
          background: 'linear-gradient(135deg, rgba(255,192,203,0.2), rgba(173,216,230,0.2))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '25px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
        }}>
          <div style={{ maxWidth: '60%' }}>
            <h3 style={{
              fontSize: '22px',
              marginBottom: '10px',
              color: '#fff'
            }}>Your PDP Journey Begins Here</h3>
            <p style={{
              fontSize: '15px',
              marginBottom: '15px',
              color: '#ccc'
            }}>
              Get started with career-building lectures & resources specially crafted by our top mentors.
            </p>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#ff7f50',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Start Learning
            </button>
          </div>
          <img src={studentImg} alt="hero" style={{
            width: '150px',
            height: 'auto',
            borderRadius: '10px'
          }} />
        </div>

        {/* Assign Teacher Card */}
       
      </div>

      {/* 📊 Charts Section */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h3>📊 Student Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="performance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3>📈 Attendance</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={[
                { name: 'Present', value: attendancePercent },
                { name: 'Remaining', value: 100 - attendancePercent }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={COLORS[0]} />
              <Cell fill={COLORS[1]} />
            </Pie>
          </PieChart>
          <p style={{ textAlign: 'center', color: '#ccc' }}>{attendancePercent}% Attendance</p>
          <button style={btnStyle}>📥 Download Report</button>
        </div>
      </div>

      {/* 📝 Program Plan & Stats */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h3>🗓 Program Plan</h3>
          {programPlan.map((item, idx) => (
            <div key={idx} style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>
              <strong>{item.title}</strong> — <span style={{ color: '#999' }}>{item.time}</span>
            </div>
          ))}
        </div>

        <div style={{ ...cardStyle, width: '200px' }}>
          <h4>👥 Total Groups</h4>
          <p style={{ fontSize: '24px', color: '#3b82f6' }}>6</p>
        </div>

        <div style={{ ...cardStyle, width: '200px' }}>
          <h4>🎓 Total Students</h4>
          <p style={{ fontSize: '24px', color: '#3b82f6' }}>127</p>
        </div>

        <div style={{ ...cardStyle, width: '200px' }}>
          <h4>📚 Planned Lessons</h4>
          <p style={{ fontSize: '24px', color: '#3b82f6' }}>34</p>
        </div>

         <div style={{ flex: 1 }}>
          {!showForm && (
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '20px',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid #333',
                color: '#fff',
                boxShadow: '0 2px 6px rgba(255,255,255,0.05)',
                width: '100%',
                height: '100%',
              }}
              onClick={() => setShowForm(true)}
            >
              <h3 style={{ marginBottom: '10px' }}>👨‍🏫 Assign Teacher</h3>
              <p style={{ color: '#ccc', fontSize: '14px' }}>
                Click to assign section to a teacher
              </p>
            </div>
          )}
          {showForm && <AssignTeacherForm onClose={() => setShowForm(false)} />}
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  padding: '20px',
  flex: 1,
  minWidth: '250px',
  border: '1px solid #333',
  boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
};

const btnStyle = {
  backgroundColor: '#3b82f6',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  color: '#fff',
  marginTop: '10px',
  cursor: 'pointer'
};

export default AdminDashboard;
