import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendURL, currency } from '../config'
import { toast } from 'react-toastify'
import { Search } from 'lucide-react'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All categories')

  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message || 'Failed to load products')
      }
    } catch {
      toast.error('Server Error')
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendURL + '/api/product/remove',
        { _id: id },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )

      if (response.data.success) {
        toast.success('Product Deleted Successfully')
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch {
      toast.error('Server Error')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  const categories = [...new Set(list.map((item) => item.category).filter(Boolean))]
  const filteredList = list.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(search.trim().toLowerCase())
    const matchesCategory = categoryFilter === 'All categories' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-slate-400'>Catalog</p>
          <h2 className='mt-2 text-2xl font-bold text-slate-900'>All Products</h2>
        </div>
        <span className='rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600'>
          {filteredList.length} of {list.length} items
        </span>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row'>
        <label className='relative flex-1'>
          <Search size={17} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search products'
            className='w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
          />
        </label>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          className='rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
        >
          <option>All categories</option>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>

      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white'>
        {loading && <p className='py-10 text-center text-slate-400'>Loading products...</p>}

        {!loading && filteredList.length === 0 && <p className='py-10 text-center text-slate-400'>No matching products found</p>}

        {!loading && filteredList.length > 0 && (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-slate-200 text-left text-sm'>
              <thead className='bg-slate-50'>
                <tr>
                  <th className='px-5 py-4 font-semibold text-slate-600'>Image</th>
                  <th className='px-5 py-4 font-semibold text-slate-600'>Name</th>
                  <th className='px-5 py-4 font-semibold text-slate-600'>Category</th>
                  <th className='px-5 py-4 font-semibold text-slate-600'>Price</th>
                  <th className='px-5 py-4 text-right font-semibold text-slate-600'>Action</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-slate-200'>
                {filteredList.map((item, index) => (
                  <tr key={item._id || index} className='transition hover:bg-slate-50'>
                    <td className='px-5 py-4'>
                      <img className='h-16 w-16 rounded-xl object-cover shadow-sm' src={item.image?.[0] || 'https://via.placeholder.com/50'} alt={item.name} />
                    </td>
                    <td className='px-5 py-4 font-medium text-slate-800'>{item.name}</td>
                    <td className='px-5 py-4 text-slate-600'>{item.category}</td>
                    <td className='px-5 py-4 font-semibold text-slate-900'>
                      {currency}
                      {item.price}
                    </td>
                    <td className='px-5 py-4 text-right'>
                      <button
                        onClick={() => removeProduct(item._id)}
                        className='rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-100'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default List

