import { useContext, useState } from "react"
import { useSearchParams } from 'react-router-dom'

import React  from 'react'
import { ShopContext } from "../Context/ShopContext"
import { assets } from "../assets/assets"
import Title from "../Components/Title"
import ProductItem from "../Components/ProductItem"
import RelateProduct from "../Components/RelateProduct"

const Collection = () => {
  const  {products,search}=useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const category = (searchParams.get('category') || '').split(',').filter(Boolean)
  const sortType = searchParams.get('sort') || 'relevent'
  const [showFilter,setShowfilter]= useState(false);
  const [SubCategory,setSubCategory]= useState([]);

  const updateFilterParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value) nextParams.set(key, value)
    else nextParams.delete(key)
    setSearchParams(nextParams)
  }

  const toggleCategory = (event) => {
    const value = event.target.value;
    const nextCategory = category.includes(value)
      ? category.filter(item => item !== value)
      : [...category, value]
    updateFilterParam('category', nextCategory.join(','))
  };

  const toggleSubCategory = (event) => {
    const value = event.target.value;
    if (SubCategory.includes(value)) {
      setSubCategory(SubCategory.filter(item => item !== value));
    } else {
      setSubCategory([...SubCategory, value]);
    }
  };
  const filteredProducts = products
    .filter((item) => {
      const matchesSearch = !search.trim() || item.name.toLowerCase().includes(search.trim().toLowerCase())
      const matchesCategory = category.length === 0 || category.includes(item.category)
      const matchesSubCategory = SubCategory.length === 0 || SubCategory.includes(item.subCategory)
      return matchesSearch && matchesCategory && matchesSubCategory
    })
    .sort((first, second) => {
      if (sortType === 'low-high') return first.price - second.price
      if (sortType === 'high-low') return second.price - first.price
      if (sortType === 'newest') return Number(second.date || 0) - Number(first.date || 0)
      return 0
    })
  return (
<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

  {/* filter  options */}
  <div className=" min-w-60">
    <button type="button" aria-expanded={showFilter} onClick={()=>setShowfilter(!showFilter) } className="my-2 flex items-center gap-2 text-xl sm:pointer-events-none">
      FILTERS
      <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
    </button>
    {/* category filter */}
    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className="mb-3 text-sm font-medium">CATEGORIES</p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
  <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Men'} checked={category.includes('Men')} onChange={toggleCategory}/>
    Men
  </p>
 <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Women'} checked={category.includes('Women')} onChange={toggleCategory}/>
   Women
  </p>

 <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Kids'} checked={category.includes('Kids')} onChange={toggleCategory}/>
    Kids
  </p>
   
</div>

</div>
  
    {/* SubCategory filter */}
    <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className="mb-3 text-sm font-medium">TYPES</p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
  <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>
    Topwear
  </p>
 <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>
  Bottomwear
  </p>

 <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>
    Winterwear
  </p>
   
</div>


</div>
  </div>
  {/* Right side content */}
  <div className="flex-1">
    <div className="flex justify-between text-base sm:text-2xl mb-4">
      <Title text1={'ALL'} text2={'COLLECTIONS'}/>
    
      <select value={sortType} onChange={(e)=>updateFilterParam('sort', e.target.value === 'relevent' ? '' : e.target.value)} className="border-2  border-gray-300 text-sm px-2" >
        <option value="relevent">Sort by : Relavent</option>
        <option value="newest">Newest Arrivals</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        
       </select>
</div>
{/* map products */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
  {
  filteredProducts.map((item, index) => (
    <ProductItem key={index} name={item.name}  id={item._id} price={item.price}  image={item.image} />

   
  ))}

</div>
{filteredProducts.length === 0 && <p className="py-14 text-center text-sm text-gray-500">No products found in this category yet.</p>}
</div>

    
</div>
  )
}

export default Collection




