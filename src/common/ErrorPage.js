import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4", children: [_jsx("h1", { className: "text-6xl font-bold text-red-600 mb-4", children: "404" }), _jsx("h2", { className: "text-2xl font-semibold mb-2 text-gray-800", children: "Page Not Found" }), _jsx("p", { className: "mb-6 text-gray-600 text-center", children: "Sorry, the page you are looking for does not exist." }), _jsx(Link, { to: "/", className: "px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition", children: "Go to Home" })] }));
};
export default ErrorPage;
