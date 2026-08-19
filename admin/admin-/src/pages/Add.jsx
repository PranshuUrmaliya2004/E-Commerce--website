import React, { useState } from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendURL } from '../App';
const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [image6, setImage6] = useState(false);

  const[name,setName]= useState('');
  const[description,setDescription]= useState('');
   const[Category,setCategory]= useState('Men');
   const[subCategory,setSubCategory]= useState('Topwear');
   const[price,setPrice]= useState('');
   const [sizes,setSizes]= useState([]);
   const [bestseller,setBestSeller]=useState(false);
  
    const onSubmitHandler = async (e)=>{
      e.preventDefault();
      try{
        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("category",Category);
        formData.append("subCategory",subCategory);
        formData.append("price",price);
        formData.append("sizes",JSON.stringify(sizes));
        // formData.append("bestSeller",bestSeller);
       formData.append("bestseller", bestseller.toString());

    image1 && formData.append("image1",image1);
     image2 &&   formData.append("image2",image2);
        image3 &&   formData.append("image3",image3);
        image4 &&   formData.append("image4",image4);
        image5 &&   formData.append("image5",image5);
        image6 &&   formData.append("image6",image6);
       const response = await axios.post(backendURL + '/api/product/add', formData,{headers:{ Authorization : 'Bearer ' + token }}
);

       if(response.data.success){
        toast.success(response.data.message)
        setName('');
        setDescription('');
        setCategory('Men');
        setSubCategory('Topwear');
        setSizes([])
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('')
      
       }
       else{
        toast.error(response.data.message)
       }
        
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  return (
    <form onSubmit={onSubmitHandler} action="">
    <div className='flex flex-col w-full items-start gap-3' >
      <p className='mb-2'>Upload image</p>
      <div className='flex gap-2'>
        <label htmlFor='image1'>
          <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Icon" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id='image1' hidden />
        </label>
        <label htmlFor='image2'>
          <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Icon" />
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  id='image2' hidden />
        </label>
        <label htmlFor='image3'>
          <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Icon" />
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id='image3' hidden />
        </label>
        <label htmlFor='image4'>
          <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload Icon" />
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file"  id='image4' hidden />
        </label>
      
        
      </div>
   
  
     </div>
     <div>
      <p className='text-gray-500'>Product Name</p>
      <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 max-w-[500px] py-2 border border-gray-300 rounded-md ' type='text' placeholder='Enter product name' required/>
     </div>
     <div className='w-full'>
      <p className=' text-gray-500 mb-2'>Product Description</p>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full px-3 max-w-[500px] py-2 border border-gray-300 rounded-md ' type='text' placeholder='Enter product description' required/>
     </div>
     <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
     <div >
      <p className='mb-2'>Product Category</p>
      <select onChange={(e)=>setCategory(e.target.value)} value={Category} className='w-35px px-3 py-2 border border-gray-300 rounded-md outline-none'>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
    
      </select>
     </div>
   
      <div>
      <p className='mb-2'>Sub Category</p>
      <select onChange={(e)=>setSubCategory(e.target.value)} className='w-30px px-3 py-2 border border-gray-300 rounded-md outline-none'>

        <option value="Topwear">Topwear</option>
        <option value="Bottomwear">Bottomwear</option>
        <option value="Winterwear">Winterwear</option>
    
      </select>
     </div>
     
   <div>
    
      <p className=' text-gray-500  mb-2 '>Product Price</p>
    
      <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 sm:w-[120px] py-2 border border-gray-300 ' type='number' placeholder='25' required/>
     </div>
     </div>
     <div >
      <p className='text-gray-500 mb-2'>Product Size</p>
      <div className='flex gap-3'>
      <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item => item !== "S"):[...prev,"S"])}>
        <p className={`${sizes.includes("S") ? "bg-pink-100 " : "bg-slate-200"} px-3 py-1 cursor-pointer`} >S</p>

      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item => item !== "M"):[...prev,"M"])}>
        <p className={`${sizes.includes("M") ? "bg-pink-100 " : "bg-slate-200 "} px-3 py-1 cursor-pointer`} >M</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item => item !== "L"):[...prev,"L"])}>
        <p className={`${sizes.includes("L") ? "bg-pink-100 " : "bg-slate-200 "} px-3 py-1 cursor-pointer`} >L</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item => item !== "XL"):[...prev,"XL"])} className='bg-slate-200 px-3 py-1 cursor-pointer'>
        <p className={`${sizes.includes("XL") ? "bg-pink-100 " : "bg-slate-200 "} px-3 py-1 cursor-pointer`} >XL</p>

      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item => item !== "XXL"):[...prev,"XXL"])} >
        <p className={`${sizes.includes("XXL") ? "bg-pink-100 " : "bg-slate-200 "} px-3 py-1 cursor-pointer`} >XXL</p>
      </div>
     </div>
     </div>
     <div className='flex gap-2 mt-2'>
      <input  onChange={()=>setBestSeller(prev=>!prev)} checked={bestseller} type="checkbox" id="bestSeller" />
      <label className='cursor-pointer' htmlFor="bestSeller"> Add to Best Seller</label>
     </div>
     <button className='bg-black text-white px-4 py-2 rounded-md mt-4'>Add Product</button>
    </form>
  )}
export default Add;
