import "./Navbar.css";
import { HiMenu } from "react-icons/hi";
import { HiShoppingCart, HiUserCircle } from "react-icons/hi2";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  // inicializa o menu como false
  const [openMenu, setOpenMenu] = useState(false);
  const handlerOpenMenu = () => {
    // inverte o valor do menu
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="NavbarContainer">
      <div className="NavbarItems">
        <Link to="/">
          <img
            src="/logo-campestre.png"
            alt="logomarca-campestre"
            className="logo"
          ></img>
        </Link>
        <div className="navbarLinksContainer">
          <Link to="/" className="navbarLink">
            Home
          </Link>
          <Link to="/products" className="navbarLink">
            Produtos
          </Link>
          <Link to="/cart">
            <HiShoppingCart className="navbarLink" />
          </Link>
          <Link to="/profile">
            <HiUserCircle className="navbarLink" />
          </Link>
        </div>
      </div>
      <div className="mobileNavbarItems">
        <Link to="/">
          <img
            src="/logo-campestre.png"
            alt="logomarca-campestre"
            className="logo"
          ></img>
        </Link>
        <div className="mobileNavbarBtns">
          <Link to="/cart">
            <HiShoppingCart className="navbarLink" />{" "}
          </Link>
          <Link to="/profile">
            <HiMenu onClick={handlerOpenMenu}></HiMenu>
          </Link>
        </div>
      </div>
      <Drawer anchor="right" open={openMenu} onClose={handlerOpenMenu}>
        <div className="drawer">
          <Link to="/" className="navbarLink">
            Home
          </Link>
          <Link to="/products" className="navbarLink">
            Produtos
          </Link>
          <Link to="/profile" className="navbarLink">
            Conta
          </Link>
        </div>
      </Drawer>
    </nav>
  );
}
