import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  const formRef = useRef();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  function registrarUsuario(e) {
    e.preventDefault();
    setIsLoading(true);
    
    if (!usuario || !password) {
      dispararSweetBasico("Error", "Por favor completa todos los campos", "error", "Cerrar");
      setIsLoading(false);
      return;
    }

    
    if (!usuario.includes("@") || !usuario.includes(".")) {
      dispararSweetBasico("Error", "Por favor ingresa un email válido", "error", "Cerrar");
      setIsLoading(false);
      return;
    }

    crearUsuario(usuario, password)
      .then((userCredential) => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "Ahora puedes iniciar sesión", "success", "Confirmar");
        setShow(true); 
        setPassword("");
      })
      .catch((error) => {
        let errorMessage = "Ocurrió un error al registrar";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "El correo ya está en uso";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "La contraseña debe tener al menos 6 caracteres";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "El correo electrónico no es válido";
        }
        dispararSweetBasico("Error", errorMessage, "error", "Cerrar");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!usuario || !password) {
      dispararSweetBasico("Error", "Por favor completa todos los campos", "error", "Cerrar");
      setIsLoading(false);
      return;
    }

    loginEmailPass(usuario, password)
      .then((userCredential) => {
        login(usuario);
        dispararSweetBasico("Inicio de sesión exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        let errorMessage = "Ocurrió un error al iniciar sesión";
        if (error.code === "auth/invalid-credential") {
          errorMessage = "Credenciales incorrectas";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "Usuario no encontrado";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Contraseña incorrecta";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Demasiados intentos fallidos. Intenta más tarde";
        }
        dispararSweetBasico("Error", errorMessage, "error", "Cerrar");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
    setUsuario("");
    setPassword("");
  }

  if (user || admin) {
    return (
      <form onSubmit={handleSubmit}>
        <Button variant="outline-success" type="submit">
          Cerrar sesión
        </Button>
      </form>
    );
  }

  if (!user && show) {
    return (
      <Container className="my-5" style={{ maxWidth: "600px" }}>
        <Form ref={formRef} onSubmit={iniciarSesionEmailPass}>
          <h2>Iniciar sesión con Email y contraseña</h2>
          <Form.Group className="mb-3" controlId="email-user">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password-user">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </Form.Group>
          <Button 
            variant="outline-success" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </Form>
        <Button 
          variant="outline-secondary" 
          style={{ marginTop: "2px" }} 
          onClick={handleShow}
          disabled={isLoading}
        >
          Regístrate
        </Button>
      </Container>
    );
  }

  if (!user && !show) {
    return (
      <Container className="my-5" style={{ maxWidth: "600px" }}>
        <Form ref={formRef} onSubmit={registrarUsuario}>
          <h2>Registrarse</h2>
          <Form.Group className="mb-3" controlId="new-email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="new-password">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </Form.Group>
          <Button 
            variant="outline-secondary" 
            type="submit" 
            style={{ marginTop: "2px" }}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Registrarse"}
          </Button>
        </Form>
        <Button 
          variant="outline-success" 
          style={{ marginTop: "2px" }} 
          onClick={handleShow}
          disabled={isLoading}
        >
          Iniciar Sesión
        </Button>
      </Container>
    );
  }
}

export default Login;