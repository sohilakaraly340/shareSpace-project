const asyncHandler = require("express-async-handler");

const Post = require("../models/Post.schema");
const User = require("../models/User.schema");

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedPosts = posts.reverse().slice(startIndex, endIndex);

    res
      .status(200)
      .json({ results: paginatedPosts.length, data: paginatedPosts });
  } catch (error) {
    res.send(error);
  }
});

const getPostById = asyncHandler(async (req, res) => {
  try {
    let Id = req.params.id;
    const post = await Post.findById({ _id: Id }).populate("user");
    res.status(200).json({ data: post });
  } catch (error) {
    res.send(error);
  }
});

const createPost = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.user;
    const user = await User.findById(userId);

    if (!user)
      return res
        .status(404)
        .json({ error: `There is no user with this id: ${userId}` });

    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      user: userId,
      image: req.file ? req.file.filename : null,
    });
    await newPost.save();

    res.status(201).json({ data: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updatePost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const newPost = {
      title: req.body.title,
      description: req.body.description,
      user: req.body.user,
      image: req.file.filename,
    };
    const Updates = await Post.updateOne({ _id: id }, newPost);
    res.status(201).json({ message: "updated", data: newPost });
  } catch (error) {
    res.send(error);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    if (!post) {
      res.status(404).send(`there is no post with id ${req.params.id}`);
      return;
    }
    const updates = await Post.deleteOne({ _id: id });
    res.status(201).json({ message: "deleted", data: updates });
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};
