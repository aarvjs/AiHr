import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaPhoneAlt, FaVideo, FaEllipsisV } from 'react-icons/fa';
import { v4 as uuidv4 } from "uuid";
import { createRoom } from "../supabase/RoomService";
import { useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
import  {supabase}  from '../supabaseClient';


const AdminChatPage = ({ user }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chatType, setChatType] = useState('Student Classroom');
  const dropdownRef = useRef(null);

  const [assignedSection, setAssignedSection] = useState('');
const [selectedStudent, setSelectedStudent] = useState(null);


  // supabse me key store and vedio call start hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 
  const navigate = useNavigate();

  const startCall = async (type) => {
    const roomId = nanoid(6);
    await createRoom(roomId, type); // ✅ No email needed now
    navigate(`/teacher-dashboard/room/${roomId}?type=${type}`);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const handleSend = async () => {
  if (!message.trim()) return;

  const { data: userData } = await supabase.auth.getUser();
  const from_id = userData?.user?.id;

  if (!from_id || !assignedSection) {
    alert("❗ Unable to send message. Please re-login.");
    return;
  }

  // Fetch students
  const { data: students, error } = await supabase
    .from("users")
    .select("id, name")
    .eq("section", assignedSection);

  if (error || !students || students.length === 0) {
    alert("❌ No students found for your section.");
    return;
  }

  // Get teacher name
  const { data: profileData } = await supabase
    .from("users")
    .select("name")
    .eq("id", from_id)
    .single();

  const teacherName = profileData?.name || "Teacher";

  const messages = students.map((student) => ({
    from_id,
    to_id: student.id,
    section: assignedSection,
    text: message,
    sender_name: teacherName,
    timestamp: new Date().toISOString()
  }));

  console.log("Sending messages:", messages); // ✅ Debug log

  const { error: insertError } = await supabase.from("chat_messages").insert(messages);

  if (insertError) {
    console.error("Message send failed", insertError); // ✅ This shows detailed reason
    alert("❌ Failed to send messages.");
  } else {
    setChatHistory([...chatHistory, ...messages]);
    setMessage("");
  }
};


  const handleDelete = (index) => {
    const updated = [...chatHistory];
    updated.splice(index, 1);
    setChatHistory(updated);
    setMenuIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };


  //  here audio vedio call start hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee 


  return (
    <div style={{
      backgroundColor: '#000',
      height: '100vh',
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600' }}>
          {chatType} 💬
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={chatType}
            onChange={(e) => setChatType(e.target.value)}
            style={{
              padding: '8px',
              backgroundColor: '#1d1d1d',
              color: '#fff',
              border: '1px solid #333',
              borderRadius: '6px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option>Student Classroom</option>
            <option>Teacher Classroom</option>
          </select>

          {/* vedio call start hereeeeeeeeeeeeeeeeeee buttonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn  */}

          <button
          onClick={() => startCall("audio")}
           style={{
            backgroundColor: '#1d1d1d',
            border: 'none',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer'
          }}>
            <FaPhoneAlt color="#00ffcc" size={16} />
          </button>
          <button 
          onClick={() => startCall("video")}
          style={{
            backgroundColor: '#1d1d1d',
            border: 'none',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer'
          }}>
            <FaVideo color="#00bfff" size={18} />
          </button>

          {/* vedio call end hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee . */}
        </div>
      </div>

      {/* Chat Box */}
      <div style={{
        flex: 1,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 6px rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>

        {/* Chat History */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          border: '1px solid #444',
          borderRadius: '8px',
          marginBottom: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {chatHistory.length === 0 && (
            <p style={{ color: '#999', fontStyle: 'italic' }}>No messages yet...</p>
          )}

          {chatHistory.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                alignSelf: 'flex-end',
                maxWidth: '80%',
              }}
            >
              {/* Message Bubble */}
              <div style={{
                backgroundColor: 'rgba(0,123,255,0.2)',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#fff',
              }}>
                {item.text}
                <div style={{ fontSize: '10px', color: '#aaa', textAlign: 'right', marginTop: '5px' }}>
                  {item.time}
                </div>
              </div>

              {/* Three Dots on Hover */}
              {hoveredIndex === idx && (
                <button
                  onClick={() => setMenuIndex(menuIndex === idx ? null : idx)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <FaEllipsisV color="#888" />
                </button>
              )}

              {/* Dropdown Menu */}
              {menuIndex === idx && (
                <div
                  ref={dropdownRef}
                  style={{
                    position: 'absolute',
                    top: '30px',
                    right: '5px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    width: '140px',
                    zIndex: 1000,
                    boxShadow: '0 2px 6px rgba(255,255,255,0.1)'
                  }}
                >
                  {['📌 Pin', '✏ Edit', '💬 Reply'].map((opt, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      color: '#ccc',
                      borderBottom: '1px solid #2c2c2c',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      {opt}
                    </div>
                  ))}
                  <div
                    onClick={() => handleDelete(idx)}
                    style={{
                      padding: '8px 10px',
                      color: 'tomato',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🗑 Delete
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={message}
            onKeyDown={handleKeyPress}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #555',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage;
