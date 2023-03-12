const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../utils/constants");

function createToken(data) {
  return jwt.sign({ data }, { expiresIn: "24h" }, JWT_PRIVATE_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_PRIVATE_KEY);
}

module.exports = { createToken, verifyToken };
