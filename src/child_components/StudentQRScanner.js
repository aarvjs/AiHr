import React, { useState, useEffect } from 'react';

const StudentQRScanner = () => {
  const [qrData, setQrData] = useState(null);
  const [name, setName] = useState('');
  const [crn, setCrn] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    try {
      if (data) {
        setQrData(JSON.parse(decodeURIComponent(data)));
      }
    } catch (e) {
      console.error("Error parsing QR data:", e);
    }
  }, []);

  const handleSubmit = () => {
    if (!name || !crn) {
      alert("Please enter all fields!");
      return;
    }

    alert(`✅ Attendance Recorded!\nName: ${name}\nCRN: ${crn}`);
    setSubmitted(true);
  };

  if (!qrData) {
    return (
      <div style={{ textAlign: 'center', padding: '30px' }}>
        <h3>❌ Invalid or Missing QR Data</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '2px solid #ccc', borderRadius: '12px', textAlign: 'center' }}>
      <h2>📘 Student Attendance</h2>
      <p><strong>Section:</strong> {qrData.section}</p>
      <p><strong>Date:</strong> {new Date(qrData.createdAt).toLocaleString()}</p>

      {submitted ? (
        <h3 style={{ color: 'green', marginTop: '20px' }}>✅ Attendance Submitted</h3>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '20px',
              marginBottom: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="text"
            placeholder="Enter CRN"
            value={crn}
            onChange={(e) => setCrn(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: '12px 24px',
              backgroundColor: '#00cc99',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%'
            }}
          >
            ✅ Submit Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default StudentQRScanner;
