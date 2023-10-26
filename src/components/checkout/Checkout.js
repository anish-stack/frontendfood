import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Checkout.css';
import axios from 'axios'; // Import Axios for making API requests
import Payment from './payment';

const Checkout = ({ cartProducts, updateCart }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [formData, setFormData] = useState({
    city: '',
    address: '',
    state: '',
    Pincode: '',
    Landmark: '',
  });

  if(!sessionStorage.getItem('userToken')){
    window.location.href="/login";
  }



  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => {
      const price = parseFloat(product.discountedPrice);
      const quantity = parseFloat(product.quantity);
      return total + price * quantity;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal()
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (cartProducts.length === 0) {
      toast.error('Your cart is empty. Please add items before checking out.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
  
    const itemsPrice = calculateSubtotal();
    const shippingPrice =''
    const totalPrice = calculateTotal();
  
    // Show the payment modal immediately
    setShowPaymentModal(true);
  
    // Automatically mark the payment as done after 30 seconds
    setTimeout(async () => {
      try {
        // Make a POST request to the server to create the order
        const response = await axios.post('https://foodbackend21.onrender.com/make-a-order', {
          shippingInfo: formData,
          orderItems: cartProducts,
          itemsPrice,
          shippingPrice,
          totalPrice,
        }, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`,
          },
        });
  
        if (response.status === 201) {
          // Order successfully placed, clear the cart
          updateCart([]);
          toast.success('Order successfully placed!', {
            position: 'top-center',
            autoClose: 3000,
          });
          setShowPaymentModal(false);
          window.location.href="/products"
        } else {
          toast.error('Failed to place the order. Please try again later.', {
            position: 'top-center',
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred. Please try again later.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    }, 3000); // 30 seconds
  };
  
  

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-details">
        <div className="checkout-summary">
          <div className="checkout-summary-item">
            <span>Subtotal:</span>
            <span>Rs{calculateSubtotal().toFixed(2)}</span>
          </div>
          {/* <div className="checkout-summary-item">
            <span>Delivery Fee:</span>
            <span>Rs{deliveryFee.toFixed(2)}</span>
          </div> */}
          <div className="checkout-summary-item cart-total">
            <span>Total:</span>
            <span>Rs{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <div className="checkout-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="City">City</label>
              <input
                type="text"
                name="name"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                name="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Pincode">Pincode</label>
              <input
                type="text"
                name="Pincode"
                value={formData.Pincode}
                onChange={(e) => setFormData({ ...formData, Pincode: e.target.value })}
                placeholder="Pincode"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Landmark">Landmark</label>
              <input
                type="text"
                name="Landmark"
                value={formData.Landmark}
                onChange={(e) => setFormData({ ...formData, Landmark: e.target.value })}
                placeholder="Landmark"
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Place Order</button>
            </div>
          </form>
        </div>
      </div>

      {showPaymentModal && (
    <Payment
      cartProducts={cartProducts}
      totalAmount={calculateTotal()}
      onHide={() => setShowPaymentModal(false)} // Callback to close the Payment modal
    />
  )}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
