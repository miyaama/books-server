const express = require("express");
const router = express.Router();
const { Collections, Items } = require("../models");

router.get("/largest", async (req, res) => {
  const collections = await Collections.findAll({ include: [Items] });
  collections.sort(
    (prev, next) => next.dataValues.Items.length - prev.dataValues.Items.length
  );
  const largest = collections.slice(0, 4);
  res.send(largest);
});

router.get("/byuser/:UserId", async (req, res) => {
  const UserId = req.params.UserId;
  const collection = await Collections.findAll({ where: { UserId: UserId } });
  res.json(collection);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const collection = await Collections.findAll({ where: { id: id } });
  res.json(collection);
});

router.post("/", async (req, res) => {
  const { name, description, theme, image, itemTypes, UserId } = req.body;
  const newCollection = await Collections.create({
    name,
    description,
    theme,
    image,
    itemTypes,
    UserId,
  });
  res.send(newCollection);
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const { name, description, theme, image, itemTypes } = req.body;

  try {
    await Collections.update(
      {
        name: name,
        description: description,
        theme: theme,
        image: image,
        itemTypes: itemTypes,
      },
      { where: { id: id } }
    );
    res.status(200);
    res.send("Ok");
  } catch (error) {
    res.status(500);
    res.send("Failed");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Collections.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED");
});

module.exports = router;
