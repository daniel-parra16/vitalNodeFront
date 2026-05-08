import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axiosConfig";
import styles from "./auth.module.css";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import StatusModal from "../../components/StatusModal/StatusModal";

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

    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        status: "info",
        title: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 🔹 convierte errores del backend en texto legible
    const formatErrors = (errores) => {
        if (!errores) return "Error de validación";

        return Object.entries(errores)
            .map(([_, mensaje]) => `• ${mensaje}`)
            .join("\n");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post("/auth/registro", form);

            setLoading(false);

            setStatusModal({
                isOpen: true,
                status: "success",
                title: "Registro exitoso",
                message: res.data.message || "Usuario creado correctamente",
            });

            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            setLoading(false);

            const data = err.response?.data;

            const mensajeBackend =
                data?.message || "No se pudo crear el usuario";

            const erroresFormateados = formatErrors(data?.errores);

            setStatusModal({
                isOpen: true,
                status: "error",
                title: data?.error || "Error de registro",
                message: data?.errores
                    ? erroresFormateados
                    : mensajeBackend,
            });
        }
    };

    return (
        <div className={styles.registerContainer}>

            <LoadingModal isOpen={loading} />

            <StatusModal
                isOpen={statusModal.isOpen}
                status={statusModal.status}
                title={statusModal.title}
                message={statusModal.message}
                onClose={() =>
                    setStatusModal((prev) => ({ ...prev, isOpen: false }))
                }
                autoClose={statusModal.status === "success"}
                autoCloseTime={1500}
            />

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
                            />
                        </div>

                        <div className={styles.formFull}>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <button className="btn-primary" style={{ marginTop: "15px" }}>
                        Crear cuenta
                    </button>

                </form>

                <div className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </div>

            </div>
        </div>
    );
}