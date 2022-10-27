const express = require("express");
const router = express.Router();
const { Likes } = require("../models");

router.post("/", async (req, res) => {
  const { ItemId, UserId } = req.body;

  const found = await Likes.findOne({
    where: { ItemId: ItemId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ ItemId: ItemId, UserId: UserId });
    res.send({ liked: true });
  } else {
    await Likes.destroy({
      where: { ItemId: ItemId, UserId: UserId },
    });
    res.send({ liked: false });
  }
});

module.exports = router;
