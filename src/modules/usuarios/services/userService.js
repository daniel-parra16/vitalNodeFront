import axios from "../../../api/axiosConfig";

// 📊 LISTAR USUARIOS
export const getUsers = async () => {
    const res = await axios.get("/usuarios");
    return res.data.data;
};

// 🔍 OBTENER POR ID
export const getUserById = async (numeroDocumento) => {
    const res = await axios.get(`/usuarios/${numeroDocumento}`);
    return res.data.data;
};

// ➕ CREAR USUARIO
export const createUser = async (data) => {
    const res = await axios.post("/usuarios", data);
    return res.data.data;
};

// ✏️ ACTUALIZAR USUARIO
export const updateUser = async (numeroDocumento, data) => {
    const res = await axios.put(`/usuarios/${numeroDocumento}`, data);
    return res.data.data;
};

// 🔐 ACTUALIZAR ROLES
export const updateRoles = async (numeroDocumento, roles) => {
    const res = await axios.put(`/usuarios/${numeroDocumento}/roles`, {
        roles,
    });
    return res.data.data;
};

// ❌ ELIMINAR USUARIO
export const deleteUser = async (numeroDocumento) => {
    const res = await axios.delete(`/usuarios/${numeroDocumento}`);
    return res.data.data;
};

// 👨‍⚕️ CREAR MÉDICO
export const createDoctor = async (numeroDocumento, data) => {
    const res = await axios.post(`/medicos/${numeroDocumento}`, data);
    return res.data.data;
};

// 👩‍⚕️ CREAR ENFERMERA
export const createNurse = async (numeroDocumento, data) => {
    const res = await axios.post(`/enfermeras/${numeroDocumento}`, data);
    return res.data.data;
};