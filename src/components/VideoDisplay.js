import React, { useEffect, useRef, useState } from "react";
import PersonaVedio from "../assets/Persona.mp4";

const VideoDisplay = ({ showVideo, playing, videoRef }) => {
  const webcamRef = useRef(null);
  const [focused, setFocused] = useState("persona"); // "persona" or "webcam"

  useEffect(() => {
    if (videoRef.current && playing) {
      videoRef.current.play().catch(() => {});
    }
  }, [playing]);

  useEffect(() => {
    if (webcamRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          webcamRef.current.srcObject = stream;
        })
        .catch(() => {});
    }
  }, []);

  if (!showVideo) return null;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        backgroundColor: "#f5f5f5", // ✅ Light background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 20px",
        marginTop: "0px", // ✅ Fix margin
        fontFamily: "Segoe UI",
      }}
    >
      {/* Heading */}
      {/* <h2 style={{ fontSize: "24px", margin: "20px 0", color: "#333" }}>
        🎥 AI HR Interview - Video Interaction
      </h2> */}

      {/* Video Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          position: "relative",
          aspectRatio: "16/9",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ddd",
        }}
      >
        {/* Persona Video */}
        <div
          onClick={() => setFocused("persona")}
          style={{
            width: focused === "persona" ? "100%" : "200px",
            height: focused === "persona" ? "100%" : "130px",
            position: focused === "persona" ? "absolute" : "absolute",
            top: focused === "persona" ? 0 : 15,
            left: focused === "persona" ? 0 : 15,
            borderRadius: "10px",
            overflow: "hidden",
            border:
              focused === "persona"
                ? "none"
                : "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow:
              focused === "persona"
                ? "none"
                : "0 0 8px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: focused === "persona" ? 1 : 2,
          }}
        >
          <video
            ref={videoRef}
            src={PersonaVedio}
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Webcam Video */}
        <div
          onClick={() => setFocused("webcam")}
          style={{
            width: focused === "webcam" ? "100%" : "200px",
            height: focused === "webcam" ? "100%" : "130px",
            position: focused === "webcam" ? "absolute" : "absolute",
            top: focused === "webcam" ? 0 : 15,
            right: focused === "webcam" ? 0 : 15,
            borderRadius: "10px",
            overflow: "hidden",
            border:
              focused === "webcam"
                ? "none"
                : "2px solid rgba(0, 0, 0, 0.2)",
            boxShadow:
              focused === "webcam"
                ? "none"
                : "0 0 8px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: focused === "webcam" ? 1 : 2,
          }}
        >
          <video
            ref={webcamRef}
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)", // ✅ Fix mirror
            }}
          />
        </div>
      </div>

   
       
      
    </div>
  );
};

export default VideoDisplay;
