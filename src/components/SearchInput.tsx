// SearchInput.tsx
import React, { useState } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query.trim());
      setQuery('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex max-w-md mx-auto mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Type to search..."
        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
