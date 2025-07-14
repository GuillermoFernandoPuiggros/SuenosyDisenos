import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../assets/_sueños_y_diseños_logo.png";
import { useAuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import "../styles/Nav.css";

function NavBar() {
  const { user, admin, logout } = useAuthContext(); 
  const { cartCount } = useContext(CartContext);

  return (
    <header>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex flex-lg-row flex-column align-items-lg-center align-items-start">
            <img
              src={logoImage}
              alt="Sueños y Diseños logo"
              height="40"
              className="me-lg-2"
            />
            <span className="brand-name text-nowrap text-lg-start">Sueños y Diseños</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto text-center">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                ¿Quiénes Somos?
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contáctanos
              </Nav.Link>
              {!user ? (
                <Nav.Link as={Link} to="/login">
                  Ingresar
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      {user.name || "Mi cuenta"}{" "}
                    </>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {admin && (
                <Nav.Link as={Link} to="/admin/addProducts">
                  Agregar productos
                </Nav.Link>
              )}
              <Nav.Link
                as={Link}
                to="/cart"
                className="position-relative"
                aria-label="Carrito de compras"
              >
                <FontAwesomeIcon icon={faCartPlus} />
                {cartCount > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;
