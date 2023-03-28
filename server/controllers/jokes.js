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
            organization: process.env.CHAT_GPT_ORG_ID,
            apiKey: process.env.CHAT_GPT_API_KEY,
        })
        
        const openai = new OpenAIApi(config);

        const chatGPTResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "Create a funny headline based on the news : " + response.data.articles[0].title}],
            max_tokens: 20,
            temperature: 0.7,
        })
        
        
        res.status(200).json({ message: chatGPTResponse.data.choices[0].message.content });
    } catch (error) {
        
        res.status(500).json({ message: error });
    }
}


module.exports ={
    getJoke
}