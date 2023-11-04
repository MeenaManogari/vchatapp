import React, { useContext } from "react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SocketContext } from "../SocketContext";
import hangup from "../assets/call-hangup.svg";
import videomute from "../assets/mute-video.svg";
import videounmute from "../assets/unmute-video.svg";
import audiomute from "../assets/mute-audio.svg";
import audiounmute from "../assets/unmute-audio.svg";
import startshare from "../assets/start-share.svg";
import stopshare from "../assets/stop-share.svg";
import "./components.css";

const Options = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    toggleAudioMute,
    toggleVideoMute,
    isAudioMuted,
    isVideoMuted,
    startScreenShare,
    stopScreenShare,
    isScreenSharing,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div className="user_video_container">
      <div className="user_area">
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
        >
          <div className="video_options">
            <div className="video_id">
              <h6>Account Info</h6>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <CopyToClipboard text={me}>
                <button type="button">copy your ID</button>
              </CopyToClipboard>
            </div>
            <div className="video_id">
              <h6>Make a Call</h6>
              <input
                type="text"
                value={idToCall}
                onChange={(e) => {
                  setIdToCall(e.target.value);
                }}
              />
              {callAccepted && !callEnded ? (
                <div className="call-accepted">
                  <button onClick={leaveCall}>
                    <img src={hangup} alt="callend" />
                  </button>
                  <button onClick={toggleAudioMute}>
                    {isAudioMuted ? (
                      <img src={audiounmute} alt="unmute" />
                    ) : (
                      <img src={audiomute} alt="unmute" />
                    )}
                  </button>
                  <button onClick={toggleVideoMute}>
                    {isVideoMuted ? (
                      <img src={videounmute} alt="unmute" />
                    ) : (
                      <img src={videomute} alt="mute" />
                    )}
                  </button>
                  {isScreenSharing ? (
                    <button onClick={stopScreenShare}>
                      <img src={stopshare} alt="" />
                    </button>
                  ) : (
                    <button onClick={startScreenShare}>
                      <img src={startshare} alt="" />
                    </button>
                  )}
                </div>
              ) : (
                <button onClick={() => callUser(idToCall)}>call</button>
              )}
            </div>
          </div>
        </form>{" "}
        {children}
      </div>
    </div>
  );
};

export default Options;
