import React from 'react';
import Box from '@mui/material/Box';

const NewsScrollItem = ({ joke, setCurrentJoke, currentJoke, index }) => {
  const handleSelect = () => {
    setCurrentJoke(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: 300,
        padding: 2,
        margin: 2,
        boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'transform 0.5s ease',
        '&:hover': {
          transform: 'translateX(-10px)',
        },
      }}
      onClick={handleSelect}
    >
      <h3>{joke.title}</h3>
      <p>{joke.description}</p>
      <p>{joke.joke}</p>
    </Box>
  );
};

export default NewsScrollItem;
