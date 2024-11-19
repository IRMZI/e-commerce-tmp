import "./home.css";
import AboutUS from "../../assets/sobre.jpeg";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
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
    <div className="pageContainer">
      <section className="hero-section">
        <h1 className="hero-title">BEM VINDO</h1>
        <h3 className="hero-subtitle">
          Cogumelos frescos e comestíveis direto do produtor!
        </h3>
      </section>

      <section className="about-us-section">
        <img src={AboutUS} alt="Sobre nós" className="about-us-image" />
        <div className="about-us-content">
          <h1 className="about-us-title">Sobre nós</h1>
          <h2 className="about-us-description">
            O <strong>Sítio Campestre</strong> é uma unidade de produção da
            Agricultura Familiar, localizada na zona rural de São Sebastião do
            Caí. Dedicamo-nos com carinho à produção de cogumelos culinários de
            alta qualidade, cultivados com técnicas cuidadosas que garantem
            sabor, frescor e excelência em cada colheita. No centro do nosso
            trabalho está a
            <span className="text-highlight">
              <strong>produção sustentável e artesanal</strong>
            </span>
            , garantindo produtos frescos diretamente ao consumidor.
          </h2>

          <div className="values-section">
            <h1 className="values-title">Valores</h1>
            <h2 className="values-description">
              Acreditamos no valor da agricultura familiar e no impacto positivo
              que ela pode ter nas comunidades locais. Cada etapa do nosso
              processo é conduzida com respeito à natureza, garantindo alimentos
              saudáveis, naturais e sem aditivos químicos, preservando o
              equilíbrio ambiental e promovendo uma produção orgânica e
              sustentável.
            </h2>
          </div>
        </div>
      </section>

      {/* Seção de Contatos */}
      <section className="contact-section">
        <button
          onClick={handleWhatsAppClick}
          className="contact-button whatsapp-button"
        >
          <FaWhatsapp className="icon" />
          Entre em contato conosco
        </button>

        <button
          onClick={handleInstagramClick}
          className="contact-button instagram-button"
        >
          <FaInstagram className="icon" />
          Conheça nosso Instagram
        </button>
      </section>
    </div>
  );
}
