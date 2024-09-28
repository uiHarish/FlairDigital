import React, { useState, useEffect } from "react";
import "./productList.scss"; 



const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

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

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); 
    setCart([...cart, product]);
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
        <button
          className="cart-button"
          onClick={() =>
            alert("Cart: " + cart.map((item) => item.name).join(", "))
          }
        >
          View Cart ({cart.length})
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
              onClick={(e) => handleAddToCart(e, product)}
              className="add-to-cart-button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClosePopup} className="popup-close-button">
              ×
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "50%", height: "30%", borderRadius: "8px"}}
            />
            <h2>{selectedProduct.name}</h2>
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Price:</strong> {selectedProduct.price}
            </p>
            <p>
              <strong>Rating:</strong> {selectedProduct.rating} ★
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;