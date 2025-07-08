import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import aiIllustration from '../assets/teacher.jpg';

const dataPoints = [
  { label: 'Attendance', value: 64, total: 72, color: '#2f5bea' },
  { label: 'Homeworks', value: 22, total: 31, color: '#1dd1a1' },
  { label: 'Rating', value: 91, total: 100, color: '#00cec9' }
];

const AICard = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 768);
      setIsMobile(window.innerWidth < 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isTablet ? 'column' : 'row',
        background: '#fff',
        borderRadius: '20px',
        padding: isTablet ? '20px' : '30px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: isTablet ? '30px' : '60px',
        flexWrap: 'wrap',
        marginBottom: '30px',
      }}
    >
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#1e1e1e' }}>
          Artificial Intelligence ⬇
        </h2>
        <p style={{ marginBottom: '30px', color: '#888' }}>
          Next Topic: Neural Networks
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '40px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          {dataPoints.map((item, index) => {
            const chartData = [
              { name: 'Completed', value: item.value },
              { name: 'Remaining', value: item.total - item.value }
            ];

            return (
              <div key={index} style={{ textAlign: 'center' }}>
                <PieChart width={110} height={110}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={i === 0 ? item.color : '#e1e8ff'}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                  {item.value}/{item.total}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>{item.label}</div>
              </div>
            );
          })}
        </div>

        <button
          style={{
            marginTop: '30px',
            backgroundColor: '#2f5bea',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: isMobile ? '100%' : 'auto'
          }}
        >
          Go to the course
        </button>
      </div>

      <img
        src={aiIllustration}
        alt="AI Illustration"
        style={{
          maxWidth: isTablet ? '100%' : '400px',
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          flex: 1
        }}
      />
    </div>
  );
};

export default AICard;
