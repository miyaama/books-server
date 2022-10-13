const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const db = require("./models");

const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const collectionRouter = require("./routes/Collections");
app.use("/collections", collectionRouter);

// app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});
