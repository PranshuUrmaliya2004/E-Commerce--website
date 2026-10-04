
import React, { useContext } from 'react'

import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const BestSeller = () => {

  const { products } = useContext(ShopContext)
  const bestseller = products.filter(item => item.bestseller).slice(0, 4)

  return (
    <section className='editorial-section'>
      <div className='editorial-heading'>
        <div>
          <span className='editorial-kicker'>THE SHOPNEX SIGNATURES</span>
          <h2>Most wanted</h2>
        </div>
        <p>Pieces our customers return to, season after season.</p>
      </div>

      <div className='editorial-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
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

    </section>
  )
}

export default BestSeller

