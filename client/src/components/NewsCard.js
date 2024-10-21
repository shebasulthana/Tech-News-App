import React, { useState, useEffect } from 'react';
import '../App.css';

function NewsCard(props) {

  const [isSaved, setIsSaved] = useState(false);

  // Check if the article is already saved when the component mounts
  useEffect(() => {
    if (props.savedArticles && props.savedArticles.some(article => article.url === props.url)) {
      setIsSaved(true); // If the article is in the savedArticles list, mark it as saved
    }
  }, [props.savedArticles, props.url]); // Dependencies: check when savedArticles or url changes

  const handleSaveArticle = async () => {
    try {
      const response = await fetch('/save-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: props.title,
          url: props.url,
          urlToImage: props.urlToImage,
          description: props.description,
          publishedAt: props.publishedAt
        })
      });

      const data = await response.json();
      if (response.status === 201) {
        alert(data.message); // Article saved
        setIsSaved(true); // Update state to indicate the article has been saved
      } else {
        alert(data.message); // Error message
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleClick = () => {
    window.open(props.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* <div className="card dev-card my-3" alt="">
        <img src={props.urlToImage} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <a href={props.url} className="readmore">Read More</a>
          </div>
      </div> */}

      {/* <div className="article-card" onClick={handleClick}>
      <img src={props.urlToImage} className="article-img" alt={props.title} />
      <div className="article-content">
        <a href={props.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          <h5>{props.title}</h5>
        </a>
        <p>{props.description}</p>
        <button onClick={handleSaveArticle}>Save </button>
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="readmore-link" onClick={(e) => e.stopPropagation()}>
        </a>
      </div>
    </div> */}

<div className="article-card" onClick={handleClick}>
      <img src={props.urlToImage} className="article-img" alt={props.title} />
      <div className="article-content">
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        <a href={props.url} target="_blank" rel="noopener noreferrer"> </a>
        <i
          className={`fas fa-bookmark save-icon ${isSaved ? 'saved' : ''}`}E
          onClick={handleSaveArticle}
          style={{ cursor: 'pointer', fontSize: '24px', color: isSaved ? 'yellow' : 'black' }} // Change color based on saved state
        ></i>
      </div>
    </div>



    </>
  )
}




export default NewsCard