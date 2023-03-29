const axios = require("axios");
const News = require("../models/News.js");

const getAllJokes = async (req, res, next) => {
    try {
        const jokes = await News.find();
        res.status(200).json(jokes);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


module.exports ={
    getAllJokes
}