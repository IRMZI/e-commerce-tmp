import { useState } from "react";
export default function productsServices() {
  const [productsLoading, setProductsLoading] = useState(false);
  const [refetchProducts, setRefetchProducts] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const url = "http://localhost:3000/products";
  const getAvailablesProducts = (userId) => {
    setProductsLoading(true);
    fetch(`${url}/availables`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProductsList(result.body);
        } else {
          console.log(result);
        }
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setProductsLoading(false);
        setRefetchProducts(false);
      });
  };
  const getProductNameById = (productId) => {
    const product = productsList.find((item) => item.id === productId);
    return product ? product.name : "Product not found";
  };

  return {
    getAvailablesProducts,
    getProductNameById,
    productsLoading,
    refetchProducts,
    productsList,
  };
}
