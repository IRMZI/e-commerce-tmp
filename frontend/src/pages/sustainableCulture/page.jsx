import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import "./sustainableCulture.css";

export default function SustainableCulture() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="sustainableCultureContainer">
      <h1>Cultura Sustentável: Nosso Compromisso com o Futuro</h1>
      <section>
        <p>
          No coração da nossa produção está um compromisso inabalável com a
          sustentabilidade. Acreditamos que cuidar do meio ambiente hoje é
          garantir um futuro saudável para as próximas gerações. Por isso, no
          cultivo de cogumelos, adotamos práticas que respeitam a natureza e
          promovem o equilíbrio ecológico.
        </p>
      </section>
      {["section1", "section2", "section3", "section4"].map(
        (section, index) => (
          <section key={index} className="dialogBox">
            <div
              className="dialogBoxTitle"
              onClick={() => toggleSection(section)}
              aria-label={`Toggle ${sectionTitles[section]}`}
            >
              <h2>{sectionTitles[section]}</h2>
              <span className="icon">
                {openSections[section] ? (
                  <FaChevronUp color="white" aria-label="Collapse section" />
                ) : (
                  <FaChevronDown color="white" aria-label="Expand section" />
                )}
              </span>
            </div>
            <CSSTransition
              in={openSections[section]}
              timeout={9999999}
              classNames="dialogBoxContent"
              unmountOnExit
            >
              <div className="dialogBoxContent">
                <p>{sectionContents[section]}</p>
              </div>
            </CSSTransition>
          </section>
        )
      )}
      <section>
        <p>
          Escolher nossos cogumelos é escolher um estilo de vida mais saudável e
          sustentável. É fazer parte de um movimento que valoriza o meio
          ambiente, a comunidade e o bem-estar. Junte-se a nós nessa jornada e
          experimente a diferença que um produto cultivado com respeito e
          cuidado pode fazer.
        </p>
      </section>
    </div>
  );
}

const sectionTitles = {
  section1: "Sustentabilidade que faz a diferença",
  section2: "Impacto positivo na comunidade e no planeta",
  section3: "Cultivo natural, qualidade excepcional",
  section4: "Do nosso sítio para sua mesa",
};

const sectionContents = {
  section1:
    "Reduzindo o desperdício e aproveitando ao máximo os recursos disponíveis. Além disso, priorizamos a eficiência no uso de água e energia, minimizando nosso impacto ambiental. Nossos métodos dispensam o uso de produtos químicos agressivos, garantindo que cada cogumelo seja natural, saudável e seguro para você e sua família.",
  section2:
    "Ao escolher nossos cogumelos, você não está apenas levando um produto de alta qualidade para sua mesa, mas também contribuindo para a economia local e o desenvolvimento rural. Nossa produção fortalece a comunidade, enquanto promove práticas agrícolas responsáveis.",
  section3:
    "Diferente das plantas, os cogumelos se alimentam por absorção de nutrientes, o que torna seu cultivo um processo delicado e cheio de cuidados. Em nosso sítio Campestre, controlamos rigorosamente cada etapa, desde a temperatura e umidade até os níveis de CO², utilizando câmaras climatizadas para garantir as condições ideais. Tudo isso para oferecer a você um produto fresco, saboroso e cheio de benefícios para a saúde.",
  section4:
    "Sabemos que a qualidade não termina no cultivo. Por isso, investimos em técnicas avançadas de armazenamento e logística para manter o frescor e o sabor dos nossos cogumelos até chegarem à sua casa. E o melhor: tudo é feito de forma 100% natural, sem agrotóxicos ou aditivos químicos.",
};
