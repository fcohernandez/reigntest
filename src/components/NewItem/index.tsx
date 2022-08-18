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
    article.fav = true;
    articles.push(article);
    localStorage.setItem('faves', JSON.stringify(articles));
    setFave(articles);
  }
  return(
    <div className="NewItem-container">
      <div className="NewItem-info-container">
        <div className="Date-info-container">
          <img src='./clock-icon.svg' alt="clock-icon" className="Clock-icon" />
          <span className="Date-text">{created_at}{author}</span>
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