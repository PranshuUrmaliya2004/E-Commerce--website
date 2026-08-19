// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Addproduct = () => {
//   const [images, setImages] = useState([null, null, null, null]);

//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Men",
//     subCategory: "Topwear",
//     bestseller: false,
//   });

//   const [sizes, setSizes] = useState([]);

//   const handleImage = (e, index) => {
//     const imgArr = [...images];
//     imgArr[index] = e.target.files[0];
//     setImages(imgArr);
//   };

//   const toggleSize = (size) => {
//     if (sizes.includes(size)) {
//       setSizes(sizes.filter((s) => s !== size));
//     } else {
//       setSizes([...sizes, size]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setData({ ...data, [name]: type === "checkbox" ? checked : value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (sizes.length === 0) {
//       toast.error("Select at least one size");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", data.price);
//     formData.append("category", data.category);
//     formData.append("subCategory", data.subCategory);
//     formData.append("bestseller", data.bestseller);
//     formData.append("sizes", JSON.stringify(sizes));

//     images.forEach((img) => {
//       if (img) formData.append("images", img);   // MUST be "images"
//     });

//     try {
//       await axios.post(
//         "http://localhost:5000/api/product/add-product",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Product Added Successfully");

//       setData({
//         name: "",
//         description: "",
//         price: "",
//         category: "Men",
//         subCategory: "Topwear",
//         bestseller: false,
//       });
//       setImages([null, null, null, null]);
//       setSizes([]);
//     } catch (error) {
//       console.error(error);
//       toast.error("Error Adding Product");
//     }
//   };

//   return (
//     <form
//       onSubmit={submitHandler}
//       className="flex flex-col gap-6 bg-white p-6 shadow-md rounded-md"
//     >
//       <h2 className="text-xl font-bold">Add New Product</h2>

