import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Card.css";

function CardProduct({ product }) {
  return (
    <Card className="card-product">
      <div className="card-content-wrapper">
        <Card.Title className="card-title">{product.name}</Card.Title>
        <Card.Img
          variant="top"
          src={product.image}
          className="card-image"
        />
        <div className="card-price">
          <Card.Text>
            <strong>$ {product.price.toLocaleString("es-AR")}</strong>
          </Card.Text>
        </div>
        <div className="card-description">
          <Card.Text>{product.description}</Card.Text>
        </div>
      </div>
      <Card.Body className="card-body">
        <div className="div-button">
          <Link to={"/products/" + product.id}>
            <Button variant="outline-success">Ver más detalles</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProduct;