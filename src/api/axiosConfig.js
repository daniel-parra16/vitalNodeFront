import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================
// 🔐 REQUEST INTERCEPTOR
// ========================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ========================
// 🔥 RESPONSE INTERCEPTOR
// ========================
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 🚫 evitar loops en auth
    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/registro")
    ) {
      return Promise.reject(error);
    }

    // 🔐 manejar 401
    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // 🔥 IMPORTANTE: usar axiosInstance (NO axios)
        const res = await axios.post("http://localhost:8080/api/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("🔴 Refresh falló, redirigiendo al login");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    // 🔥 si ya falló todo (401/403/etc)
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.log("🔴 Sesión inválida");

      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
