import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for delicious recipes..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <style jsx>{`
        .search-bar-container {
          margin: 2rem 0;
        }
        .search-form {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-input {
          flex-grow: 1;
          padding: 0.8rem 1rem;
          font-size: 1rem;
          border: 2px solid rgb(70, 63, 63);
          border-radius: 25px 0 0 25px;
          outline: none;
          transition: border-color 0.3s;
        }
        .search-input:focus {
          border-color:rgb(134, 129, 126);
        }
        .search-button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          background-color:rgb(70, 63, 63);
          color:rgb(104, 100, 96);
          border: none;
          border-radius: 0 25px 25px 0;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .search-button:hover {
          background-color:rgb(119, 111, 111);
        }
      `}</style>
        </div>
    );
}

export default SearchBar;
