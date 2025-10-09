import { useEffect } from 'react';
import { useUserStore } from '../stores/UserStore';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
const AuthRoute = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id) {
      // i.e The user is not logged in
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AuthRoute;
