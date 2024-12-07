import React, { useState } from "react";
import ebook from "../../assets/ebookMockUp.png";
import "./EbookSection.css";

const EbookSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="ebook-section">
      <div className="ebook-content">
        <div className="ebook-info">
          <h2>
            Receitas
            <span className="highlight"> exclusivas</span> de cogumelos
          </h2>
          <h3>Torne suas refeições inesquecíveis e mais saudáveis!</h3>
          <ul className="benefits">
            <li>
              ✓ <span className="greenHighlight">Receitas práticas</span> para o
              dia a dia
            </li>
            <li>
              ✓ <span className="greenHighlight">Dicas essenciais</span> de
              preparo e conservação
            </li>
            <li>
              ✓{" "}
              <span className="greenHighlight">Combinações surpreendentes</span>{" "}
              para variar seus pratos
            </li>
            <li>
              ✓{" "}
              <span className="greenHighlight">
                Valor nutricional detalhado
              </span>{" "}
              para refeições balanceadas
            </li>
          </ul>
        </div>
        <div className="ebook-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Seu Nome Completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Seu E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Receba seu E-book Gratuitamente!</button>
          </form>
        </div>
      </div>
      <div className="ebook-image">
        <img src={ebook} alt="E-book de Receitas" />
      </div>
    </section>
  );
};

export default EbookSection;
