import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "./auth.css";
import authServices from "../../services/auth";
export default function Auth() {
  // -> define o estado do tipo de formulario para login por padrão
  const [formType, setFormType] = useState("login");
  // -> define os dados do formulário como null por padrão
  const [formData, setFormData] = useState(null);
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
    setFormData(null);
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  };

  // -> função para detectar a mudança nos campos do formulário
  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
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
    return <h1>Loading</h1>;
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
            <Button type="submit">Entrar</Button>
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
            <Button type="submit">Registrar</Button>
          </form>
        </>
      ) : null}
    </div>
  );
}
