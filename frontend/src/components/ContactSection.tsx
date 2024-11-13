import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function ContactSection() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+5551995814484";
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, "_blank");
  };

  const handleInstagramClick = () => {
    const instagramURL = "https://www.instagram.com/cogumeloscampestre/";
    window.open(instagramURL, "_blank");
  };

  return (
    <section className="flex justify-center items-center h-64 bg-gray-100 space-x-20">
      {/* Caixa para o WhatsApp */}
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center bg-green-500 text-white text-2xl font-bold py-6 px-8 rounded-lg w-full max-w-md hover:bg-green-600 transition-colors"
      >
        <FaWhatsapp className="mr-3 text-3xl" />
        Entre em contato conosco
      </button>

      {/* Caixa para o Instagram */}
      <button
        onClick={handleInstagramClick}
        className="flex items-center justify-center bg-pink-500 text-white text-2xl font-bold py-6 px-8 rounded-lg w-full max-w-md hover:bg-pink-600 transition-colors"
      >
        <FaInstagram className="mr-3 text-3xl" />
        Conheça nosso Instagram
      </button>
    </section>
  );
}

export default ContactSection;
