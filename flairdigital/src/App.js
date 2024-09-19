import React, { useState } from "react";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import ProductList from "./components/ProductList";
import Sidenav from "./components/Sidenav/Sidenav";
import './App.css';
import MenuBar from "./components/Menubar/MenuBar";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="App">
      <Navbar cart={cart} />
      <MenuBar />
      <div className="main-content">
        <Sidenav onPriceRangeChange={setSelectedPriceRange} /> 
        <ProductList handleAddToCart={handleAddToCart} selectedPriceRange={selectedPriceRange} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
