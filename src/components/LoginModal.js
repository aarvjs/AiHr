import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';


const LoginModal = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(false);
//   const [department, setDepartment] = useState('BCA');
//   const [section, setSection] = useState('A');
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  if (showRegister) {
    return <RegisterModal onClose={() => setShowRegister(false)} />;
  }

const handleLogin = async () => {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data?.user) {
    alert("Invalid credentials");
    console.error("Login failed:", error);
    return;
  }

  const userId = data.user.id;

  // 👨‍🎓 Student check
  const { data: userData } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();

  if (userData) {
    alert("Welcome Student! Redirecting...");
    onClose();
    navigate("/student-dashboard");
    return;
  }

  // 👨‍🏫 Teacher check
  const { data: teacherData } = await supabase
    .from("teachers")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();

  if (teacherData) {
    alert("Welcome Teacher! Redirecting...");
    onClose();
    navigate("/teacher-dashboard");
    return;
  }

  // 🧑‍💼 Admin check
  const { data: adminData } = await supabase
    .from("admins")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();

  if (adminData) {
    alert("Welcome Admin! Redirecting...");
    onClose();
    navigate("/admin-dashboard");
    return;
  }

  // ❌ No match
  alert("No valid role found for this account.");
};



  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={logoStyle}>
          <span style={{ color: '#00ffff', fontWeight: 'bold' }}>Edu</span>
          <span style={{ color: '#FFD700' }}>Mantra</span>
        </h2>
        <h3 style={heading}>Login</h3>

        {/* <select value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle1}>
          <option value="BCA">BCA</option>
        </select>

        <select value={section} onChange={(e) => setSection(e.target.value)} style={inputStyle1}>
          <option style={{ color: 'black' }}>A</option>
          <option style={{ color: 'black' }}>B</option>
          <option style={{ color: 'black' }}>C</option>
          <option style={{ color: 'black' }}>D</option>
        </select> */}

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
        <button style={submitButton} onClick={handleLogin}>Login</button>

        <p style={forgotText}>Forgot Password?</p>
        <p style={toggleText} onClick={() => setShowRegister(true)}>
          Don't have an account? Register
        </p>

        <span onClick={onClose} style={closeBtn}>✖</span>
      </div>
    </div>
  );
};

// -------- Styles remain unchanged --------
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
  background: 'rgba(10, 10, 10, 0.85)',
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

const logoStyle = {
  fontSize: '2rem',
  marginBottom: '10px',
};

const heading = {
  fontSize: '1.5rem',
  marginBottom: '20px',
  color: '#00ffff',
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

const forgotText = {
  fontSize: '0.85rem',
  color: '#aaa',
  marginTop: '8px',
  marginBottom: '5px',
};

const toggleText = {
  fontSize: '0.9rem',
  color: '#00c6ff',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '12px',
};

const closeBtn = {
  position: 'absolute',
  top: '10px',
  right: '15px',
  fontSize: '1.4rem',
  color: '#fff',
  cursor: 'pointer',
};

export default LoginModal;
