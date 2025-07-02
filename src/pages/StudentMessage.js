import React, { useState } from 'react';
import { FaEllipsisV, FaBell } from 'react-icons/fa';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const StudentMessages = () => {
  const messages = [
    { id: 1, sender: 'Ma’am', text: 'Hello students, please join the class.' },
    { id: 2, sender: 'Ma’am', text: 'Today we will study Chapter 5 in detail.' },
    { id: 3, sender: 'Ma’am', text: 'Any doubts from the previous topic?' },
    { id: 4, sender: 'Ma’am', text: 'Make sure to revise regularly for better results.' },
    { id: 5, sender: 'Ma’am', text: 'Don’t forget to submit your assignment by tomorrow.' },
    { id: 6, sender: 'Ma’am', text: 'Class test will be conducted next Monday.' },
  ];

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

 const handleJoinClick = () => {
  if (roomCode.trim()) {
    navigate(`/student-dashboard/room/${roomCode}?type=video`);
    setIsJoinModalOpen(false);
  }
};


  const containerStyle = {
    flex: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#121212',
    color: '#ffffff',
    fontFamily: 'sans-serif',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#1e1e1e',
    borderBottom: '1px solid #333',
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
  };

  const topRightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const iconStyle = {
    cursor: 'pointer',
    fontSize: '18px',
    color: 'white',
  };

  const joinButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const chatBodyStyle = {
    flex: 1,
    padding: '15px 20px',
    overflowY: 'auto',
  };

  const messageStyle = {
    backgroundColor: '#1f1f1f',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '12px',
    maxWidth: '75%',
  };

  const modalStyle = {
    content: {
      width: '320px',
      margin: 'auto',
      padding: '20px',
      background: '#1e1e1e',
      color: 'white',
      borderRadius: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleStyle}>Classroom</div>
        <div style={topRightStyle}>
          <button style={joinButtonStyle} onClick={() => setIsJoinModalOpen(true)}>
            Join
          </button>
          <FaBell style={iconStyle} title="Notifications" />
          <FaEllipsisV style={iconStyle} title="More" />
        </div>
      </div>

      <div style={chatBodyStyle}>
        {messages.map((msg) => (
          <div key={msg.id} style={messageStyle}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* 🔒 Join Modal */}
      <Modal
        isOpen={isJoinModalOpen}
        onRequestClose={() => setIsJoinModalOpen(false)}
        style={modalStyle}
      >
        <h3 style={{ marginBottom: '15px' }}>Enter Room ID</h3>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="e.g. pdp123"
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            width: '100%',
            marginBottom: '15px',
            backgroundColor: '#2a2a2a',
            color: 'white',
          }}
        />
        <button
          style={{
            backgroundColor: '#00ff99',
            color: 'black',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={handleJoinClick}
        >
          Join Now
        </button>
      </Modal>
    </div>
  );
};

export default StudentMessages;
