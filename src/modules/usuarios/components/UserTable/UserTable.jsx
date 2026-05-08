import "./UserTable.css";

export default function UserTable({ users, onEdit, onDelete }) {
    const roleLabels = {
  ROLE_ADMIN: "Administrador",
  ROLE_DOCTOR: "Doctor",
  ROLE_NURSE: "Enfermera",
  ROLE_USER: "Paciente",
};
    return (
        <div className="table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="empty">
                                No hay usuarios registrados
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.numeroDocumento}>
                                <td>{user.numeroDocumento}</td>

                                <td>
                                    {user.nom} {user.ape}
                                </td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                                <td>
                                    <span className="role-badge">
                                        {user.roles
                                        ?.map((role) => roleLabels[role] || role)
                                        .join(", ")}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`status ${user.activo ? "active" : "inactive"
                                            }`}
                                    >
                                        {user.activo ? "Activo" : "Inactivo"}
                                    </span>
                                </td>

                                <td className="actions">
                                    <button
                                        className="btn edit"
                                        onClick={() => onEdit(user)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn delete"
                                        onClick={() => onDelete(user)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}