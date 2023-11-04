import React, { useEffect } from "react";
import { useContext } from "react";
import { SocketContext } from "../SocketContext";
import "./components.css";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Notifications from "./Notifications";
import Options from "./Options";
const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="video_container">
        <div className="vchat-room">
          {stream && (
            <div className="our_video">
              <div>{name || "Name"}</div>
              <video ref={myVideo} muted autoPlay playsInline />
            </div>
          )}
          {callAccepted && !callEnded && (
            <div className="our_video">
              <div>{call.name || "Name"}</div>
              <video ref={userVideo} autoPlay playsInline />
            </div>
          )}
        </div>

        <Options>
          <Notifications />
        </Options>
      </div>
    </>
  );
};

export default VideoPlayer;
