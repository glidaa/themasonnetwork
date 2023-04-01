import React,{useEffect,useState} from 'react';
import Navbar from './components/Navbar';
import { createTheme,ThemeProvider } from '@mui/material';
import axios from 'axios';
import JokeCard from './components/JokeCard';
import Footer from './components/Footer';
import {Amplify,API,graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import { listJokes } from './graphql/queries';
import {Configuration,OpenAIApi} from "openai";
import { createJokes } from './graphql/mutations';


Amplify.configure(awsconfig);


function App() {
  
  const [jokes,setJokes] = useState([]);
  const [currentJoke,setCurrentJoke] = useState(0);
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto Mono', "monospace"
      ]
    }
  })

  const makeJokes = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
            country: 'us',
            apiKey: "87d20ce947664190842c86b1a342b974"
        }
    });

    const jokesData = await API.graphql(graphqlOperation(listJokes));

    const filteredNews = response.data.articles.filter((article)=>{
      return !jokesData.data.listJokes.items.some((news)=>news.url === article.url);
    })

    const config = new Configuration({
      organization: "org-L7rUZivumBoXlhKNLqk3gkZA",
      apiKey: "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",
    })

    const openai = new OpenAIApi(config);

    filteredNews.map(async (article)=>{
      const chatGPTResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": "Create a funny headline based on the news : " + article.title }],
          max_tokens: 20,
          temperature: 0.7,
      })
      
      //add document in dynamoDB
      const joke = {
        title:article.title  || "undefined",
        author:article.author || "undefined",
        description:article.description || "undefined",
        url:article.url || "undefined",
        imageUrl:article.urlToImage || "undefined",
        joke:chatGPTResponse.data.choices[0].message.content,
        content:article.content || "undefined",
        source:article.source.name || "undefined",
      }
      
      await API.graphql(graphqlOperation(createJokes, {input: joke}));


    })

    } catch (error) {
      
    }

  }

  const fetchJokes = async () => {
    try {
      const jokesData = await API.graphql(graphqlOperation(listJokes));
      await setJokes( jokesData.data.listJokes.items);
    } catch (error) {
      console.log('error on fetching jokes',error)
    }
  }

  

  useEffect(()=>{
    fetchJokes(); 
    makeJokes();
    

  },[])

  return (
    <div className="App" style={{height:"100vh",backgroundImage:`url(${jokes[currentJoke]?.imageUrl})`,backgroundSize:"cover",backgroundPosition:"center"}}>
      <ThemeProvider theme={theme}>
        <div style={{}}></div>
        <Navbar />
        <JokeCard joke={jokes[currentJoke]} setCurrentJoke={setCurrentJoke} currentJoke={currentJoke} maxJokes={jokes.length}/>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
