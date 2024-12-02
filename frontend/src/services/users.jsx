import { useState } from "react";

export default function usersServices() {
  const [userLoading, setUserLoading] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const url = "http://localhost:3000/users"; // URL base da API

  // Função para buscar todos os usuários
  const getUsers = () => {
    setUserLoading(true);
    fetch(`${url}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.body)) {
          setUsersList(result.body); // Atualiza a lista de usuários
        } else {
          console.error("Resposta inesperada:", result);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter Usuários:", error);
      })
      .finally(() => {
        setUserLoading(false);
        setRefetchUsers(false);
      });
  };

  // Função para atualizar um usuário específico
  const updateUser = async (id, updatedUserData) => {
    setUserLoading(true);
    try {
      const { _id, ...userData } = updatedUserData;
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (response.ok) {
        return result; // Retorna os dados atualizados
      } else {
        console.error("Erro ao atualizar usuário:", result);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setUserLoading(false);
    }
  };

  // Função para excluir um usuário
  const deleteUser = async (id) => {
    setUserLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const result = await response.json();
      if (result.success) {
        console.log("Usuário excluído com sucesso:", result);
        setRefetchUsers(true); // Marca para buscar novamente os usuários
      } else {
        console.error("Erro ao excluir usuário:", result.message);
      }
    } catch (error) {
      console.error("Erro de rede ao excluir usuário:", error);
    } finally {
      setUserLoading(false);
    }
  };

  return {
    getUsers,
    updateUser,
    deleteUser,
    userLoading,
    refetchUsers,
    usersList,
  };
}