import React, { useState } from 'react';
import './payment.css'
const Payment = ({ cartProducts, totalAmount, onHide }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onHide();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="payment-details">
              <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
              <div className="product-details">
                <h4>Product Details:</h4>
                <ul>
                  {cartProducts.map((product) => (
                    <li key={product.id}>
                      {product.name} - Rs {product.discountedPrice} x {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="qr-code">
                <img src="https://www.qrcode-monkey.com/img/default-preview-qr.svg" alt="QR Code" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            {/* Add a button for making the payment */}
            {/* You can implement your payment logic here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
