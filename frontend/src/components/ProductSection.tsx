import ProductCard from "../components/ProductCard";
import cogumelosParisImage from "../assets/cogumelos-paris.png";
import cogumelosPortobelloImage from "../assets/cogumelos-portobello.png";
import cogumelosShitakeImage from "../assets/cogumelos-shitake.png";
import cogumelosShimejiBImage from "../assets/cogumelo-shimeji-branco.png";
import cogumelosShimejiCImage from "../assets/cogumelo-shimeji-cinza.png";
const products = [
  {
    name: "Cogumelos Paris",
    description:
      "Sabor suave e textura macia, perfeito para saladas e risotos.",
    image: cogumelosParisImage,
  },
  {
    name: "Cogumelos Portobello",
    description: "Intenso e carnudo, ideal para grelhar ou rechear.",
    image: cogumelosPortobelloImage,
  },
  {
    name: "Cogumelos Shitake",
    description:
      "Muito utilizado na culinária asiática, rico em umami, ótimo para sopas e pratos quentes.",
    image: cogumelosShitakeImage,
  },
  {
    name: "Shimeji Branco",
    description: "Leve e delicado, ótimo para refogados e pratos vegetarianos.",
    image: cogumelosShimejiBImage,
  },
  {
    name: "Shimeji Cinza",
    description: "Sabor forte, ideal para pratos saborosos.",
    image: cogumelosShimejiCImage,
  },
];

function ProductSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Nossos Principais Produtos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
