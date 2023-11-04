// import React, { useContext, useState, useRef, useEffect } from "react";
// import { SocketContext } from "../SocketContext"; // Make sure to adjust the import path

// const Chat = () => {
//   const { chatMessages, message, sendMessage, setMessage } =
//     useContext(SocketContext);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatMessages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     sendMessage(message);
//     scrollToBottom();
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {chatMessages.map((msg, index) => (
//           <div key={index} className="chat-message">
//             <span>{msg.name}:</span>
//             {msg.message}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSendMessage} className="chat-input">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
