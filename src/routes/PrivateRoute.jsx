import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, roles }) {
    const { user, loading } = useAuth();

    // ⏳ Esperar a que cargue el usuario
    if (loading) {
        return <div>Cargando...</div>;
    }

    // ❌ No autenticado
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 🔐 Validar roles (si se especifican)
    if (roles && !roles.some(role => user.roles.includes(role))) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}