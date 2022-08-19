import React, {useState, useEffect, useRef} from 'react';
import './styles.css';

function useOutsideAlerter(ref: any, setIsOptionsOpen: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOptionsOpen]);
}

interface Props {
  optionsList: any[];
  selectedOption: number;
  setSelectedOption: any;
}

const SelectInput = ({optionsList, selectedOption, setSelectedOption}: Props) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOptionsOpen);

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index: number) => {
    setSelectedOption(index);
    localStorage.setItem('option', JSON.stringify(index));
    setIsOptionsOpen(false);
  };

  const handleKeyDown = (index: number) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        setSelectedThenCloseDropdown(index);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: any) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : optionsList.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedOption(
          selectedOption === optionsList.length - 1 ? 0 : selectedOption + 1
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? "expanded" : ""}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}
        >
          {optionsList[selectedOption]}
        </button>
        <ul
          className={`options ${isOptionsOpen ? "show" : ""}`}
          role="listbox"
          aria-activedescendant={optionsList[selectedOption]}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {optionsList.map((option, index) => index !== 0 && (
            <li
              id={option}
              role="option"
              aria-selected={selectedOption === index}
              tabIndex={0}
              onKeyDown={handleKeyDown(index)}
              onClick={() => {
                setSelectedThenCloseDropdown(index);
              }}
              key={index}
            >
              <img src={`./${option.toLowerCase()}-icon.png`} alt="select-icon" className="Icon"/>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectInput;