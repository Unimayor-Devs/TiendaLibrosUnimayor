import React, { useState } from 'react';
import './style.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar-input"
          placeholder="Buscar libro..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="search-bar-button">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;