const express = require("express");
const router = express.Router();
const { Tags } = require("../models");

router.get("/", async (req, res) => {
    const listOfTags = await Tags.findAll();
    res.send(listOfTags);
  });
  
//   router.post("/", async (req, res) => {
//     const { name, ItemId } = req.body;
//     const tag = await Tags.findOne({ where: { name: name } });

//     if(!tag) {

//     }
//     const newTag = await Tags.create({
//       name,
//       ItemId,
//     });
//     res.send(newTag);
//   });

module.exports = router;