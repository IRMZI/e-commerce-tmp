// EbookSection.jsx
import React, { useState } from "react";
import leadService from "../../services/lead";
import "./EbookSection.css";
import ebook from "../../assets/ebookMockUp.png";
const ESTADOS_BRASIL = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const EbookSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { createLead } = leadService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createLead(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", state: "" });
    } catch (error) {
      setError("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="ebook-section" className="ebook-section">
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
          {success ? (
            <div className="success-message">
              <h3>Obrigado pelo cadastro!</h3>
              <p>Seu e-book será enviado para seu email em instantes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Seu Nome Completo"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Seu E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                disabled={loading}
                className="state-select"
              >
                <option value="">Selecione seu estado</option>
                {ESTADOS_BRASIL.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Receba seu E-book Gratuitamente!"}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="ebook-image">
        <img src={ebook} alt="E-book de Receitas" loading="lazy" />
      </div>
    </section>
  );
};

export default EbookSection;
