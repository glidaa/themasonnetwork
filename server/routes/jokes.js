const express = require("express");
const {getAllJokes} = require("../controllers/jokes.js");

const router = express.Router();

router.get("/", getAllJokes);

module.exports = router;