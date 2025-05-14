import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"
export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken){
            try { 
                const decoded = jwtDecode(storedToken);
                setToken(storedToken);
                setUser(decoded);
            } catch (error) {
                logout();
            }
        }
    },[]);

    const login = (jwtToken) => {
        const decoded = jwtDecode(jwtToken);
        const userData = {
            userId: decoded.userId,
            username: username
        }
        console.log(decoded)
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", JSON.stringify(decoded));

        setUser(userData);
        setUsername(username)
        setToken(jwtToken);
      };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
