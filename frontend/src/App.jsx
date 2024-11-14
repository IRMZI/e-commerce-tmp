import Navbar from "./components/Navbar/navbar.jsx";
import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
