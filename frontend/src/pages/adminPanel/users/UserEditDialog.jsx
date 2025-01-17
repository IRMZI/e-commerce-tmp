import React, { useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";
import "./UserEditDialog.css";

export default function UserEditDialog({ open, onClose, user, onSave }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    onSave(formData._id, formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="dialogContainer">
        <h2>Editar Usuário</h2>
        <form className="formContainer" aria-label="Formulário de edição de usuário">
          <TextField
            label="Nome"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            fullWidth
            aria-required="true"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            aria-required="true"
          />
          <TextField
            label="Telefone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            aria-required="true"
          />
          <TextField
            label="Rua"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            fullWidth
            aria-required="true"
          />
          <TextField
            label="Número"
            name="address.number"
            value={formData.address.number}
            onChange={handleChange}
            fullWidth
            aria-required="true"
          />
          <TextField
            label="Cidade"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            fullWidth
            aria-required="true"
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Administrador"
            name="isAdmin"
            value={formData.isAdmin}
            onChange={handleChange}
            fullWidth
          />
          <div className="dialogActions">
            <Button onClick={onClose} aria-label="Cancelar">Cancelar</Button>
            <Button onClick={handleSave} color="primary" aria-label="Salvar">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
