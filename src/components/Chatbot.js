import { color } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaMicrophone } from 'react-icons/fa';
// import chatBg from "../images/chatimg.avif";
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

import Lottie from "lottie-react";
import aiAnimation from "../assets/ai.json";


const ChatBot = () => {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const genAI = new GoogleGenerativeAI("AIzaSyC5ohX7MWiWeDluJv1xBXTG3SPltgP_fek");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    if (showChatWindow) {
      setMessages([
        {
          text: "This is Persona",
          isBot: true,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [showChatWindow]);

 const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const newMessage = {
    text: inputMessage,
    isBot: false,
    time: new Date().toLocaleTimeString(),
  };

  setMessages((prev) => [...prev, newMessage]);
  setInputMessage('');

  try {
    const chat = await model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(inputMessage);
    const response = await result.response.text();

    const botReply = response || "I'm here to help with your query!";
    setMessages((prev) => [
      ...prev,
      {
        text: botReply,
        isBot: true,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    // 🎤 Speak the response
    const speech = new SpeechSynthesisUtterance(botReply);
    window.speechSynthesis.speak(speech);
  } catch (error) {
    console.error("Gemini API Error:", error);
    setMessages((prev) => [
      ...prev,
      {
        text: "Sorry, something went wrong while processing your request.",
        isBot: true,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }
};
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      handleSendMessage(); 
    };
  };


  return (
    <div style={styles.chatContainer}>
      <div
      style={styles.chatIcon}
      onClick={() => setShowChatWindow(!showChatWindow)}
    >
      <Lottie
        animationData={aiAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
   
      

      {showChatWindow && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span style={{ marginLeft: 20 }}>
              Allen <span>Persona</span>
            </span>
          </div>
          

          <div style={styles.messageContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageBubble,
                  ...(msg.isBot ? styles.botMessage : styles.userMessage),
                }}
              >
                {msg.isBot && <FaRobot style={styles.botIcon} />}
                <div>
                  <p style={styles.messageText}>{msg.text}</p>
                  <p style={styles.timestamp}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.inputContainer}>
            <FaMicrophone style={styles.micIcon} onClick={startListening} /> {/* माइक्रोफोन बटन जो वॉयस इनपुट लेगा */}
            <input
              type="text"
              placeholder="Write a message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={styles.inputField}
            />
            <FaPaperPlane style={styles.sendIcon} onClick={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  chatContainer: {
    position: 'fixed',
    bottom: '50px',
    right: '30px',
    zIndex: 1000,
  },
  chatIcon: {
       position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "70px",
      height: "70px",
      borderRadius: "50%",            // ✅ Make it circular
      backgroundColor: "#fff",        // ✅ White background
      display: "flex",                // ✅ Center animation
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Soft shadow
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",  // ✅ Smooth hover
      zIndex: 9999,
  },
  chatMessageText: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  chatWindow: {
    width: '400px',
    height: '500px',
    // backgroundImage: `url(${chatBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px 20px 0 20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    position: 'fixed',
    bottom: '120px',
    right: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,255,0.6))',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px 10px 0 0',
  },
  messageContainer: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    // gap: '8px', 
    backgroundColor: '#f0f2f5', // WhatsApp-like background
  },

  messageBubble: {
    maxWidth: '75%',
    padding: '3px 14px', // ✅ Compact padding like WhatsApp
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px', // ✅ Slightly smaller text
    lineHeight: '1.4',
    wordBreak: 'break-word',
  },

  botMessage: {
    background: '#ffffff', // WhatsApp light bot color
    borderRadius: '14px 14px 14px 4px',
    alignSelf: 'flex-start',
    color: '#000',
  },

  userMessage: {
    background: '#dcf8c6', // WhatsApp green bubble
    borderRadius: '14px 14px 4px 14px',
    alignSelf: 'flex-end',
    color: '#000',
  },

  timestamp: {
    fontSize: '11px',
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: '2px',
  },
  inputContainer: {
    padding: '10px',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  inputField: {
    flex: 1,
    padding: '8px',
    borderRadius: '50px',
    border: '1px solid #ddd',
    outline: 'none',
  },
  micIcon: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#ff5733',
  },
  sendIcon: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#255cdc',
  },
};

export default ChatBot;
