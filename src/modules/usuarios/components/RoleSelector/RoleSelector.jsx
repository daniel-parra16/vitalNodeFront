export default function RoleSelector({ roles, setRoles }) {
    const allRoles = [
        "ROLE_ADMIN",
        "ROLE_USER",
        "ROLE_DOCTOR",
        "ROLE_NURSE",
    ];

    const toggleRole = (role) => {
        if (roles.includes(role)) {
            setRoles(roles.filter((r) => r !== role));
        } else {
            setRoles([...roles, role]);
        }
    };

    return (
        <div>
            <label>Roles</label>

            {allRoles.map((role) => (
                <div key={role}>
                    <input
                        type="checkbox"
                        checked={roles.includes(role)}
                        onChange={() => toggleRole(role)}
                    />
                    {role}
                </div>
            ))}
        </div>
    );
}