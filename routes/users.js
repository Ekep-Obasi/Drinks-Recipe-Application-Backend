const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../database/user");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { SALT_ROUNDS } = require("../utils/constants");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

router.post("/", (req, res) => {
  const { password, apiKey, ...others } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) res.status(300);
    const newUser = { ...others, apiKey: uuidv4(), password: hash };
    console.log(newUser);
    const user = await User.create(newUser);
    res.status(200).send(user);
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.status(200).send(user);
});

router.put("/:id", async (req, res) => {
  const { firstName, lastName, emailAddress, apiKey, password } = req.body;
  if (firstName && lastName && emailAddress && apiKey && password) {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  }
  res.status(500).send({ message: "validation error" });
});

router.patch("/:id", async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  const user = await User.findByPk(req.params.id);
  res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.status(200).send({ status: "success" });
});

module.exports = router;
