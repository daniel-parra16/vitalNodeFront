import { useState, useEffect } from "react";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    updateRoles,
    createDoctor,
    createNurse,
    getDoctorById,
    getNurseById
} from "../services/userService";

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 📊 OBTENER USUARIOS
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar usuarios");
        } finally {
            setLoading(false);
        }
    };

    // ➕ CREAR USUARIO
    const create = async (userData, extraData) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Crear usuario base
            const newUser = await createUser(userData);

            const numeroDocumento = userData.numeroDocumento;
            const roles = userData.roles;

            // 2. Crear médico o enfermera si aplica
            if (roles.includes("ROLE_DOCTOR")) {
                await createDoctor(numeroDocumento, extraData);
            }

            if (roles.includes("ROLE_NURSE")) {
                await createNurse(numeroDocumento, extraData);
            }

            await fetchUsers(); // 🔄 refrescar lista

            return { success: true };

        } catch (err) {
            setError(err.response?.data?.message || "Error al crear usuario");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // ✏️ ACTUALIZAR USUARIO
    const update = async (numeroDocumento, data) => {
        setLoading(true);
        setError(null);

        try {
            await updateUser(numeroDocumento, data);
            await fetchUsers();

            return { success: true };

        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // 🔐 ACTUALIZAR ROLES
    const changeRoles = async (numeroDocumento, roles) => {
        setLoading(true);
        setError(null);

        try {
            await updateRoles(numeroDocumento, roles);
            await fetchUsers();

            return { success: true };

        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar roles");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // ❌ ELIMINAR USUARIO
    const remove = async (numeroDocumento) => {
        setLoading(true);
        setError(null);

        try {
            await deleteUser(numeroDocumento);
            await fetchUsers();

            return { success: true };

        } catch (err) {
            setError(err.response?.data?.message || "Error al eliminar");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    // 👨‍⚕️ OBTENER DATOS MÉDICO
    const getDoctorData = async (numeroDocumento) => {
        try {
            return await getDoctorById(numeroDocumento);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar médico");
            return null;
        }
    };

    // 👩‍⚕️ OBTENER DATOS ENFERMERA
    const getNurseData = async (numeroDocumento) => {
        try {
            return await getNurseById(numeroDocumento);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar enfermera");
            return null;
        }
    };

    // 🔄 cargar al iniciar
    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        error,
        fetchUsers,
        create,
        update,
        remove,
        changeRoles,
        getDoctorData,
        getNurseData
    };
}