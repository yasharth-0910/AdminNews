import axios from 'axios';

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

// Function to fetch articles based on category
export const fetchArticles = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}?category=${category}&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
