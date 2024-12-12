import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Descubra o{" "}
          <span className="highlight-flavor typing-effect">Sabor</span> e a
          Sustentabilidade dos
          <span className="highlight-mushrooms"> Cogumelos Campestre</span>
        </h1>
        <p className="hero-subtitle">
          Receitas exclusivas e produtos frescos, direto para sua mesa.
        </p>
        <div className="cta-buttons">
          <button
            onClick={() => {
              document.getElementById("ebook-section").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Baixe o E-book Gratuito
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
