
import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {

  const { products } = useContext(ShopContext)
  const [bestseller, setSeller] = useState([])

  useEffect(() => {
    const bestSellerProducts = products.filter( item => item.bestseller   // ✅ correct key
       )
    setSeller(bestSellerProducts.slice(0, 5))
  }, [products])

  return (
    <div className='my-10'>

      <div className='text-center py-8 text-3xl'>
        <Title text1="BEST" text2="SELLERS" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestseller.map(item => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller

