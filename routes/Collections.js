const express = require("express");
const router = express.Router();
const { Collections } = require("../models");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const collection = await Collections.findAll({ where: { userId: userId } });
  res.json(collection);
});

router.post("/", async (req, res) => {
  const { name, tags } = req.body;
  await Collections.create({ name, tags });
  res.json("SUCCESS");
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
