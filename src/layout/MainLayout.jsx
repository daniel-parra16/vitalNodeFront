import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Header from "./header/Header";
import Sidebar from "./sidebar/sidebar";
import Footer from "./footer/Footer";

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="layout">
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <Sidebar collapsed={collapsed} />
            </aside>

            <div className="main">
                <Header toggleSidebar={() => setCollapsed(!collapsed)} />

                <main className="content">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}