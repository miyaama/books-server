const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

router.get("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const comments = await Comments.findAll({ where: { ItemId: itemId } });
  res.send(comments);
});

router.post("/", async (req, res) => {
  const { comment, username, userId, ItemId} = req.body;
  const newComment = await Comments.create({
    comment,
    username,
    userId,
    ItemId,
  });
  res.send(newComment);
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
