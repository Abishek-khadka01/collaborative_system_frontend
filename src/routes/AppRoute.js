import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import UserLogin from '../pages/auth/UserLogin';
import ErrorPage from '../common/ErrorPage';
import UserRegister from '../pages/auth/UserRegister';
import DocPage from '../pages/Docs/Docs';
import NavBar from '../components/NavBar';
import DocumentNavbar from '../pages/Docs/DocNavbar';
import AuthRoute from './AuthRoute';
import { DummyFileHeader } from '../components/FileShow';
import LandingPage from '../pages/LandingPage';
import DashBoard from '../pages/Dashboard';
export default function AppRoute() {
    return (_jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(AuthRoute, {}), errorElement: _jsx(ErrorPage, {}), children: [_jsx(Route, { path: "/register", element: _jsx(UserRegister, {}) }), _jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(DashBoard, {}) }), _jsx(Route, { path: "/login", element: _jsx(UserLogin, {}) }), _jsx(Route, { path: "/navbar", element: _jsx(NavBar, {}) }), _jsx(Route, { path: "/document/:id", element: _jsx(DocPage, {}) }), _jsx(Route, { path: "/doc-navbar", element: _jsx(DocumentNavbar, {}) })] }), _jsx(Route, { path: "/check", element: _jsx(DummyFileHeader, {}) })] }));
}
