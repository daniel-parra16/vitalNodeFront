import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // 🚫 NO interceptar login
        if (
            originalRequest.url.includes("/auth/login") ||
            originalRequest.url.includes("/auth/registro")
        ) {
            return Promise.reject(error);
        }

        // 🔐 SOLO manejar 401
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const res = await axios.post("/auth/refresh", {
                    refreshToken,
                });

                const newAccessToken = res.data.data.accessToken;

                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);

            } catch (err) {
                // ❌ SOLO AQUÍ REDIRIGES
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        // ✅ TODOS LOS DEMÁS ERRORES
        return Promise.reject(error);
    }
);

export default axiosInstance;
