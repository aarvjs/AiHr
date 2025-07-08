import React from 'react';

const AssignedClasses = () => {
  const teachers = [
    { teacher: 'Dr. Emily Anderson', sections: ['Section A', 'Section C'] },
    { teacher: 'Mr. Benjamin Hughes', sections: ['Section B'] },
    { teacher: 'Prof. Sarah Lee', sections: ['Section A', 'Section B', 'Section C'] }
  ];

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      minWidth: '300px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <h3>Teacher Section Assignments</h3>
        <p style={{ color: '#888' }}>Overview 🧾</p>
      </div>

      {teachers.map((entry, i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '1px solid #eee'
        }}>
          <div>
            <h4 style={{ marginBottom: '5px', color: '#2f5bea' }}>{entry.teacher}</h4>
            <p style={{ color: '#888', fontSize: '14px' }}>
              Assigned to: {entry.sections.join(', ')}
            </p>
          </div>
          <div style={{
            fontSize: '12px',
            padding: '6px 12px',
            backgroundColor: '#f1f3ff',
            borderRadius: '8px',
            color: '#4a4a4a'
          }}>
            Active
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignedClasses;
