import React, { useState, useEffect } from "react";
import "./productList.scss"; 

const ProductList = ({ handleAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/ProductList-mock.json");
        const data = await response.json();
        setFetchedProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getProductsToShow = () => {
    if (selectedCategory === "all") {
      return [
        ...(fetchedProducts.mobiles || []),
        ...(fetchedProducts.laptops || []),
        ...(fetchedProducts.electronicsAccessories || []),
        ...(fetchedProducts.homeAppliances || []),
      ];
    }
    return fetchedProducts[selectedCategory] || [];
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <nav>
        <button onClick={() => handleCategoryChange("all")}>
          All Products
        </button>
        <button onClick={() => handleCategoryChange("mobiles")}>Mobiles</button>
        <button onClick={() => handleCategoryChange("laptops")}>Laptops</button>
        <button onClick={() => handleCategoryChange("electronicsAccessories")}>
          Electronics Accessories
        </button>
        <button onClick={() => handleCategoryChange("homeAppliances")}>
          Home Appliances
        </button>
      </nav>

      <div className="product-grid">
        {getProductsToShow().map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
            <p>
              <strong>Rating:</strong> {product.rating} ★
            </p>
            <button
              onClick={(e) => handleAddToCart(product)} 
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
