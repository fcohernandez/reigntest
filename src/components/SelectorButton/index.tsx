import React from 'react';
import './styles.css';

interface Props {
  showFaves: boolean;
  setShowFaves: any;
}

function SelectorButton({showFaves, setShowFaves}: Props) {
  return(
    <div className="Selector-container">
      <button className={`Button${showFaves ? '' : '-active'}`} onClick={() => setShowFaves(false)}>
        <span className="Button-text">All</span>
      </button>
      <button className={`Button${showFaves ? '-active' : ''}`} onClick={() => setShowFaves(true)}>
        <span className="Button-text">My Faves</span>
      </button>
    </div>
  )
}

export default SelectorButton;