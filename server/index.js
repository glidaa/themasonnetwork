const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jokesRouter = require("./routes/jokes.js");
const mongoose = require("mongoose");
const cron = require("node-cron");
const News = require("./models/News.js");
const axios = require("axios");
const {Configuration,OpenAIApi} = require("openai");

//server config
const app = express();
dotenv.config();

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/jokes", jokesRouter);

//cron job
cron.schedule("0 * * * *", async() => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                apiKey: process.env.NEWS_API_KEY
            }
        });

        const savedNews = await News.find();
        
        const filteredNews = response.data.articles.filter((article)=>{
            return !savedNews.some((news)=>news.url === article.url);
        })

        const config = new Configuration({
            organization: process.env.CHAT_GPT_ORG_ID,
            apiKey: process.env.CHAT_GPT_API_KEY,
        })
        
        const openai = new OpenAIApi(config);

        filteredNews.map(async (article)=>{
            const chatGPTResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": "Create a funny headline based on the news : " + article.title }],
                max_tokens: 20,
                temperature: 0.7,
            })
            
            const news = new News({
                title:article.title  || "undefined",
                author:article.author || "undefined",
                description:article.description || "undefined",
                url:article.url || "undefined",
                imageUrl:article.urlToImage || "undefined",
                joke:chatGPTResponse.data.choices[0].message.content,
                content:article.content || "undefined",
                source:article.source.name || "unfined",
                publishedAt:article.publishedAt || "undefined"
            })
            news.save();
        })
    } catch (error) {
        console.log(error);
    }
});

//connect to db
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("Server running on port " + process.env.PORT);
    });
})
