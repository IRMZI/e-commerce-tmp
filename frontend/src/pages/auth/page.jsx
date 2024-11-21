import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./auth.css";
import authServices from "../../services/auth";
import { HiLogin } from "react-icons/hi";
import Loading from "../loading/page";
export default function Auth() {
  // -> define o estado do tipo de formulario para login por padrão
  const [formType, setFormType] = useState("login");
  // -> define os dados do formulário como null por padrão
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      number: "",
      city: "",
    },
  });
  // -> define as funções login e signup
  const { login, signup, authLoading } = authServices();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (authData) {
      return navigate("/profile");
    }
  }, [authData]);
  // -> função para alterar entre login e registro
  const handleChangeFormType = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: {
        street: "",
        number: "",
        city: "",
      },
    });
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  };

  // -> função para detectar a mudança nos campos do formulário
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
  };
  // -> função de envio do formulário
  const handleSubmitForm = (e) => {
    e.preventDefault();
    switch (formType) {
      case "login":
        login(formData);
        break;
      case "signup":
        if (formData.password !== formData.confirmPassword) {
          console.log("Senhas não são iguais");
          return;
        }
        signup(formData);
        break;
    }
  };

  if (authLoading) {
    return <Loading />;
  }
  return (
    // -> Usa renderização condicional para mostrar a pagina de login ou registro
    <div className="authPageContainer">
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
            ></TextField>
            <TextField
              required
              label="Senha"
              type="password"
              name="password"
              variant="outlined"
              onChange={handleFormDataChange}
            ></TextField>
            <button type="submit">
              {" "}
              Entrar
              <HiLogin />
            </button>
          </form>
        </>
      ) : null}
      {formType === "signup" ? (
        <>
          <h1>Registre-se</h1>
          <button onClick={handleChangeFormType}>
            Já possui uma conta? Clique aqui
          </button>
          <form onSubmit={handleSubmitForm}>
            <TextField
              required
              label="Nome"
              type="fullname"
              name="fullname"
              variant="outlined"
              onChange={handleFormDataChange}
            ></TextField>
            <TextField
              required
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              onChange={handleFormDataChange}
            ></TextField>
            <TextField
              required
              label="Senha"
              type="password"
              name="password"
              variant="outlined"
              onChange={handleFormDataChange}
            ></TextField>
            <TextField
              required
              label="Confirmar Senha"
              type="password"
              name="confirmPassword"
              variant="outlined"
              onChange={handleFormDataChange}
            ></TextField>
            <TextField
              required
              label="Rua"
              type="text"
              name="street"
              variant="outlined"
              value={formData.address.street}
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Número"
              type="number"
              name="number"
              variant="outlined"
              value={formData.address.number}
              onChange={handleFormDataChange}
            />
            <TextField
              required
              label="Cidade"
              type="text"
              name="city"
              variant="outlined"
              value={formData.address.city}
              onChange={handleFormDataChange}
            />

            <button type="submit">
              Registrar
              <HiLogin />
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}
