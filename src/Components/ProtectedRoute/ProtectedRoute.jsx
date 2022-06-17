import Cookies from "js-cookie";
import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {

    let navigate = useNavigate();
    let isAuthenticaded=Cookies.get("isAuthenticaded");

    useEffect(() => {
        if (Cookies.get("authenticated")) {
            navigate(window.location.pathname);
        } else {
            navigate('/sign-in');
        }
    }, []);

    return (
        <>
            {isAuthenticaded && (<Component {...props} />)}
        </>
    );
}
export default ProtectedRoute;