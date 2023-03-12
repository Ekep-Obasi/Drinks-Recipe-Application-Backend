const express = require("express");
const Ingredient = require("../database/Ingredient");
const router = express.Router();

router.get("/", async (req, res) => {
  const ingredients = await Ingredient.findAll();
  res.status(200).send(ingredients);
});

router.post("/", async (req, res) => {
  const Ingredient = await Ingredient.create(req.body);
  res.status(200).send(Ingredient);
});

router.get("/:id", async (req, res) => {
  const Ingredient = await Ingredient.findByPk(req.params.id);
  res.status(200).send(Ingredient);
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    await Ingredient.update(req.body, { where: { id: req.params.id } });
    const Ingredient = await Ingredient.findByPk(req.params.id);
    res.status(200).send(Ingredient);
  }
  res.status(500).send({ message: "validation error" });
});

router.patch("/:id", async (req, res) => {
  await Ingredient.update(req.body, { where: { id: req.params.id } });
  const Ingredient = await Ingredient.findByPk(req.params.id);
  res.status(200).send(Ingredient);
});

router.delete("/:id", async (req, res) => {
  await Ingredient.destroy({ where: { id: req.params.id } });
  res.status(200).send({ status: "success" });
});

module.exports = router;
