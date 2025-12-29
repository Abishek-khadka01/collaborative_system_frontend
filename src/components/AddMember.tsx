import React, { useState, useCallback } from 'react';
import _ from 'lodash';

export type UserType = {
  id: number;
  username: string;
  email: string;
  profile?: string;
};

type UserSearchInputProps = {
  users: UserType[];                         
  onAdd: (user: UserType) => void;           
  placeholder?: string;                       
  debounceTime?: number;                      
};

const UserSearchInput: React.FC<UserSearchInputProps> = ({
  users,
  onAdd,
  placeholder = 'Enter the email',
  debounceTime = 500,
}) => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

  // Debounced search function
  const searchUsers = useCallback(
    _.debounce((searchText: string) => {
      if (validateEmail(searchText)) {
        const results = users.filter((user) =>
          user.email.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(results);
      } else {
        setFilteredUsers([]);
      }
    }, debounceTime),
    [users, debounceTime]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    searchUsers(e.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded shadow bg-white">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-4"
      />

      {filteredUsers.length > 0 && (
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-2 border-b hover:bg-gray-100 text-black"
            >
              <div className="flex items-center space-x-3">
                {user.profile && (
                  <img
                    src={user.profile}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-black">{user.username}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => onAdd(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}

      {query && filteredUsers.length === 0 && validateEmail(query) && (
        <p className="text-gray-500">No users found</p>
      )}
    </div>
  );
};

export default UserSearchInput;
