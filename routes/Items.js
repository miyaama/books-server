const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Items, Collections, Likes, Tags, Users } = require("../models");

router.get("/bycollection/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;

  let items = await Items.findAll({
    where: { CollectionId: collectionId },
    include: [Likes],
  });

  const collection = await Collections.findAll({ where: { id: collectionId } });
  res.send({ collection, items });
});

router.get("/bytag/:tag", async (req, res) => {
  const tag = req.params.tag;
  const items = await Items.findAll({
    where: {
      tags: {
        [Op.substring]: tag,
      },
    },
  });
  res.send(items);
});

router.get("/lastitems", async (req, res) => {
  const items = await Items.findAll({ order: [["id", "DESC"]] });
  const lastItems = items.slice(0, 5);
  const result = await Promise.all(
    lastItems.map(async (item) => {
      const collection = await Collections.findOne({
        where: { id: item.dataValues.CollectionId },
      });

      const user = await Users.findOne({
        where: { id: collection.dataValues.UserId },
      });

      const tags = item.dataValues.tags.split(";");

      return {
        ...item.dataValues,
        tags,
        collectionName: collection.dataValues.name,
        userName: user.dataValues.username,
      };
    })
  );

  res.send(result);
});

router.post("/", async (req, res) => {
  const { name, tags, image, CollectionId } = req.body;

  try {
    let tagsIds = await tags.reduce(async (accP, tag) => {
      let acc = await accP;
      let currentTag = await Tags.findOne({ where: { name: tag } });
      if (currentTag) {
        acc = [...acc, currentTag.dataValues.name];
      } else {
        const newTag = await Tags.create({ name: tag });
        acc = [...acc, newTag.dataValues.name];
      }
      return acc;
    }, Promise.resolve([]));

    const item = await Items.create({
      name,
      tags: tagsIds,
      image,
      CollectionId,
    });

    res.status(200);
    res.send(item);
  } catch (error) {
    res.status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Items.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED");
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, tags, image } = req.body;

  try {
    let tagsIds = await tags.reduce(async (accP, tag) => {
      let acc = await accP;
      let currentTag = await Tags.findOne({ where: { name: tag } });
      if (currentTag) {
        acc = [...acc, currentTag.dataValues.name];
      } else {
        const newTag = await Tags.create({ name: tag });
        acc = [...acc, newTag.dataValues.name];
      }
      return acc;
    }, Promise.resolve([]));

    await Items.update({ name: name, tags: tagsIds }, { where: { id: id } });
    res.status(200);
    res.send("Ok");
  } catch (error) {
    res.status(500);
    res.send("Failed");
  }
});

module.exports = router;
