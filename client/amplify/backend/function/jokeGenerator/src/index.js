
// This is sample code. Please update this to suite your schema
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_THEMASONNETWORK_GRAPHQLAPIIDOUTPUT
	API_THEMASONNETWORK_GRAPHQLAPIENDPOINTOUTPUT
	API_THEMASONNETWORK_GRAPHQLAPIKEYOUTPUT
	REACT_APP_CHAT_GPT_API_KEY
	REACT_APP_NEWS_API_KEY
	REACT_APP_CHAT_GPT_ORG_ID
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const { API, graphqlOperation } = require("aws-amplify");

exports.handler = async (event) => {
    const chatGPTAPIKey = process.env.REACT_APP_CHAT_GPT_API_KEY;
    const newsAPIKey = process.env.REACT_APP_NEWS_API_KEY;
    const chatGPTOrgID = process.env.REACT_APP_CHAT_GPT_ORG_ID;
    const graphqlEndpoint = process.env.API_THEMASONNETWORK_GRAPHQLAPIENDPOINTOUTPUT;
    const graphqlAPIKey = process.env.API_THEMASONNETWORK_GRAPHQLAPIKEYOUTPUT;
  

  const listJokesQuery = `
  query ListJokes($filter: ModelJokesFilterInput, $limit: Int, $nextToken: String) {
    listJokes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        author
        url
        imageUrl
        joke
        content
        source
        publishedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }`;

  
  const createJokesMutation = `
  mutation CreateJokes($input: CreateJokesInput!, $condition: ModelJokesConditionInput) {
    createJokes(input: $input, condition: $condition) {
      id
      title
      description
      author
      url
      imageUrl
      joke
      content
      source
      publishedAt
      createdAt
      updatedAt
    }
  }`;

const updateJokesMutation = `
  mutation UpdateJokes($input: UpdateJokesInput!, $condition: ModelJokesConditionInput) {
    updateJokes(input: $input, condition: $condition) {
      id
      title
      description
      author
      url
      imageUrl
      joke
      content
      source
      publishedAt
      createdAt
      updatedAt
    }
  }`;


  const createdJokes = [];

  try {
    console.log("Fetching news from news API...");
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
            country: "us",
            apiKey: newsAPIKey,
        },
    });

    // Log the entire response from the news API
    console.log("News API response:", JSON.stringify(response.data, null, 2));
    
    // ... rest of your code ...

} catch (error) {
    console.error("Error generating jokes:", error);
}

    const jokesDataResponse = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": graphqlAPIKey,
        },
        body: JSON.stringify({
          query: listJokesQuery,
          variables: { limit: 1000 },
        }),
      });
      const jokesData = await jokesDataResponse.json();
       console.log('jokesData:', jokesData);


    const filteredNews = response.data.articles.filter((article) => {
      return !jokesData.data.listJokes.items.some(
        (news) => news.url === article.url
      );
    });

    const config = new Configuration({
      organization: chatGPTOrgID,
      apiKey: chatGPTAPIKey,
    });

    const openai = new OpenAIApi(config);

    for (const article of filteredNews) {
        const chatGPTResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                "act as late night host and write a 20 word joke about this news : " +
                article.content,
            },
          ],
          max_tokens: 40,
          temperature: 0.7,
        });
  
        const fullJoke = chatGPTResponse.data.choices[0].message.content;
        console.log("Full joke:", fullJoke);
  
        const joke = {
          title: article.title || "undefined",
          author: article.author || "undefined",
          description: article.description || "undefined",
          url: article.url || "undefined",
          imageUrl: article.urlToImage || "undefined",
          joke: fullJoke,
          content: article.content || "undefined",
          source: article.source.name || "undefined",
        };
  
        await fetch(graphqlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": graphqlAPIKey,
          },
          body: JSON.stringify({
            query: createJokesMutation,
            variables: { input: joke },
          }),
        });
        
        createdJokes.push({ joke: joke.joke, url: joke.url });
      }
    } catch (error) {
      console.error("Error generating jokes:", error);
    }
  
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ jokes: createdJokes }),
    };
  
    return response;
  };
  
