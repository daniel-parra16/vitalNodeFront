import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        numeroDocumento: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            const res = await login(form);

            setLoading(false);
            if (res.success) {
                navigate("/dashboard");
            } else {
                setError(res.message);
            }

        } catch (err) {
            console.error(err);
            setError("Error inesperado en el login");
        }
    };

    return (
        <div className="auth-container">
            <LoadingModal isOpen={loading} />
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

                {error && <div className="error">{error}</div>}

                <div className="auth-link">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register">Regístrate</Link>
                </div>

            </div>
        </div>
    );
}