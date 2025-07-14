import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Cart.css";

function CartCard({ product, deleteProductCart }) {
  return (
    <Row className="cart-card align-items-center mb-3">
      <Col xs={12} md={3} className="d-flex align-items-center mb-2 mb-md-0">
        <img className="cart-image me-3" src={product.image} alt={product.name} />
        <h5 className="cart-product mb-0">{product.name}</h5>
      </Col>

      <Col xs={12} md={3} className="mb-2 mb-md-0">
        <p className="description-cart mb-0">{product.description}</p>
      </Col>

      <Col xs={4} md={1} className="text-center">
        <span>{product.quantity}</span>
      </Col>

      <Col xs={4} md={2} className="text-end">
        <span>${product.price.toLocaleString("es-AR")}</span>
      </Col>

      <Col xs={4} md={2} className="text-end">
        <strong>${(product.quantity * product.price).toLocaleString("es-AR")}</strong>
      </Col>

      <Col xs={12} md={1} className="text-center mt-2 mt-md-0">
        <Button
          variant="danger"
          size="sm"
          className="button-cart"
          onClick={() => deleteProductCart(product.id)}
        >
          Eliminar
        </Button>
      </Col>
    </Row>
  );
}

export default CartCard;