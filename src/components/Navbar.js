import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Aarlogo from '../assets/logo.png';
// import EnquiryForm from "./EnquiryForm";
import LoginModal from '../components/LoginModal';

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    // background: scroll ? "#000" : "transparent",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 25px",
    zIndex: 1000,
    // boxShadow: scroll ? "0 4px 10px rgba(0,255,255,0.1)" : "none",
    transition: "all 0.3s ease",
    flexWrap: "wrap",
    // marginLeft:'100px',
  };

  const leftStyle = {
    display: "flex",
    alignItems: "center",
    gap: "100px",
    flexWrap: "wrap",
    marginLeft:'100px',
  };

const logoStyle = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "#00ffff",
  height: "90px", // Increased from 60 or 100px to 75px (moderate)
  width: "auto",
  objectFit: "contain",
};


  const linkContainer = {
    display: isMobile ? "none" : "flex",
    gap: "55px",
  };

 const linkStyle = {
  textDecoration: "none",
  color: "#ffff",
  fontWeight: 600,
  fontSize: "1rem",
  transition: "0.3s",
  opacity: '0.6',
};

const hoverStyle = {
  color: "#ffffff",
  opacity: '1',
};


  const enquiryButton = {
    background: "transparent",
    color: "#fff",
    border: "1px solid white",
    padding: "10px 20px",
    borderRadius: "25px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    // boxShadow: "0 5px 15px rgba(0,255,255,0.4)",
    transition: "0.3s ease",
    marginRight:'200px',
    
  };

 
 

  return (
    <>
      <div style={navbarStyle}>
        <div style={leftStyle}>
          <img src={Aarlogo} alt="Logo" style={logoStyle} />
<div style={linkContainer}>
  <Link
    to="/"
    style={linkStyle}
    onMouseEnter={(e) => e.target.style.opacity = "1"}
    onMouseLeave={(e) => e.target.style.opacity = "0.6"}
  >
    Home
  </Link>

  <a
    href="https://allenhouse.ac.in/"
    target="_blank"
    rel="noopener noreferrer"
    style={linkStyle}
    onMouseEnter={(e) => e.target.style.opacity = "1"}
    onMouseLeave={(e) => e.target.style.opacity = "0.6"}
  >
    College
  </a>

  <Link
    to="/about"
    style={linkStyle}
    onMouseEnter={(e) => e.target.style.opacity = "1"}
    onMouseLeave={(e) => e.target.style.opacity = "0.6"}
  >
    About
  </Link>

  <Link
    to="/career"
    style={linkStyle}
    onMouseEnter={(e) => e.target.style.opacity = "1"}
    onMouseLeave={(e) => e.target.style.opacity = "0.6"}
  >
    Career
  </Link>
</div>


        </div>

       <div>
      <button  style={enquiryButton} onClick={() => setShowForm(true)} >
        Login Now
      </button>

      {showForm && <LoginModal onClose={() => setShowForm(false)} />}
    </div>
      </div>


{showForm && <LoginModal onClose={() => setShowForm(false)} />}    </>
  );
}

export default Navbar;
