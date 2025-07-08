import React from 'react';

const ClassmatesList = () => {
  return (
    <div style={{
      flex: 2,
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 6px rgba(255,255,255,0.05)',
    }}>
      
      {/* Title + View All Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        overflow:'hidden',
      }}>
        <h4 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Your Classmates</h4>
        <button style={{
          fontSize: '13px',
          padding: '6px 12px',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '6px',
          color: '#fff',
          cursor: 'pointer'
        }}>
          View All
        </button>
      </div>

      {/* Scrollable student list container */}
      <div
        style={{
          maxHeight: '250px',
          overflowY: 'auto',
          paddingRight: '5px',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE 10+
        }}
        className="hide-scrollbar"
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[...Array(15)].map((_, index) => (
            <li key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #444',
              color: '#ccc'
            }}>
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
                <span>Student {index + 1}</span>
              </div>

              <div style={{ flex: 1, textAlign: 'center', fontWeight: '500' }}>
                CRN: 123{index}
              </div>

              <div style={{ flex: 1, textAlign: 'right', fontStyle: 'italic' }}>
                BCA
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassmatesList;
