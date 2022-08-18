import React from 'react';
import './styles.css';

type NewItemProps = {
  text: string;
};

function NewItem ({text}: NewItemProps) {
  return(
    <div className="NewItem-container">
      <div className="NewItem-info-container">
        <div className="Date-info-container">
          <img src='./clock-icon.svg' alt="clock-icon" className="Clock-icon" />
          <span className="Date-text">2 hours ago by author</span>
        </div>
        <span className="Info-text">Realize for React for Visualizing State ﬂow and component hierarchy</span>
      </div>
      <div className="Fave-container">
        <div className="Hearth-icon"></div>
      </div>
    </div>
  )
}

export default NewItem;