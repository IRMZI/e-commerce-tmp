import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import authServices from "../../services/auth";
import addressServices from "../../services/address";
import passwordServices from "../../services/password";
import { HiLogin } from "react-icons/hi";
import { z } from "zod";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Loading = lazy(() => import("../loading/page"));

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    zipcode: "",
    phone: "",
    address: {
      street: "",
      number: "",
      city: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState(""); // Erros do formulário
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    fullname: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const authError = localStorage.getItem("authError");
  const { login, signup, authLoading } = authServices();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const { validateAddress } = addressServices();
  const { changePassword } = passwordServices();

  useEffect(() => {
    if (authData) {
      navigate("/profile");
    }
  }, [authData, navigate]);

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
      phone: "",
      address: {
        street: "",
        number: "",
        city: "",
      },
    });
    setErrorMessage("");
    localStorage.removeItem("authError");
    setFormType(formType === "login" ? "signup" : "login");
  };

  const handleFormDataChange = async (e) => {
    const { name, value } = e.target;

    if (["street", "number", "city"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else if (name === "phone") {
      // Formatar telefone automaticamente
      const formattedPhone = value
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/^(\d{2})(\d{4,5})(\d{4}).*/, "$1 $2-$3"); // Aplica formato
      setFormData((prevState) => ({
        ...prevState,
        phone: formattedPhone,
      }));
    } else if (name === "zipcode") {
      // Formatar e validar CEP automaticamente
      const formattedZipcode = value
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/(\d{5})(\d{3}).*/, "$1-$2"); // Aplica o formato 00000-000
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedZipcode,
      }));

      // Realizar a validação do CEP ao atingir o comprimento adequado
      if (formattedZipcode.length === 9) {
        try {
          const data = await validateAddress(formattedZipcode); // Chama a função de validação do CEP
          setFormData((prevState) => ({
            ...prevState,
            address: {
              ...prevState.address,
              street: data.street || "",
              city: data.city || "",
            },
          }));
        } catch (err) {
          setErrorMessage("CEP inválido ou não encontrado.");
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    setErrorMessage("");
    localStorage.removeItem("authError");
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
    setForgotPasswordData({
      email: "",
      fullname: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (
      forgotPasswordData.newPassword !== forgotPasswordData.confirmNewPassword
    ) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }
    try {
      await changePassword(forgotPasswordData);
      handleForgotPasswordClose();
    } catch (error) {
      setErrorMessage("Erro ao solicitar mudança de senha.");
    }
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
      phone: z
        .string()
        .regex(
          /^51 \d{4,5}-\d{4}$/,
          "O telefone deve estar no formato 51 XXXXX-XXXX ou 51 XXXX-XXXX"
        )
        .nonempty("O número de telefone é obrigatório"),
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
    setErrorMessage("");
    localStorage.removeItem("authError");
    try {
      if (formType === "login") {
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        login(loginData)
          .then(() => navigate("/profile"))
          .catch((err) => {
            localStorage.setItem(
              "authError",
              err.response?.data || "Erro desconhecido"
            );
          });
      } else {
        const validatedData = formSchema.parse(formData);
        signup(validatedData)
          .then(() => navigate("/profile"))
          .catch((err) => {
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (authLoading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Loading />
      </Suspense>
    );
  }
  return (
    <div className="authPageContainer">
      {authErrorMessage && <p className="error-message">{authErrorMessage}</p>}
      {formType === "login" ? (
        <>
          <h1>Login</h1>
          <button
            onClick={handleChangeFormType}
            aria-label="Não possui uma conta? Clique aqui!"
          >
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
            <button type="submit" aria-label="Entrar">
              Entrar <HiLogin />
            </button>
          </form>
          <button
            onClick={handleForgotPasswordOpen}
            aria-label="Esqueci minha senha"
          >
            Esqueci minha senha
          </button>
          <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose}>
            <div className="dialogContainer">
              <DialogTitle className="dialogTitle">Redefinir Senha</DialogTitle>
              <DialogContent className="dialogContent">
                <form onSubmit={handleForgotPasswordSubmit}>
                  <TextField
                    required
                    label="Email"
                    name="email"
                    variant="outlined"
                    onChange={handleForgotPasswordChange}
                  />
                  <TextField
                    required
                    label="Nome"
                    name="fullname"
                    variant="outlined"
                    onChange={handleForgotPasswordChange}
                  />
                  <TextField
                    required
                    label="Nova Senha"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    onChange={handleForgotPasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    required
                    label="Confirmar Nova Senha"
                    name="confirmNewPassword"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    onChange={handleForgotPasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <DialogActions className="dialogActions">
                    <Button
                      className="dialogButton"
                      onClick={handleForgotPasswordClose}
                    >
                      Cancelar
                    </Button>
                    <Button className="dialogButton" type="submit">
                      Enviar
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </div>
          </Dialog>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <>
          <h1>Registre-se</h1>
          <button
            onClick={handleChangeFormType}
            aria-label="Já possui uma conta? Clique aqui"
          >
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
              label="Telefone"
              name="phone"
              variant="outlined"
              value={formData.phone}
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
            <button type="submit" aria-label="Registrar">
              Registrar <HiLogin />
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </div>
  );
}
