import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductItem from '../Components/ProductItem'
import { ShopContext } from '../Context/ShopContext'

const Wishlist = () => {
  const { products, wishlistItems, addToCart, removeFromWishlist } = useContext(ShopContext)
  const [selectedSizes, setSelectedSizes] = useState({})
  const savedProducts = wishlistItems
    .map((id) => products.find((product) => product._id === id))
    .filter(Boolean)

  return (
    <main className='wishlist-page'>
      <header className='wishlist-page__header'>
        <div>
          <p className='editorial-kicker'>YOUR SHOPNEX EDIT</p>
          <h1>Wishlist</h1>
          <p>{savedProducts.length} {savedProducts.length === 1 ? 'piece' : 'pieces'} saved for later</p>
        </div>
      </header>

      {savedProducts.length > 0 ? (
        <div className='editorial-grid grid grid-cols-2 gap-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4'>
          {savedProducts.map((product) => (
            <div key={product._id} className='space-y-3'>
              <ProductItem
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
              <div className='flex gap-2'>
                <select
                  aria-label={`Choose size for ${product.name}`}
                  value={selectedSizes[product._id] || ''}
                  onChange={(event) => setSelectedSizes((current) => ({ ...current, [product._id]: event.target.value }))}
                  className='min-w-0 flex-1 border border-gray-300 bg-white px-2 py-2 text-xs'
                >
                  <option value=''>Choose size</option>
                  {(product.sizes || []).map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
                <button
                  type='button'
                  disabled={!product.sizes?.length}
                  onClick={() => {
                    const size = selectedSizes[product._id]
                    if (!size) {
                      toast.info('Choose a size before moving this item to your bag')
                      return
                    }
                    addToCart(product._id, size)
                    removeFromWishlist(product._id)
                    toast.success('Moved to your bag')
                  }}
                  className='shrink-0 bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Move to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className='wishlist-empty' aria-label='Empty wishlist'>
          <div className='wishlist-empty__icon' aria-hidden='true'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z' />
            </svg>
          </div>
          <h2>Your next favorite starts here.</h2>
          <p>Save pieces as you browse and they will be waiting for you here.</p>
          <Link to='/collection' className='wishlist-empty__link'>Explore the collection <span aria-hidden='true'>↗</span></Link>
        </section>
      )}
    </main>
  )
}

export default Wishlist