import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
            <p className="mb-6 text-gray-600 text-center">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default ErrorPage;