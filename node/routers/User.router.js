const express = require("express");
const {
  createNewUse,
  login,
  findAllUsers,
  getUserById,
  FavPost,
  isFav,
  getUserFAv,
  addFollower,
} = require("../controllers/User.controller");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", findAllUsers);
router.get("/:id", getUserById);
router.post("/", createNewUse);
router.post("/login", login);

router.post("/favourite/:userId/:id", FavPost);
router.get("/favourite/:userId/:id", isFav);
router.get("/favourite/:userId", getUserFAv);
router.post("/follow", addFollower);

module.exports = router;
