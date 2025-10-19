import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { useThemeStore } from '../../stores/ThemeStore';
import axios from '../../apis/interceptor';
import { REGISTER, USERS } from '../../apis/Endpoints';
// Joi validation schema
const schema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Enter a valid email address',
    }),
    username: Joi.string().min(3).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
    }),
});
const UserRegister = () => {
    const navigate = useNavigate();
    const { theme } = useThemeStore(); // theme state
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = schema.validate(values, { abortEarly: false });
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
        setSubmitting(true);
        try {
            const response = await axios.post(`${USERS}${REGISTER}`, values);
            if (response.status == 200) {
                alert(`User registered Successfully`);
                navigate('/login');
            }
        }
        finally {
            setSubmitting(false);
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
    return (_jsx("div", { className: `min-h-screen flex items-center justify-center ${bgColor}`, children: _jsxs("div", { className: `w-full max-w-md p-8 rounded shadow ${cardBg}`, children: [_jsx("h2", { className: `text-2xl font-bold mb-6 text-center ${textColor}`, children: "Create your account" }), _jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, noValidate: true, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: `block text-sm font-medium ${textColor}`, children: "Username" }), _jsx("input", { id: "username", name: "username", type: "text", autoComplete: "username", value: values.username, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500` }), errors.username && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.username })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: `block text-sm font-medium ${textColor}`, children: "Email" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", value: values.email, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500` }), errors.email && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: `block text-sm font-medium ${textColor}`, children: "Password" }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", value: values.password, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border ${inputBorder} rounded ${inputBg} ${inputText} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500` }), errors.password && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.password })] }), _jsx("button", { type: "submit", disabled: submitting, className: `w-full flex justify-center py-2 px-4 rounded ${buttonBg} text-white font-semibold ${buttonHover} transition`, children: "Sign Up" })] }), _jsxs("p", { className: `mt-6 text-center text-sm ${textColor}`, children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: `font-medium ${linkColor}`, children: "Sign in" })] })] }) }));
};
export default UserRegister;
