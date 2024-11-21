import { useState } from "react";
export default function productsServices() {
  const [productsLoading, setProductsLoading] = useState(false);
  const [refetchProducts, setRefetchProducts] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const url = "http://localhost:3000/products";
  const getUserProducts = (userId) => {
    setProductsLoading(true);
    fetch(`${url}/userproducts/${userId}`, {
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
        setProductLoading(false);
        setRefetchProducts(false);
      });
  };

  return { getUserProducts, productsLoading, refetchProducts, productsList };
}
