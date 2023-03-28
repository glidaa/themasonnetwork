const express = require("express");
const {getJoke} = require("../controllers/jokes.js");

const router = express.Router();

router.get("/", getJoke);

module.exports = router;