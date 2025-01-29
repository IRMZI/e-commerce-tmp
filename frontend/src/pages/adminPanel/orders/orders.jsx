import React, { useEffect, useState } from "react";
import ordersService from "../../../services/order";
import productsServices from "../../../services/products";
import Loading from "../../loading/page";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import SearchIcon from "@mui/icons-material/Search";
import "./AdminOrders.css";

export default function AdminOrders() {
  const {
    getOrders,
    ordersList,
    orderLoading,
    addItemToOrder,
    updateItemQuantity,
    removeItemFromOrder,
    updateOrder,
  } = ordersService();
  const { getAvailablesProducts, productsList, getProductNameById } =
    productsServices();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getOrders(); // Carrega os pedidos
    getAvailablesProducts(); // Carrega os produtos
  }, []);

  const handleOpenEditDialog = (order) => {
    setSelectedOrder({ ...order, orderItems: [...order.orderItems] }); // Clona o pedido selecionado
    setActions([]); // Reseta as ações ao abrir o diálogo
  };

  const handleCloseEditDialog = () => {
    setSelectedOrder(null);
    setActions([]);
  };

  const handleInputChange = (field, value) => {
    if (field === "deliveryDate" && value.length > 10) return; // Ensure max length for date
    setSelectedOrder((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNewItem = (productId) => {
    const product = productsList.find((prod) => prod._id === productId);
    if (product) {
      const newItem = { productId, quantity: 1 }; // Ensure quantity is set to 1
      setSelectedOrder((prev) => ({
        ...prev,
        orderItems: [...prev.orderItems, newItem],
      }));
      setActions((prev) => [...prev, { type: "add", productId }]);
    }
  };

  const handleOrderItemChange = (index, quantity) => {
    const updatedItems = [...selectedOrder.orderItems];
    updatedItems[index].quantity = quantity;
    setSelectedOrder((prev) => ({ ...prev, orderItems: updatedItems }));

    const itemId = updatedItems[index]._id;
    setActions((prev) => [...prev, { type: "update", itemId, quantity }]);
  };

  const handleRemoveOrderItem = (index) => {
    const itemId = selectedOrder.orderItems[index]._id;
    setSelectedOrder((prev) => ({
      ...prev,
      orderItems: prev.orderItems.filter((_, i) => i !== index),
    }));
    setActions((prev) => [...prev, { type: "remove", itemId }]);
  };

  const formatDate = (date) => {
    if (!date) return "Data não disponível";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    if (!selectedOrder) return;

    try {
      // Processa as ações acumuladas
      for (const action of actions) {
        switch (action.type) {
          case "add":
            await addItemToOrder(selectedOrder._id, {
              productId: action.productId,
              quantity: 1,
            }); // Ensure quantity is set to 1
            break;
          case "update":
            await updateItemQuantity(
              selectedOrder._id,
              action.itemId,
              action.quantity
            );
            break;
          case "remove":
            await removeItemFromOrder(selectedOrder._id, action.itemId);
            break;
          default:
            console.warn("Ação desconhecida:", action);
        }
      }

      // Limpa o pedido para salvar
      const cleanedOrder = {
        pickupStatus: selectedOrder.pickupStatus,
        pickupTime: selectedOrder.pickupTime,
        deliveryDate: formatDate(selectedOrder.deliveryDate),
      };
      await updateOrder(selectedOrder._id, cleanedOrder);

      // Atualiza a lista de pedidos
      getOrders();
    } catch (error) {
      console.error("Erro ao salvar o pedido:", error);
    } finally {
      handleCloseEditDialog();
    }
  };

  const filteredOrders = ordersList.filter((order) =>
    order._id.includes(searchTerm)
  );

  const availableProducts = productsList.filter(
    (product) =>
      !selectedOrder?.orderItems.some((item) => item.productId === product._id)
  );

  if (orderLoading) {
    return <Loading />;
  }
  return (
    <div className="admin-orders-container">
      <h2>Gerenciamento de Pedidos</h2>
      <hr className="admin-orders-separator" />

      {/* Busca */}
      <TextField
        label="Buscar por ID"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Lista de Pedidos */}
      <List>
        {filteredOrders.map((order) => (
          <ListItem
            button="true"
            key={order._id}
            onClick={() => handleOpenEditDialog(order)}
          >
            <ListItemText
              primary={`Pedido ID: ${order._id} - Data de Criação: ${
                order.createDate ? order.createDate : "Data não disponível"
              }`}
            />
          </ListItem>
        ))}
      </List>

      {/* Diálogo de Edição */}
      <Dialog
        open={!!selectedOrder}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Pedido</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <p>
                <strong>Usuário:</strong>{" "}
                {selectedOrder.userDetails[0]?.fullname} (
                {selectedOrder.userDetails[0]?.email})
              </p>
              <p>
                <strong>Endereço:</strong>{" "}
                {`${selectedOrder.userDetails[0]?.address.street}, ${selectedOrder.userDetails[0]?.address.number}, ${selectedOrder.userDetails[0]?.address.city}`}
              </p>
              <TextField
                label="Hora de Retirada"
                type="time"
                fullWidth
                value={selectedOrder.pickupTime || ""}
                onChange={(e) =>
                  handleInputChange("pickupTime", e.target.value)
                }
                margin="normal"
              />
              <TextField
                label="Data de Entrega"
                type="date"
                fullWidth
                value={
                  selectedOrder.deliveryDate
                    ? selectedOrder.deliveryDate.split("/").reverse().join("-")
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("deliveryDate", e.target.value)
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ maxLength: 10 }} // Set max length for date input
                placeholder="dd/mm/aaaa"
              />
              <h4>Status do pedido:</h4>
              <Select
                value={selectedOrder.pickupStatus || ""}
                onChange={(e) =>
                  handleInputChange("pickupStatus", e.target.value)
                }
                fullWidth
                margin="dense"
              >
                <MenuItem value="pending">Pendente</MenuItem>
                <MenuItem value="processing">Em Processamento</MenuItem>
                <MenuItem value="completed">Concluído</MenuItem>
                <MenuItem value="canceled">Cancelado</MenuItem>
              </Select>
              <h4>Itens do Pedido</h4>
              <List>
                {selectedOrder.orderItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={getProductNameById(item.productId)}
                      secondary={`Quantidade: `}
                    />
                    <TextField
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        handleOrderItemChange(
                          index,
                          Math.max(1, parseInt(e.target.value, 10))
                        )
                      }
                      style={{ width: "60px", marginRight: "10px" }}
                      inputProps={{ min: 1 }}
                    />
                    <IconButton
                      onClick={() => handleRemoveOrderItem(index)}
                      color="error"
                    >
                      <IoIosRemoveCircleOutline />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Select
                value=""
                onChange={(e) => handleAddNewItem(e.target.value)}
                fullWidth
                displayEmpty
                margin="dense"
              >
                <MenuItem value="" disabled>
                  Adicionar Produto
                </MenuItem>
                {availableProducts.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
