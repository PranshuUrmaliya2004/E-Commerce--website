import { useContext, useEffect, useState } from "react"

import React  from 'react'
import { ShopContext } from "../Context/ShopContext"
import { assets } from "../assets/assets"
import Title from "../Components/Title"
import ProductItem from "../Components/ProductItem"
import RelateProduct from "../Components/RelateProduct"

const Collection = () => {
  const  {products,search,showSearch}=useContext(ShopContext)
  const [showFilter,setShowfilter]= useState(false);
  const [filteredProducts,setFilterProducts]= useState([]);
  const [category,setCategory]= useState([]);
  const [SubCategory,setSubCategory]= useState([]);
  const [sortType,setSortType]= useState('relevent');

  const toggleCategory = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter(item => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (event) => {
    const value = event.target.value;
    if (SubCategory.includes(value)) {
      setSubCategory(SubCategory.filter(item => item !== value));
    } else {
      setSubCategory([...SubCategory, value]);
    }
  };
  const applyFilter = () => {
    let ProductCopy = products.slice();
    if(products && search.length ){
      ProductCopy = ProductCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0){
      ProductCopy = ProductCopy.filter(item => category.includes(item.category))
    }
    if (SubCategory.length > 0){
      ProductCopy = ProductCopy.filter(item => SubCategory.includes(item.subCategory))
    }
    setFilterProducts(ProductCopy);
  }

  const ShortProduct=()=>{
    let fpCopy= filteredProducts.slice();
  switch(sortType){
    case 'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
      break;
    case 'high-low':
      setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
      break;
      default:
        applyFilter();
        break;
  }
  
  }

  // useEffect(()=>{
  //   setFilterProducts(products)
  // },[products])
 useEffect(()=>{
  applyFilter();
 }, [category,SubCategory,search,products]);

 useEffect(()=>{
  ShortProduct();
 },[sortType])
  return (
<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

  {/* filter  options */}
  <div className=" min-w-60">
    <p onClick={()=>setShowfilter(!showFilter) } className="my-2 text-xl flex items-center  cursor-pointer gap-2">FILTERS
      <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
    </p>
    {/* category filter */}
    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className="mb-3 text-sm font-medium">CATEGORIES</p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
  <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory}/>
    Men
  </p>
 <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Women'}onChange={toggleCategory}/>
   Women
  </p>

 <p className="flex gap-2">

    <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory}/>
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
    
       <select onChange={(e)=>setSortType(e.target.value)} className="border-2  border-gray-300 text-sm px-2" >
        <option value="relevent">Sort by : Relavent</option>
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
</div>

    
</div>
  )
}

export default Collection




