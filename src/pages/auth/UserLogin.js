import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { useThemeStore } from '../../stores/ThemeStore';
import axios from '../../apis/interceptor';
import { LOGIN, USERS } from '../../apis/Endpoints';
import { useUserStore } from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';
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
const UserLogin = () => {
    const userLogin = useUserStore(state => state.userLogin);
    const { theme } = useThemeStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = schema.validate({ email, password }, { abortEarly: false });
        if (error) {
            const fieldErrors = {};
            error.details.forEach(detail => {
                const field = detail.path[0];
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
            }));
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
        }
        catch (error) {
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
    const linkColor = theme === 'light'
        ? 'text-indigo-600 hover:text-indigo-500'
        : 'text-indigo-400 hover:text-indigo-300';
    return (_jsx("div", { className: `min-h-screen flex items-center justify-center ${bgColor}`, children: _jsxs("div", { className: `w-full max-w-md p-8 rounded shadow ${cardBg}`, children: [_jsx("h2", { className: `text-2xl font-bold mb-6 text-center ${textColor}`, children: "Sign in to your account" }), _jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: `block text-sm font-medium ${textColor}`, children: "Email address" }), _jsx("input", { id: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: e => setEmail(e.target.value), className: `mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500` }), errors.email && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: `block text-sm font-medium ${textColor}`, children: "Password" }), _jsx("input", { id: "password", type: "password", autoComplete: "current-password", required: true, value: password, onChange: e => setPassword(e.target.value), className: `mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500` }), errors.password && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.password })] }), _jsx("div", { className: "flex items-center justify-between", children: _jsx("div", { className: "text-sm", children: _jsx(Link, { to: "/forgot-password", className: `font-medium ${linkColor}`, children: "Forgot password?" }) }) }), _jsx("button", { type: "submit", className: `w-full flex justify-center py-2 px-4 rounded ${buttonBg} text-white font-semibold ${buttonHover} transition`, children: "Sign In" })] }), _jsxs("p", { className: `mt-6 text-center text-sm ${textColor}`, children: ["Don't have an account?", ' ', _jsx(Link, { to: "/register", className: `font-medium ${linkColor}`, children: "Sign up" })] })] }) }));
};
export default UserLogin;
