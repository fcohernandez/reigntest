import React from 'react';
import './styles.css';

function SelectorButton() {
  return(
    <div className="Selector-container">
      <button className="Button-active">
        <span className="Button-text">All</span>
      </button>
      <button className="Button">
        <span className="Button-text">My Faves</span>
      </button>
    </div>
  )
}

export default SelectorButton;