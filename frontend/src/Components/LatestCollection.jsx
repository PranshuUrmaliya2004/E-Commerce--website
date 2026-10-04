
import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const latestProducts = products.slice(0, 8)

  return (
    <section className='editorial-section'>
      <div className='editorial-heading'>
        <div>
          <span className='editorial-kicker'>JUST LANDED</span>
          <h2>The latest edit</h2>
        </div>
        <p>New-season pieces chosen for their shape, feel and staying power.</p>
      </div>
      <div className='editorial-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {latestProducts.map((item) => (
          <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
      <Link className='editorial-more' to='/collection'>View the full collection <span aria-hidden='true'>↗</span></Link>
    </section>
  )
}

export default LatestCollection;
