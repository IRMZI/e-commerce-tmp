import { useEffect, useState } from "react";
import productsServices from "../../../services/products";
import Loading from "../../loading/page";
import "./adminProducts.css";

export default function AdminProducts() {
  const {
    getAvailablesProducts,
    productsList,
    productsLoading,
    updateProduct,
    addProduct,
    deleteProduct,
    refetchProducts,
  } = productsServices();

  const [editedProducts, setEditedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    available: true,
    description: "",
    ingredients: [],
    imgUrl: "",
    category: "",
  });

  useEffect(() => {
    if (refetchProducts) {
      getAvailablesProducts();
    }
  }, [refetchProducts]);

  useEffect(() => {
    setEditedProducts(productsList); // Inicializa os produtos com os dados originais
  }, [productsList]);

  const handleInputChange = (id, field, value) => {
    setEditedProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleSave = async (id) => {
    const productToSave = editedProducts.find((product) => product._id === id);
    await updateProduct(id, productToSave); // Chama o serviço para atualizar o produto
    getAvailablesProducts(); // Recarrega a lista de produtos
  };

  const handleAddProduct = async () => {
    await addProduct(newProduct); // Chama o serviço para adicionar o produto
    getAvailablesProducts(); // Recarrega a lista de produtos
    setNewProduct({
      name: "",
      price: "",
      available: true,
      description: "",
      ingredients: [],
      imgUrl: "",
      category: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id); // Chama o serviço para excluir o produto
    getAvailablesProducts(); // Recarrega a lista de produtos
  };

  if (productsLoading) {
    return <Loading />;
  }

  return (
    <div className="admin-products-container">
      <h2>Gerenciamento de Produtos</h2>

      {/* Formulário para adicionar novos produtos */}
      <div className="admin-products-new">
        <h3>Adicionar Novo Produto</h3>
        <div className="admin-products-details">
          <label>
            Nome:
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </label>
          <label>
            Disponível:
            <input
              type="checkbox"
              checked={newProduct.available}
              onChange={(e) =>
                setNewProduct({ ...newProduct, available: e.target.checked })
              }
            />
          </label>
          <label>
            Descrição:
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </label>
          <label>
            Ingredientes:
            <input
              type="text"
              value={newProduct.ingredients.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  ingredients: e.target.value.split(",").map((i) => i.trim()),
                })
              }
            />
          </label>
          <label>
            URL da Imagem:
            <input
              type="text"
              value={newProduct.imgUrl}
              onChange={(e) =>
                setNewProduct({ ...newProduct, imgUrl: e.target.value })
              }
            />
          </label>
          <label>
            Categoria:
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
          </label>
          <button onClick={handleAddProduct}>Adicionar Produto</button>
        </div>
      </div>
      <hr className="admin-products-separator" />
      {/* Lista de produtos existentes */}
      <div className="admin-products-grid-container">
        {editedProducts.map((product) => (
          <div key={product._id} className="admin-products-card-container">
            <div className="admin-products-card">
              <img
                src={product.imgUrl}
                alt={product.name}
                className="admin-products-image"
              />
              <div className="admin-products-details">
                <label>
                  Nome:
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(product._id, "name", e.target.value)
                    }
                  />
                </label>
                <label>
                  Preço:
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange(
                        product._id,
                        "price",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </label>
                <label>
                  Disponível:
                  <input
                    type="checkbox"
                    checked={product.available}
                    onChange={(e) =>
                      handleInputChange(
                        product._id,
                        "available",
                        e.target.checked
                      )
                    }
                  />
                </label>
                <label>
                  Descrição:
                  <textarea
                    value={product.description}
                    onChange={(e) =>
                      handleInputChange(
                        product._id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label>
                  Ingredientes:
                  <input
                    type="text"
                    value={product.ingredients.join(", ")}
                    onChange={(e) =>
                      handleInputChange(
                        product._id,
                        "ingredients",
                        e.target.value.split(",").map((i) => i.trim())
                      )
                    }
                  />
                </label>
                <label>
                  Categoria:
                  <input
                    type="text"
                    value={product.category}
                    onChange={(e) =>
                      handleInputChange(product._id, "category", e.target.value)
                    }
                  />
                </label>
              </div>
              <button
                className="admin-products-save-button"
                onClick={() => handleSave(product._id)}
              >
                Salvar
              </button>
              <button
                className="admin-products-delete-button"
                onClick={() => handleDelete(product._id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
