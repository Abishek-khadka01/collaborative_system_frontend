// UserSearch.tsx
import React, { useState } from 'react';

type User = {
  id: string;
  username: string;
  avatarUrl?: string;
};

const dummyUsers: User[] = [
  { id: '1', username: 'JohnDoe' },
  { id: '2', username: 'JaneSmith' },
  { id: '3', username: 'AlexJohnson' },
  { id: '4', username: 'EmilyClark' },
];

const UserSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  const filteredUsers = dummyUsers.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (user: User) => {
    alert(`${user.username} added!`);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <ul className="space-y-2">
        {filteredUsers.map(user => (
          <li
            key={user.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg">
                {user.username[0].toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{user.username}</span>
            </div>
            <button
              onClick={() => handleAdd(user)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add
            </button>
          </li>
        ))}
        {filteredUsers.length === 0 && (
          <li className="text-gray-400 text-sm text-center">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
