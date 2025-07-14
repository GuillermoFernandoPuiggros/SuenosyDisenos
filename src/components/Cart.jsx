import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../contexts/CartContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CartCard from "./CartCard.jsx";
import "../styles/Cart.css";

export default function Cart() {
  const { user } = useAuthContext();
  const { productsCart, clearCart, deleteProductCart } =
    useContext(CartContext);

  const total = productsCart.reduce(
    (subTotal, product) => subTotal + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    Swal.fire({
      title: "¡Gracias por tu compra!",
      text: "Tu pedido ha sido procesado con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="cart-container mt-4">
      <div className="d-flex justify-content-end mb-3">
        {productsCart.length > 0 && (
          <Button variant="outline-danger" onClick={clearCart}>
            Vaciar carrito
          </Button>
        )}
      </div>

      <Row className="cart-titles d-none d-md-flex mb-3">
        <Col md={3}>Producto</Col>
        <Col md={3}>Descripción</Col>
        <Col md={1} className="text-center">
          Cantidad
        </Col>
        <Col md={2} className="text-end">
          Precio unitario
        </Col>
        <Col md={2} className="text-end">
          Subtotal
        </Col>
        <Col md={1}></Col>
      </Row>

      {productsCart.length > 0 ? (
        productsCart.map((product) => (
          <CartCard
            key={product.id}
            product={product}
            deleteProductCart={deleteProductCart}
          />
        ))
      ) : (
        <div className="text-center p-5">
          <h3>Tu carrito está vacío</h3>
          <p>Añade productos para verlos aquí.</p>
        </div>
      )}

      {total > 0 && (
        <Row className="mt-4 align-items-center">
          <Col md={8} className="text-md-start text-center mb-3 mb-md-0"></Col>
          <Col md={4} className="text-md-end text-center">
            <h4 className="mb-3">
              Total a pagar: ${total.toLocaleString("es-AR")}
            </h4>
            <Button
              variant="outline-success"
              size="lg"
              onClick={handleCheckout}
            >
              Ir a pagar
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}
