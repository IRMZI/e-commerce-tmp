import "./footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <img
          src="/logo-campestre.png"
          alt="logomarca-campestre"
          className="logo"
        ></img>
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
        <div className="textContainer">
          <p className="footer-text">
            © 2022 Sítio Campestre. All Rights Reserved.
          </p>
          <p className="footer-text">
            Design and developed by{" "}
            <a
              href="https://linkedin.com/in/rafael-romariz-b2b45322b"
              target="_blank"
              className="footer-link"
            >
              Rafael Romariz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
