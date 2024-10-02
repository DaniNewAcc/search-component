import {
  faArrowRight,
  faClose,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import SuggestionsDropdown from './SuggestionsDropdown';

const DATA = [
  'First Suggestion',
  'Second Suggestion',
  'Third Suggestion',
  'Fourth Suggestion',
  'Fifth Suggestion',
  'Sixth Suggestion'
];

function SearchInput() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>(DATA);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  let searchBarWrapperClasses = 'bg-white relative z-0 w-[300px] shadow-lg';
  let labelClasses =
    'text-black font-semibold absolute left-3 px-1 z-10 align-middle';

  // function for handling keyboard events

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const { key } = e;

    if (key === 'ArrowDown' || key === 'Tab') {
      if (value.length > 0) {
        e.preventDefault();
        setActiveSuggestion((activeSuggestion + 1) % suggestions.length);
      }
    }

    if (key === 'ArrowUp' || (e.shiftKey && key === 'Tab')) {
      setActiveSuggestion(
        (activeSuggestion + suggestions.length - 1) % suggestions.length
      );
    }

    if (key === 'Escape') {
      if (value.length === 0) {
        setIsCollapsed(true);
      }
      setValue('');
      setActiveSuggestion(0);
    }

    if (key === 'Enter') {
      if (isOpen) {
        e.preventDefault();
        setValue(suggestions[activeSuggestion]);
        setIsOpen(false);
      } else {
        setValue(value);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    if (value.length >= 0) {
      setIsOpen(true);
    }
    // filtering suggestions as a user type in
    const filtered = DATA.filter(data =>
      data.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setSuggestions(filtered);
    setValue(userInput);
  };

  // function for handling mouse events

  const handleClick = () => {
    setIsCollapsed(!isCollapsed);
    setIsFocused(false);
  };

  const handleSelectedSuggestion = (idx: number) => {
    setValue(suggestions[idx]);
    setIsOpen(false);
  };

  // function for input value reset

  const handleReset = () => {
    setValue('');
    setActiveSuggestion(0);
  };

  // function for handling input focus and blur

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  // handling all active styling classes

  if (value.length > 0 && suggestions.length > 0 && isOpen) {
    searchBarWrapperClasses += ' rounded-t-lg';
  } else {
    searchBarWrapperClasses += ' rounded-lg';
  }

  if (isFocused || value.length > 0) {
    labelClasses += ' -top-3 text-sm bg-white rounded-md';
  } else {
    labelClasses += ' cursor-text';
  }

  return (
    <>
      {isCollapsed ? (
        <div
          className="bg-white border-slate-900 border-2 px-4 py-3 rounded-full cursor-pointer"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            className="text-black w-5 h-6 align-middle"
            icon={faSearch}
          />
        </div>
      ) : (
        <div className={searchBarWrapperClasses}>
          <div className="relative flex items-center justify-between px-4">
            <label className={labelClasses} htmlFor="cb1-input">
              Search
            </label>
            <input
              aria-autocomplete="list"
              aria-controls="cb1-listbox"
              aria-expanded={value.length > 0 ? true : false}
              id="cb1-input"
              role="combobox"
              type="search"
              value={value}
              onBlur={handleFocus}
              onChange={handleChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              className="w-full text-black relative py-3 z-0 outline-none"
            />
            <div className="absolute right-4 flex gap-2">
              {value.length > 0 ? (
                <FontAwesomeIcon
                  className="text-black cursor-pointer"
                  icon={faClose}
                  onClick={handleReset}
                />
              ) : null}
              <FontAwesomeIcon
                className="text-black cursor-pointer"
                icon={faSearch}
              />
              <FontAwesomeIcon
                className="text-black cursor-pointer"
                icon={faArrowRight}
                onClick={handleClick}
              />
            </div>
          </div>
          {value.length > 0 && isOpen ? (
            <SuggestionsDropdown
              activeSuggestion={activeSuggestion}
              suggestions={suggestions}
              onClick={handleSelectedSuggestion}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default SearchInput;
