import { crearProducto, deleteProduct } from "./firebase/firebaseConfig";

// AGREGAR PRODUCTO A FIREBASE
export const addProduct = async (product) => {
  try {
    const docRef = await crearProducto(product);
    return {
      ...product,
      id: docRef.id,
    };
  } catch (error) {
    throw new Error("Error al agregar el producto: " + error.message);
  }
};

// ELIMINAR PRODUCTO DE FIREBASE
export const eliminateProduct = async (id) => {
  const confirmar = window.confirm("¿Estás seguro de eliminar?");
  if (!confirmar) return;

  try {
    await deleteProduct(id);
    alert("Producto eliminado correctamente.");
  } catch (error) {
    alert("Hubo un problema al eliminar el producto.");
    throw new Error(error.message);
  }
};
