import Cookies from 'js-cookie';
import React from 'react'
import {
    Route,
    BrowserRouter,
    Routes,
} from "react-router-dom";
import Dashboard from '../Components/Dashboard/Dashboard';
import { UserLogin } from '../Components/Login/UserLogin';

export const MainRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in"  element={<UserLogin/>} />
                <Route path="/"  element={<UserLogin/>} />
                <Route path="/dashboard"  element={<Dashboard/>} />
               
            </Routes>
        </BrowserRouter>
    )
}
