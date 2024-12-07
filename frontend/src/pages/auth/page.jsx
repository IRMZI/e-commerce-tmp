import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./auth.css";
import authServices from "../../services/auth";
import { HiLogin } from "react-icons/hi";
import Loading from "../loading/page";
import { z } from "zod";
export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    zipcode: "",
    address: {
      street: "",
      number: "",
      city: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState(""); // Erros do formulário
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const navigate = useNavigate();
  const authError = localStorage.getItem("authError");
  const { login, signup, authLoading } = authServices();
  const authData = JSON.parse(localStorage.getItem("auth"));

  // Navegar se já estiver autenticado
  useEffect(() => {
    if (authData) {
      navigate("/profile");
    }
  }, [authData, navigate]);

  // Monitorar erros de autenticação no localStorage
  useEffect(() => {
    if (authError) {
      setErrorMessage(authError); // Atualizar mensagem de erro
    }
  }, [authError]);

  const handleChangeFormType = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      zipcode: "",
      address: {
        street: "",
        number: "",
        city: "",
      },
    });
    setErrorMessage("");
    localStorage.removeItem("authError"); // Remove o erro do localStorage
    setFormType(formType === "login" ? "signup" : "login");
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    if (["street", "number", "city"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setErrorMessage(""); // Limpa a mensagem exibida
    localStorage.removeItem("authError"); // Remove o erro do localStorage
  };

  const formSchema = z
    .object({
      fullname: z
        .string()
        .min(3, "O nome deve conter pelo menos 3 caracteres")
        .nonempty("O nome é obrigatório"),
      email: z
        .string()
        .email("Insira um email válido")
        .nonempty("O email é obrigatório"),
      password: z
        .string()
        .regex(
          /^(?=.*[A-Z])(?=.*\d).{6,}$/,
          "A senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um número"
        )
        .nonempty("A senha é obrigatória"),
      confirmPassword: z.string(),
      zipcode: z
        .string()
        .regex(/^\d{5}-\d{3}$/, "O CEP deve estar no formato 99999-999")
        .nonempty("O CEP é obrigatório"),
      address: z.object({
        street: z.string().nonempty("A rua é obrigatória"),
        number: z.string().nonempty("O número é obrigatório"),
        city: z.string().nonempty("A cidade é obrigatória"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpar mensagens anteriores
    localStorage.removeItem("authError"); // Limpar erros de autenticação anteriores
    try {
      if (formType === "login") {
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        login(loginData).catch((err) => {
          localStorage.setItem(
            "authError",
            err.response?.data || "Erro desconhecido"
          );
        });
      } else {
        const validatedData = formSchema.parse(formData);
        signup(validatedData).catch((err) => {
          localStorage.setItem(
            "authError",
            err.response?.data || "Erro desconhecido"
          );
        });
      }
    } catch (error) {
      if (formType === "signup" && error instanceof z.ZodError) {
        const messages = error.errors.map((err) => err.message).join(", ");
        setErrorMessage(messages);
      } else {
        setErrorMessage("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  };

  if (authLoading) {
    return <Loading />;
  }
  return (
    <div className="authPageContainer">
      {authErrorMessage && <p className="error-message">{authErrorMessage}</p>}
      {formType === "login" ? (
        <>
          <h1>Login</h1>
          <button onClick={handleChangeFormType}>
            Não possui uma conta? Clique aqui!
          </button>
          <form onSubmit={handleSubmitForm}>
            <TextField
              required
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Senha"
              type="password"
              name="password"
              variant="outlined"
              onChange={handleFormDataChange}
            />
            <button type="submit">
              Entrar <HiLogin />
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <>
          <h1>Registre-se</h1>
          <button onClick={handleChangeFormType}>
            Já possui uma conta? Clique aqui
          </button>
          <form onSubmit={handleSubmitForm}>
            <TextField
              required
              label="Nome"
              name="fullname"
              variant="outlined"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Email"
              name="email"
              variant="outlined"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Senha"
              name="password"
              variant="outlined"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Confirmar Senha"
              name="confirmPassword"
              variant="outlined"
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="CEP"
              name="zipcode"
              variant="outlined"
              value={formData.zipcode}
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Rua"
              name="street"
              variant="outlined"
              value={formData.address.street}
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Número"
              name="number"
              variant="outlined"
              value={formData.address.number}
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Cidade"
              name="city"
              variant="outlined"
              value={formData.address.city}
              onChange={handleFormDataChange}
            />
            <button type="submit">
              Registrar <HiLogin />
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </div>
  );
}
