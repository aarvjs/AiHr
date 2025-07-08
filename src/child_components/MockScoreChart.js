import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', score: 3 },
  { month: 'Feb', score: 6 },
  { month: 'Mar', score: 9 },
  { month: 'Apr', score: 11 },
  { month: 'May', score: 7 },
  { month: 'Jun', score: 4 },
  { month: 'Jul', score: 8 },
  { month: 'Aug', score: 5 },
  { month: 'Sep', score: 3 },
  { month: 'Oct', score: 2 },
  { month: 'Nov', score: 0 },
  { month: 'Dec', score: 0 },
];

const MockScoreChart = () => {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '20px',
      width: '100%',
      maxWidth: '700px',
      color: '#fff',
      boxShadow: '0 2px 6px rgba(255,255,255,0.05)'
    }}>
      <h4 style={{ marginBottom: '20px', fontSize: '18px' }}>Your Mock Scores</h4>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MockScoreChart;
