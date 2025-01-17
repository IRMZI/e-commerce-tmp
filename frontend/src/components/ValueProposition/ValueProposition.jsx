import React from "react";
import { FaLeaf, FaHeart, FaHome, FaStar } from "react-icons/fa";
import "./ValueProposition.css";

const ValueProposition = () => {
  const features = [
    {
      icon: <FaLeaf className="leaf-icon" />,
      title: "Gourmet",
      description: "Sabor refinado e qualidade premium",
    },
    {
      icon: <FaHeart className="heart-icon" />,
      title: "Sustentável",
      description: "Produção consciente e responsável",
    },
    {
      icon: <FaHome className="home-icon" />,
      title: "Cultivo Local",
      description: "Frescos e direto do produtor",
    },
    {
      icon: <FaStar className="star-icon" />,
      title: "Qualidade Premium",
      description: "Excelência em cada produto",
    },
  ];

  return (
    <section className="value-proposition" aria-labelledby="value-proposition-heading">
      <h2 id="value-proposition-heading">Nossos Diferenciais</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProposition;
