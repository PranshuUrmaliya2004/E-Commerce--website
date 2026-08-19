






import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendURL, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Order = () => {

  const [orders, setOrders] = useState([])
  const token = localStorage.getItem("token")

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendURL + '/api/order/list',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders || [])
      } else {
        toast.error(response.data.message || "Failed to fetch orders")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendURL + "/api/order/status",
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        fetchAllOrders()
        toast.success("Order status updated")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

///for delete order history add this 

const deleteOrder = async (orderId) => {
  if (!window.confirm("Are you sure you want to delete this order?")) {
    return;
  }

  try {
    const response = await axios.post(
      backendURL + "/api/order/delete",
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};




  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Orders Page</h2>

      <div>
        {orders.map((order, index) => (
      
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          >

            {/* Parcel Icon */}
            <img className='w-12' src={assets.parcel_icon} alt="parcel" />

            {/* Items + Address */}
            <div>
              {order.items?.map((item, i) => (
                <p className='py-0.5' key={i}>
                  {item.name} X {item.quantity}
                  <span> {item.size}</span>
                </p>
              ))}

              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName} {order.address.lastName}
              </p>
              {/* <p className='mt-3 mb-2 font-medium'>
  {order.address?.name || "Guest User"}
</p> */}



              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>

              <p>{order.address.phone}</p>
            </div>

            {/* Order Info */}
            <div>
              <p>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className='text-sm sm:text-[15px]'>
              {currency}{order.amount}
            </p>

            {/* Status */}
            {/* <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className='p-2 font-semibold border border-gray-500 rounded-lg'
            >
              <option value="Order placed">Order Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select> */}


           {/* Change this select for order history delete */}

            <div className="flex flex-col gap-2">
  <select
    value={order.status}
    onChange={(e) => statusHandler(e, order._id)}
    className="p-2 font-semibold border border-gray-500 rounded-lg"
  >
    <option value="Order placed">Order Placed</option>
    <option value="Shipped">Shipped</option>
    <option value="Out of Delivery">Out of Delivery</option>
    <option value="Delivered">Delivered</option>
  </select>

  <button
    onClick={() => deleteOrder(order._id)}
    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
  >
    🗑 Delete
  </button>
</div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Order






