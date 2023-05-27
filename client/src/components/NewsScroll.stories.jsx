import React from 'react';
import { action } from '@storybook/addon-actions';

import NewsScroll from './NewsScroll';

export default {
  title: 'Components/NewsScroll',
  component: NewsScroll,
};

const sampleJokes = [
  { id: 1, title: 'News Article 1', url: 'https://news.com/article/1' },
  { id: 2, title: 'News Article 2', url: 'https://news.com/article/2' },
  { id: 3, title: 'News Article 3', url: 'https://news.com/article/3' },
  { id: 4, title: 'News Article 4', url: 'https://news.com/article/4' },
  { id: 5, title: 'News Article 5', url: 'https://news.com/article/5' },
];

export const Default = () => (
  <NewsScroll
    jokes={sampleJokes}
    currentJoke={0}
    setCurrentJoke={action('setCurrentJoke')}
  />
);
