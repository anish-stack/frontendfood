import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import './Register.css'; // Import your CSS file for registration

const Login = () => {
  const [formData, setFormData] = useState({
  
    email: '',
 
    password: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const loginResponse = await fetch('https://foodbackend21.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log(loginResponse)
      if (loginResponse.status === 200) {
        // Login successful, extract the token from the response
        const loginData = await loginResponse.json();
        const token = loginData.token;
  
        // Store the token in session storage
        sessionStorage.setItem('userToken', token);
  
        // Redirect to the desired location (e.g., homepage)
        window.location.href = '/';
  
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast-success',
          bodyClassName: 'custom-toast-body-success',
        });
      } else {
        toast.error('Login failed. User does not exist or wrong credentials.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast-error',
          bodyClassName: 'custom-toast-body-error',
        });
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };
  
   
  

  return (
    <div className="register-container">
      <h1>Login</h1>
      <div className="form">
        <form className="form-register">
          
          <div className="register-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="register-form passw">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
           
          </div>
          <div className="submit-form">
            <button type="submit" onClick={handleSubmit}>Login</button>
          </div>
          <div className="already">
          <Link to="/register"> I  Want new Account?</Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
