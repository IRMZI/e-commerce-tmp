interface ProductCardProps {
  name: string;
  description: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  image,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />{" "}
      <h3 className="text-2xl font-bold mb-4">{name}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ProductCard;
