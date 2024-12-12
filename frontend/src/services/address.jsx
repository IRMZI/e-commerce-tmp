import { useState } from "react";

export default function addressServices() {
  const [addressLoading, setAddressLoading] = useState(false);
  const url = "http://localhost:3000/users";

  const validateAddress = async (zipcode) => {
    try {
      setAddressLoading(true);

      // Requisição à API BrasilAPI
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v1/${zipcode}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar informações do CEP.");
      }

      const data = await response.json();

      // Retorna os dados relevantes do endereço
      return {
        zipcode: data.zipcode || "",
        street: data.street || "",
        city: data.city || "",
        state: data.state || "",
      };
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setAddressLoading(false);
    }
  };

  const updateUserAddress = (userId, addressData) => {
    setAddressLoading(true);
    return fetch(`${url}/${userId}/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(addressData),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setAddressLoading(false);
      });
  };

  return { validateAddress, updateUserAddress, addressLoading };
}
