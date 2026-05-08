import { useState } from "react";
import useUsers from "../hooks/useUsers";

import UserTable from "../components/UserTable/UserTable";
import UserModal from "../components/UserModal/UserModal";
import UserForm from "../components/UserForm/UserForm";

import LoadingModal from "../../../components/LoadingModal/LoadingModal";

export default function UsersPage() {
    const {
        users,
        loading,
        error,
        create,
        update,
        remove,
        getDoctorData,
        getNurseData
    } = useUsers();

    const [isOpen, setIsOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [confirmDelete, setConfirmDelete] = useState(null);

    // 🟢 ABRIR CREAR
    const handleCreate = () => {
        setEditingUser(null);
        setIsOpen(true);
    };

    // 🟡 EDITAR
    const handleEdit = (user) => {
        setEditingUser(user);
        setIsOpen(true);
    };

    // 🔴 ELIMINAR (CONFIRMACIÓN)
    const handleDelete = (user) => {
        setConfirmDelete(user);
    };

    const confirmDeleteUser = async () => {
        await remove(confirmDelete.numeroDocumento);
        setConfirmDelete(null);
    };

    // 💾 SUBMIT FORM
    const handleSubmit = async (formData, extraData) => {
        let res;

        if (editingUser) {
            res = await update(editingUser.numeroDocumento, formData);
        } else {
            res = await create(formData, extraData);
        }

        if (res.success) {
            setIsOpen(false);
            setEditingUser(null);
        }
    };

    return (
        <div>

            <h2>Gestión de Usuarios</h2>

            {/* ➕ BOTÓN CREAR */}
            <button onClick={handleCreate} style={{ marginBottom: "15px" }}>
                Crear Usuario
            </button>

            {/* ❗ ERROR */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 📊 TABLA */}
            <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* 🧩 MODAL CREAR / EDITAR */}
            <UserModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={editingUser ? "Editar Usuario" : "Crear Usuario"}
            >
                <UserForm
                    onSubmit={handleSubmit}
                    initialData={editingUser}
                    getDoctorData={getDoctorData}
                    getNurseData={getNurseData}
                />
            </UserModal>

            {/* ❌ MODAL CONFIRMACIÓN ELIMINAR */}
            <UserModal
                isOpen={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                title="Confirmar eliminación"
            >
                <p>
                    ¿Seguro que deseas eliminar a{" "}
                    <b>
                        {confirmDelete?.nom} {confirmDelete?.ape}
                    </b>
                    ?
                </p>

                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                    <button onClick={confirmDeleteUser}>
                        Sí, eliminar
                    </button>

                    <button onClick={() => setConfirmDelete(null)}>
                        Cancelar
                    </button>
                </div>
            </UserModal>

            {/* 🔄 LOADING GLOBAL */}
            <LoadingModal isOpen={loading} />

        </div>
    );
}