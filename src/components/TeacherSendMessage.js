// src/pages/teacher/TeacherSendMessages.jsx
import React, { useState } from 'react';

const TeacherSendMessages = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (recipient && message) {
      alert(`Message sent to ${recipient}:\n${message}`);
      setRecipient('');
      setMessage('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>📩 Send a Message</h2>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Recipient:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient name or email"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #555',
            backgroundColor: '#111',
            color: '#fff'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          placeholder="Type your message..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #555',
            backgroundColor: '#111',
            color: '#fff',
            resize: 'none'
          }}
        />
      </div>

      <button
        onClick={handleSend}
        style={{
          padding: '10px 20px',
          backgroundColor: '#00c6ff',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default TeacherSendMessages;
