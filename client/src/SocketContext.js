import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState();
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [isAudioMuted, setAudioMuted] = useState(false);
  const [isVideoMuted, setVideoMuted] = useState(false);
  const [isScreenSharing, setScreenSharing] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const screenPeer = useRef(); // Use a ref here

  useEffect(() => {
    const isAuthenticated = true;

    if (isAuthenticated) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        });
    }

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const startScreenShare = () => {
    navigator.mediaDevices
      // Request screen sharing
      .getDisplayMedia({ video: { cursor: "always" }, audio: true })
      .then((screenStream) => {
        myVideo.current.srcObject = screenStream;
        screenPeer.current = new Peer({
          // Use a ref here
          initiator: true,
          trickle: false,
          stream: screenStream,
        });

        screenPeer.current.on("signal", (data) => {
          socket.emit("join-room", "your-room-id", data);
        });

        socket.on("user-connected", (userId) => {
          const call = screenPeer.current.call(userId, screenStream);
          call.on("stream", (userScreenStream) => {
            userVideo.current.srcObject = userScreenStream;
          });
        });

        setScreenSharing(true);
      })
      .catch((error) => {
        console.error("Error starting screen share:", error);
      });
  };

  const stopScreenShare = () => {
    myVideo.current.srcObject = stream;
    if (screenPeer.current) {
      screenPeer.current.destroy();
    }

    setScreenSharing(false);
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  // Function to toggle audio mute
  const toggleAudioMute = () => {
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !isAudioMuted;
    });
    setAudioMuted(!isAudioMuted);
  };

  // Function to toggle video mute
  const toggleVideoMute = () => {
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !isVideoMuted;
    });
    setVideoMuted(!isVideoMuted);
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        toggleAudioMute,
        toggleVideoMute,
        isAudioMuted,
        isVideoMuted,
        startScreenShare,
        stopScreenShare,
        isScreenSharing,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
