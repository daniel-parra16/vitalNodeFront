import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>

            <p>Bienvenido: {user?.nombres}</p>

            <p>Roles:</p>
            <ul>
                {user?.roles?.map((role, index) => (
                    <li key={index}>{role}</li>
                ))}
            </ul>
        </div>
    );
}