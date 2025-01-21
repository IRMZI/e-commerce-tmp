import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import orderServices from "../../services/order";
import addressServices from "../../services/address";
import usersServices from "../../services/users"; // Import usersServices
import "./profile.css";
import { Link } from "react-router-dom";
import Loading from "../loading/page";
import { HiLogout } from "react-icons/hi";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaEdit,
} from "react-icons/fa";
import { z } from "zod";

const statusLabels = {
  pending: "Pendente",
  completed: "Entregue",
  processing: "Processando",
  cancelled: "Cancelado",
};

export default function Profile() {
  const { logout } = authServices();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } =
    orderServices();
  const { validateAddress } = addressServices();
  const { updateUser, checkEmailExists } = usersServices();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const cepSchema = z
    .string()
    .nonempty("O CEP não pode estar vazio.")
    .regex(/\d{5}-\d{3}/, "O CEP deve estar no formato 12345-678");
  const phoneSchema = z
    .string()
    .nonempty("O telefone é obrigatório.")
    .regex(/^\d{2} \d{4,5}-\d{4}$/, "O telefone deve estar no formato 51 XXXXX-XXXX ou 51 XXXX-XXXX");

  const addressSchema = z.object({
    street: z.string().nonempty("A rua é obrigatória."),
    number: z.string().nonempty("O número é obrigatório."),
    city: z.string().nonempty("A cidade é obrigatória."),
    zipcode: z
      .string()
      .nonempty("O CEP não pode estar vazio.")
      .regex(/\d{5}-\d{3}/, "O CEP deve estar no formato 12345-678"),
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    street: authData?.user?.address?.street || "",
    number: authData?.user?.address?.number || "",
    city: authData?.user?.address?.city || "",
    zipcode: authData?.user?.address?.zipcode || "",
  });
  const [editedPhone, setEditedPhone] = useState(authData?.user?.phone || "");
  const [editedEmail, setEditedEmail] = useState(authData?.user?.email || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!authData) {
      return navigate("/auth");
    } else if (refetchOrders) {
      getUserOrders(authData?.user?._id);
    }
  }, [authData, refetchOrders]);

  if (orderLoading) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    return navigate("/");
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveAddress = async () => {
    try {
      addressSchema.parse(editedAddress);

      const userId = authData?.user?._id;
      const result = await updateUser(userId, { address: editedAddress });
      if (result.success) {
        setIsEditingAddress(false);
        alert("Endereço atualizado com sucesso! faça login novamente");
        logout();
        return navigate("/auth");
      } else {
        console.error(result.message || "Erro ao atualizar o endereço.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      } else {
        console.log("Houve um problema ao salvar o endereço.", error);
      }
    }
  };

  const handleSavePhone = async () => {
    try {
      phoneSchema.parse(editedPhone);
      const userId = authData?.user?._id;
      const result = await updateUser(userId, { phone: editedPhone });
      if (result.success) {
        setIsEditingPhone(false);
        alert("Telefone atualizado com sucesso! faça login novamente");
        logout();
        return navigate("/auth");
      } else {
        console.error(result.message || "Erro ao atualizar o telefone.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors({ phone: error.errors[0]?.message });
      } else {
        console.log("Houve um problema ao salvar o telefone.", error);
      }
    }
  };

  const handleSaveEmail = async () => {
    try {
      if (editedEmail !== authData?.user?.email) {
        const response = await checkEmailExists(editedEmail);
        if (response.exists) {
          setErrors({ email: "Este email já está em uso." });
          return;
        }
      }

      const userId = authData?.user?._id;
      const result = await updateUser(userId, { email: editedEmail });
      if (result.success) {
        setIsEditingEmail(false);
        alert("Email atualizado com sucesso! Faça login novamente.");
        logout();
        return navigate("/auth");
      } else {
        console.error(result.message || "Erro ao atualizar o email.");
      }
    } catch (error) {
      console.log("Houve um problema ao salvar o email.", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setEditedPhone(value);
      setErrors((prev) => ({ ...prev, phone: null }));
    } else if (name === "email") {
      setEditedEmail(value);
      setErrors((prev) => ({ ...prev, email: null }));
    } else {
      setEditedAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCepBlur = async (e) => {
    const value = e.target.value.trim();
    try {
      const formattedCep = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
      if (formattedCep !== editedAddress.zipcode) {
        setEditedAddress((prev) => ({ ...prev, zipcode: formattedCep }));
      }

      cepSchema.parse(formattedCep);

      const data = await validateAddress(formattedCep);
      setEditedAddress((prev) => ({
        ...prev,
        street: data.street || prev.street,
        city: data.city || prev.city,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, zipcode: error.errors[0]?.message }));
      } else {
        console.error("Erro ao buscar informações do CEP:", error);
      }
    }
  };
  return (
    <div className="modern-profile-container">
      <div className="profile-header">
        <div className="header-content">
          <div className="user-avatar">
            <FaUser />
            <h1>{authData?.user?.fullname || "Usuário não identificado"}</h1>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <HiLogout /> Sair
          </button>
        </div>
      </div>

      <div className="profile-content">
        <section className="info-card">
          <div className="info-group">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h3>Email</h3>
                {isEditingEmail ? (
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={editedEmail}
                      onChange={handleChange}
                      placeholder="Email"
                      className="modern-input"
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                    <button
                      type="button"
                      onClick={handleSaveEmail}
                      className="save-button"
                    >
                      Salvar Email
                    </button>
                  </div>
                ) : (
                  <p>
                    {authData?.user?.email || "Email não disponível"}
                    <button onClick={() => setIsEditingEmail(true)} className="edit-button">
                      <FaEdit /> Editar Email
                    </button>
                  </p>
                )}
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <h3>Telefone</h3>
                {isEditingPhone ? (
                  <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      value={editedPhone}
                      onChange={handleChange}
                      placeholder="Telefone"
                      className="modern-input"
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                    <button
                      type="button"
                      onClick={handleSavePhone}
                      className="save-button"
                    >
                      Salvar Telefone
                    </button>
                  </div>
                ) : (
                  <p>
                    {authData?.user?.phone || "Telefone não disponível"}
                    <button onClick={() => setIsEditingPhone(true)} className="edit-button">
                      <FaEdit /> Editar Telefone
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="address-section">
            <div className="section-header">
              <FaMapMarkerAlt className="section-icon" />
              <h2>Endereço</h2>
            </div>
            {isEditingAddress ? (
              <form className="modern-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="street"
                    value={editedAddress.street}
                    onChange={handleChange}
                    placeholder="Rua"
                    className="modern-input"
                  />
                  {errors.street && (
                    <span className="error-message">{errors.street}</span>
                  )}
                  <input
                    type="text"
                    name="number"
                    value={editedAddress.number}
                    onChange={handleChange}
                    placeholder="Número"
                    className="modern-input"
                  />
                  {errors.number && (
                    <span className="error-message">{errors.number}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    value={editedAddress.city}
                    onChange={handleChange}
                    placeholder="Cidade"
                    className="modern-input"
                  />
                  {errors.city && (
                    <span className="error-message">{errors.city}</span>
                  )}
                  <input
                    type="text"
                    name="zipcode"
                    value={editedAddress.zipcode}
                    onChange={handleChange}
                    onBlur={handleCepBlur}
                    placeholder="CEP"
                    className="modern-input"
                  />
                  {errors.zipcode && (
                    <span className="error-message">{errors.zipcode}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="save-button"
                >
                  Salvar Alterações
                </button>
              </form>
            ) : (
              <div className="address-display">
                <p className="address-text">
                  {authData?.user?.address?.street || "Rua não informada"},
                  {authData?.user?.address?.number || "Número não informado"} -
                  {authData?.user?.address?.city || "Cidade não informada"},
                  {authData?.user?.zipcode || "CEP não informado"}
                </p>
                <button onClick={handleEditAddress} className="edit-button">
                  <FaEdit /> Editar Endereço
                </button>
              </div>
            )}
          </div>
          {authData?.user?.isAdmin && (
            <Link to="/admin/dashboard">
              <button className="admin-button">Painel de Admin</button>
            </Link>
          )}
        </section>

        <section className="orders-section">
          <h2>Seus Pedidos</h2>

          {/* Exibição no Desktop */}
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID do Pedido</th>
                  <th>Status</th>
                  <th>Horário P</th>
                  <th>Data Entrega</th>
                  <th>Itens</th>
                  <th>Data de Criação</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">{order._id}</td>
                    <td>
                      <span className={`status-badge ${order.pickupStatus}`}>
                        {statusLabels[order.pickupStatus] || order.pickupStatus}
                      </span>
                    </td>
                    <td>{order.pickupTime || "Não informado"}</td>
                    <td>{order.deliveryDate || "Aguardando ADM"}</td>
                    <td>
                      <div className="order-items">
                        {order.orderItems.map((item) => (
                          <div key={item._id} className="order-item">
                            <span className="item-name">
                              {item.itemDetails[0]?.name || "Indisponível"}
                            </span>
                            <span className="item-quantity">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>{order.createDate || "Não informado"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Exibição no Mobile */}
          <div className="order-card-container">
            {ordersList.map((order) => (
              <div key={order._id} className="order-card">
                <h3>Pedido: {order._id}</h3>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${order.pickupStatus}`}>
                    {statusLabels[order.pickupStatus] || order.pickupStatus}
                  </span>
                </p>
                <p>
                  <strong>Horário P:</strong>{" "}
                  {order.pickupTime || "Não informado"}
                </p>
                <p>
                  <strong>Data Entrega:</strong>{" "}
                  {order.deliveryDate || "Aguardando ADM"}
                </p>
                <p>
                  <strong>Itens:</strong>
                  {order.orderItems.map((item) => (
                    <span key={item._id} className="card-itens">
                      {item.itemDetails[0]?.name || "Indisponível"} x
                      {item.quantity}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Data de Criação:</strong>{" "}
                  {order.createDate || "Não informado"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
