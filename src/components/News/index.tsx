import React from 'react';
import NewItem from "../NewItem";
import './styles.css';
import {New} from "../../services";

type News = {
  news: New[];
  setFave: any;
}

function News({news,setFave}: News) {
  return(
    <div className="Container">
      {
        news.map(article => {
          if(article.story_url && article.story_url && article.created_at && article.author)
            return <NewItem article={article} key={article.created_at} setFave={setFave}/>
        })
      }
    </div>
  )
}

export default News;