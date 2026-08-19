import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { useState } from 'react';
import { assets } from '../assets/assets';
import RelateProduct from '../Components/RelateProduct';

const Product = ()=>{
 const { productid } = useParams();

  const {products,currency,addToCart}= useContext(ShopContext);
  const [productData,setProductData]= useState(false);
  const [image,setImage]= useState('');
  const [size,setSize]= useState(null);

  const fetchProductData= async () =>{
     products.map((item)=>{
      if(item._id === productid){
        setProductData(item);
        setImage(item.image[0]);
        setSize(item.sizes[0]); 
        
         return null;
      }
      });
     
  }
        
       
     


useEffect(()=>{
    fetchProductData();

},[productid,products])
  return productData ? (

    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className=' flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row' >
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)}  key={index} src={item} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                  
    
              ))
            }
</div >
<div className='w-full sm:w-[80%]'>

        <img className='w-full h-auto' src={image} alt='' />
</div>
          </div>

          {/* product information */}
          <div className='flex-1'>
            <h1 className='font-medium  text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon}  alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(125)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
            <p className='select'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200  ${size === item ? 'bg-gray-500' : ''}`}  key={index}>{item}</button>
              ))}

            </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)} className="bg-black text-white py-3 px-8 text-sm active-bg-gray-700">ADD TO CART</button>
          {/* <button
  onClick={() => {
    if (!size) {
      alert("Please select size");
      return;
    }
    addToCart(productData._id, size);
  }}
> */}

          <hr  className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
             <p>100% original Product</p>
             <p>Cash on delievery Availvle on this Product</p>
             <p> Easy return and exchange policy within 7 days</p>
          </div>
  </div> 
    </div>
    {/* -----Description & Reviews Section----- */}

    < div className='mt-20'>
    <div className='flex'>   
<b className=' border px-5 py-3 text-sm'>Description</b>
<p className=' border px-5 py-3 text-sm'>Reviews (122)</p>
 </div>
 
 <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
  <p>An e-commerce website line refers to the types (B2B, B2C, C2C), popular examples (Amazon, Shopify, Etsy), key design elements (trust, mobile-friendliness, clear navigation), and the overall platform for selling products/services online, acting as a digital storefront to attract customers and drive sales. </p>
  <p> e-commerce website line refers to the types (B2B, B2C, C2C), popular examples (Amazon, Shopify, Etsy), key design elements (trust, mobile-friendliness)</p>
 </div>

  </div>
{/* related products */}
<RelateProduct category={productData.category} subCategory={productData.subCategory}/>
    
 </div>
  ) : 
    <div className="opacity-0">
          Loading..
  </div>
}

 export default Product

