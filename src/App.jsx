import React, { useState, useEffect } from 'react';
import { fetchArticles } from './services/newsService';

const categories = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology',
  'world', 'politics', 'economy', 'environment', 'culture', 'education', 'travel',
  'food', 'lifestyle', 'opinion'
];

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedArticles, setDisplayedArticles] = useState(10);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const fetchedArticles = await fetchArticles(category);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, [category]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setDisplayedArticles(prev => prev + 10);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex-1">
              <h1 className="text-3xl font-serif font-bold text-gray-900">AdminNews</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              {categories.slice(0, 7).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-sm font-medium ${category === cat ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-64 mb-4 sm:mb-0">
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredArticles.slice(0, displayedArticles).map((article, index) => (
                <article key={index} className="border-b border-gray-200 pb-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {article.urlToImage && (
                      <div className="md:col-span-1">
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className={`${article.urlToImage ? 'md:col-span-2' : 'md:col-span-3'}`}>
                      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(article.publishedAt)} | {article.author || 'Unknown Author'}
                      </p>
                      <p className="text-gray-700 mb-4">{article.description}</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Read full article
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredArticles.length > displayedArticles && (
            <div className="text-center mt-10">
              <button
                onClick={handleShowMore}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Load More Articles
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">About AdminNews</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Categories</h3>
              <ul className="mt-4 space-y-4">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Social</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="https://www.linkedin.com/in/yasharth-singh-b2493b284/" className="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
                <li><a href="https://x.com/Yash_mera_naam" className="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
                <li><a href="https://github.com/yasharth-0910" className="text-base text-gray-500 hover:text-gray-900">Github</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 AdminNews. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;