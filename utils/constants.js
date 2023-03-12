const API_BASE_URL = process.env.API_BASE_URL;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

module.exports = { API_BASE_URL, SALT_ROUNDS, JWT_PRIVATE_KEY };
