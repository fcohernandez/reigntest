import React from 'react';
import './styles.css';
import {New} from "../../services";

type NewItemProps = {
  article: New;
  setFave: any;
};

let DateDiff = {

  inHours: function(d1: Date, d2: Date) {
    const hours = Math.abs(d1.getTime() - d2.getTime()) / 36e5;
    return Math.round(hours);
  },

  inDays: function(d1: Date, d2: Date) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return Math.floor((t2-t1)/(24*3600*1000));
  },

  inWeeks: function(d1: Date, d2: Date) {
    let t2: number = d2.getTime();
    let t1: number = d1.getTime();

    return parseInt(String((t2 - t1) / (24 * 3600 * 1000 * 7)));
  },

  inMonths: function(d1: Date, d2: Date) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d2M+12*d2Y)-(d1M+12*d1Y);
  },

  inYears: function(d1: Date, d2: Date) {
    return d2.getFullYear()-d1.getFullYear();
  }
}

function NewItem ({article, setFave}: NewItemProps) {
  const {author, story_title, story_url, created_at, fav} = article;
  const setFaveArticle = () => {
    let articles = JSON.parse(localStorage.getItem('faves') || '[]');
    if(article.fav){
      article.fav = false;
      articles = articles.filter((item: New) => item.objectID !== article.objectID)
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
          <span className="Date-text">{DateDiff.inHours(new Date(), new Date(created_at))} hours ago by {author}</span>
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