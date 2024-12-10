import "./Navbar.css";
import { HiMenu, HiBookOpen, HiOutlineHome } from "react-icons/hi";
import { HiShoppingCart, HiUserCircle } from "react-icons/hi2";
import { BiHistory } from "react-icons/bi";
import { GiSlicedMushroom } from "react-icons/gi";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/useCartContext";
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const handlerOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const { cartItems } = useCartContext();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="NavbarContainer">
      <div className="NavbarItems">
        <Link to="/">
          <img
            src="/logo-campestre.png"
            alt="logomarca-campestre"
            className="logo"
          />
        </Link>
        <div className="navbarLinksContainer">
          <Link to="/" className="navbarLink">
            Home
          </Link>
          <Link to="/products" className="navbarLink">
            Cogumelos
          </Link>
          <Link to="/history" className="navbarLink">
            História
          </Link>
          <Link to="/cart" className="navbarLink">
            <div className="cartIconWithBadge">
              <HiShoppingCart />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </div>
          </Link>
          <Link to="/profile" className="navbarLink">
            <HiUserCircle />
          </Link>
          <Link to="/ebook">
            <button className="ebook-button">
              Baixe nosso E-book! <HiBookOpen />
            </button>
          </Link>
        </div>
      </div>
      <div className="mobileNavbarItems">
        <Link to="/">
          <img
            src="/logo-campestre.png"
            alt="logomarca-campestre"
            className="logo"
          />
        </Link>
        <div className="mobileNavbarBtns">
          <Link to="/cart" className="navbarLink">
            <div className="cartIconWithBadge">
              <HiShoppingCart />
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </div>
          </Link>
          <HiMenu className="navbarLink" onClick={handlerOpenMenu} />
        </div>
      </div>
      <Drawer anchor="right" open={openMenu} onClose={handlerOpenMenu}>
        <div className="drawer">
          <Link to="/" className="drawerLink" onClick={handlerOpenMenu}>
            <HiOutlineHome className="drawerIcon" />
            Home
          </Link>
          <Link to="/products" className="drawerLink" onClick={handlerOpenMenu}>
            <GiSlicedMushroom className="drawerIcon" />
            Cogumelos
          </Link>
          <Link to="/history" className="drawerLink" onClick={handlerOpenMenu}>
            <BiHistory className="drawerIcon" />
            História
          </Link>
          <Link to="/profile" className="drawerLink" onClick={handlerOpenMenu}>
            <HiUserCircle className="drawerIcon" />
            Conta
          </Link>
          <Link to="/ebook" className="drawerLink" onClick={handlerOpenMenu}>
            <HiBookOpen className="drawerIcon" />
            Baixe nosso E-book!
          </Link>
        </div>
      </Drawer>
    </nav>
  );
}
