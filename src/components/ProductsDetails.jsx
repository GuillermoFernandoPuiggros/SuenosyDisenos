import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import { Button } from "react-bootstrap";
import "../styles/ProductsDetails.css";

function ProductsDetails({}) {
  const navigate = useNavigate();
  const { admin } = useAuthContext();
  const { addToCart } = useContext(CartContext);
  const { productFound, getProduct, deleteProduct } = useProductsContext();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [charging, setCharging] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(id)
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else if (error === "Hubo un error al obtener el producto") {
          setError("Hubo un error al obtener el producto");
        }
      })
      .finally(() => {
        setCharging(false);
      });
  }, [id]);

  function functionCart() {
    if (quantity < 1) return;
    addToCart({ ...productFound, quantity });
    dispararSweetBasico(
      "Producto Agregado",
      "Producto agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
  }

  function shootEliminate() {
    deleteProduct(id)
      .then(() => {
        navigate("/products");
      })
      .catch((error) => {
        dispararSweetBasico(
          "Hubo un problema al agregar el producto",
          error,
          "error",
          "Cerrar"
        );
      });
  }

  function addCounter() {
    setQuantity(quantity + 1);
  }

  function substractCounter() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  if (charging) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productFound) return null;

  return (
    <div className="detail-container">
      <img
        className="detail-image"
        src={productFound.image}
        alt={productFound.name}
      />
      <div className="detail-info">
        <h2>{productFound.name}</h2>
        <p>{productFound.description}</p>
        <p className="detail-price">
          $ {productFound.price.toLocaleString("es-AR")}
        </p>
        <div className="detail-counter">
          <Button variant="secondary" onClick={substractCounter}>
            -
          </Button>
          <span>{quantity}</span>
          <Button variant="secondary" onClick={addCounter}>
            +
          </Button>
        </div>
        <div className="detail-buttons">
          {admin ? (
            <Link to={"/admin/editProduct/" + id}>
              {" "}
              <Button variant="outline-primary" className="w-100">
                Editar producto
              </Button>
            </Link>
          ) : (
            <Button
              variant="outline-primary"
              onClick={functionCart}
              className="w-100"
            >
              Agregar al carrito
            </Button>
          )}
          {admin ? (
            <Button
              variant="outline-danger"
              onClick={shootEliminate}
              className="w-100"
            >
              Eliminar Producto
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
