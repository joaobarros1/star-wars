import { createContext, useState, useCallback } from "react";
import { PropTypes } from "prop-types";

export const AuthContext = createContext();

const hardcodedCredentials = {
    username: "user",
    password: "password",
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = useCallback((username, password) => {
        if (
            username === hardcodedCredentials.username &&
            password === hardcodedCredentials.password
        ) {
            const fakeToken = "mock-jwt-token";
            setToken(fakeToken);
            setIsAuthenticated(true);
            localStorage.setItem("token", fakeToken);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
