import { useState } from "react";

export default function passwordServices() {
  const [passwordLoading, setPasswordLoading] = useState(false);
  const url = "http://localhost:3000/api/passchange";

  const changePassword = async (passwordData) => {
    try {
      setPasswordLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        throw new Error("Erro ao solicitar mudança de senha.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao solicitar mudança de senha:", error);
      throw error;
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
    changePassword,
    passwordLoading,
  };
}
