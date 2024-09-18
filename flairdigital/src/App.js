import React, { useState } from "react";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import ProductList from "./components/ProductList";
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="App">
      <Navbar cart={cart} />
      <ProductList handleAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}

export default App;
