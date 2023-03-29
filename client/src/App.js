import React,{useEffect,useState} from 'react';
import Navbar from './components/Navbar';
import { createTheme,ThemeProvider } from '@mui/material';
import axios from 'axios';
import JokeCard from './components/JokeCard';
import Footer from './components/Footer';

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
