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
  const { currency, toggleWishlist, isInWishlist } = useContext(ShopContext)
  const saved = isInWishlist(id)

  return (
    <article className='editorial-product group relative block min-w-0 text-gray-700'>
      <Link className='block text-inherit no-underline' to={`/product/${id}`}>
        <div className='editorial-product__image'>
          <img src={image?.[0]} alt={name} loading='lazy' />
          <span className='editorial-product__hint'>VIEW THE PIECE</span>
        </div>
        <span className='editorial-product__name'>{name}</span>
        <span className='editorial-product__price'>{currency}{price}</span>
      </Link>
      <button
        type='button'
        aria-label={saved ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
        aria-pressed={saved}
        title={saved ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={() => toggleWishlist(id)}
        className={`wishlist-heart${saved ? ' is-saved' : ''}`}
      >
        <svg aria-hidden='true' viewBox='0 0 24 24' fill={saved ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z' />
        </svg>
      </button>
    </article>
  )
}

export default ProductItem