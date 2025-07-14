import { useEffect, useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import Card from "./Card.jsx";
import { useProductsContext } from "../contexts/ProductsContext";
import { Row, Col, Button, Spinner, Pagination, InputGroup, Form } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ProductList.css";

function ProductList() {
  const { products, fetchAllProducts } = useProductsContext();
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [charging, setCharging] = useState(true);
  const [error, setError] = useState(null);
  const { search, setSearch } = useSearch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetchAllProducts();
        setCharging(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setError("Hubo un problema al cargar los productos.");
        setCharging(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setSearch(searchInput.trim().toLowerCase());
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const productsFiltered = products.filter((product) => {
    const productName = product?.name?.toLowerCase() || '';
    const searchTerm = (search || "").toLowerCase();
    return searchTerm === "" || productName.includes(searchTerm);
  });

  const totalPages = Math.ceil(productsFiltered.length / productsPerPage);
  const indexLastProduct = currentPage * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const productsCurrent = productsFiltered.slice(indexFirstProduct, indexLastProduct);

  if (charging) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center mt-3">{error}</p>;
  }

  return (
    <div className="products-list-container">
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar productos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>

      {productsCurrent.length > 0 ? (
        <Row>
          {productsCurrent.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No hay productos que coincidan con la búsqueda.</p>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ProductList;
