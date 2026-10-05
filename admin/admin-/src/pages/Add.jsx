import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendURL } from '../config'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [price, setPrice] = useState('')
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestSeller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('price', price)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller.toString())

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)
      const response = await axios.post(backendURL + '/api/product/add', formData, {
        headers: { Authorization: 'Bearer ' + token }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setCategory('Men')
        setSubCategory('Topwear')
        setSizes([])
        setBestSeller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const uploadSlots = [
    { id: 'image1', value: image1, setter: setImage1 },
    { id: 'image2', value: image2, setter: setImage2 },
    { id: 'image3', value: image3, setter: setImage3 },
    { id: 'image4', value: image4, setter: setImage4 }
  ]

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-slate-400'>Catalog</p>
          <h2 className='mt-2 text-2xl font-bold text-slate-900'>Add Product</h2>
        </div>
        <span className='rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700'>
          Ready
        </span>
      </div>

      <form onSubmit={onSubmitHandler} className='space-y-8'>
        <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
          <p className='mb-4 text-sm font-semibold text-slate-700'>Product Images</p>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {uploadSlots.map(({ id, value, setter }) => (
              <label key={id} htmlFor={id} className='group cursor-pointer overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white p-3 transition hover:border-[#d97793] hover:bg-rose-50'>
                <div className='flex h-28 items-center justify-center overflow-hidden rounded-xl bg-slate-100'>
                  <img
                    className='h-full w-full object-cover transition group-hover:scale-105'
                    src={value ? URL.createObjectURL(value) : assets.upload_area}
                    alt='Upload preview'
                  />
                </div>
                <input onChange={(e) => setter(e.target.files[0])} type='file' id={id} hidden />
              </label>
            ))}
          </div>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>Product Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
              type='text'
              placeholder='Enter product name'
              required
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
              type='number'
              placeholder='25'
              required
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-slate-700'>Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
            placeholder='Enter product description'
            required
          />
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
            >
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>Sub Category</label>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
            >
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>Sizes</label>
            <div className='flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2'>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  type='button'
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                    )
                  }
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    sizes.includes(size)
                      ? 'bg-[#7d293b] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'>
          <input
            onChange={() => setBestSeller((prev) => !prev)}
            checked={bestseller}
            type='checkbox'
            id='bestSeller'
            className='h-4 w-4 rounded border-slate-300 text-[#7d293b] focus:ring-[#d97793]'
          />
          <label className='cursor-pointer text-sm font-medium text-slate-700' htmlFor='bestSeller'>
            Add to Best Seller
          </label>
        </div>

        <button type='submit' className='rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700'>
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Add

