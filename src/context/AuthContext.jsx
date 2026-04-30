import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // 🔄 cargar usuario al iniciar
    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            const payload = parseJwt(token);
            setUser(payload);
        }

        setLoading(false); // 👈 CLAVE
    }, []);

    // 🔐 LOGIN
    const login = async (credentials) => {
        try {
            const res = await axios.post("/auth/login", credentials);

            // 🔥 IMPORTANTE: acceder a data.data
            const { accessToken, refreshToken } = res.data.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            const payload = parseJwt(accessToken);
            setUser(payload);

            return { success: true };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Error en login",
            };
        }
    };

    // 🚪 LOGOUT
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        window.location.href = "/login";
    };

    // 🧠 DECODIFICAR TOKEN
    const parseJwt = (token) => {
        try {
            const base64Payload = token.split(".")[1];
            const payload = JSON.parse(atob(base64Payload));

            return {
                numeroDocumento: payload.sub,
                nombres: payload.nombres || payload.sub,
                roles: payload.roles || [payload.role],
                exp: payload.exp,
            };

        } catch (e) {
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};