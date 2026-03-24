import React, { useState, useEffect } from 'react'
import './Orders.css'
import { toast } from "react-toastify"
import axios from "axios"
import { assets } from "../../assets/assets"

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  }

  // ✅ STATUS UPDATE FUNCTION (FIXED)
  const statusHandler = async (e, orderId) => {
    
    try {

      const response = await axios.post(
        url + "/api/order/status",
        {
          orderId: orderId,
          status: e.target.value
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        toast.success("Status Updated");
        fetchAllOrders();
      } else {
        toast.error("Error updating status");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  }


  useEffect(() => {
    if (url) {
      fetchAllOrders();
    }
  }, [url])

   

  return (
    <div className='order add'>
      <h3>Orders Page</h3>

      <div className='order-list'> 

        {orders.map((order, index) => (
          <div key={index} className="order-item">

            <img src={assets.parcel_icon} alt=""/>

            <div>

              <p className='order-item-food'>
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>

              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p className='order-item-phone'>{order.address.phone}</p>

            </div>

            {/* RIGHT SIDE */}
            <div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>

              <select 
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Orders;