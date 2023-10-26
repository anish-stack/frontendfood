import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Register.css'; 
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      // Register the user
      const registrationResponse = await fetch('https://foodbackend21.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (registrationResponse.status === 201) {
        // Registration successful, extract the token from the response
        const registrationData = await registrationResponse.json();
        const token = registrationData.token;
        sessionStorage.setItem('userToken', token);
        setTimeout(() => {
            sessionStorage.removeItem('userToken');
          }, 5 * 60 * 60 * 1000); 
      console.log(token)
      window.location.href='/'
          // Example: You can display the user's name
          toast.success('Registration successful', {
            position: 'top-right', // You can adjust the position
            autoClose: 5000, // Automatically close after 5 seconds
            hideProgressBar: false, // Show the progress bar
            closeOnClick: true, // Close the toast when clicked
            pauseOnHover: true, // Pause the countdown on hover
            draggable: true, // Allow the toast to be dragged
            progress: undefined, // Use the default progress bar
            className: 'custom-toast-success', // Add a custom CSS class
            bodyClassName: 'custom-toast-body-success', // Add a custom body CSS class
          });
        }
       else {
        
        toast.error(' User already exists with this Email Id', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'custom-toast-error', // Apply the custom CSS class
            bodyClassName: 'custom-toast-body-error', // Apply the custom body CSS class
          });
      }
    } catch (error) {
      toast.error('Registration failed');
    }
  };
   
  

  return (
    <div className="register-container">
      <h1>Register</h1>
      <div className="form">
        <form className="form-register">
          <div className="register-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="register-form">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit-form">
            <button type="submit" onClick={handleSubmit}>Register</button>
          </div>
          <div className="already">
          <Link to="/login">Already Have An Account?</Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
