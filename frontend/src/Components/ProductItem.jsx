// import React from 'react'
// import { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import {Link} from 'react-router-dom'
// const ProductItem = ({id,name,image,price}) => {
//   const {currency} = useContext(ShopContext);
//   return (


//         <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
//             <div className='overflow-hidden'>
//                 <img className='hover:scale-110 transition ease-in-out 'src={image[0]}  alt="" />

//             </div>
//    <p className='pt-3 pb-1 text-sm'>{name}</p>
//    <p className='text-sm font-medium'>{currency}{price}</p>
        
        
//         </Link>
//   )
// }

// export default ProductItem





import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link className='editorial-product group block min-w-0 text-gray-700' to={`/product/${id}`}>
      <div className='editorial-product__image'>
        <img src={image?.[0]} alt={name} loading='lazy' />
        <span className='editorial-product__hint'>VIEW THE PIECE</span>
      </div>
      <span className='editorial-product__name'>{name}</span>
      <span className='editorial-product__price'>{currency}{price}</span>
    </Link>
  )
}

export default ProductItem