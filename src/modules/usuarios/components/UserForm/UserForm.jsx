import { useState, useEffect } from "react";
import RoleSelector from "../RoleSelector/RoleSelector";
import styles from "./UserForm.module.css";

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
    const { name, value } = e.target;

    if (name === "habilidades" || name === "subEspecialidad") {
      setExtraData({
        ...extraData,
        [name === "subEspecialidad" ? "subEspecialidades" : name]: value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== ""),
      });
    } else {
      setExtraData({
        ...extraData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(
      {
        ...form,
        roles,
      },
      extraData,
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* 🔹 DATOS PRINCIPALES */}
      <div className={styles.grid}>
        <select
          name="tipo"
          className={styles.input}
          value={form.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione tipo de documento</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="NIT">NIT</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PASAPORTE">Pasaporte</option>
        </select>
        <input
          className={styles.input}
          name="numeroDocumento"
          placeholder="Documento"
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          name="nom"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="ape"
          placeholder="Apellido"
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          required
        />
      </div>

      {/* 🔐 ROLES */}
      <div className={styles.roles}>
        <RoleSelector roles={roles} setRoles={setRoles} />
      </div>

      {/* 👨‍⚕️ DOCTOR */}
      {roles.includes("ROLE_DOCTOR") && (
        <div className={styles.grid}>
          <input
            className={styles.input}
            name="registroMedico"
            placeholder="Registro Médico"
            onChange={handleExtra}
          />
          <input
            className={styles.input}
            name="especialidad"
            placeholder="Especialidad "
            onChange={handleExtra}
          />
          <input
            className={styles.input}
            name="subEspecialidades"
            placeholder="Subespecialidades (separadas por coma)"
            onChange={handleExtra}
          />
          <input
            className={styles.input}
            name="aniosExperiencia"
            placeholder="Experiencia"
            onChange={handleExtra}
          />
        </div>
      )}

      {/* 👩‍⚕️ ENFERMERA */}
      {roles.includes("ROLE_NURSE") && (
        <div className={styles.grid}>
          <input
            className={styles.input}
            name="registroProfesional"
            placeholder="Registro Profesional"
            onChange={handleExtra}
          />
          <input
            className={styles.input}
            name="area"
            placeholder="Área"
            onChange={handleExtra}
          />
          <input
            className={styles.input}
            name="habilidades"
            placeholder="Habilidades (separadas por coma)"
            onChange={handleExtra}
          />
        </div>
      )}

      <button className={styles.button} type="submit">
        Guardar
      </button>
    </form>
  );
}
