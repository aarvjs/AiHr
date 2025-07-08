import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaUserGraduate } from 'react-icons/fa';
import TeacherIMG from '../assets/BOY.jpg';
import TeacherJsom from '../assets/Animation - 1751521286316.json';
import QRScanSection from '../child_components/QRScanSection';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Lottie from 'lottie-react';


const data = [
  { name: 'Present', value: 75 },
  { name: 'Absent', value: 25 },
];

const COLORS = ['#00cc99', '#f44336'];

const TeacherAllStudent = () => {
  const [students, setStudents] = useState([]);
  const [assignedSection, setAssignedSection] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

useEffect(() => {
  const fetchAssignedSection = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.warn("User not authenticated");
        return;
      }

      const userId = userData.user.id;

      const { data: assigned, error: assignError } = await supabase
        .from('assigned_teachers')
        .select('section')
        .eq('teacher_id', userId)
        .single();

      if (assignError || !assigned) {
        console.warn("Teacher not assigned any section.");
        return;
      }

      setAssignedSection(assigned.section);

      const { data: studentData, error: studentError } = await supabase
        .from('users')
        .select('*')
        .eq('section', assigned.section);

      if (studentError) {
        console.warn("Failed to fetch student data:", studentError.message);
        return;
      }

      setStudents(studentData || []);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAssignedSection();
}, []);


  return (
    <div style={{ padding: '20px', background: '#f5f9ff', minHeight: '100vh', color: '#333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0077cc' }}>🎓 Classroom Dashboard</h1>
        <button 
        onClick={handleOpenModal}
        
        style={{ backgroundColor: '#00cc99', padding: '10px 20px', fontSize: '16px', borderRadius: '8px', border: 'none', color: 'white', cursor: 'pointer' }}>
          📋 Take Attendance
        </button>
     {showModal && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '10px' }}>📡 Generate QR Code</h2>

      {/* QR GENERATE BUTTON */}
      {/* <button
        onClick={() => alert('QR Generating...')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3333ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Generate QR
      </button> */}

      {/* Simulated QR Scan Flow */}
      <QRScanSection sectionName="Section A" />

      <button
        onClick={handleCloseModal}
        style={{
          marginTop: '15px',
          backgroundColor: '#ff4d4d',
          padding: '8px 16px',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        ❌ Close
      </button>
    </div>
  </div>
)}

      </div>

      <hr style={{ border: '1px solid #c0d7f9', marginBottom: '20px' }} />

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, background: '#e6f0ff', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 0 12px rgba(0,0,0,0.1)' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#00cc99' }}>Welcome to Section {assignedSection}</h2>
            <p style={{ color: '#555' }}>You can manage your students and track their progress here.</p>
            <button style={{ marginTop: '10px', padding: '8px 16px', background: '#0077cc', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>Connect</button>
          </div>
          {/* <img src={TeacherIMG} alt="Teacher" style={{ width: '80px', borderRadius: '10px', marginRight: '30px' }} /> */}
         <Lottie animationData={TeacherJsom} loop={true} style={{ width: '30%', height: 'auto' }} />
        </div>

        <div style={{ width: '300px', background: '#e6f0ff', borderRadius: '12px', padding: '20px', boxShadow: '0 0 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '10px', color: '#00cc99' }}>PDP Scores %</h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {loading ? (
         <p style={{ color: '#ccc', textAlign: 'center' }}>Loading student data...</p>
      ) : (
        <div style={{ backgroundColor: '#e6f0ff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#333' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>👤 Name</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>📘 CRN</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>🏛️ Department</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>🎯 Section</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{student.full_name}</td>
                  <td style={{ padding: '10px' }}>{student.crn}</td>
                  <td style={{ padding: '10px' }}>{student.department}</td>
                  <td style={{ padding: '10px' }}>{student.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherAllStudent;
