import React from 'react';
import './App.css';
import SelectorButton from "./components/SelectorButton";
import News from "./components/News";
import SelectInput from "./components/SelectInput";

function App() {
  return (
    <div className="App">
      <header>
        <div className="Header-container">
          <p className="Header-text">HACKER NEWS</p>
        </div>
      </header>
      <div className="Selector-container">
        <SelectorButton />
      </div>
      <div className="Select-container">
        <SelectInput />
      </div>
      <div className="News-container">
        <News />
      </div>
    </div>
  );
}

export default App;
