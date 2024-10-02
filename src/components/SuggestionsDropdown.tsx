type SuggestionsDropdownProps = {
  suggestions: string[];
  activeSuggestion: number;
  onClick: (idx: number) => void;
};

function SuggestionsDropdown({
  suggestions,
  activeSuggestion,
  onClick
}: SuggestionsDropdownProps) {
  return (
    <ul
      aria-label="Autocomplete suggestions"
      id="cb1-listbox"
      role="listbox"
      className="bg-white w-full absolute left-0 rounded-b-lg shadow-lg"
    >
      {suggestions.map((suggestion, idx) => {
        return (
          <li
            key={idx}
            aria-selected={activeSuggestion === idx ? true : false}
            id={`lb${idx + 1}`}
            role="option"
            tabIndex={activeSuggestion === idx ? 0 : -1}
            className={`${
              activeSuggestion === idx
                ? 'bg-slate-500 text-white'
                : 'text-black'
            } font-semibold px-4 py-2 cursor-pointer hover:bg-slate-400 hover:text-slate-900 last-of-type:rounded-b-lg`}
            onClick={() => onClick(idx)}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
}

export default SuggestionsDropdown;
