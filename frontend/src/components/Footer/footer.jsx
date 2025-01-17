import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <div className="sectionsContainer">
          <ul className="sectionsList">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/products" className="footer-link">Cogumelos</Link></li>
            <li><Link to="/history" className="footer-link">História</Link></li>
            <li><Link to="/cart" className="footer-link">Carrinho</Link></li>
            <li><Link to="/profile" className="footer-link">Conta</Link></li>
            <li><Link to="/terms" className="footer-link">Termos de Uso</Link></li>
          </ul>
        </div>
        <div className="logoContainer">
          <img
            src="/logo-campestre.png"
            alt="logomarca-campestre"
            className="logo"
          />
          <div className="textContainer">
            <p className="footer-text">
              © 2022 Sítio Campestre. Todos os direitos reservados.
            </p>
            <p className="footer-text">
              Design e desenvolvimento por{" "}
              <a
                href="https://linkedin.com/in/rafael-romariz-b2b45322b"
                target="_blank"
                className="footer-link"
              >
                WBagency
              </a>
            </p>
          </div>
        </div>
        <div className="ebookContainer">
          <h3 className="ebookTitle">Baixe nosso E-book!</h3>
          <Link to="/ebook" className="ebookButton">
            Clique aqui para baixar
          </Link>
          <div className="linksContainer">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/cogumeloscampestre/?img_index=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://wa.me/5551995814484"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link whatsapp"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
