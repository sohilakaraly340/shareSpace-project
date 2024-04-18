const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    minLength: 0,
    maxLength: 512,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;
