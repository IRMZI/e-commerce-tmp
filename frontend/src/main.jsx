import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/page.jsx";
import Cart from "./pages/cart/page.jsx";
import Profile from "./pages/profile/page.jsx";
import Products from "./pages/products/page.jsx";
import Auth from "./pages/auth/page.jsx";
import AdminPanel from "./pages/adminPanel/page.jsx";
import Dashboard from "./pages/adminPanel/dashboard/dashboard.jsx";
import AdminOrders from "./pages/adminPanel/orders/orders.jsx";
import AdminUsers from "./pages/adminPanel/users/users.jsx";
import AdminProducts from "./pages/adminPanel/products/products.jsx";
import AdminLeads from "./pages/adminPanel/leads/leads.jsx";  
import Ebook from "./pages/lpEbook/page.jsx";
const pages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/ebook",
        element: <Ebook />,
      },
      {
        path: "/admin", // Rota principal do admin
        element: <AdminPanel />,
        children: [
          { path: "dashboard", element: <Dashboard /> }, // Rota relativa
          { path: "users", element: <AdminUsers /> }, // Rota relativa
          { path: "orders", element: <AdminOrders /> }, // Rota relativa
          { path: "products", element: <AdminProducts /> }, // Rota relativa
          { path: "leads", element: <AdminLeads /> }, // Rota relativa
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={pages} aria-label="Navegação principal"></RouterProvider>
  </StrictMode>
);
