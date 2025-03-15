import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthContextType, AuthResponse } from "../types/auth.types";
const apiUrl = import.meta.env.VITE_API_URL;


// Create context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkToken();
    }, []);

    // Log in
    const login = async (credentials: LoginCredentials) => {
        try {
            const res = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(credentials)
            });

            if(!res.ok) throw new Error("Inloggning misslyckades");

            const data = await res.json() as AuthResponse;

            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    // log out
    const logout = async () => {
        try {
            const res = await fetch(`${apiUrl}/users/logout`, {
                method: 'GET', 
                credentials: 'include'
            });
            if(!res.ok) setUser(null);
            setUser(null);
        } catch (error) {
            throw error;
        }
    }

    // Check token
    const checkToken = async () => {
        try {
            const res = await fetch(`${apiUrl}/users/validate`, {
                credentials: 'include'
            });

            if(!res.ok) {
                logout();
            } else {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            logout();
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}