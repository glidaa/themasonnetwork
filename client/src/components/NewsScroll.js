import React, { useState, useRef } from 'react';
import NewsScrollItem from './NewsScrollItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  scrollContainer: {
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& > div': {
      flexShrink: 0,
    },
  },
});

const NewsScroll = ({ jokes, setCurrentJoke, currentJoke }) => {
  const classes = useStyles();
  const [scrolling, setScrolling] = useState(true);
  const containerRef = useRef(null);

  const handleSelect = (joke) => {
    setCurrentJoke(joke);
  };

  const handleMouseEnter = () => {
    setScrolling(false);
  };

  const handleMouseLeave = () => {
    setScrolling(true);
  };

  const handleAnimationEnd = (e) => {
    // If we're at the end of the scroll, reset to the start
    if (e.target.scrollLeft === e.target.scrollWidth - e.target.clientWidth) {
      e.target.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={classes.scrollContainer} ref={containerRef}>
        {jokes &&
          jokes.map((joke) => (
            <NewsScrollItem
              key={joke.id}
              joke={joke}
              setCurrentJoke={setCurrentJoke}
              currentJoke={currentJoke}
            />
          ))}
      </div>
      {scrolling && (
        <style>
          {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .${classes.scrollContainer} > div {
            animation: scroll 20s linear infinite;
          }
        `}
        </style>
      )}
    </div>
  );
};

export default NewsScroll;
