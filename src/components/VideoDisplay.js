// src/components/VideoDisplay.jsx
import React, { useEffect } from "react";
import PersonaVedio from '../assets/Persona.mp4';

const VideoDisplay = ({ showVideo, playing, videoRef, height }) => {
  useEffect(() => {
    if (videoRef.current && playing) {
      videoRef.current.play().catch(() => {});
    }
  }, [playing]);

  if (!showVideo) return null;

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <video
        autoPlay
        muted
        loop
        src={PersonaVedio}
        ref={videoRef}
        style={{ width: "100%", borderRadius: "10px", height: height || "300px" }}
      />
      <video
        autoPlay
        muted
        style={{
          width: "160px",
          height: "120px",
          position: "absolute",
          top: 10,
          right: 10,
          borderRadius: "10px",
        }}
        ref={(ref) => {
          if (ref) {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream) => {
                ref.srcObject = stream;
              })
              .catch(() => {});
          }
        }}
      />
    </div>
  );
};

export default VideoDisplay;
