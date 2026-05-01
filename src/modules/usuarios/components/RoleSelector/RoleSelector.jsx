import styles from "./RoleSelector.module.css";

export default function RoleSelector({ roles, setRoles }) {
  const allRoles = ["ROLE_ADMIN", "ROLE_USER", "ROLE_DOCTOR", "ROLE_NURSE"];

  // 🔤 Mapeo de nombres visibles
  const roleLabels = {
    ROLE_ADMIN: "Administrador",
    ROLE_USER: "Paciente",
    ROLE_DOCTOR: "Doctor",
    ROLE_NURSE: "Enfermera",
  };

  const toggleRole = (role) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Roles:</span>
      <div className={styles.roles}>
        {allRoles.map((role) => (
          <label key={role} className={styles.option}>
            <input
              type="checkbox"
              checked={roles.includes(role)}
              onChange={() => toggleRole(role)}
            />
            {roleLabels[role]}
          </label>
        ))}
      </div>
    </div>
  );
}
