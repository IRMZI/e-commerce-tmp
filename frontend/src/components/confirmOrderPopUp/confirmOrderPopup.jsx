import { Dialog } from "@mui/material";
import "./confirmOrderPopup.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function ConfirmOrderPopup({ open, onClose, onConfirm }) {
  const [formData, setFormData] = useState(null);
  const authData = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!authData?.user?._id) {
      return navigate("/auth");
    } else {
      if (!formData?.pickupTime) {
        return;
      } else {
        const orderData = {
          userId: authData?.user?._id,
          pickupTime: formData?.pickupTime,
          address: authData?.user?.address,
          createDate: new Date().toLocaleDateString(),
        };

        onConfirm(orderData);
      }
    }
  };

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="popupContainer">
        <h2>Quase lá...</h2>
        <p>
          Data do pedido: <strong>{new Date().toLocaleDateString()}</strong>.
        </p>
        <p>
          Qual seria o
          <strong className="tooltip">
            melhor horário de entrega?
            <span className="tooltipText">
              Utilizamos o horário fornecido para entender a preferência de
              nossos clientes quanto ao momento da entrega. No entanto, as
              entregas serão agendadas conforme a data definida pelo
              administrador.
            </span>
          </strong>
        </p>
        <form className="formContainer">
          <TextField
            onChange={handleFormDataChange}
            required
            type="time"
            name="pickupTime"
          />
          <p>
            <strong>
              Após a criação do pedido, ele será adicionado à sua aba de perfil.
              Assim que for confirmado por um administrador, a data de entrega
              será agendada, e você receberá uma notificação por e-mail ou
              whatsapp.
            </strong>
          </p>
          <div className="confirmBtns">
            <button className="cancelBtn" onClick={onClose}>
              Cancelar
              <HiXCircle />
            </button>
            <button onClick={handleConfirm}>
              Confirmar
              <HiCheckCircle />
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
