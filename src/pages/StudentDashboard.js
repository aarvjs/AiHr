import React from 'react';
import { FaBell } from 'react-icons/fa';
import studentImg from '../assets/teacher.jpg';
import profileImg from '../assets/man.jpeg';
import card1 from '../assets/man.jpeg';
import card2 from '../assets/man.jpeg';
import card3 from '../assets/man.jpeg';
import card4 from '../assets/man.jpeg';

const Dashboard = () => {
  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#000',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff',
      // marginTop: '-50px',
      width:'100%',
    }}>

      {/* Top Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '26px', fontWeight: '600' }}>Hello, Arvind 👋</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaBell size={20} color="#fff" />
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Explore Classes
            </button>
          </div>
        </div>
        <hr style={{
          marginTop: '15px',
          border: 'none',
          borderTop: '1px solid #333'
        }} />
      </div>

      {/* First Row */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>

        {/* Left Hero Card */}
        <div style={{
          flex: 2,
          // background: 'rgba(0, 31, 63, 0.4)',
          background: 'linear-gradient(135deg, rgba(255,192,203,0.2), rgba(173,216,230,0.2))',

          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '25px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
        }}>
          <div style={{ maxWidth: '60%' }}>
            <h3 style={{
              fontSize: '22px',
              marginBottom: '10px',
              color: '#fff'
            }}>Your PDP Journey Begins Here</h3>
            <p style={{
              fontSize: '15px',
              marginBottom: '15px',
              color: '#ccc'
            }}>
              Get started with career-building lectures & resources specially crafted by our top mentors.
            </p>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#ff7f50',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Start Learning
            </button>
          </div>
          <img src={studentImg} alt="hero" style={{
            width: '150px',
            height: 'auto',
            borderRadius: '10px'
          }} />
        </div>

        {/* Right Student Info Card */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '25px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
        }}>
          <img src={profileImg} alt="student" style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            marginBottom: '15px'
          }} />
          <h4 style={{ marginBottom: '5px', fontSize: '18px' }}>Arvind Yadav</h4>
          <p style={{ margin: '2px 0', fontSize: '14px', color: '#ccc' }}>CRN: 123456</p>
          <p style={{ margin: '2px 0', fontSize: '14px', color: '#ccc' }}>Department: BCA</p>
          <p style={{ margin: '2px 0', fontSize: '14px', color: '#ccc' }}>Email: arvind@email.com</p>
        </div>
      </div>

      {/* Center Section */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {/* Motivation Video Card */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
        }}>
          <h4 style={{ marginBottom: '15px', fontSize: '18px', color: '#fff' }}>Mentor's Motivation</h4>
          <video src="/videos/motivation.mp4" controls style={{
            width: '100%',
            borderRadius: '10px'
          }} />
        </div>

        {/* Classmates List */}
       <div style={{
  flex: 2,
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
}}>
  <h4 style={{ marginBottom: '15px', fontSize: '18px', color: '#fff' }}>Your Classmates</h4>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
    {[1, 2, 3, 4].map((_, index) => (
      <li key={index} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid #444',
        color: '#ccc'
      }}>
        {/* Left: Icon + Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#00c6ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '16px'
          }}>
            👤
          </div>
          <span>Arvind Yadav</span>
        </div>

        {/* Center: CRN */}
        <div style={{ flex: 1, textAlign: 'center', fontWeight: '500' }}>
          CRN: 123{index}
        </div>

        {/* Right: Section */}
        <div style={{ flex: 1, textAlign: 'right', fontStyle: 'italic' }}>
          BCA
        </div>
      </li>
    ))}
  </ul>
</div>

      </div>

      {/* Bottom 4 Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {[card1, card2, card3, card4].map((img, i) => (
          <div key={i} style={{
            // background: 'rgba(255,182,193,0.15)',
                      background: 'linear-gradient(135deg, rgba(255,192,203,0.2), rgba(173,216,230,0.2))',

            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(255,255,255,0.05)'
          }}>
            <img src={img} alt={`card-${i}`} style={{
              width: '100%',
              height: '140px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '10px'
            }} />
            <p style={{ fontSize: '14px', color: '#ddd' }}>Illustration {i + 1}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
