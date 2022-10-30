const express = require("express");
const router = express.Router();
const { Tags } = require("../models");

router.get("/", async (req, res) => {
  const listOfTags = await Tags.findAll();
  res.send(listOfTags);
});

module.exports = router;
