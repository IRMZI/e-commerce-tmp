import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../assets/logo-campestre.png";

function FooterSection() {
  return (
    <footer className={`py-8 bg-gray-200`}>
      <div className="container mx-auto text-center">
        <img src={Logo} alt="Logo Campestre" className="mx-auto mb-4 w-24" />
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.instagram.com/cogumeloscampestre/?img_index=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://wa.me/5551995814484"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
        <p className="text-sm mb-2">
          © 2022 Sítio Campestre. All Rights Reserved.{" "}
          <a href="#" className="underline hover:text-gray-400">
            Privacy Policy.
          </a>
        </p>
        <p className="text-sm">
          Design and developed by{" "}
          <a
            href="https://linkedin.com/in/rafael-romariz-b2b45322b"
            target="_blank"
            className="underline hover:text-gray-400"
          >
            Rafael Romariz
          </a>
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
