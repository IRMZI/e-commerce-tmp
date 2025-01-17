import { useState } from "react";
export default function authServices() {
  const [authLoading, setAuthLoading] = useState(false);
  const url = "http://localhost:3000/auth";
  const login = (formData) => {
    setAuthLoading(true);
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.body.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ token: result.body.token, user: result.body.user })
          );
        } else {
          localStorage.setItem(
            "authError",
            result.body.text || "Erro desconhecido"
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.body.text) ||
          "Erro de conexão com o servidor";
        localStorage.setItem("authError", errorMessage);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };
  const signup = (formData) => {
    setAuthLoading(true);
    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData), 
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success && result.body.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ token: result.body.token, user: result.body.user })
          );
        } else {
          localStorage.setItem(
            "authError",
            result.body.text || "Erro desconhecido"
          );
        }
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.body.text) ||
          "Erro de conexão com o servidor";
        localStorage.setItem("authError", errorMessage);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };
  const logout = () => {
    localStorage.removeItem("auth");
  };

  return { signup, login, logout, authLoading };
}
