import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

function News(props) {
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]); // New state for saved articles
  let [search, setsearch] = useState("");
  let [query, setquery] = useState(null);
  const [loading, setloading] = useState(true);

  const handleSearch = (e) => {
    search = e.target.value;
    setsearch(search);
  }

  const searchQuery = (e) => {
    e.preventDefault();
    query = search;
    setquery(query);
  }

  // Fetch the news articles
  useEffect(() => {
    const getNews = async () => {
      let url = `https://newsapi.org/v2/everything?q=${query ? query + " " + props.category : props.category || "technology"}&apiKey=330e87d7b7a04229acbf2a4de862c4e0`;
      try {
        setloading(true);
        const response = await fetch(url);
        const data = await response.json();

        // Remove Duplicate Articles Based on 'url'
        const uniqueArticles = data.articles.reduce((acc, current) => {
          if (!acc.find(article => article.url === current.url)) {
            acc.push(current);
          }
          return acc;
        }, []);

        const sortedArticles = uniqueArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setArticles(sortedArticles);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, [query, props.category]);

  // Fetch the saved articles for the current user
  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await fetch('/saved-articles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials for authenticated users
        });
        const data = await response.json();
        setSavedArticles(data); // Store the saved articles in state
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      }
    };

    fetchSavedArticles(); // Fetch saved articles on component mount
  }, []);

  return (
    <>
      <h1 className="news-title text-center mt-4">{props.category ? props.category.replace('-', ' ') : 'Top Stories'}</h1>
      <div className="container my-3">
        <form className="d-flex" role="search" onSubmit={searchQuery}>
          <input className="form-control me-2" type="search" placeholder="Search latest topics" aria-label="Search" value={search} onChange={handleSearch} />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div className="container-fluid mt-5 flex-wrap d-flex justify-content-evenly">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          articles.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              urlToImage={article.urlToImage}
              url={article.url}
              description={article.description}
              savedArticles={savedArticles} // Pass saved articles to NewsCard
            />
          ))
        )}
      </div>
    </>
  );
}

export default News;
