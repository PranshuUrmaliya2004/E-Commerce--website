// import React from 'react'
// import { ShopContext } from '../Context/ShopContext';
// import { useContext,useEffect,useState } from 'react';

// const RelatedProduct= ({category,subCategory}) => {


//   const {products}= useContext(ShopContext);
//   const [related,setRelated]= useState([])

// useEffect(()=>{
//   if(products.length>0){
//     let ProductCopy = products.slice();
//      ProductCopy= ProductCopy.filter((item)=>category === item.category)
//      ProductCopy= ProductCopy.filter((item)=>subCategory=== item.subCategory)
       
//      setRelated(ProductCopy.slice(0,5));

//   }
  
// },[products])



// }
// return(
//   <div>

//   </div>
// )
// export default RelatedProduct




// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import ProductItem from './ProductItem'
// import Title from './Title'

// const RelatedProduct = ({ category, subCategory }) => {

//   const { products } = useContext(ShopContext)
//   const [related, setRelated] = useState([])

//   useEffect(() => {
//     if (products.length > 0) {
//       let productCopy = products.slice()

//       productCopy = productCopy.filter(
//        item =>
//           item.category === category &&
//           item.subCategory === subCategory
//       )
      

//       setRelated(productCopy.slice(0, 5))
//     }
//   }, [products, category, subCategory])

//   return (
//     <div className="my-24">
//       <div className="text-center text-3xl py-2">
//         <Title  text1={"RELATED "} text2={"PRODUCTS"} />
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
//         {related.map(item => (
//           <ProductItem
//             key={item._id}
//             id={item._id}
//            name={item.name}
//             price={item.price}
//             image={item.image}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default RelatedProduct








import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'

const RelatedProduct = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice()

      productCopy = productCopy.filter(
      (item)=>
          item.category === category )
    productCopy = productCopy.filter(
      (item)=>
          item.subCategory === subCategory
      )
      

      setRelated(productCopy.slice(0, 5))
    }
  }, [products, category, subCategory])

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title  text1={"RELATED "} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:grid-cols-5 gap-y-6">
        {related.map((item,index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
