import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// SearchInput.tsx
import React, { useState } from 'react';
const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSearch = () => {
        if (query.trim() !== '') {
            onSearch(query.trim());
            setQuery('');
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (_jsxs("div", { className: "flex max-w-md mx-auto mt-4", children: [_jsx("input", { type: "text", value: query, onChange: handleChange, onKeyDown: handleKeyPress, placeholder: "Type to search...", className: "flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsx("button", { onClick: handleSearch, className: "px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition", children: "Search" })] }));
};
export default SearchInput;
