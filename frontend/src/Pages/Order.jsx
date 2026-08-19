
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { toast } from "react-toastify";


 const Order = () => {
  const { backendUrl,token, currency, } = useContext(ShopContext)
const [orderData,setOrderData]=useState([]);
const [showStatusIndex, setShowStatusIndex] = useState(null);




 


//  setOrderData(allOrderItems.reverse());
// }
  

//   }catch(error){
//     console.log(error)

//   }
// }



const loadOrderData = async () => {
  try {
    if (!token) return;

    const response = await axios.post(
      backendUrl + "/api/order/userorders",
      {},
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (response.data.success) {
      let allOrderItems = [];

      response.data.orders.forEach((order) => {
        order.items.map((item) => {
          item['status']=order.status
          item['payment']=order.payment
          item['paymentMethod']=order.paymentMethod
          item['date']=order.date
         
          allOrderItems.push(item)
        });
      });

      setOrderData(allOrderItems.reverse());
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadOrderData();
  }, [token]);



  

  return (
    <div className="border-t pt-16">
      
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDER" />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Left Section */}
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />

              <div>
                <p className="sm:text-base font-medium">{item.name}</p>

                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p >
                    {currency}
                    {item.price}
                  </p>
                  <p>{item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p >
                  Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
                </p>
                  <p className="mb-4 text-gray-600">
                Payment:
                <span className="text-gray-500">
                  {item.paymentMethod}
                </span>
              </p>
              </div>
            </div>

            {/* Right Section */}
            {/* <div className="md:w-1/2 flex justify-between items-center"> */}
            <div className="md:w-1/2 flex flex-col items-end gap-3">
               {/* <div className="flex items-center gap-2">
                <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>  */}

              {/* <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
            Track Order
              </button> */}



                 <div>

  <div className="flex items-center gap-2">
    {/* <span className="min-w-2 h-2 rounded-full bg-green-500"></span> */}
    <span
  className={`min-w-2 h-2 rounded-full ${
    item.status === "Delivered"
      ? "bg-green-500"
      : item.status === "Out of Delivery"
      ? "bg-yellow-500"
      : item.status === "Shipped"
      ? "bg-blue-500"
      : "bg-gray-500"
  }`}
/>
    <p className="text-sm md:text-base font-medium">{item.status}</p>
  </div>

  <button
    onClick={() =>
      setShowStatusIndex(showStatusIndex === index ? null : index)
    }
    className="mt-2 border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
  >
    {showStatusIndex === index ? "Hide Tracking" : "Track Order"}
  </button>

{showStatusIndex === index && (
  <div className="w-72 mt-3 border rounded-lg p-4 bg-gray-50 shadow">

    <div className="flex items-center gap-3 mb-4">
      <div className={`w-4 h-4 rounded-full ${
        ["Order placed","Shipped","Out of Delivery","Delivered"].includes(item.status)
          ? "bg-green-600"
          : "bg-gray-300"
      }`}></div>

      <p className="font-medium">Order Placed</p>
    </div>

    <div className="flex items-center gap-3 mb-4">
      <div className={`w-4 h-4 rounded-full ${
        ["Shipped","Out of Delivery","Delivered"].includes(item.status)
          ? "bg-green-600"
          : "bg-gray-300"
      }`}></div>

      <p className="font-medium">Shipped</p>
    </div>

    <div className="flex items-center gap-3 mb-4">
      <div className={`w-4 h-4 rounded-full ${
        ["Out of Delivery","Delivered"].includes(item.status)
          ? "bg-green-600"
          : "bg-gray-300"
      }`}></div>

      <p className="font-medium">Out for Delivery</p>
    </div>

    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-full ${
        item.status === "Delivered"
          ? "bg-green-600"
          : "bg-gray-300"
      }`}></div>

      <p className="font-medium">Delivered</p>
    </div>

  </div>
)}



</div>
             

             
</div>

 

            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  )

 }
export default Order;




