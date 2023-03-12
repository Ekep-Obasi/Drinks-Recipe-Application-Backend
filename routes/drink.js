const express = require("express");
const Drink = require("../database/drink");
const router = express.Router();

router.get("/", async (req, res) => {
  const drinks = await Drink.findAll();
  res.status(200).send(drinks);
});

router.post("/", async (req, res) => {
  const drink = await Drink.create(req.body);
  res.status(200).send(drink);
});

router.get("/:id", async (req, res) => {
  const drink = await Drink.findByPk(req.params.id);
  res.status(200).send(drink);
});

router.put("/:id", async (req, res) => {
  const { name, description, imageUrl, recipe } = req.body;
  if (name && description && imageUrl && recipe) {
    await Drink.update(req.body, { where: { id: req.params.id } });
    const drink = await Drink.findByPk(req.params.id);
    res.status(200).send(drink);
  }
  res.status(500).send({ message: "validation error" });
});

router.patch("/:id", async (req, res) => {
  await Drink.update(req.body, { where: { id: req.params.id } });
  const drink = await Drink.findByPk(req.params.id);
  res.status(200).send(drink);
});

router.delete("/:id", async (req, res) => {
  await Drink.destroy({ where: { id: req.params.id } });
  res.status(200).send({ status: "success" });
});

module.exports = router;
