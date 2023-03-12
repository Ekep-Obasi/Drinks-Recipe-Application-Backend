const express = require("express");
const Category = require("../database/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.status(200).send(categories);
});

router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.status(200).send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    await Category.update(req.body, { where: { id: req.params.id } });
    const categoryUpdated = await Category.findByPk(req.params.id);
    res.status(200).send(categoryUpdated);
  }
  res.status(500).send({ message: "validation error" });
});

router.patch("/:id", async (req, res) => {
  await Category.update(req.body, { where: { id: req.params.id } });
  const categoryUpdated = await Category.findByPk(req.params.id);
  res.status(200).send(categoryUpdated);
});

router.delete("/:id", async (req, res) => {
  await Category.destroy({ where: { id: req.params.id } });
  res.status(200).send({ status: "success" });
});

module.exports = router;
