import Navbar from "./components/Navbar/navbar.jsx";
import Footer from "./components/Footer/footer.jsx";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/useCartContext.jsx";
export default function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </>
  );
}
