import React, { useState } from 'react';
import { useUserStore } from '../stores/UserStore';
import { useThemeStore } from '../stores/ThemeStore';
import { Link } from 'react-router-dom';
import axios from '../apis/interceptor';
import { LOGOUT, USERS } from '../apis/Endpoints';

const NavBar: React.FC = () => {
  const { user, userLogout } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  async function userLogOutAxios() {
    try {
      const data = await axios.put(`${USERS}${LOGOUT}`);
      if (data.status === 200) {
        userLogout();
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  const [menuOpen, setMenuOpen] = useState(false);

  // Theme colors
  const bgColor = theme === 'light' ? 'bg-gray-200' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const buttonBg = theme === 'light' ? 'bg-gray-200' : 'bg-gray-800';
  const hoverBg = theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700';
  const navbarBorder = theme === 'light' ? 'border-b border-gray-400' : 'border-b border-white';

  return (
    <nav
      className={`w-full flex items-center justify-between px-6 py-4 ${bgColor} ${navbarBorder} shadow-md transition-colors duration-500 ease-in-out`}
    >
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <span className={`text-2xl font-bold ${textColor}`}>CollabSystem</span>
      </div>

      {/* Right: User Info + Theme + Menu */}
      <div className="flex items-center space-x-4 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${buttonBg} ${hoverBg}`}
        >
          {theme === 'light' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${textColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${textColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m8.66-11h-1M4.34 12h-1m15.36 5.36l-.71-.71M6.05 6.05l-.71-.71m12.02 12.02l-.71-.71M6.05 17.95l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          )}
        </button>

        {user?.id ? (
          <>
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="User Avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className={textColor}>{user.username}</span>
            </div>

            {/* Hamburger Button */}
            <div className="relative z-50">
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className={`flex flex-col justify-center items-center w-12 h-12 rounded-full ${hoverBg} focus:outline-none transition-all duration-300 ease-in-out`}
              >
                <span
                  className={`block w-6 h-0.5 ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-100'} mb-1`}
                ></span>
                <span
                  className={`block w-6 h-0.5 ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-100'} mb-1`}
                ></span>
                <span
                  className={`block w-6 h-0.5 ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-100'}`}
                ></span>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-44 ${bgColor} border ${theme === 'light' ? 'border-gray-400' : 'border-white'} rounded shadow-lg z-50`}
                >
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 ${textColor} ${hoverBg}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className={`block px-4 py-2 ${textColor} ${hoverBg}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      userLogOutAxios();
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 ${textColor} ${hoverBg}`}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Not logged in
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className={`px-5 py-2 rounded-full border ${textColor} ${buttonBg} ${hoverBg}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`px-5 py-2 rounded-full border ${textColor} ${buttonBg} ${hoverBg}`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
