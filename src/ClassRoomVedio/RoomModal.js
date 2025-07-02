import Modal from "react-modal";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";
const buttonStyle = {
  background: "#333",
  border: "none",
  padding: "12px",
  borderRadius: "50%",
  cursor: "pointer",
};


const RoomModal = ({
  isOpen,
  onClose,
  myVideoRef,
  participants,
  isMuted,
  isVideoOff,
  toggleAudio,
  toggleVideo,
  endCall,
  roomId,          
  callType,
  isTeacher ,
}) => (
<Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  ariaHideApp={false}
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000,
    },
    content: {
      background: "#1e1e1e",
      padding: "20px",
      width: "90%",
      maxWidth: "800px",
      margin: "auto",
      borderRadius: "12px",
      color: "white",
      inset: "50% auto auto 50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  }}
>
  <div
  style={{
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap",
  }}
>
  {/* ✅ Left: Self Video */}
  {callType === "video" && (
    <div>
      <video
        ref={myVideoRef}
        muted
        autoPlay
        playsInline
        style={{
          width: "200px",
          height: "150px",
          borderRadius: "8px",
          transform: "scaleX(-1)", // Mirror
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          textAlign: "center",
          fontSize: "12px",
          marginTop: "4px",
          color: "#00ffff",
        }}
      >
        You
      </div>
    </div>
  )}

  {/* ✅ Right: Participants */}
  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    {participants.map((user, index) => (
      <div key={index}>
        <video
          ref={user.ref}
          autoPlay
          playsInline
          style={{
            width: "120px",
            height: "90px",
            borderRadius: "6px",
            background: "black",
          }}
        />
        <div
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#ffffffa6",
            marginTop: "3px",
          }}
        >
          User {index + 1}
        </div>
      </div>
    ))}
  </div>
</div>


  {/* Controls */}
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    }}
  >
    <button onClick={toggleAudio} style={buttonStyle}>
      {isMuted ? <FaMicrophoneSlash color="white" /> : <FaMicrophone color="white" />}
    </button>
    <button onClick={toggleVideo} style={buttonStyle}>
      {isVideoOff ? <FaVideoSlash color="white" /> : <FaVideo color="white" />}
    </button>
    <button onClick={endCall} style={{ ...buttonStyle, background: "#e53935" }}>
      <FaPhoneSlash color="white" />
    </button>
  </div>

  {/* roomid genrat heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee  */}

 {isTeacher && (
  <div style={{ textAlign: "center", marginTop: "10px" }}>
    <p style={{ fontSize: "16px", color: "#ccc" }}>Room ID:</p>
    <div
      style={{
        display: "inline-block",
        background: "#333",
        padding: "8px 12px",
        borderRadius: "6px",
        color: "#00ffcc",
        fontSize: "16px",
      }}
    >
      {roomId}
      <button
        onClick={() => {
          navigator.clipboard.writeText(roomId);
          alert("Room ID copied!");
        }}
        style={{
          marginLeft: "10px",
          padding: "4px 8px",
          background: "#00ffcc",
          color: "#000",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Copy
      </button>
    </div>
  </div>
)}


</Modal>

);

export default RoomModal;
