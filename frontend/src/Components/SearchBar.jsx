import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { findProductSuggestions } from '../Utils/productSearch'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products, navigate } = useContext(ShopContext)
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]')
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })
  const inputRef = useRef(null)
  const location = useLocation()
  const query = search.trim()
  const suggestions = findProductSuggestions(products, query)

  useEffect(() => {
    if (!location.pathname.includes('collection')) setShowSearch(false)
  }, [location.pathname, setShowSearch])

  const submitSearch = (term = search) => {
    const normalized = term.trim()
    if (!normalized) return
    const updated = [normalized, ...recentSearches.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
    setSearch(normalized)
    setFocused(false)
    setShowSearch(true)
    navigate('/collection')
  }

  const selectProduct = (product) => {
    setSearch(product.name)
    setFocused(false)
    setShowSearch(false)
    navigate(`/product/${product._id}`)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown' && suggestions.length) {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp' && suggestions.length) {
      event.preventDefault()
      setActiveIndex((index) => index <= 0 ? suggestions.length - 1 : index - 1)
    } else if (event.key === 'Enter' && activeIndex >= 0 && suggestions[activeIndex]) {
      event.preventDefault()
      selectProduct(suggestions[activeIndex])
    } else if (event.key === 'Escape') {
      setFocused(false)
      setShowSearch(false)
    }
  }

  if (!showSearch) return null

  return (
    <section className='relative z-20 border-y border-gray-200 bg-white' aria-label='Product search'>
      <div className='relative mx-auto max-w-3xl px-3 py-3'>
        <form onSubmit={(event) => { event.preventDefault(); submitSearch() }} role='search' className='flex h-12 items-center gap-3 border border-gray-300 bg-gray-50 px-3 focus-within:border-black'>
          <img src={assets.search_icon} className='w-5 shrink-0' alt='' />
          <input ref={inputRef} role='combobox' aria-label='Search products' aria-autocomplete='list' aria-expanded={focused} aria-controls='product-search-suggestions' aria-activedescendant={activeIndex >= 0 ? `product-suggestion-${activeIndex}` : undefined} className='h-full min-w-0 flex-1 bg-transparent text-sm outline-none' type='search' placeholder='Search for products, brands and more' value={search} onFocus={() => setFocused(true)} onChange={(event) => { setSearch(event.target.value); setActiveIndex(-1) }} onKeyDown={onKeyDown} />
          {search && <button type='button' onClick={() => { setSearch(''); setActiveIndex(-1); inputRef.current?.focus() }} aria-label='Clear search' className='flex h-9 w-9 shrink-0 items-center justify-center text-lg text-gray-500'>&times;</button>}
          <button type='submit' className='h-9 shrink-0 bg-black px-4 text-sm text-white'>Search</button>
          <button type='button' aria-label='Close search' onClick={() => { setFocused(false); setShowSearch(false) }} className='flex h-9 w-9 shrink-0 items-center justify-center'><img className='w-3' src={assets.cross_icon} alt='' /></button>
        </form>
        {focused && <div id='product-search-suggestions' role='listbox' className='absolute left-3 right-3 top-full max-h-[70vh] overflow-y-auto border border-t-0 border-gray-200 bg-white shadow-lg'>
          {query ? suggestions.length ? suggestions.map((product, index) => (
            <button key={product._id} id={`product-suggestion-${index}`} type='button' role='option' aria-selected={activeIndex === index} onMouseDown={(event) => event.preventDefault()} onClick={() => selectProduct(product)} className={`flex min-h-16 w-full items-center gap-3 border-b border-gray-100 px-3 py-2 text-left last:border-b-0 ${activeIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
              <img src={product.image?.[0]} alt='' className='h-12 w-12 shrink-0 object-cover' />
              <span className='min-w-0 flex-1 truncate text-sm text-gray-800'>{product.name}</span>
              <span className='shrink-0 text-sm text-gray-500'>{product.price}</span>
            </button>
          )) : <button type='button' onMouseDown={(event) => event.preventDefault()} onClick={() => submitSearch(query)} className='w-full px-4 py-4 text-left text-sm text-gray-600'>Search for “{query}” in all products</button> : (
            <div className='p-4'>
              {recentSearches.length ? <>
                <div className='mb-3 flex items-center justify-between'><p className='text-xs font-medium uppercase text-gray-500'>Recent searches</p><button type='button' onClick={() => { setRecentSearches([]); localStorage.removeItem('recentSearches') }} className='text-xs text-gray-500 underline'>Clear</button></div>
                <div className='flex flex-wrap gap-2'>{recentSearches.map((term) => <button key={term} type='button' onClick={() => submitSearch(term)} className='border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-black'>{term}</button>)}</div>
              </> : <>
                <p className='mb-3 text-xs font-medium uppercase text-gray-500'>Popular categories</p>
                <div className='flex flex-wrap gap-2'>{['Men', 'Women', 'Kids'].map((term) => <button key={term} type='button' onClick={() => submitSearch(term)} className='border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-black'>{term}</button>)}</div>
              </>}
            </div>
          )}
        </div>}
      </div>
    </section>
  )
}

export default SearchBar;

