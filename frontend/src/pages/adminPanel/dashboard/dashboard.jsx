import React, { useEffect, useState } from "react";
import ordersService from "../../../services/order";
import usersService from "../../../services/users";
import productsServices from "../../../services/products";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./dashboard.css";

export default function Dashboard() {
  const { getOrders, ordersList, orderLoading } = ordersService();
  const { getUsers, usersList, userLoading } = usersService();
  const { getAvailablesProducts, productsList, getProductNameById } = productsServices();
  const [kpis, setKpis] = useState({
    dailySales: 0,
    weeklySales: 0,
    monthlySales: 0,
    newUsers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    topProducts: [],
  });

  useEffect(() => {
    getOrders();
    getUsers();
    getAvailablesProducts();
  }, []);

  useEffect(() => {
    if (ordersList.length > 0 && usersList.length > 0) {
      calculateKpis(ordersList, usersList);
    }
  }, [ordersList, usersList]);

  const calculateKpis = (orders, users) => {
    const today = new Date();
    const dailySales = orders.filter(order => new Date(order.createDate).toDateString() === today.toDateString()).length;
    const weeklySales = orders.filter(order => {
      const orderDate = new Date(order.createDate);
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      return orderDate >= weekStart && orderDate <= today;
    }).length;
    const monthlySales = orders.filter(order => new Date(order.createDate).getMonth() === today.getMonth()).length;
    const newUsers = users.filter(user => new Date(user.createdAt).getMonth() === today.getMonth()).length;
    const pendingOrders = orders.filter(order => order.pickupStatus === "pending").length;
    const completedOrders = orders.filter(order => order.pickupStatus === "completed").length;
    const canceledOrders = orders.filter(order => order.pickupStatus === "canceled").length;
    const topProducts = calculateTopProducts(orders);

    setKpis({
      dailySales,
      weeklySales,
      monthlySales,
      newUsers,
      pendingOrders,
      completedOrders,
      canceledOrders,
      topProducts,
    });
  };

  const calculateTopProducts = (orders) => {
    const productCounts = {};
    orders.forEach(order => {
      if (order.orderItems) {
        order.orderItems.forEach(item => {
          if (productCounts[item.productId]) {
            productCounts[item.productId] += item.quantity;
          } else {
            productCounts[item.productId] = item.quantity;
          }
        });
      }
    });
    const sortedProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]);
    return sortedProducts.slice(0, 5).map(([productId, count]) => ({
      productId,
      productName: getProductNameById(productId),
      count
    }));
  };

  const salesData = ordersList.map(order => ({
    date: order.createDate,
    sales: order.orderItems ? order.orderItems.reduce((total, item) => total + item.quantity, 0) : 0,
  }));

  if (orderLoading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Bem-vindo ao Dashboard</h2>
      <div className="kpis">
        <div className="kpi">
          <h3>Vendas Diárias</h3>
          <p>{kpis.dailySales}</p>
        </div>
        <div className="kpi">
          <h3>Vendas Semanais</h3>
          <p>{kpis.weeklySales}</p>
        </div>
        <div className="kpi">
          <h3>Vendas Mensais</h3>
          <p>{kpis.monthlySales}</p>
        </div>
        <div className="kpi">
          <h3>Novos Usuários</h3>
          <p>{kpis.newUsers}</p>
        </div>
        <div className="kpi">
          <h3>Pedidos Pendentes</h3>
          <p>{kpis.pendingOrders}</p>
        </div>
        <div className="kpi">
          <h3>Pedidos Concluídos</h3>
          <p>{kpis.completedOrders}</p>
        </div>
        <div className="kpi">
          <h3>Pedidos Cancelados</h3>
          <p>{kpis.canceledOrders}</p>
        </div>
      </div>
      <div className="charts">
        <h3>Vendas por Período</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="top-products">
        <h3>Produtos Mais Vendidos</h3>
        <ul>
          {kpis.topProducts.map(product => (
            <li key={product.productId}>{product.productName} (ID: {product.productId}): {product.count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
