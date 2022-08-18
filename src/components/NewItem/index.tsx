import React from 'react';
import './styles.css';
import {New} from "../../services";

type NewItemProps = {
  article: New;
  setFave: any;
};

function NewItem ({article, setFave}: NewItemProps) {
  const {author, story_title, story_url, created_at, fav} = article;
  const setFaveArticle = () => {
    let articles = JSON.parse(localStorage.getItem('faves') || '[]');
    if(article.fav){
      article.fav = false;
      articles = articles.filter((item: New) => item.created_at !== article.created_at)
    } else {
      article.fav = true;
      articles.push(article);
    }
    setFave(articles);
    localStorage.setItem('faves', JSON.stringify(articles));
  }
  return(
    <div className="NewItem-container" id={story_url}>
      <div className="NewItem-info-container">
        <div className="Date-info-container">
          <img src='./clock-icon.svg' alt="clock-icon" className="Clock-icon" />
          <span className="Date-text">{created_at} by {author}</span>
        </div>
        <span className="Info-text">{story_title}</span>
      </div>
      <div className="Fave-container">
        <div className={`Hearth-icon${fav ? '-active' : ''}`} onClick={setFaveArticle}></div>
      </div>
    </div>
  )
}

export default NewItem;