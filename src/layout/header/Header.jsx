import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header({ toggleSidebar }) {
    const { logout, user } = useAuth();

    return (
        <header className="header">
            <button onClick={toggleSidebar} className="menu-btn">
                <Menu size={20} />
            </button>

            <div className="right-section">

                <span style={{ marginLeft: "auto" }}>
                    {user?.nombres || "Usuario"}
                </span>

                <button className="logout-btn" onClick={logout}>
                    <LogOut size={14} />
                    Salir
                </button>
            </div>
        </header>
    );
}