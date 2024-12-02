import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./adminPanel.css";

export default function AdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(
    location.pathname || "/admin/dashboard"
  );
  const authData = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (!authData.user.isAdmin) {
      return navigate("/auth");
    }
  });
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="adminContainer">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebarTitle">Painel Admin</h2>
        <ul className="sidebarMenu">
          <li
            className={`menuItem ${
              activeSection === "/admin/dashboard" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/dashboard"
              onClick={() => handleSectionChange("/admin/dashboard")}
            >
              Dashboard
            </Link>
          </li>
          <li
            className={`menuItem ${
              activeSection === "/admin/users" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/users"
              onClick={() => handleSectionChange("/admin/users")}
            >
              Usuários
            </Link>
          </li>
          <li
            className={`menuItem ${
              activeSection === "/admin/orders" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/orders"
              onClick={() => handleSectionChange("/admin/orders")}
            >
              Pedidos
            </Link>
          </li>
          <li
            className={`menuItem ${
              activeSection === "/admin/products" ? "active" : ""
            }`}
          >
            <Link
              to="/admin/products"
              onClick={() => handleSectionChange("/admin/products")}
            >
              Produtos
            </Link>
          </li>
        </ul>
      </nav>

      {/* Área principal */}
      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  );
}
