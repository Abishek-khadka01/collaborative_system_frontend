import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi  from 'joi';
import { useThemeStore } from '../../stores/ThemeStore';
import axios from '../../apis/interceptor';
import { LOGIN, USERS } from '../../apis/Endpoints';
import { useUserStore } from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';
import type { AxiosResponse } from 'axios';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Enter a valid email address',
    }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
});

const UserLogin: React.FC = () => {
  const userLogin = useUserStore(state => state.userLogin);

  const { theme } = useThemeStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = schema.validate({ email, password }, { abortEarly: false });
    if (error) {
      const fieldErrors: { email?: string; password?: string } = {};
      error.details.forEach(detail => {
        const field = detail.path[0] as 'email' | 'password';
        fieldErrors[field] = detail.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      const data = (await axios.post(`${USERS}${LOGIN}`, {
        email,
        password,
      })) as AxiosResponseType;
      console.table(data.data.data);
      const { username, accessToken, email: Email,
        //  role,
          profilePicture, id } = data.data.data;

      if (data.status == 200) {
        userLogin({
          username,
          accessToken,
          email: Email,
          profilePicture,
          id,
        });
        alert(`User Login is SuccessFul`);

        navigate('/dashboard');
      }
    } catch (error) {
      console.error(`Error in the user login ${error}`);
    }
  };

  // Theme-based classes
  const bgColor = theme === 'light' ? 'bg-gray-50' : 'bg-gray-900';
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const textColor = theme === 'light' ? 'text-gray-700' : 'text-white';
  const inputBg = theme === 'light' ? 'bg-white' : 'bg-gray-700';
  const inputBorder = theme === 'light' ? 'border-gray-300' : 'border-gray-600';
  const inputText = theme === 'light' ? 'text-gray-700' : 'text-white';
  const buttonBg = theme === 'light' ? 'bg-indigo-600' : 'bg-indigo-700';
  const buttonHover = theme === 'light' ? 'hover:bg-indigo-700' : 'hover:bg-indigo-600';
  const linkColor =
    theme === 'light'
      ? 'text-indigo-600 hover:text-indigo-500'
      : 'text-indigo-400 hover:text-indigo-300';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
      <div className={`w-full max-w-md p-8 rounded shadow ${cardBg}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${textColor}`}>
          Sign in to your account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${textColor}`}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${textColor}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className={`font-medium ${linkColor}`}>
                Forgot password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 rounded ${buttonBg} text-white font-semibold ${buttonHover} transition`}
          >
            Sign In
          </button>
        </form>
        <p className={`mt-6 text-center text-sm ${textColor}`}>
          Don't have an account?{' '}
          <Link to="/register" className={`font-medium ${linkColor}`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

type ResponseType = {
  id: string;
  username: string;
  accessToken: string;
  email: string;
  role: string;
  profilePicture: string;
};

interface AxiosResponseType extends AxiosResponse {
  data: {
    data: ResponseType;
  };
}
export default UserLogin;
