const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other user-related fields as needed
});

// Define the Message schema
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Add other message-related fields as needed
});

// Create models based on the schemas
const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = { User, Message };
