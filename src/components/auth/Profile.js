import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    // Retrieve the user token from sessionStorage
    const userToken = sessionStorage.getItem('userToken');

    const fetchData = async () => {
      try {
        if (userToken) {
          // Fetch user profile info
          const response = await axios.get('https://foodbackend21.onrender.com/auth/UserOrders', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          console.log(response.data)

          setUserInfo(response.data.orders.userInfo);
          setUserOrders(response.data.orders);
        }
      } catch (error) {
        console.error('Error fetching user profile info:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="profile-heading">Profile</h1>
      <div className="user-info">
        {/* Display other user info as needed */}
      </div>
      <div className="user-orders">
        <h2>User Orders</h2>
        {userOrders && userOrders.length > 0 ? (
          userOrders.map((order) => (
            <div className="user-order" key={order._id}>
              <p className="user-order-info">
                <strong>Order ID:</strong> {order._id}
              </p>
              <p className="user-order-info">
                <strong>Order Date:</strong> {order.createdAt}
              </p>
              <p className="user-order-info">
                <strong>Total Amount:</strong> Rs {order.totalPrice.toFixed(2)}
              </p>
              <p className="user-order-info">
                <strong>Shipping Info:</strong> {order.shippingInfo.address}, {order.shippingInfo.city},{' '}
                {order.shippingInfo.state}, {order.shippingInfo.Landmark}
              </p>
              <p className="user-order-info">
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
              <p className="user-order-info">
                <strong>Transaction ID:</strong> {order.transication}
              </p>
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
