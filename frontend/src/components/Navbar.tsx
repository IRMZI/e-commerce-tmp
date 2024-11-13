import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo-campestre.png";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-200 flex items-center justify-between h-24 px-8">
      {/* Logo no canto esquerdo */}
      <Link to="/" className="w-24">
        <img src={Logo} alt="Logo Campestre" className="w-full" />
      </Link>

      {/* Links de navegação centralizados */}
      <div className="flex flex-grow justify-center space-x-8">
        <Link
          to="/"
          className={`text-lg font-bold relative group ${
            location.pathname === "/" ? "text-green-500" : "text-gray-800"
          }`}
        >
          Home
          <span className="block w-0 h-1 bg-green-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          to="/historia"
          className={`text-lg font-bold relative group ${
            location.pathname === "/historia"
              ? "text-green-500"
              : "text-gray-800"
          }`}
        >
          História
          <span className="block w-0 h-1 bg-green-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          to="/entregas"
          className={`text-lg font-bold relative group ${
            location.pathname === "/entregas"
              ? "text-green-500"
              : "text-gray-800"
          }`}
        >
          Entregas
          <span className="block w-0 h-1 bg-green-500 transition-all duration-300 group-hover:w-full" />
        </Link>

        <Link
          to="/produtos"
          className={`text-lg font-bold relative group ${
            location.pathname === "/produtos"
              ? "text-green-500"
              : "text-gray-800"
          }`}
        >
          Produtos
          <span className="block w-0 h-1 bg-green-500 transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      {/* Espaço à direita para manter o layout balanceado (opcional) */}
      <div className="w-24"></div>
    </nav>
  );
}

export default Navbar;
