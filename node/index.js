require("dotenv").config();
require("./db");
const express = require("express");
const postRouter = require("./routers/Post.router");
const userRouter = require("./routers/User.router");

// const imageRouter = require("./routers/Image.router");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World from node!");
// });

app.use(`${process.env.API_URL}post`, postRouter);

app.use(`${process.env.API_URL}user`, userRouter);
// app.use(`${process.env.API_URL}upload`, imageRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port} ....`);
});
