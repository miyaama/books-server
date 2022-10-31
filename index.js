const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const db = require("./models");

const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const collectionRouter = require("./routes/Collections");
app.use("/collections", collectionRouter);

const itemRouter = require("./routes/Items");
app.use("/items", itemRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const likeRouter = require("./routes/Likes");
app.use("/likes", likeRouter);

const tagRouter = require("./routes/Tags");
app.use("/tags", tagRouter);


db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});
