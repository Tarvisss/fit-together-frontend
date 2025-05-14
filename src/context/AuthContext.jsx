import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"
export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken){
            try { 
                const decoded = jwtDecode(storedToken);
                setToken(storedToken);
                setUser({
                    userId: decoded.userId,
                    username: decoded.username
                });
            } catch (error) {
                logout();
            }
        }
    },[]);

    const login = (jwtToken) => {

        const decoded = jwtDecode(jwtToken);
        const userData = {
            userId: decoded.userId,
            username: decoded.username
        }

        console.log(decoded)
        localStorage.setItem("token", jwtToken);

        setUser(userData);
        setToken(jwtToken);
      };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{user, token, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
