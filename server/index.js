const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jokesRouter = require("./routes/jokes.js");

const app = express();
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/jokes", jokesRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});