//       {/* IMAGE UPLOAD */}
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((img, index) => (
//           <label
//             key={index}
//             className="border-2 border-dashed rounded-md cursor-pointer"
//           >
//             <img
//               src={img ? URL.createObjectURL(img) : assets.upload_area}
//               className="w-full h-32 object-cover"
//               alt=""
//             />
//             <input
//               type="file"
//               name="images"               // 🔥 THIS WAS MISSING
//               hidden
//               onChange={(e) => handleImage(e, index)}
//             />
//           </label>
//         ))}
//       </div>

//       <input
//         type="text"
//         name="name"
//         value={data.name}
//         onChange={handleChange}
//         placeholder="Product Name"
//         className="border p-2 rounded"
//         required
//       />

//       <textarea
//         name="description"
//         value={data.description}
//         onChange={handleChange}
//         placeholder="Product Description"
//         className="border p-2 rounded"
//         required
//       />

//       <input
//         type="number"
//         name="price"
//         value={data.price}
//         onChange={handleChange}
//         placeholder="Price"
//         className="border p-2 rounded"
//         required
//       />

//       <div className="flex gap-4">
//         <select name="category" value={data.category} onChange={handleChange} className="border p-2">
//           <option>Men</option>
//           <option>Women</option>
//           <option>Kids</option>
//         </select>

//         <select name="subCategory" value={data.subCategory} onChange={handleChange} className="border p-2">
//           <option>Topwear</option>
//           <option>Bottomwear</option>
//           <option>Winterwear</option>
//         </select>
//       </div>

//       {/* SIZES */}
//       <div className="flex gap-2">
//         {["S", "M", "L", "XL", "XXL"].map((size) => (
//           <button
//             type="button"
//             key={size}
//             onClick={() => toggleSize(size)}
//             className={`border px-4 py-1 ${
//               sizes.includes(size) ? "bg-black text-white" : ""
//             }`}
//           >
//             {size}
//           </button>
//         ))}
//       </div>

//       <label className="flex gap-2 items-center">
//         <input
//           type="checkbox"
//           name="bestseller"
//           checked={data.bestseller}
//           onChange={handleChange}
//         />
//         Bestseller
//       </label>

//       <button className="bg-black text-white py-3 rounded">
//         ADD PRODUCT
//       </button>
//     </form>
//   );
// };

// // export default Addproduct;


// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Addproducts = () => {
//   const [images, setImages] = useState([null, null, null, null]); // 4 images
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     subCategory: "",
//     sizes: [],
//     bestseller: false
//   });

//   // Text / checkbox change
//   const onChangeHandler = (e) => {
//     const { name, value, type, checked } = e.target;
//     setData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   // Sizes toggle
//   const onSizeChange = (size) => {
//     setData(prev => ({
//       ...prev,
//       sizes: prev.sizes.includes(size)
//         ? prev.sizes.filter(s => s !== size)
//         : [...prev.sizes, size]
//     }));
//   };

//   // Image select
//   const onImageChange = (e, index) => {
//     const newImages = [...images];
//     newImages[index] = e.target.files[0];
//     setImages(newImages);
//   };

//   // Remove selected image
//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImages(newImages);
//   };

//   // Submit
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!images.some(img => img)) {
//       toast.error("Please upload at least one image");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       images.forEach((img, i) => {
//         if (img) formData.append(`image${i + 1}`, img);
//       });

//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("price", data.price);
//       formData.append("category", data.category);
//       formData.append("subCategory", data.subCategory);
//       formData.append("bestseller", data.bestseller);
//       formData.append("sizes", JSON.stringify(data.sizes));

//       const res = await axios.post(
//         "http://localhost:5000/api/product/add",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res.data.success) {
//         toast.success("Product added successfully");
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "",
//           subCategory: "",
//           sizes: [],
//           bestseller: false
//         });
//         setImages([null, null, null, null]);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

//       <form onSubmit={onSubmitHandler} className="space-y-4">

//         <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder="Product Name" className="w-full border p-2 rounded" required />
//         <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Description" className="w-full border p-2 rounded" required />
//         <input type="number" name="price" value={data.price} onChange={onChangeHandler} placeholder="Price" className="w-full border p-2 rounded" required />
//         <input type="text" name="category" value={data.category} onChange={onChangeHandler} placeholder="Category" className="w-full border p-2 rounded" />
//         <input type="text" name="subCategory" value={data.subCategory} onChange={onChangeHandler} placeholder="Sub Category" className="w-full border p-2 rounded" />

//         {/* Sizes */}
//         <div className="flex gap-3">
//           {["S","M","L","XL"].map(size => (
//             <label key={size} className="flex items-center gap-1">
//               <input type="checkbox" onChange={() => onSizeChange(size)} checked={data.sizes.includes(size)} />
//               {size}
//             </label>
//           ))}
//         </div>

//         {/* Bestseller */}
//         <label className="flex items-center gap-2">
//           <input type="checkbox" name="bestseller" checked={data.bestseller} onChange={onChangeHandler} />
//           Bestseller
//         </label>

//         {/* Image Upload + Preview */}
//         <div className="grid grid-cols-4 gap-4 mt-2">
//           {images.map((img, index) => (
//             <div key={index} className="relative border rounded p-1 flex items-center justify-center h-24">
//               {img ? (
//                 <>
//                   <img src={URL.createObjectURL(img)} alt={`img${index}`} className="object-cover h-full w-full rounded" />
//                   <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">X</button>
//                 </>
//               ) : (
//                 <label className="cursor-pointer text-sm text-gray-500">
//                   Upload
//                   <input type="file" className="hidden" onChange={(e) => onImageChange(e, index)} />
//                 </label>
//               )}
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="w-full bg-black text-white py-2 rounded mt-4">Add Product</button>

//       </form>
//     </div>
//   );
// };

// export default Addproducts;





// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const AddProducts = () => {
//   const [images, setImages] = useState([null, null, null, null]); // 4 images
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     subCategory: "",
//     sizes: [],
//     bestseller: false
//   });

//   const onChangeHandler = (e) => {
//     const { name, value, type, checked } = e.target;
//     setData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const onSizeChange = (size) => {
//     setData(prev => ({
//       ...prev,
//       sizes: prev.sizes.includes(size)
//         ? prev.sizes.filter(s => s !== size)
//         : [...prev.sizes, size]
//     }));
//   };

//   const onImageChange = (e, index) => {
//     const newImages = [...images];
//     newImages[index] = e.target.files[0];
//     setImages(newImages);
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     newImages[index] = null;
//     setImages(newImages);
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!images.some(img => img)) {
//       toast.error("Please upload at least one image");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       images.forEach((img, i) => {
//         if (img) formData.append(`image${i+1}`, img); // image1, image2, ...
//       });

//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("price", data.price);
//       formData.append("category", data.category);
//       formData.append("subCategory", data.subCategory);
//       formData.append("sizes", JSON.stringify(data.sizes));
//       formData.append("bestseller", data.bestseller);

//       const res = await axios.post("http://localhost:5000/api/product/add", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if(res.data.success){
//         toast.success("Product added successfully");
//         setData({ name:"", description:"", price:"", category:"", subCategory:"", sizes:[], bestseller:false });
//         setImages([null, null, null, null]);
//       } else toast.error(res.data.message);

//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
//       <form onSubmit={onSubmitHandler} className="space-y-4">

//         <input type="text" name="name" value={data.name} onChange={onChangeHandler} placeholder="Product Name" className="w-full border p-2 rounded" required />
//         <textarea name="description" value={data.description} onChange={onChangeHandler} placeholder="Description" className="w-full border p-2 rounded" required />
//         <input type="number" name="price" value={data.price} onChange={onChangeHandler} placeholder="Price" className="w-full border p-2 rounded" required />
//         <input type="text" name="category" value={data.category} onChange={onChangeHandler} placeholder="Category" className="w-full border p-2 rounded" />
//         <input type="text" name="subCategory" value={data.subCategory} onChange={onChangeHandler} placeholder="Sub Category" className="w-full border p-2 rounded" />

//         <div className="flex gap-3">
//           {["S","M","L","XL"].map(size => (
//             <label key={size} className="flex items-center gap-1">
//               <input type="checkbox" onChange={() => onSizeChange(size)} checked={data.sizes.includes(size)} />
//               {size}
//             </label>
//           ))}
//         </div>

//         <label className="flex items-center gap-2">
//           <input type="checkbox" name="bestseller" checked={data.bestseller} onChange={onChangeHandler} />
//           Bestseller
//         </label>

//         <div className="grid grid-cols-4 gap-4 mt-2">
//           {images.map((img,index)=>(
//             <div key={index} className="relative border rounded p-1 flex items-center justify-center h-24">
//               {img ? (
//                 <>
//                   <img src={URL.createObjectURL(img)} alt={`img${index}`} className="object-cover h-full w-full rounded" />
//                   <button type="button" onClick={()=>removeImage(index)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">X</button>
//                 </>
//               ) : (
//                 <label className="cursor-pointer text-sm text-gray-500">
//                   Upload
//                   <input type="file" className="hidden" onChange={(e)=>onImageChange(e,index)} />
//                 </label>
//               )}
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="w-full bg-black text-white py-2 rounded mt-4">Add Product</button>

//       </form>
//     </div>
//   );
// };

// export default AddProducts;
