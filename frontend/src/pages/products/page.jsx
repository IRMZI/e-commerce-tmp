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

  if (productsLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <div className="grid-container">
        {productsList.map((product) => (
          <div key={product._id} className="cardContainer">
            <ProductCard productData={product} />
          </div>
        ))}
      </div>
    </>
  );
}
