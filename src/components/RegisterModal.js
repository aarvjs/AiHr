import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const RegisterModal = ({ onClose }) => {
const [department, setDepartment] = useState('BCA');
  const [section, setSection] = useState('A');
  const [fullName, setFullName] = useState('');
  const [crn, setCrn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !crn || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    // Step 1: Create account in Supabase Auth
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      alert("Signup failed: " + signupError.message);
      return;
    }

    // Step 2: Insert user profile in 'users' table
    const userId = signupData.user.id;

    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId,
        full_name: fullName,
        crn,
        department,
        section,
      },
    ]);

    if (insertError) {
      alert("Failed to save user profile: " + insertError.message);
      return;
    }

    alert("Registration successful!");
    onClose();
  };
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={logoStyle}>
          <span style={{ color: '#00ffff', fontWeight: 'bold' }}>Edu</span>
          <span style={{ color: '#FFD700' }}>Mantra</span>
        </h2>
        <span onClick={onClose} style={closeBtn}>✖</span>

        <h3 style={heading}>Register</h3>

        <select value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle1}>
          <option value="BCA">BCA</option>
        </select>
        <select value={section} onChange={(e) => setSection(e.target.value)} style={inputStyle1}>
          <option style={{ color: 'black' }}>A</option>
          <option style={{ color: 'black' }}>B</option>
          <option style={{ color: 'black' }}>C</option>
          <option style={{ color: 'black' }}>D</option>
        </select>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="CRN"
          value={crn}
          onChange={(e) => setCrn(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button style={submitButton} onClick={handleRegister}>Register</button>

        <p style={toggleText} onClick={onClose}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

// ---------- Inline Styles ----------
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
};

const modalStyle = {
  position: 'relative',
  background: 'rgba(10,10,10,0.85)',
  padding: '30px',
  borderRadius: '20px',
  width: '90%',
  maxWidth: '400px',
  boxShadow: '0 0 50px rgba(0,255,255,0.2)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const closeBtn = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  fontSize: '1.4rem',
  color: '#fff',
  cursor: 'pointer',
};

const logoStyle = {
  fontSize: '2rem',
  marginBottom: '10px',
};

const heading = {
  fontSize: '1.5rem',
  marginBottom: '20px',
  color: '#00ffff',
};

const inputStyle1 = {
  width: '100%',
  padding: '10px 15px',
  marginBottom: '12px',
  borderRadius: '10px',
  border: '1px solid #00ffff50',
  background: 'transparent',
  color: '#fff',
  fontSize: '1rem',
};

const inputStyle = {
  width: '92%',
  padding: '10px 15px',
  marginBottom: '12px',
  borderRadius: '10px',
  border: '1px solid #00ffff50',
  background: 'transparent',
  color: '#fff',
  fontSize: '1rem',
};

const submitButton = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
  color: '#fff',
  border: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '10px',
};

const toggleText = {
  fontSize: '0.9rem',
  color: '#00c6ff',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '12px',
};

export default RegisterModal;
