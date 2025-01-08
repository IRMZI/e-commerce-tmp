import React, { useEffect, useState } from "react";
import usersServices from "../../../services/users";
import Loading from "../../loading/page";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import "./adminUsers.css";

export default function AdminUsers() {
  const {
    getUsers,
    usersList,
    userLoading,
    updateUser,
    deleteUser,
    getUserById,
    refetchUsers,
  } = usersServices();

  const [editedUsers, setEditedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (refetchUsers) {
      getUsers();
    }
  }, [refetchUsers]);

  useEffect(() => {
    setEditedUsers(usersList); // Initialize users with original data
  }, [usersList]);

  const handleInputChange = (id, field, value) => {
    const keys = field.split(".");
    setSelectedUser((prev) => {
      if (prev && prev._id === id) {
        if (keys.length > 1) {
          return {
            ...prev,
            [keys[0]]: {
              ...prev[keys[0]],
              [keys[1]]: value,
            },
          };
        } else {
          return { ...prev, [field]: value };
        }
      }
      return prev;
    });
  };

  const handleSave = async (id) => {
    const userToSave = selectedUser;
    await updateUser(id, userToSave); // Call service to update user
    setEditedUsers((prev) =>
      prev.map((user) => (user._id === id ? userToSave : user))
    );
    handleDialogClose();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    getUsers();
  };

  const handleRowClick = async (id) => {
    const user = await getUserById(id);
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const toggleAdmin = async (id) => {
    const userToUpdate = editedUsers.find((user) => user._id === id);
    if (userToUpdate) {
      userToUpdate.isAdmin = !userToUpdate.isAdmin;
      await updateUser(id, userToUpdate); // Call service to update user
      setEditedUsers((prev) =>
        prev.map((user) => (user._id === id ? userToUpdate : user))
      );
      if (selectedUser && selectedUser._id === id) {
        setSelectedUser(userToUpdate);
      }
    }
  };

  const filteredUsers = editedUsers.filter((user) => {
    const matchesSearch = user.fullname.includes(searchTerm) || user.email.includes(searchTerm) || user._id.includes(searchTerm);
    const matchesType = filterType === "all" || (filterType === "admin" ? user.isAdmin : !user.isAdmin);
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="admin-users-container">
      <h2>Gerenciamento de Usuários</h2>
      <hr className="admin-users-separator" />

      {/* Filters */}
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nome, email ou ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton>
            <Search />
          </IconButton>
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Todos</option>
          <option value="admin">Admin</option>
          <option value="client">Cliente</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Todos</option>
          <option value="active">Ativo</option>
          <option value="blocked">Bloqueado</option>
          <option value="suspended">Suspenso</option>
        </select>
      </div>

      {/* User Table */}
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} onClick={() => handleRowClick(user._id)}>
              <td>{user.fullname}</td>
              <td>{user._id}</td>
              <td>
                <IconButton onClick={() => handleRowClick(user._id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(user._id)}>
                  <Delete />
                </IconButton>
                <Button
                  variant="contained"
                  color={user.isAdmin ? "primary" : "default"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAdmin(user._id);
                  }}
                >
                  {user.isAdmin ? "Rebaixar" : "Promover"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              name="fullname"
              value={selectedUser.fullname}
              onChange={(e) => handleInputChange(selectedUser._id, "fullname", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={selectedUser.email}
              onChange={(e) => handleInputChange(selectedUser._id, "email", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Telefone"
              name="phone"
              value={selectedUser.phone}
              onChange={(e) => handleInputChange(selectedUser._id, "phone", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rua"
              name="address.street"
              value={selectedUser.address.street}
              onChange={(e) => handleInputChange(selectedUser._id, "address.street", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Número"
              name="address.number"
              value={selectedUser.address.number}
              onChange={(e) => handleInputChange(selectedUser._id, "address.number", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cidade"
              name="address.city"
              value={selectedUser.address.city}
              onChange={(e) => handleInputChange(selectedUser._id, "address.city", e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CEP"
              name="zipcode"
              value={selectedUser.zipcode}
              onChange={(e) => handleInputChange(selectedUser._id, "zipcode", e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={selectedUser.status}
                onChange={(e) => handleInputChange(selectedUser._id, "status", e.target.value)}
              >
                <MenuItem value="active">Ativo</MenuItem>
                <MenuItem value="blocked">Bloqueado</MenuItem>
                <MenuItem value="suspended">Suspenso</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={() => handleSave(selectedUser._id)} color="primary">
              Salvar
            </Button>
            <Button onClick={() => handleDelete(selectedUser._id)} color="error">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
