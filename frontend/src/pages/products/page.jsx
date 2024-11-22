import productsServices from "../../services/products";
import { useEffect, useState } from "react";
import Loading from "../loading/page";
import ProductCard from "../../components/productCard/productcard";
import "./products.css";
export default function Products() {
  const {
    getAvailablesProducts,
    productsList,
    productsLoading,
    refetchProducts,
  } = productsServices();
  useEffect(() => {
    if (refetchProducts) {
      getAvailablesProducts();
    }
  }, [refetchProducts]);

  const [productSelected, setProductSelected] = useState(null);
  const handleProductsSelected = (product) => {
    setProductSelected(product);
  };

  const handleClosePopup = () => {
    setProductSelected(null);
  };

  if (productsLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  console.log(productsList);
  return (
    <>
      <div className="grid-container">
        {productsList.map((product) => (
          <div
            key={product._id}
            className="cardContainer"
            onClick={() => {
              handleProductsSelected(product);
            }}
          >
            <ProductCard productData={product} />
          </div>
        ))}
      </div>
    </>
  );
}
