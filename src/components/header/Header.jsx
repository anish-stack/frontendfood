import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear the userToken from session storage
    sessionStorage.removeItem('userToken');
    window.location.reload();
    
  };

  return (
    <header>
      <div className="logo">
      <Link className="logo-text" to="/">  <span>BhansaGhar</span></Link>
      </div>
      <nav className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
        <ul className="navbar-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <div className="dropdown">
              <Link to="/products">Products</Link>
              {/* <div className="dropdown-content"></div> */}
            </div>
          </li>
          {/* <li>
            <Link to="/about">About</Link>
          </li> */}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="header-icons">
        <div className="cart-icon">
          <Link to="/cart">
            <i className="ri-shopping-cart-line icons"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
        {sessionStorage.userToken ? (
          <>
            <div className="logout-icon">
              <button onClick={handleLogout}>
                <i className="ri-logout-box-line icons"></i>
               
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cart-icon">
              <Link to="/register">
                <i className="ri-shield-user-fill"></i>
              </Link>
            </div>
            <div className="login-icon">
              <Link to="/login">
                <i className="ri-login-box-line icons"></i>
              </Link>
            </div>
          </>
        )}
        <div className={`menu-icon ${isMenuOpen ? 'hide' : ''}`} onClick={toggleMenu}>
          <i className="ri-menu-3-line"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
