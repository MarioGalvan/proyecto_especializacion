import Cookies from 'js-cookie';
import React from 'react'
import {
    Route,
    BrowserRouter,
    Routes,
} from "react-router-dom";
import { UserLogin } from '../Components/Login/UserLogin';

export const MainRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sign-in"  element={<UserLogin/>} />
                <Route path="/"  element={<UserLogin/>} />
            </Routes>
        </BrowserRouter>
    )
}
