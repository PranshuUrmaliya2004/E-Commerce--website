


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchList = async () => {
    try {

      const response = await axios.get(
        backendURL + "/api/product/list"
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to load products");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };
   
//   const removeProduct=async(id)=>{
// try{
// const response= await axios.post( backendURL + "/api/product/remove",{id},{headers:{ Authorization : 'Bearer ' + token }

     
// })
// if(response.data.success){
//   toast.success(response.data.message || "Product Deleted");

//   fetchList();
// }
// else{
//   toast.error(response.data.message)
// }
// }
// catch(error){
//    console.log(error);
//       toast.error("Server Error");

// }
     
//   }


const removeProduct = async (id) => {
  try {
    const response = await axios.post(
      backendURL + "/api/product/remove",
      { _id: id }, // 🔴 FIX: id → _id
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.data.success) {
      toast.success("Product Deleted Successfully");
      fetchList(); // refresh list
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Server Error");
  }
};




  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>

      <p className='mb-2 text-lg font-semibold'>
        All Products List
      </p>

      <div className='flex flex-col gap-2'>

        {/* ===== Table Header ===== */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm font-semibold'>

          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>

        </div>


        {/* ===== Loading ===== */}
        {loading && (
          <p className="text-center py-5 text-gray-400">
            Loading products...
          </p>
        )}


        {/* ===== No Data ===== */}
        {!loading && list.length === 0 && (
          <p className="text-center py-5 text-gray-400">
            No Products Found
          </p>
        )}


        {/* ===== Product List ===== */}
        {!loading && list.map((item, index) => (

          <div
            key={item._id || index}
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 gap-2 border text-sm'
          >

            {/* Image */}
            <img
              className='w-12 h-12 object-cover rounded'
              src={item.image?.[0] || "https://via.placeholder.com/50"}
              alt={item.name}
            />

            {/* Name */}
            <p className='font-medium'>
              {item.name}
            </p>

            {/* Category */}
            <p>
              {item.category}
            </p>

            {/* Price */}
            <p>
              {currency}{item.price}
            </p>

            {/* Delete Button */}
            <p onClick={()=>removeProduct(item._id)}
              className='text-right md:text-center cursor-pointer text-red-500 text-lg hover:text-red-700'
            >
              ✖
            </p>

          </div>

        ))}

      </div>

    </>
  );
};

export default List;
