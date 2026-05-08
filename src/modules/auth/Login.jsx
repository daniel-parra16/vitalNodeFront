import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import StatusModal from "../../components/StatusModal/StatusModal";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        status: "error",
        title: "",
        message: "",
    });

    const [form, setForm] = useState({
        numeroDocumento: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await login(form);

            setLoading(false);

            if (res.success) {
                // 🔹 éxito: no modal, solo redirección directa
                navigate("/dashboard");
                return;
            }

            // 🔹 error controlado desde backend
            setStatusModal({
                isOpen: true,
                status: "error",
                title: "Error de acceso",
                message: res.message || "Credenciales incorrectas",
            });

        } catch (err) {
            setLoading(false);

            // 🔹 error inesperado
            setStatusModal({
                isOpen: true,
                status: "error",
                title: "Error del sistema",
                message: "No fue posible iniciar sesión. Intente nuevamente.",
            });
        }
    };

    return (
        <div className="auth-container">

            <LoadingModal isOpen={loading} />

            <StatusModal
                isOpen={statusModal.isOpen}
                status="error"
                title={statusModal.title}
                message={statusModal.message}
                onClose={() =>
                    setStatusModal((prev) => ({ ...prev, isOpen: false }))
                }
                showCancelButton={false}
                confirmText="Entendido"
            />

            <div className="auth-card">

                <div className="logo">VITALNODE</div>
                <p style={{ marginBottom: "20px", color: "#666" }}>
                    Sistema de gestión médica
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Documento</label>
                        <input
                            name="numeroDocumento"
                            placeholder="Ingresa tu documento"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Ingresar
                    </button>

                </form>

                <div className="auth-link">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register">Regístrate</Link>
                </div>

            </div>
        </div>
    );
}