import React, {useEffect, useState} from 'react';
import './App.css';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query'

import SelectorButton from "./components/SelectorButton";
import News from "./components/News";
import SelectInput from "./components/SelectInput";
import {getNews, New} from "./services";

function App() {
  const [faves, setFaves] = useState(JSON.parse(localStorage.getItem('faves') || '[]'))
  const [showFaves, setShowFaves] = useState(false);

  const {
    data: newsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['news'],
    ({pageParam = 0}) => getNews({page: pageParam, search:'reactjs'}),
    {
      refetchOnWindowFocus: false
    }
  );

  const getNewsList = (queryData: any) => {
    let list = queryData?.pages ? queryData.pages.reduce((acum: any, curr: any) => [...acum, ...curr.hits], []) : [];
    list.map((article: New) => {
      faves.map((articleFav: New) => {
        if(article.created_at === articleFav.created_at)
          article.fav = true;
      })
    })
    return list;
  }

  const news = getNewsList(newsData);

  useEffect(() => {
    news.map((article: New) => {
      faves.map((articleFav: New) => {
        if(article.created_at === articleFav.created_at)
          article.fav = true;
      })
    })
  }, [faves, showFaves]);
  return (
    <div className="App">
      <header>
        <div className="Header-container">
          <p className="Header-text">HACKER NEWS</p>
        </div>
      </header>
      <div className="Selector-container">
        <SelectorButton showFaves={showFaves} setShowFaves={setShowFaves}/>
      </div>
      <div className="Select-container">
        <SelectInput />
      </div>
      <div className="News-container">
        <News news={showFaves ? faves : news} setFave={setFaves}/>
      </div>
    </div>
  );
}

export default App;
