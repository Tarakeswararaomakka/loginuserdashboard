// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String, default: "default.jpg" },
  role: {
    type: String,
    default: "User",
    enum: ["Admin", "Publisher", "Reviewer", "Moderator", "User"],
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "suspended", "inactive"],
  },
  dateCreated: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
