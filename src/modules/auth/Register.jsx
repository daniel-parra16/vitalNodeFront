import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axiosConfig";
import styles from "./auth.module.css";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        tipoDocumento: "CC",
        numeroDocumento: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        correo: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
            const res = await axios.post("/auth/registro", form);

            setLoading(false);

            setMessage(res.data.message || "Usuario registrado");

            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            setError(err.response?.data?.message || "Error en registro");
        }
    };

    return (
        <div className={styles.registerContainer}>
            <LoadingModal isOpen={loading} />

            <div className={styles.registerCard + " large"}>

                <div className="logo">VITALNODE</div>
                <p style={{ marginBottom: "20px", color: "#666" }}>
                    Crear cuenta
                </p>

                <form onSubmit={handleSubmit} autoComplete="off">

                    <div className={styles.formGrid}>

                        <div>
                            <label>Tipo</label>
                            <select
                                name="tipoDocumento"
                                onChange={handleChange}
                            >
                                <option value="CC">CC</option>
                                <option value="TI">TI</option>
                            </select>
                        </div>

                        <div>
                            <label>Documento</label>
                            <input
                                name="numeroDocumento"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Nombres</label>
                            <input
                                name="nombres"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Apellidos</label>
                            <input
                                name="apellidos"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Teléfono</label>
                            <input
                                name="telefono"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Correo</label>
                            <input
                                type="email"
                                name="correo"
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div className={styles.formFull}>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>

                    </div>

                    <button className="btn-primary" style={{ marginTop: "15px" }}>
                        Crear cuenta
                    </button>

                </form>

                {error && <div className="error">{error}</div>}
                {message && <div style={{ color: "green" }}>{message}</div>}

                <div className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </div>

            </div>
        </div>
    );
}