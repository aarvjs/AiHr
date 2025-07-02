// components/AssignTeacherForm.jsx
import React, { useState } from 'react';

const AssignTeacherForm = ({ onClose }) => {
  const [form, setForm] = useState({
    teacherName: '',
    section: '',
    facultyCode: '',
    course: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssign = () => {
    alert(` Assigned ${form.teacherName} to ${form.section}`);
    onClose(); // Optionally reset here too
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '500px',
      margin: '40px auto',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Assign Teacher</h2>

      {['teacherName', 'section', 'facultyCode', 'course'].map((field) => (
        <div key={field} style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#ccc' }}>
            {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #444',
              backgroundColor: '#111',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
        <button
          onClick={handleAssign}
          style={{
            background: '#007bff',
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Assign
        </button>
        <button
          onClick={onClose}
          style={{
            background: '#333',
            padding: '10px 20px',
            borderRadius: '6px',
            border: '1px solid #555',
            color: '#ccc',
            cursor: 'pointer'
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default AssignTeacherForm;
