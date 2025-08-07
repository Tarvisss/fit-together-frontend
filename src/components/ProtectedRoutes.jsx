
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes(){
    const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userData")
    //coerce a truthy/falsy value into an explicit boolean
    return token && user;

    }
    return isAuthenticated() ? <Outlet/> : <Navigate to="/auth/login"/>
}

export default ProtectedRoutes;