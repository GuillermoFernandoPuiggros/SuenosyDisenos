import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../auth/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [productFound, setProductFound] = useState(null);

  const [filters, setFilters] = useState({
    categorias: [],
    tipos: [],
    precio: {
      min: 0,
      max: Infinity,
    },
    orden: "relevancia",
  });

  const productsCollection = collection(db, "productosSyD");

  const fetchAllProducts = async () => {
    try {
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProducts(productsData); 
      setProducts(productsData); 
      return productsData;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw new Error("Error al obtener los productos");
    }
  };

  const applyFiltersAndSort = () => {
    let result = allProducts.filter((product) => {
      const matchCategoria =
        filters.categorias.length === 0 ||
        filters.categorias.includes(product.category);

      const matchTipo =
        filters.tipos.length === 0 || filters.tipos.includes(product.type);

      const matchPrecio =
        product.price >= filters.precio.min &&
        product.price <= filters.precio.max;

      return matchCategoria && matchTipo && matchPrecio;
    });

    if (filters.orden === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.orden === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setProducts(result); 
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, allProducts]);

  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(productsCollection, product);
      await fetchAllProducts();
      return { id: docRef.id, ...product };
    } catch (error) {
      throw new Error("Error al agregar el producto.");
    }
  };

  const getProduct = async (id) => {
    try {
      const docRef = doc(db, "productosSyD", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const product = { id: docSnap.id, ...docSnap.data() };
        setProductFound(product);
        return product;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      throw new Error("Hubo un error al obtener el producto.");
    }
  };

  const editProduct = async (product) => {
    try {
      const docRef = doc(db, "productosSyD", product.id);
      await updateDoc(docRef, product);
      await fetchAllProducts(); 
      return product;
    } catch (error) {
      throw new Error("Error al actualizar el producto.");
    }
  };

  const deleteProduct = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (confirmar) {
      try {
        const docRef = doc(db, "productosSyD", id);
        await deleteDoc(docRef);
        await fetchAllProducts(); 
        alert("Producto eliminado correctamente.");
      } catch (error) {
        alert("Hubo un problema al eliminar el producto.");
        throw error;
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        fetchAllProducts, 
        products,
        addProduct,
        getProduct,
        productFound,
        editProduct,
        deleteProduct,
        filters,
        setFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductsContext = () => useContext(ProductsContext);
