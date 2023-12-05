import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [question, setQuestion] = useState('');

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSearch = () => {
    if (question.trim() !== '') {
      onSearch(question);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your health question"
        value={question}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
