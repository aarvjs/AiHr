// src/components/TeamSection.js
import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import man from '../assets/man.jpeg';


const teamMembers = [
  {
    name: 'Yomi Denzel',
    role: 'E-Commerce 2.0',
    img: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Timothée Moiroux',
    role: 'Investissement Immobilier',
    img: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'David Sequeira',
    role: 'Closing',
    img: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Manuel Ravier',
    role: 'Investissement Immobilier',
    img: man,
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
];

const TeamSection = () => {
  const containerStyle = {
    backgroundColor: '#02010a',
    padding: '80px 5vw',
    textAlign: 'center',
    color: '#fff',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  };

  const cardStyle = {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 0 30px rgba(0, 200, 255, 0.1)',
    transition: 'transform 0.3s ease',
    height:'60vh',
  };

  const imageStyle = {
    width: '100%',
    height: '360px',
    objectFit: 'cover',
    display: 'block',
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: '-100%',
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.9))',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    transition: 'bottom 0.4s ease',
  };

  const iconRow = {
    marginTop: '15px',
    display: 'flex',
    gap: '15px',
    fontSize: '1.2rem',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
        Meet Our Experts
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#c8d3f5' }}>
        Partnered with the top people in every industry
      </p>

      <div style={gridStyle}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.querySelector('.overlay').style.bottom = '0')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.querySelector('.overlay').style.bottom = '-100%')
            }
          >
            <img src={member.img} alt={member.name} style={imageStyle} />
            <h3>{member.name}</h3>
            <div className="overlay" style={overlayStyle}>
              <h3 style={{ margin: 0 }}>{member.name}</h3>
              <p style={{ marginTop: '5px', color: '#a2cbff' }}>{member.role}</p>
              <div style={iconRow}>
                <a href={member.socials.linkedin} style={{ color: '#fff' }}><FaLinkedin /></a>
                <a href={member.socials.twitter} style={{ color: '#fff' }}><FaTwitter /></a>
                <a href={member.socials.instagram} style={{ color: '#fff' }}><FaInstagram /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
