const express = require("express");
const Glass = require("../database/glass");
const router = express.Router();

router.get("/", async (req, res) => {
  const glasses = await Glass.findAll();
  res.status(200).send(glasses);
});

router.post("/", async (req, res) => {
  const glass = await Glass.create(req.body);
  res.status(200).send(glass);
});

router.get("/:id", async (req, res) => {
  const glass = await Glass.findByPk(req.params.id);
  res.status(200).send(glass);
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;
  if (name) {
    await Glass.update(req.body, { where: { id: req.params.id } });
    const glass = await Glass.findByPk(req.params.id);
    res.status(200).send(glass);
  }
  res.status(500).send({ message: "validation error" });
});

router.patch("/:id", async (req, res) => {
  await Glass.update(req.body, { where: { id: req.params.id } });
  const glass = await Glass.findByPk(req.params.id);
  res.status(200).send(glass);
});

router.delete("/:id", async (req, res) => {
  await Glass.destroy({ where: { id: req.params.id } });
  res.status(200).send({ status: "success" });
});

module.exports = router;
