import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useProductsContext } from "../contexts/ProductsContext";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/FormEdition.css";

function FormEdition() {
  const navigate = useNavigate();
  const { admin } = useAuthContext();
  const { getProduct, productFound, editProduct } = useProductsContext();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    image: "",
    name: "",
    price: "",
    type: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        await getProduct(id);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error al cargar el producto");
        setLoading(false);
      }
    };

    loadProductData();
  }, [id]);

  useEffect(() => {
    if (productFound) {
      setFormData({
        category: productFound.category || "",
        description: productFound.description || "",
        image: productFound.image || "",
        name: productFound.name || "",
        price: productFound.price || "",
        type: productFound.type || "",
      });
    }
  }, [productFound]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "El nombre es obligatorio.";
    if (!formData.price || Number(formData.price) <= 0)
      return "El precio debe ser mayor a 0.";
    if (!formData.description.trim() || formData.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!formData.image.trim())
      return "La URL de la imagen no debe estar vacía.";
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();

    if (validation !== true) {
      toast.error(validation);
      return;
    }

    try {
      await editProduct({ id, ...formData });

      toast.success("Producto actualizado correctamente", {
        onClose: () => navigate("/productos"),
        autoClose: 2000,
      });

      setFormData({
        category: "",
        description: "",
        image: "",
        name: "",
        price: "",
        type: "",
      });
    } catch (err) {
      toast.error("Error al actualizar: " + err.message);
    }
  };

  const handleCancel = () => {
    navigate("/productos");
  };

  if (!admin) return <Navigate to="/login" replace />;
  if (loading)
    return (
      <Container className="form-edition-loading">
        <p>Cargando producto...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="form-edition-error">
        <p>{error}</p>
      </Container>
    );
  if (!productFound)
    return (
      <Container className="form-edition-not-found">
        <p>No se encontró el producto</p>
      </Container>
    );

  return (
    <Container className="form-edition-container">
      <h2 className="form-edition-title">Editar Producto</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-edition-group">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-edition-control"
            required
          />
        </Form.Group>

        <Form.Group className="form-edition-group">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-edition-control"
            required
          />
        </Form.Group>

        <Form.Group className="form-edition-group">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-edition-control"
            min="0.01"
            step="0.01"
            required
          />
        </Form.Group>

        <Form.Group className="form-edition-group">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-edition-control"
            required
          />
        </Form.Group>

        <Form.Group className="form-edition-group">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-edition-control"
            required
          />
        </Form.Group>

        <Form.Group className="form-edition-group">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-edition-control"
            required
          />
        </Form.Group>

        <div className="form-edition-buttons">
          <Button variant="primary" type="submit" className="form-edition-button">
            Guardar Cambios
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleCancel}
            type="button"
            className="form-edition-button"
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormEdition;