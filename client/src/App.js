import React, { useEffect, useState } from 'react';
import {
  createTheme,
  ThemeProvider,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import axios from 'axios';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { listJokes } from './graphql/queries';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'jokes',
        endpoint: process.env.REACT_APP_API_URL,
        region: process.env.REACT_APP_REGION,
      },
    ],
  },
});

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
      await setJokes(jokesData.data.listJokes.items);
    } catch (error) {
      console.log('error on fetching jokes', error);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="App" style={{ height: '100vh', backgroundColor: 'white' }}>
      <ThemeProvider theme={theme}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <Grid container justifyContent="center">
            <Grid item xs={4} sx={{ transform: 'translateX(-20%)' }}>
              <Typography variant="h6" sx={{ cursor: 'pointer' }}>
                Link 1
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ transform: 'translateX(0%)' }}>
              <Typography variant="h6" sx={{ cursor: 'pointer' }}>
                Link 2
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ transform: 'translateX(20%)' }}>
              <Typography variant="h6" sx={{ cursor: 'pointer' }}>
                Link 3
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: '10vh' }}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '80vh',
            }}
          >
            <CardContent sx={{ cursor: 'pointer' }}>
              <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
                {jokes[currentJoke]?.joke}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image={jokes[currentJoke]?.imageUrl}
              sx={{ height: '50%' }}
            />
            <CardContent sx={{ cursor: 'pointer' }}>
              <Typography variant="h6">{jokes[currentJoke]?.title}</Typography>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
