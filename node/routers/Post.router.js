const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/Post.controller");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/image");
const router = express.Router();

router.post("/", upload.single(), auth, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
// router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
