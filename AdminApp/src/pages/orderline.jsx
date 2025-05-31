import React, { useState, useEffect } from 'react';
import styles from '../styles/orderline.module.css';
import OrderCard from '../components/ordercard.jsx';


function orderline() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  return (
    <div className={styles.orderline_container}>
      <h2>Order Line</h2>
      <div className={styles.orderline_maincontainer}>

        {orders.map((order, index) => (
          <OrderCard key={order._id || index} order={order} index={index} />
        ))}

        
      </div>
    </div>
  )
}

export default orderline
