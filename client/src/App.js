import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material';
import JokeCard from './components/JokeCard';
import Footer from './components/Footer';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { listJokes } from './graphql/queries';
import NewsScroll from './components/NewsScroll';
import NewsScrollItem from './components/NewsScrollItem';


Amplify.configure(awsconfig);

function App() {
  const [jokes, setJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState(0);
  const theme = createTheme({
    typography: {
      fontFamily: ['Roboto Mono', 'monospace'],
    },
  });

  const fetchJokes = async () => {
    try {
      const jokesData = await API.graphql(graphqlOperation(listJokes));
      setJokes(jokesData.data.listJokes.items);
    } catch (error) {
      console.log('error on fetching jokes', error);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const handleSetCurrentJoke = (joke) => {
    console.log('Setting current joke to:', joke);
    setCurrentJoke(joke);
  };

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ThemeProvider theme={theme}>
        <Navbar />
        <NewsScroll
          jokes={jokes}
          setCurrentJoke={handleSetCurrentJoke}
          currentJoke={currentJoke}
        >
          {jokes.map((joke) => (
            <NewsScrollItem key={joke.id} joke={joke} />
          ))}
        </NewsScroll>
        <JokeCard
          joke={jokes[currentJoke]}
          setCurrentJoke={handleSetCurrentJoke}
          currentJoke={currentJoke}
          maxJokes={jokes.length}
        />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
