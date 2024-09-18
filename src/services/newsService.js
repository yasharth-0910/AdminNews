import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchArticles = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        apiKey: API_KEY,
        language: 'en',
      },
      headers: {
        'X-Api-Key': API_KEY,
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    return [];
  }
};
