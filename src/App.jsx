import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./layouts/Home";
import Nav from "./components/Nav";
import About from "./components/About";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import FormProduct from "./components/FormProduct";
import FormEdition from "./components/FormEdition";
import { useAuthContext } from "./contexts/AuthContext";
import Products from "./components/Products";
import ProductsDetails from "./components/ProductsDetails";

function App() {
  const { verificationLog } = useAuthContext();

  useEffect(() => {
    verificationLog();
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/Admin/addProducts" element={<FormProduct />} />
          <Route path="/Admin/editProduct/:id" element={<FormEdition />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
