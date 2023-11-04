const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "please enter the email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
