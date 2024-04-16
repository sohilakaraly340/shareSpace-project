const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.schema");
const Post = require("../models/Post.schema");

const { validateAddUsers } = require("../validation/user.validator");

const createNewUse = async (req, res) => {
  const { error } = validateAddUsers(req.body);
  if (error) {
    res.status(400).send({ message: error });
    return;
  }
  const { name, email, password } = req.body;
  if (!email || !name) {
    return res.send("Invalid");
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).send({ message: "this email is already exist.." });
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      passwordHash,
    });
    res.send(newUser);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ message: "wrong email or password!" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).send({ message: "Incorret email or password..." });

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword)
      return res.status(401).send({ message: "Incorret email or password..." });

    const token = jwt.sign({ email }, "myjwtsecret", { expiresIn: "1d" });
    res.header({ jwt: token }).send({ token, user });
  } catch (userLoginError) {
    res.status(500).send(userLoginError.message);
  }
};

// const updateUser = async (req, res) => {
//   const token = req.headers["jwt"];

//   const { password } = req.body;
//   const { error } = validateAddUsers(req.body);
//   if (error) {
//     res.status(400).send({ message: error });
//     return;
//   }

//   if (!token) {
//     return res.status(401).send({ message: "un authorized user" });
//   }
//   const payLoad = await jwt.verify(token, "myjwtsecret");
//   const { email } = payLoad;
//   const user = await User.findOne({ email });
//   if (!user) {
//     res.status(404).send(`there is no user with id ${req.params.id}`);
//     return;
//   }
//   const passwordHash = await bcrypt.hash(password, 10);
//   const Updates = await User.updateOne(
//     { email },
//     { email: email, passwordHash: passwordHash }
//   );

//   res.send(Updates);
// };

const findAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).populate("FavPosts");
  res.send(user);
};

const FavPost = async (req, res) => {
  const { userId, id } = req.params;

  const post = await Post.findOne({ _id: id });

  const user = await User.findOne({ _id: userId });
  if (!post) {
    res.status(404).send(`there is no post with id ${req.params.id}`);
    return;
  }

  favourites = user.FavPosts;
  if (!favourites.includes(id)) {
    favourites.push(id);
    res.status(200).send("Post added from favorites successfully");
  } else {
    const index = favourites.indexOf(id);
    favourites.splice(index, 1);
    res.status(200).send("Post removed from favorites successfully");
  }

  const Updates = await User.updateOne(
    { _id: userId },
    { FavPosts: favourites }
  );
};

const isFav = async (req, res) => {
  const { userId, id } = req.params;

  const post = await Post.findOne({ _id: id });

  if (!post) {
    res.status(404).send(`there is no post with id ${req.params.id}`);
    return;
  }

  const user = await User.findOne({ _id: userId });

  const favorites = user.FavPosts;
  const isFavorite = favorites.includes(id);

  res.status(200).json({ isFavorite });
};

const getUserFAv = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById({ _id: userId });

  res.status(200).json({ favorites: user.FavPosts });
};

module.exports = {
  createNewUse,
  login,
  findAllUsers,
  //   updateUser,
  getUserById,
  FavPost,
  isFav,
  getUserFAv,
};
