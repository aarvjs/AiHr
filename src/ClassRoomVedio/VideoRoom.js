import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import RoomModal from "../ClassRoomVedio/RoomModal"; // adjust path if needed

const socket = io("http://localhost:5000");

const VideoRoom = () => {
  const { roomId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const callType = queryParams.get("type"); // 'audio' or 'video'

  const myVideo = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const myPeer = new Peer();
    let stream;

    navigator.mediaDevices
      .getUserMedia(
        callType === "video"
          ? { video: true, audio: true }
          : { video: false, audio: true }
      )
      .then((userStream) => {
        stream = userStream;

        // Sirf video call me apna camera dikhao
        if (callType === "video") {
          myVideo.current.srcObject = stream;
          myVideo.current.onloadedmetadata = () => {
            myVideo.current.play();
          };
        }

        myPeer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            const newRef = createVideoRef(userVideoStream);
            setParticipants((prev) => [...prev, { ref: newRef }]);
          });
        });

        socket.on("user-connected", (userId) => {
          const call = myPeer.call(userId, stream);
          call.on("stream", (userVideoStream) => {
            const newRef = createVideoRef(userVideoStream);
            setParticipants((prev) => [...prev, { ref: newRef }]);
          });
        });
        myPeer.on("open", (id) => {
          socket.emit("join-room", roomId, id);
        });
      });
  }, [roomId, callType]);

  const createVideoRef = (stream) => {
    const ref = document.createElement("video");
    ref.srcObject = stream;
    ref.autoplay = true;
    ref.playsInline = true;
    ref.style.width = "150px";
    ref.style.height = "100px";
    ref.style.borderRadius = "8px";
    ref.style.background = "black";
    setTimeout(() => ref.play(), 500);
    return { current: ref };
  };

  const handleToggleAudio = () => {
    const stream = myVideo.current?.srcObject;
    const audioTrack = stream?.getAudioTracks?.()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMuted(!audioTrack.enabled);
    }
  };

  const handleToggleVideo = () => {
    const stream = myVideo.current?.srcObject;
    const videoTrack = stream?.getVideoTracks?.()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOff(!videoTrack.enabled);
    }
  };

  const handleEndCall = () => {
    const stream = myVideo.current?.srcObject;

    if (stream) {
      // ✅ Stop all media tracks (audio + video)
      stream.getTracks().forEach((track) => {
        track.stop();
      });

      // ✅ Remove stream from video element
      myVideo.current.srcObject = null;
    }

    // ✅ Optional: Clear participants (if needed)
    setParticipants([]);

    // ✅ Close the modal
    setIsModalOpen(false);

    // ✅ Optional: Navigate away or reload if you want to fully exit
    // navigate('/teacher-dashboard');
  };

  return (
    <RoomModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      myVideoRef={myVideo}
      participants={participants}
      isMuted={muted}
      isVideoOff={videoOff}
      toggleAudio={handleToggleAudio}
      toggleVideo={handleToggleVideo}
      endCall={handleEndCall}
      roomId={roomId}
      callType={callType}
      isTeacher={window.location.pathname.includes("/teacher-dashboard")}
    />
  );
};

export default VideoRoom;
