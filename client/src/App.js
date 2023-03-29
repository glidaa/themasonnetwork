import React,{useEffect,useState} from 'react';
import Navbar from './components/Navbar';
import { createTheme,ThemeProvider } from '@mui/material';
import axios from 'axios';
import JokeCard from './components/JokeCard';

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

  useEffect(()=>{
    axios.get('http://localhost:5000/jokes')
    .then((res)=>{
      setJokes(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[currentJoke])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <JokeCard joke={jokes[currentJoke]} setCurrentJoke={setCurrentJoke} currentJoke={currentJoke} maxJokes={jokes.length}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
