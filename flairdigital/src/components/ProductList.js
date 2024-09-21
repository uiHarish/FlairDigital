import React, { useState, useEffect } from "react";
import "./productList.scss"; 

const ProductList = ({ handleAddToCart, selectedPriceRange, selectedBrand }) => {
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

    // Combine all products if "all" category is selected
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

    // Filter by price range if provided
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split(' - ').map(Number);
      productsToShow = productsToShow.filter(product => {
        const price = Number(product.price); 
        return price >= min && price <= max;
      });
    }

    // Filter by selected brand if provided
    if (selectedBrand) {
      productsToShow = productsToShow.filter(product => product.brand === selectedBrand);
    }

    return productsToShow;
  };

  const productsToShow = getProductsToShow();

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
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Rating:</strong> {product.rating} ★</p>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
