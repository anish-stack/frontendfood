import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductCard.css';
import Header from '../header/Header';
import Loader from '../loader/Loader';

const Product = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function fetchProducts() {
      // Fetch products from the server
      try {
        const response = await axios.get('https://foodbackend21.onrender.com/auth/All-product');
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);

          // Store products in session storage
          sessionStorage.setItem('products', JSON.stringify(response.data.products));
        } else {
          console.error('Products data is not an array:', response.data.products);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    }

    fetchProducts();
  }, []);

  // Function to remove a product from session storage and update the state
  function removeProductFromSession(productId) {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    sessionStorage.setItem('products', JSON.stringify(updatedProducts));
  }

  return (
    <>
      <h2 className='heading'>Featured and popular products</h2>
      {loading ? (
        <Loader /> // Display the loader while loading
      ) : (
        <div className="product-list">
          {products.map((product, index) => (
          <ProductCard
          addToCart={addToCart} key={product.id || index} {...product}
            removeProduct={() => removeProductFromSession(product.id)}
          />
          ))}
        </div>
      )}
    </>
  );
}

export default Product;
