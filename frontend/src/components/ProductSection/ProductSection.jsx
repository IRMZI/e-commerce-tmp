import { useNavigate } from "react-router-dom";
import "./productSection.css";
const ProductSection = () => {
  const navigate = useNavigate();

  return (
    <section className="product-section">
      <h2 className="product-section-title">Explore um Mundo de Sabores!</h2>
      <p className="product-section-description">
        Descubra nossa seleção exclusiva de cogumelos frescos. escolhidos para
        transformar suas receitas e surpreender seu paladar.
      </p>
      <button
        className="product-view-all-button"
        onClick={() => navigate("/products")}
      >
        Veja Todos os Produtos
      </button>
    </section>
  );
};

export default ProductSection;
