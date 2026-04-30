import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import Dashboard from "../modules/dashboard/Dashboard";

import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout";
import UsersPage from "../modules/usuarios/pages/UsersPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* PRIVATE CON LAYOUT */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <MainLayout />
                        </PrivateRoute>
                    }
                >
                    <Route index path="dashboard" element={<Dashboard />} />

                    <Route
                        path="admin"
                        element={
                            <PrivateRoute roles={["ROLE_ADMIN"]}>
                                <h1>Panel Admin</h1>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="usuarios"
                        element={
                            <PrivateRoute roles={["ROLE_ADMIN"]}>
                                <UsersPage />
                            </PrivateRoute>
                        }
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}