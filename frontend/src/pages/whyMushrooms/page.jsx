import "./whyMushrooms.css";
import variedade from "../../assets/variedade-cogumelos.jpeg";
import cultivo from "../../assets/cultivo-cogumelos.jpeg";
import {  FaSeedling, FaInfoCircle } from "react-icons/fa";
import { GiSlicedMushroom } from "react-icons/gi";
export default function WhyMushrooms() {
  return (
    <div className="whyMushroomsContainer">
      <h1>Por que consumir cogumelos?</h1>
      <section className="introSection">
        <p>
          Os cogumelos têm sido protagonistas em diversas áreas como medicina, misticismo, religião e gastronomia. Embora haja uma piada de que "todos os cogumelos são comestíveis, mas alguns apenas uma vez", existem cerca de 22 mil espécies de cogumelos no mundo, das quais 2 mil são comestíveis. No Brasil, foram reportadas cerca de 1,6 mil espécies, com aproximadamente 25 variedades cultivadas comercialmente.
        </p>
      </section>
      <section className="highlightSection">
        <div>
          <h2><GiSlicedMushroom color="#8b5e3c" /> Variedades Destacadas</h2>
          <p>
            No sítio Campestre, destacamos variedades que são aromáticas, deliciosas e benéficas para a saúde. Algumas espécies podem parecer incomuns e curiosas, mas ao experimentá-las, descobrimos aromas e sabores únicos que combinam com diversas receitas.
          </p>
        </div>
        <img src={variedade} alt="Sobre nós" className="about-us-image" />
      </section>
      <section className="cultivationSection">
        <div>
          <h2><FaSeedling color="#22C55E" /> Como eles são cultivados?</h2>
          <p>
            Diferente das plantas que realizam fotossíntese, os cogumelos se alimentam por absorção de nutrientes, como outros fungos. O cultivo é um processo delicado e complexo, exigindo rigoroso controle nas diferentes etapas, com câmaras climatizadas para controle de temperatura, umidade e CO².
          </p>
          <p>
            O armazenamento e logística também exigem cuidados específicos para manter o frescor. No sítio Campestre, todo cultivo é feito de forma natural, sem agrotóxicos. Não é um processo simples, mas é uma enorme satisfação levar à mesa dos nossos clientes um produto de qualidade garantida e benéfico para a saúde.
          </p>
        <img src={cultivo} alt="Sobre nós" className="about-us-image" />
        </div>
      </section>
      <section className="didYouKnowSection">
        <h2><FaInfoCircle color="rgb(220, 217, 15)" /> Você sabia?</h2>
        <p>
          Consumidos há séculos na Ásia e Europa, os cogumelos estão ganhando espaço no Brasil. Até 2030, a previsão é que o mercado global de cogumelos dobre de tamanho. Cada variedade de cogumelo tem suas propriedades nutricionais ou funcionais, e todas as espécies cultivadas comercialmente são 100% seguras.
        </p>
        <p>
          De forma geral, os cogumelos oferecem uma série de benefícios:
        </p>
        <ul>
          <li>Reduzem o colesterol ruim (LDL) e ajudam a controlar a pressão arterial.</li>
          <li>Auxiliam no controle da diabetes, pois as fibras ajudam a regular os índices de glicose e insulina.</li>
          <li>Promovem a sensação de saciedade e o funcionamento do intestino, ajudando na perda e manutenção de peso.</li>
          <li>Fortalecem o sistema imunológico contra vírus, bactérias e tumores.</li>
          <li>Fornecem vitaminas do complexo B, niacina e riboflavina, melhorando a energia e a performance nervosa e hormonal.</li>
          <li>São a única fonte não-animal de vitamina D, essencial para músculos, ossos e sistema imunológico.</li>
          <li>Auxiliam na redução de problemas cognitivos, como memória e funções motoras, especialmente em idosos, graças aos nutrientes antioxidantes.</li>
        </ul>
      </section>
    </div>
  );
}
