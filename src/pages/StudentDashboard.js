import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import Lottie from 'lottie-react';
import studentImg from '../assets/student.json';
import ClassmatesList from '../child_components/ClassmatesList';
// import AtsScoreCard from '../components/AtsScoreCard';
import MockScoreChart from '../child_components/MockScoreChart';
import { supabase } from '../supabaseClient';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [latestVideo, setLatestVideo] = useState(null);

  useEffect(() => {
   const fetchLatestVideo = async () => {
  const { data, error } = await supabase
    .from('uploaded_videos')
    .select('*')
    .order('uploaded_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Video fetch error:', error);
  } else if (data && data.length > 0) {
    setLatestVideo(data[0]);
  }
};


    fetchLatestVideo();
  }, []);
  const data = [
    { name: 'Present', value: 75 },
    { name: 'Absent', value: 25 },
  ];
  const COLORS = ['#00cc99', '#f44336'];

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#000',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff',
      minHeight: '100vh',
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
          <Lottie
            animationData={studentImg}
            style={{ width: 150, height: 150 }}
          />

        </div>
        {/* Right Student Info Card */}
        <div style={{
          width: '300px',
          background: 'linear-gradient(135deg, rgba(0,255,200,0.1), rgba(0,128,255,0.1))',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          textAlign: 'center',
          color: '#fff'
        }}>
          <h3 style={{ marginBottom: '10px', color: '#00cc99' }}>PDP Scores %</h3>
          <div style={{ width: '100%', height: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
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
          {latestVideo ? (
            <video src={latestVideo.file_url} controls style={{
              width: '100%',
              borderRadius: '10px'
            }} />
          ) : (
            <p style={{ color: '#ccc', fontSize: '14px' }}>No recent video available</p>
          )}
        </div>

        {/* Classmates List */}
        <ClassmatesList />
      </div>

      {/* Bottom 4 Faculty Cards with overlapping left-side count */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {[
          {
            name: 'Dr. Arvind Kumar',
            code: 'FAC101',
            section: 'A',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            name: 'Prof. Neha Sharma',
            code: 'FAC102',
            section: 'B',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          {
            name: 'Dr. Rahul Mehta',
            code: 'FAC103',
            section: 'C',
            image: 'https://randomuser.me/api/portraits/men/65.jpg'
          },
          {
            name: 'Ms. Priya Singh',
            code: 'FAC104',
            section: 'A + B',
            image: 'https://randomuser.me/api/portraits/women/55.jpg'
          },
        ].map((faculty, i) => (
          <div key={i} style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(0,255,200,0.08), rgba(0,128,255,0.08))',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            color: '#fff',
            boxShadow: '0 6px 20px rgba(0, 255, 200, 0.15)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            minHeight: '150px',
            maxWidth: '290px',
            margin: 'auto'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 255, 200, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 200, 0.15)';
            }}
          >
            {/* Card Number Overlapping Left Side */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '-14px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#00e6b8',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,255,200,0.3)',
              border: '2px solid #fff',
              zIndex: 1
            }}>
              {i + 1}
            </div>

            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#00e6b8',
              marginBottom: '14px',
              marginTop: '48px'
            }}>
              {faculty.name}
            </h4>

            <p style={{ margin: '6px 0', fontSize: '14px', color: '#ccc' }}>
              <strong>Code:</strong> {faculty.code}
            </p>

            {/* Section as button-like div */}
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: '#00e6b8',
              color: '#000',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '12px',
              marginTop: '10px',
              boxShadow: '0 2px 8px rgba(0,255,200,0.3)'
            }}>
              Section: {faculty.section}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: '30px'
      }}>
        {/* Left: ATS Score Card with margin */}
        {/* <div style={{ marginLeft: '40px' }}>
          <AtsScoreCard />
        </div> */}

        {/* Right: Mock Score Chart */}
        <MockScoreChart />
      </div>
    </div>
  );
};

export default Dashboard;
