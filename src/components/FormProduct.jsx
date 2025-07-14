import React, { useState, useRef } from "react";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useProductsContext } from "../contexts/ProductsContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FormProduct({}) {
  const formRef = useRef();
  const { addProduct } = useProductsContext();
  const { admin } = useAuthContext();

  const [product, setProduct] = useState({
    category: "",
    description: "",
    image: "",    
    name: "",
    price: "",
    type: "",
  });

  const validateForm = () => {
    if (!product.category.trim()) {
      return "El campo categoría no debe estar vacío";
    }
    if (!product.description.trim() || product.description.length < 10) {
      return "El campo descripción debe tener al menos 10 caracteres.";
    }
    if (!product.image.trim()) {
      return "El campo url de la imagen no debe estar vacío";
    }
    if (!product.name.trim()) {
      return "El campo nombre no debe estar vacío.";
    }
    if (isNaN(product.price) || Number(product.price) <= 0) {
      return "El campo precio debe ser un numero mayor a 0.";
    }
    if (!product.type.trim()) {
      return "El campo tipo no debe estar vacío";
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = validateForm();
    if (validForm == true) {
      addProduct(product)
        .then((data) => {
          setProduct({
            category: "",
            description: "",
            image: "",
            name: "",
            price: "",
            type: "",
          });
        })
        .catch((error) => {
          dispararSweetBasico(
            "Hubo un problema al agregar el producto",
            error,
            "error",
            "Cerrar"
          );
        });
    } else {
      dispararSweetBasico(
        "Error en la carga de producto",
        validForm,
        "error",
        "Cerrar"
      );
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h2>Agregar Producto</h2>

        <Form.Group className="mb-3" controlId="product-category">
          <Form.Label>Categoría:</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="product-description">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="product-image">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="product-name">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="product-price">
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="product-type">
          <Form.Label>Tipo:</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={product.type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
}

export default FormProduct;
