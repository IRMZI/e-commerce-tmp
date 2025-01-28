import { useState } from "react";

export default function authServices() {
  const [authLoading, setAuthLoading] = useState(false);
  const url = "http://localhost:3000/auth";
  const tokenUrl = "http://localhost:3000/token";

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${
      value || ""
    }${expires}; Secure; HttpOnly; SameSite=Strict`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const login = (formData) => {
    setAuthLoading(true);
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (
          result.success &&
          result.body.accessToken &&
          result.body.refreshToken
        ) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              refreshToken: result.body.refreshToken,
              user: result.body.user,
            })
          );
          setCookie("accessToken", result.body.accessToken, 1 / 24); // 1 hour
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
        if (
          result.success &&
          result.body.accessToken &&
          result.body.refreshToken
        ) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              refreshToken: result.body.refreshToken,
              user: result.body.user,
            })
          );
          setCookie("accessToken", result.body.accessToken, 1 / 24); // 1 hour
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

  const refreshToken = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData || !authData.refreshToken) {
      return Promise.reject("No refresh token available");
    }

    return fetch(`${tokenUrl}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: authData.refreshToken }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.body.accessToken) {
          setCookie("accessToken", result.body.accessToken, 1 / 24); // 1 hour
          return result.body.accessToken;
        } else {
          logout();
          return Promise.reject("Failed to refresh token");
        }
      });
  };

  const logout = () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.refreshToken) {
      fetch(`${url}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: authData.refreshToken }),
      });
    }
    localStorage.removeItem("auth");
    setCookie("accessToken", "", -1);
  };

  const fetchWithAuth = (url, options = {}) => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      return refreshToken().then((newAccessToken) => {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return fetch(url, options);
      });
    } else {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return fetch(url, options);
    }
  };

  return {
    login,
    signup,
    logout,
    fetchWithAuth,
    authLoading,
  };
}
