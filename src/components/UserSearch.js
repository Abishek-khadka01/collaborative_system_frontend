import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// UserSearch.tsx
import React, { useState } from 'react';
const dummyUsers = [
    { id: '1', username: 'JohnDoe' },
    { id: '2', username: 'JaneSmith' },
    { id: '3', username: 'AlexJohnson' },
    { id: '4', username: 'EmilyClark' },
];
const UserSearch = () => {
    const [query, setQuery] = useState('');
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    const filteredUsers = dummyUsers.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
    const handleAdd = (user) => {
        alert(`${user.username} added!`);
    };
    return (_jsxs("div", { className: "max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200", children: [_jsx("input", { type: "text", placeholder: "Search users...", value: query, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" }), _jsxs("ul", { className: "space-y-2", children: [filteredUsers.map(user => (_jsxs("li", { className: "flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg", children: user.username[0].toUpperCase() }), _jsx("span", { className: "text-gray-700 font-medium", children: user.username })] }), _jsx("button", { onClick: () => handleAdd(user), className: "px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition", children: "Add" })] }, user.id))), filteredUsers.length === 0 && (_jsx("li", { className: "text-gray-400 text-sm text-center", children: "No users found" }))] })] }));
};
export default UserSearch;
