import React from "react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import "./Cart.css";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Cart = ({ cartProducts, updateCart,isLoading }) => {
  const deliveryFee = 50;

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => {
      const price = parseFloat(product.discountedPrice);
      const quantity = parseFloat(product.quantity);
      return total + (price * quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 1399) {
      return subtotal;
    } else {
      return subtotal + deliveryFee;
    }
  };

  const incrementQuantity = (product) => {
    const updatedCartProducts = cartProducts.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return { ...cartProduct, quantity: cartProduct.quantity + 1 };
      }
      return cartProduct;
    });

    updateCart(updatedCartProducts);
  };

  const decrementQuantity = (product) => {
    const updatedCartProducts = cartProducts.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return { ...cartProduct, quantity: cartProduct.quantity - 1 };
      }
      return cartProduct;
    });

    updateCart(updatedCartProducts);
  };

  const removeProduct = (product) => {
    const updatedCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.id !== product.id
    );
    updateCart(updatedCartProducts);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {isLoading ? (
        <Loader /> // Display the loader when data is loading
      ) : (
        <>
          <div className="cart-products">
            {cartProducts.map((product) => (
              <div className="cart-product" key={product.id}>
                <div className="cart-product-image">
                  <img src={product.imageUrls} alt={product.title} />
                </div>
                <div className="cart-product-details">
                  <h3 className="cart-product-title">{product.title}</h3>
                  <p className="cart-product-price">
                    Rs{parseFloat(product.discountedPrice).toFixed(2)}
                  </p>
                  <div className="cart-quantity">
                    <button
                      className="cart-quantity-button"
                      onClick={() => decrementQuantity(product)}
                    >
                      <span className="cart-icon">−</span>
                    </button>
                    <span className="cart-quantity-count">{product.quantity}</span>
                    <button
                      className="cart-quantity-button"
                      onClick={() => incrementQuantity(product)}
                    >
                      <span className="cart-icon">+</span>
                    </button>
                  </div>
                </div>
                <div className="cart-remove-button">
                  <button onClick={() => removeProduct(product)}>
                    <FaTrash className="cart-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-summary-item">
              <span>Subtotal:</span>
              <span>Rs{calculateSubtotal().toFixed(2)}</span>
            </div>
            {calculateSubtotal() >= 1399 ? (
              <div className="cart-summary-item cart-total">
                <span>Total:</span>
                <span>Free Delivery</span>
              </div>
            ) : (
              <div className="cart-summary-item">
                <span>Delivery Fee:</span>
                <span>Rs{deliveryFee.toFixed(2)}</span>
              </div>
            )}
            {calculateSubtotal() < 1399 && (
              <div className="cart-summary-item cart-total">
                <span>Total:</span>
                <span>Rs{calculateTotal().toFixed(2)}</span>
              </div>
            )}
            <Link to="/checkout">
              <button className="cart-checkout-button">Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;