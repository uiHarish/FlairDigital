import React, { useState, useEffect } from "react";
import "./productList.scss"; 

const ProductList = ({ handleAddToCart, selectedPriceRange }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/ProductList-mock.json");
        const data = await response.json();
        setFetchedProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getProductsToShow = () => {
    let productsToShow = [];

    
    if (selectedCategory === "all") {
      productsToShow = [
        ...(fetchedProducts.mobiles || []),
        ...(fetchedProducts.laptops || []),
        ...(fetchedProducts.electronicsAccessories || []),
        ...(fetchedProducts.homeAppliances || []),
      ];
    } else {
      productsToShow = fetchedProducts[selectedCategory] || [];
    }

    
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split(' - ').map(Number);
      productsToShow = productsToShow.filter(product => {
        const price = Number(product.price); 
        return price >= min && price <= max;
      });
    }

   
    console.log("Selected Price Range:", selectedPriceRange);
    console.log("Products to show:", productsToShow);
    
    return productsToShow;
  };

  return (
    <div>
      <nav>
        <button onClick={() => setSelectedCategory("all")}>All Products</button>
        <button onClick={() => setSelectedCategory("mobiles")}>Mobiles</button>
        <button onClick={() => setSelectedCategory("laptops")}>Laptops</button>
        <button onClick={() => setSelectedCategory("electronicsAccessories")}>
          Electronics Accessories
        </button>
        <button onClick={() => setSelectedCategory("homeAppliances")}>
          Home Appliances
        </button>
      </nav>

      <div className="product-grid">
        {getProductsToShow().map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating} ★</p>
            <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
