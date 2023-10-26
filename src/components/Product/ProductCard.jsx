import React from 'react';
import { FaCartPlus } from 'react-icons/fa'; // Import the cart icon from react-icons
import './ProductCard.css'; // Import your CSS file

const ProductCard = ({ addToCart, _id, brand, category, discountedPrice, imageUrls, title }) => {
  const handleAddToCart = () => {
    // Pass the product details as an object to the addToCart function
    addToCart({
      id: _id, // Use _id to pass the id
      brand,
      category,
      discountedPrice,
      imageUrls,
      title,
    });

    console.log('Product added to cart');
  };

  return (
    <div className="productcard">
      <div className="product-img">
        <img src={imageUrls} alt={title} />
      </div>
      <div className="content">
        <div className="left">
          <h3>{title}</h3>
          <h4>{brand}</h4>
        </div>
        <div className="right">
          <p>Rs{discountedPrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="btn">
        <button onClick={handleAddToCart}>
          <FaCartPlus className="cart-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
