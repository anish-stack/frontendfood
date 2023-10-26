import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col col-1">
        <h3>Contact Information</h3>
        <p>Pritam Pura </p>
        <p>Delhi,110034</p>
        <p>Email: info@bhansaghar.com</p>
        <p>Phone: +91 7722559966</p>
      </div>
      <div className="footer-col col-1">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms and Conditions</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </div>
      <div className="footer-col col-1">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <i className="ri-twitter-line"></i>
          <i className="ri-instagram-line"></i>
          <i className="ri-facebook-line"></i>
        </div>
      </div>
      <div className="footer-col col-1">
        <h3>Newsletter</h3>
        <p>Subscribe to our newsletter for updates.</p>
        <input type="email" className="input" placeholder="Your Email" />
        <button className="button">Subscribe</button>
      </div>
      <div className="footer-col col-1">
        <p>&copy; 2023 Bhansaghar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
