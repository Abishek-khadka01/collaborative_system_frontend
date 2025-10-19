import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useUserStore } from '../stores/UserStore';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
const AuthRoute = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.id || !user.email) {
            // i.e The user is not logged in
            navigate('/');
        }
    }, [user]);
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx(Outlet, {})] }));
};
export default AuthRoute;
