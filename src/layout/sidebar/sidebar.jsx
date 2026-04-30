import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ collapsed }) {
    const { user } = useAuth();

    const roles = user?.roles || [];

    const menu = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            roles: ["ROLE_ADMIN", "ROLE_USER", "ROLE_DOCTOR", "ROLE_NURSE"],
        },
        {
            to: "/usuarios",
            label: "Usuarios",
            icon: <Users size={20} />,
            roles: ["ROLE_ADMIN"],
        },
        {
            to: "/citas",
            label: "Citas",
            icon: <Calendar size={20} />,
            roles: ["ROLE_ADMIN", "ROLE_USER", "ROLE_DOCTOR"],
        },
    ];

    const visibleMenu = menu.filter((item) =>
        item.roles.some((r) => roles.includes(r))
    );

    return (
        <div className="sidebar-container">
            <div className="logo">
                {!collapsed ? "VITALNODE" : "V"}
            </div>

            <nav>
                {visibleMenu.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? "active" : ""}`
                        }
                    >
                        {item.icon}
                        {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}