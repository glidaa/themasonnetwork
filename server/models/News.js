const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    url:{
        type: String,
        required:true
    },
    imageUrl:{
        type: String,
        required:true
    },
    joke:{
        type: String,
        required:true
    },
    content:{
        type: String,
        
    },
    source:{
        type: String,
        
    },
    publishedAt:{
        type: String,
        
    }
} , {timestamps:true});

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;