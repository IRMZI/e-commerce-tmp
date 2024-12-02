import { useState } from "react";

export default function productsServices() {
  const [productsLoading, setProductsLoading] = useState(false);
  const [refetchProducts, setRefetchProducts] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const url = "http://localhost:3000/products";

  // Obter produtos disponíveis
  const getAvailablesProducts = () => {
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
      })
      .catch((error) => {
        console.error("Erro ao obter produtos:", error);
      })
      .finally(() => {
        setProductsLoading(false);
        setRefetchProducts(false);
      });
  };

  // Obter nome de produto pelo ID
  const getProductNameById = (productId) => {
    const product = productsList.find((item) => item._id === productId);
    return product ? product.name : "Produto não encontrado";
  };

  const updateProduct = async (productId, updatedProduct) => {
    setProductsLoading(true);
    try {
      // Criar uma cópia do produto sem o campo `_id`
      const { _id, ...productData } = updatedProduct;

      const response = await fetch(`${url}/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(productData), // Enviar o produto sem o `_id`
      });
      const result = await response.json();
      if (!result.success) {
        console.error("Erro ao atualizar produto:", result);
      }
      return result;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Adicionar um novo produto
  const addProduct = async (newProduct) => {
    setProductsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newProduct),
      });
      const result = await response.json();
      if (!result.success) {
        console.error("Erro ao adicionar produto:", result);
      }
      return result;
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Excluir um produto
  const deleteProduct = async (productId) => {
    setProductsLoading(true);
    try {
      const response = await fetch(`${url}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const result = await response.json();
      if (!result.success) {
        console.error("Erro ao excluir produto:", result);
      }
      return result;
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  return {
    getAvailablesProducts,
    getProductNameById,
    updateProduct,
    addProduct,
    deleteProduct,
    productsLoading,
    refetchProducts,
    productsList,
  };
}
