import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token) {
            axios
                .get(`${API_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login({ username: email, password });
            const token = response.data.access_token;
            const user = response.data.user;

            if (!token || !user) throw new Error("No token or user");

            localStorage.setItem("access_token", token);
            setUser(user);
            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                loading,
                setUser,
                setToken: () => {}, // dummy, бо useContext іноді очікує
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
