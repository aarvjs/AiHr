import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const TeacherQRGenerator = () => {
  const [qrData, setQrData] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [countdown, setCountdown] = useState(900);

  const generateQR = () => {
    const section = 'A';
    const now = new Date();

    const payload = {
      section,
      createdAt: now.toISOString(),
    };

    const qrURL = `http://172.16.35.80:3000/student-qr-scanner?data=${encodeURIComponent(JSON.stringify(payload))}`;
    setQrData(qrURL);
    setShowQR(true);
    setCountdown(900);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (sec) => `${Math.floor(sec / 60)}m ${sec % 60}s`;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* <h2 style={styles.heading}>📘 Generate QR for Attendance</h2> */}

        <button
          onClick={generateQR}
          style={styles.button}
        >
          🧾 Generate QR
        </button>

        {showQR && (
          <div style={styles.qrContainer}>
            <QRCodeCanvas value={qrData} size={220} />
            <p style={styles.timer}>
              ⏳ QR valid for: <strong>{formatTime(countdown)}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Responsive inline styles
const styles = {
  wrapper: {
    // minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f2f2f2',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#333',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#00cc99',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    width: '100%',
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timer: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  },
};

export default TeacherQRGenerator;
