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
  return (
    <Routes>
      <Route path="/" element={<AuthRoute />} errorElement={<ErrorPage />}>
        <Route path="/register" element={<UserRegister />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/navbar" element={<NavBar />}></Route>
        <Route path="/document/:id" element={<DocPage />}></Route>
        <Route path="/doc-navbar" element={<DocumentNavbar />}></Route>
      </Route>

      <Route path="/check" element={<DummyFileHeader />}></Route>
    </Routes>
  );
}
