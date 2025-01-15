import React, { useEffect, useState } from "react";
import ordersService from "../../../services/order";
import usersService from "../../../services/users";
import productsServices from "../../../services/products";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { FaShoppingCart, FaUserPlus, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./dashboard.css";

export default function Dashboard() {
  const { getOrders, ordersList, orderLoading } = ordersService();
  const { getUsers, usersList, userLoading } = usersService();
  const { getAvailablesProducts, productsList, getProductNameById } = productsServices();
  const [kpis, setKpis] = useState({
    newUsers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    topProducts: [],
    grossRevenue: 0,
  });
  const [activeTab, setActiveTab] = useState("kpis");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getOrders();
    getUsers();
    getAvailablesProducts();
  }, []);

  useEffect(() => {
    if (ordersList.length > 0) {
      calculateKpis(ordersList, usersList);
    }
  }, [ordersList, usersList]);

  const calculateKpis = (orders, users) => {
    const today = new Date();
    const completedOrders = orders.filter(order => order.pickupStatus === "completed");
    const newUsers = users.filter(user => new Date(user.createdAt).getMonth() === today.getMonth()).length;
    const pendingOrders = orders.filter(order => order.pickupStatus === "pending").length;
    const canceledOrders = orders.filter(order => order.pickupStatus === "canceled").length;
    const topProducts = calculateTopProducts(completedOrders);
    const grossRevenue = completedOrders.reduce((total, order) => total + (order.orderItems ? order.orderItems.reduce((sum, item) => {
      const product = productsList.find(product => product._id === item.productId);
      return sum + ((product?.price || 0) * item.quantity);
    }, 0) : 0), 0);

    setKpis({
      newUsers,
      pendingOrders,
      completedOrders: completedOrders.length,
      canceledOrders,
      topProducts,
      grossRevenue,
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

  const salesData = ordersList
    .filter(order => order.pickupStatus === "completed")
    .map(order => ({
      date: order.createDate,
      sales: order.orderItems ? order.orderItems.reduce((total, item) => total + item.quantity, 0) : 0,
    }));

  const topProductsData = kpis.topProducts.map(product => ({
    name: product.productName,
    sales: product.count,
  })).sort((a, b) => b.sales - a.sales);

  if (orderLoading || userLoading) {
    return <div className="loading-container">Loading...</div>;
  }
  console.log(ordersList)
  return (
    <div className="dashboard-container">
      <h2>Bem-vindo ao Dashboard</h2>
      <div className="tabs">
        <div className={`tab ${activeTab === "kpis" ? "active" : ""}`} onClick={() => handleTabClick("kpis")}>
          KPIs
        </div>
      </div>
      <div className={`kpis ${activeTab === "kpis" ? "active" : ""}`}>
        <div className="kpis">
          <div className="kpi">
            <FaUserPlus className="kpi-icon" />
            <h3>Novos Usuários</h3>
            <p>{kpis.newUsers}</p>
          </div>
          <div className="kpi">
            <FaClipboardList className="kpi-icon" />
            <h3>Pedidos Pendentes</h3>
            <p>{kpis.pendingOrders}</p>
          </div>
          <div className="kpi">
            <FaCheckCircle className="kpi-icon" />
            <h3>Pedidos Concluídos</h3>
            <p>{kpis.completedOrders}</p>
          </div>
          <div className="kpi">
            <FaTimesCircle className="kpi-icon" />
            <h3>Pedidos Cancelados</h3>
            <p>{kpis.canceledOrders}</p>
          </div>
          <div className="kpi">
            <FaShoppingCart className="kpi-icon" />
            <h3>Faturamento Bruto</h3>
            <p>{kpis.grossRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </div>
        <div className="top-products">
          <h3>Produtos Mais Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="charts">
          <div className="chart-container">
            <h3 className="chart-title">Vendas por Período</h3>
            <ResponsiveContainer width="100%" height={300}>
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
          <div className="chart-container">
            <h3 className="chart-title">Vendas Diárias</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="date" />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3 className="chart-title">Vendas Mensais</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}