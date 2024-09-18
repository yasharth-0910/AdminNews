import axios from 'axios';

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

// Function to fetch articles based on query
export const fetchArticles = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        q: query,
        apiKey: API_KEY,
        // You can add other optional parameters here if needed
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
