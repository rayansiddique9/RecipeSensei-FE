import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import CloseIcon from "@mui/icons-material/Close";
import "./searchBar.css";

const SearchBar = ({ placeHolder, onSearch, initialValue = "" }) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <DebounceInput
        minLength={1}
        debounceTimeout={1000}
        type="text"
        placeholder={placeHolder}
        value={query}
        onChange={handleChange}
        className="search-bar-input"
      />
      {query && (
        <button onClick={handleClear} className="search-bar-clear">
          <CloseIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

