import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/auth/UserLogin";
import ErrorPage from "../common/ErrorPage";
import UserRegister from "../pages/auth/UserRegister";


export default function AppRoute() { 

    return (

        <Routes>

        <Route path="/login" element={<UserLogin/>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
         <Route path="/register" element={<UserRegister/>}></Route>       

        </Routes>


    )

}