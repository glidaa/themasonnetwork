const axios = require("axios");
const {Configuration,OpenAIApi} = require("openai");

const getJoke = async (req, res, next) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                apiKey: process.env.NEWS_API_KEY
            }
        });

        const config = new Configuration({
            apiKey: process.env.CHAT_GPT_API_KEY,
        })
        
        const openai = new OpenAIApi(config);

        const chatGPTResponse = await openai.createCompletion({
            model:"gpt-3.5-turbo",
            prompt: "Create a funny headline based on the news: \"bitcoin is flling \"",
            max_tokens: 20,
            temperature: 0.7,
        })

        res.status(200).json({ message: chatGPTResponse });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


module.exports ={
    getJoke
}