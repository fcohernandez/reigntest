import React, {useEffect, useState} from 'react';
import './App.css';
import { useInfiniteQuery } from '@tanstack/react-query'

import SelectorButton from "./components/SelectorButton";
import News from "./components/News";
import SelectInput from "./components/SelectInput";
import {getNews, New} from "./services";

function App() {
  const [faves, setFaves] = useState(JSON.parse(localStorage.getItem('faves') || '[]'))
  const [showFaves, setShowFaves] = useState(false);
  const [selectedOption, setSelectedOption] = useState(JSON.parse(localStorage.getItem('option') || '0'))

  const selectOptions = [
    "Select your News",
    "Angular",
    "Reactjs",
    "Vuejs"
  ];

  const {
    data: newsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery(
    ['news'],
    ({pageParam = 0}) => getNews({page: pageParam, search: selectOptions[selectedOption]}),
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
        return null;
      })
      return null;
    })
    return list;
  }

  const news = getNewsList(newsData);

  useEffect(() => {
    news.map((article: New) => {
      faves.map((articleFav: New) => {
        if(article.created_at === articleFav.created_at)
          article.fav = true;
        return null;
      })
      return null;
    })
  }, [faves, showFaves, news]);

  useEffect(() => {
    if(selectedOption > 0)
      refetch();
  }, [selectedOption, refetch])

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
        <SelectInput
          optionsList={selectOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className="News-container">
        <News news={showFaves ? faves : news} setFave={setFaves}/>
      </div>
    </div>
  );
}

export default App;
