import React from 'react';
import NewItem from "../NewItem";
import './styles.css';


function News() {
  return(
    <div className="Container">
      <NewItem text="1"/>
      <NewItem text="2"/>
      <NewItem text="3"/>
      <NewItem text="4"/>
      <NewItem text="5"/>
      <NewItem text="6"/>
    </div>
  )
}

export default News;