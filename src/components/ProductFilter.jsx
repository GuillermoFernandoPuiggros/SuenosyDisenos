import { useProductsContext } from "../contexts/ProductsContext";
import ProductList from "./ProductList";
import "../styles/ProductFilter.css";

const ProductFilter = () => {
  const { filters, setFilters } = useProductsContext();

  const handleCheckbox = (e, group) => {
    const value = e.target.nextSibling.textContent;
    const checked = e.target.checked;

    setFilters((prev) => {
      const updatedGroup = checked
        ? [...prev[group], value]
        : prev[group].filter((item) => item !== value);

      return {
        ...prev,
        [group]: updatedGroup,
      };
    });
  };

  return (
    <section className="listaPrincipal">
      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filters-category">
          <div className="filter-category">
            <h3>Categorías</h3>
            {["Baño", "Cocina", "Comedor", "Dormitorio", "Living"].map(
              (cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    checked={filters.categorias.includes(cat)}
                    onChange={(e) => handleCheckbox(e, "categorias")}
                  />
                  <span>{cat}</span>
                </label>
              )
            )}
          </div>
          <div className="filter-category">
            <h3>Tipo de mueble</h3>
            {[
              "Alacenas",
              "Aparadores",
              "Bajo Mesadas",
              "Camas",
              "Cuchetas",
              "Mesas",
              "Placares",
              "Roperos",
              "Sillas",
              "Sillones",
              "Vanitory",
            ].map((tipo) => (
              <label key={tipo}>
                <input
                  type="checkbox"
                  checked={filters.tipos.includes(tipo)}
                  onChange={(e) => handleCheckbox(e, "tipos")}
                />
                <span>{tipo}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>
      <main className="our-products">
        <div className="options">
          <h2>TODOS NUESTROS PRODUCTOS</h2>
          <div className="type-options">
            <label>
              Ordenar por:
              <select
                value={filters.orden}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    orden: e.target.value,
                  }))
                }
              >
                <option value="relevancia">Más Relevante</option>
                <option value="asc">Precio: Menor a Mayor</option>
                <option value="desc">Precio: Mayor a Menor</option>
              </select>
            </label>
          </div>
        </div>
        <ProductList />
      </main>
    </section>
  );
};

export default ProductFilter;
