const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});

router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});

router.post("/register", async (req, res) => {
  const {
    email,
    password,
    username,
    status = "active",
    access = "user",
  } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (user) {
    res.send({ message: "E-mail is already used" });
  } else {
    bcrypt.hash(password, 10).then(async (hash) => {
      const newUser = await Users.create({
        email,
        password: hash,
        username,
        status,
        access,
      });
      res.send(newUser);
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.send({ message: "Wrong email/password" });
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.send({ message: "Wrong email/password" });
    }
    res.send(user);
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Users.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED");
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const { status, type } = req.body;
  Users.update({ [type]: status }, { where: { id: id } });
});

module.exports = router;
