import React from "react";
import Watchjpg from "../assets/watch.jpg";
import Clock from "../assets/clock.mp4";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Heart from "../assets/heart.svg";
// import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "600px",
        position: "relative",
        backgroundImage: `url(${Watchjpg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Top Section with video and social connect */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px",
          gap: "20px",
        }}
      >
        {/* Video on Left (centered) */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "55%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "330px",
            marginTop: "87px",
            marginLeft:'100px',
          }}
        >
          <video
            src={Clock}
            autoPlay
            muted
            loop
            playsInline
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "10px",
              mixBlendMode: "lighten", // hides dark/black edges
    filter: "brightness(1.2) contrast(1.2)", // enhance clarity
              
              objectFit: "contain",
            //   boxShadow: "0 0 20px rgba(0,0,0,0.6)",
            }}
          />
        </div>

        {/* Social Connect on Right */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "48%",
            // backgroundColor: "rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "10px",
            // textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "26px",
              color: "#ffffff",
              textShadow: "0 0 10px #0ff, 0 0 20px #0ff",
              fontWeight: "bold",
            }}
          >
            Connect With Us
          </h2>
          <p style={{ marginBottom: "20px", fontSize: "16px", lineHeight: "1.5" }}>
            Follow us on social platforms to stay updated with our latest
            projects and innovations.
          </p>
          <p style={{ marginBottom: "20px", fontSize: "16px", lineHeight: "1.5" }}>
            Follow us on social platforms to stay updated with our latest
            projects and innovations.
          </p>
          <p style={{ marginBottom: "20px", fontSize: "16px", lineHeight: "1.5" }}>
            Follow us on social platforms to stay updated with our latest
            projects and innovations.
          </p>
          <div style={{ display: "flex",  gap: "25px" }}>
            <a
              href="https://www.linkedin.com/in/arvind-yadav-123456"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0e76a8", fontSize: "28px" }}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/aarvind"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", fontSize: "28px" }}
            >
              <FaGithub />
            </a>
            {/* <a
              href="https://www.instagram.com/arvind__yadav"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E1306C", fontSize: "28px" }}
            >
              <FaInstagram />
            </a> */}
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
       {/* Bottom Section in 1 Line */}
       <hr
  style={{
    width: "100%",
    border: "none",
    height: "1px",
    background: "rgba(255, 255, 255, 0.2)",
    margin: "20px 0",
  }}
/>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "trasnparent",
          padding: "15px 20px",
          fontSize: "14px",
          letterSpacing: "1px",
        }}
      >
        {/* Left */}
        <div style={{ flex: "1 1 100px", textAlign: "left" }}>
          © {new Date().getFullYear()} Edu Mentra. All Rights Reserved.
        </div>

        {/* Center */}
        <div style={{ flex: "1 1 100px", textAlign: "center" }}>
         edumentra@gmail.com
        </div>

        {/* Right - Heart + text */}
        <div
          style={{
            flex: "1 1 100px",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <img
            src={Heart}
            alt="Heart"
            style={{
              width: "30px",
              height: "30px",
              filter: "drop-shadow(0 0 8px orange)",
            }}
          />
          <span style={{ fontSize: "12px", color: "#ffb347" }}>
            Made with ♥ by edumentra 
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
