import { useEffect, useState } from "react";
import usersServices from "../../../services/users";
import Loading from "../../loading/page";
import "./adminUsers.css";

export default function AdminUsers() {
  const {
    getUsers,
    usersList,
    userLoading,
    updateUser,
    deleteUser,
    refetchUsers,
  } = usersServices();

  const [editedUsers, setEditedUsers] = useState([]);

  useEffect(() => {
    if (refetchUsers) {
      getUsers();
    }
  }, [refetchUsers]);

  useEffect(() => {
    setEditedUsers(usersList); // Inicializa os usuários com os dados originais
  }, [usersList]);

  const handleInputChange = (id, field, value) => {
    setEditedUsers((prev) =>
      prev.map((user) => (user._id === id ? { ...user, [field]: value } : user))
    );
  };

  const handleSave = async (id) => {
    const userToSave = editedUsers.find((user) => user._id === id);
    await updateUser(id, userToSave); // Chama o serviço para atualizar o usuário
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    getUsers();
  };

  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="admin-users-container">
      <h2>Gerenciamento de Usuários</h2>
      <hr className="admin-users-separator" />

      {/* Tabela de usuários */}
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Administrador</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editedUsers?.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="text"
                  value={user.fullname || ""}
                  onChange={(e) =>
                    handleInputChange(user._id, "fullname", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    handleInputChange(user._id, "email", e.target.value)
                  }
                />
              </td>
              <td>
                {user.isAdmin ? (
                  <span className="admin-users-admin-badge">Sim</span>
                ) : (
                  "Não"
                )}
              </td>
              <td>
                <button
                  className="admin-users-save-button"
                  onClick={() => handleSave(user._id)}
                >
                  Salvar
                </button>
                <button
                  className="admin-users-delete-button"
                  onClick={() => handleDelete(user._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
