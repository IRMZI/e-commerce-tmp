import "leaflet/dist/leaflet.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import DeliveryPage from "./pages/DeliveryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/historia"
          element={
            <Layout>
              <HistoryPage />
            </Layout>
          }
        />
        <Route
          path="/entregas"
          element={
            <Layout>
              <DeliveryPage />
            </Layout>
          }
        />
        <Route
          path="/produtos"
          element={
            <Layout>
              <ProductPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
