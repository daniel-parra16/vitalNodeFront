import { useState, useEffect } from "react";
import RoleSelector from "../RoleSelector/RoleSelector";

export default function UserForm({ onSubmit, initialData }) {
    const [form, setForm] = useState({
        tipo: "",
        numeroDocumento: "",
        nom: "",
        ape: "",
        email: "",
        phone: "",
        password: "",
    });

    const [roles, setRoles] = useState([]);
    const [extraData, setExtraData] = useState({});

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
            setRoles(initialData.roles || []);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleExtra = (e) => {
        setExtraData({
            ...extraData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...form,
            roles,
        }, extraData);
    };

    return (
        <form onSubmit={handleSubmit}>

            <input name="tipo" placeholder="Tipo documento" onChange={handleChange} required />
            <input name="numeroDocumento" placeholder="Documento" onChange={handleChange} required />

            <input name="nom" placeholder="Nombre" onChange={handleChange} required />
            <input name="ape" placeholder="Apellido" onChange={handleChange} required />

            <input name="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Teléfono" onChange={handleChange} required />

            {!initialData && (
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            )}

            {/* 🔐 ROLES */}
            <RoleSelector roles={roles} setRoles={setRoles} />

            {/* 👨‍⚕️ DOCTOR */}
            {roles.includes("ROLE_DOCTOR") && (
                <>
                    <input name="registroMedico" placeholder="Registro Médico" onChange={handleExtra} />
                    <input name="especialidad" placeholder="Especialidad" onChange={handleExtra} />
                    <input name="experiencia" placeholder="Experiencia" onChange={handleExtra} />
                </>
            )}

            {/* 👩‍⚕️ ENFERMERA */}
            {roles.includes("ROLE_NURSE") && (
                <>
                    <input name="registroProfesional" placeholder="Registro Profesional" onChange={handleExtra} />
                    <input name="area" placeholder="Área" onChange={handleExtra} />
                    <input name="habilidades" placeholder="Habilidades" onChange={handleExtra} />
                </>
            )}

            <button type="submit">Guardar</button>

        </form>
    );
}