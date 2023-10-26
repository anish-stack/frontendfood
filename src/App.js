import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Product from './components/Product/product.jsx';
import Cart from './components/cart/Cart.js';
import Checkout from './components/checkout/Checkout.js';
import { ToastContainer } from 'react-toastify';
import Login from './components/auth/Login.js';
import Profile from './components/auth/Profile.js';
import ContactForm from './components/extra/Contact.jsx';
import Loader from './components/loader/Loader.js';
import Regsiter from './components/auth/Regsiter';
function App() {
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));

  // Load cart products from sessionStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cartProducts'));
    if (storedCart) {
      setCartProducts(storedCart);
      setCartCount(storedCart.reduce((count, product) => count + product.quantity, 0));
    }
    setLoading(false); // Set loading to false after loading the cart products
  }, []);

  const updateCart = (newCartProducts) => {
    setCartProducts(newCartProducts);
    setCartCount(newCartProducts.reduce((count, product) => count + product.quantity, 0));
    // Save the updated cart products in sessionStorage
    sessionStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
  };

  const addToCart = (product) => {
    const updatedCartProducts = [...cartProducts];
    const existingProduct = updatedCartProducts.find((cartProduct) => cartProduct.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCartProducts.push({ ...product, quantity: 1 });
    }

    updateCart(updatedCartProducts);
  };

  const handleLogout = () => {
    // Clear the userToken and cartProducts from sessionStorage on logout
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('cartProducts');
    setUserToken(null);
    // Reset the cart state
    setCartProducts([]);
    setCartCount(0);
  };

  return (
    <Router>
      <div>
        <Header cartCount={cartCount} userToken={userToken} handleLogout={handleLogout} />
        <Routes>
  <Route
    path="/"
    element={
      loading ? (
        <Loader />
      ) : (
        <Home addToCart={addToCart} />
      )
    }
  />
  <Route path="/products" element={<Product addToCart={addToCart} />} />
  <Route path="/cart" element={<Cart updateCart={updateCart} cartProducts={cartProducts} />} />
  <Route path="/checkout" element={<Checkout cartProducts={cartProducts} updateCart={updateCart} />} />
  {userToken ? ( // If the user is logged in, show the logout route
    <Route path="/logout" element={<Navigate to="/" />} />
  ) : (
    // If the user is not logged in, show the login and register routes
    <>
      <Route path="/login" element={<Login setUserToken={setUserToken} />} />
      <Route path="/register" element={<Regsiter setUserToken={setUserToken} />} />
    </>
  )}
  <Route path="/profile" element={<Profile />} />
  <Route path="/contact" element={<ContactForm />} />
</Routes>

        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
