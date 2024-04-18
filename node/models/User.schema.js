const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 512,
    required: true,
  },
  email: {
    type: String,
    minLength: 3,
    maxLength: 512,
    required: true,
  },
  passwordHash: {
    type: String,
    minLength: 3,
    maxLength: 512,
  },
  image: {
    type: String,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  FavPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
