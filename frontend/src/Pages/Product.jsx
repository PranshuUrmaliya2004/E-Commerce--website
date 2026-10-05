import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelateProduct from '../Components/RelateProduct';

const Product = ()=>{
 const { productid } = useParams();

  const {products,currency,addToCart,toggleWishlist,isInWishlist}= useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const productData = products.find((item) => item._id === productid)
  const image = selectedImage?.productId === productid
    ? selectedImage.source
    : productData?.image?.[0] || ''
  const size = selectedSize?.productId === productid
    ? selectedSize.value
    : productData?.sizes?.[0] || null
  return productData ? (

    <div className='product-detail-page border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className=' flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row' >
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setSelectedImage({ productId: productid, source: item })}  key={index} src={item} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                  
    
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
            <div className='mt-5 flex flex-wrap items-center gap-4'>
              <p className='text-3xl font-medium'>{currency}{productData.price}</p>
              <button
                type='button'
                onClick={() => toggleWishlist(productData._id)}
                aria-pressed={isInWishlist(productData._id)}
                aria-label={isInWishlist(productData._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`wishlist-detail${isInWishlist(productData._id) ? ' is-saved' : ''}`}
              >
                <svg aria-hidden='true' viewBox='0 0 24 24' fill={isInWishlist(productData._id) ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z' />
                </svg>
                <span>{isInWishlist(productData._id) ? 'Saved' : 'Save to wishlist'}</span>
              </button>
            </div>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
            <p className='select'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSelectedSize({ productId: productid, value: item })} className={`border py-2 px-4 bg-gray-100 hover:bg-gray-200  ${size === item ? 'bg-gray-500' : ''}`}  key={index}>{item}</button>
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

