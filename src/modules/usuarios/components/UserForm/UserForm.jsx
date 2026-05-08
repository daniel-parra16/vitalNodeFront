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
  });

  const [roles, setRoles] = useState([]);
  const [extraData, setExtraData] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));

      setRoles(initialData.roles || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExtra = (e) => {
    const { name, value } = e.target;

    if (name === "habilidades" || name === "subEspecialidades") {
      setExtraData((prev) => ({
        ...prev,
        [name]: value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== ""),
      }));
    } else {
      setExtraData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(
      {
        ...form,
        roles,
      },
      extraData
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* 🔹 DATOS PRINCIPALES */}
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Tipo de documento</label>
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
        </div>

        <div className={styles.field}>
          <label>Número de documento</label>
          <input
            className={styles.input}
            name="numeroDocumento"
            placeholder="Documento"
            value={form.numeroDocumento}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Nombre</label>
          <input
            className={styles.input}
            name="nom"
            placeholder="Nombre"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Apellido</label>
          <input
            className={styles.input}
            name="ape"
            placeholder="Apellido"
            value={form.ape}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Correo electrónico</label>
          <input
            className={styles.input}
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Teléfono</label>
          <input
            className={styles.input}
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* 🔐 ROLES */}
      <div className={styles.roles}>
        <RoleSelector roles={roles} setRoles={setRoles} />
      </div>

      {/* 👨‍⚕️ DOCTOR */}
      {roles.includes("ROLE_DOCTOR") && (
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Registro médico</label>
            <input
              className={styles.input}
              name="registroMedico"
              placeholder="Registro Médico"
              value={extraData.registroMedico || ""}
              onChange={handleExtra}
            />
          </div>

          <div className={styles.field}>
            <label>Especialidad</label>
            <input
              className={styles.input}
              name="especialidad"
              placeholder="Especialidad"
              value={extraData.especialidad || ""}
              onChange={handleExtra}
            />
          </div>

          <div className={styles.field}>
            <label>Subespecialidades</label>
            <input
              className={styles.input}
              name="subEspecialidades"
              placeholder="Subespecialidades separadas por coma"
              value={
                Array.isArray(extraData.subEspecialidades)
                  ? extraData.subEspecialidades.join(", ")
                  : ""
              }
              onChange={handleExtra}
            />
          </div>

          <div className={styles.field}>
            <label>Años de experiencia</label>
            <input
              className={styles.input}
              name="aniosExperiencia"
              placeholder="Experiencia"
              value={extraData.aniosExperiencia || ""}
              onChange={handleExtra}
            />
          </div>
        </div>
      )}

      {/* 👩‍⚕️ ENFERMERA */}
      {roles.includes("ROLE_NURSE") && (
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Registro profesional</label>
            <input
              className={styles.input}
              name="registroProfesional"
              placeholder="Registro Profesional"
              value={extraData.registroProfesional || ""}
              onChange={handleExtra}
            />
          </div>

          <div className={styles.field}>
            <label>Área</label>
            <input
              className={styles.input}
              name="area"
              placeholder="Área"
              value={extraData.area || ""}
              onChange={handleExtra}
            />
          </div>

          <div className={styles.field}>
            <label>Habilidades</label>
            <input
              className={styles.input}
              name="habilidades"
              placeholder="Habilidades separadas por coma"
              value={
                Array.isArray(extraData.habilidades)
                  ? extraData.habilidades.join(", ")
                  : ""
              }
              onChange={handleExtra}
            />
          </div>
        </div>
      )}

      <button className={styles.button} type="submit">
        Guardar
      </button>
    </form>
  );
}