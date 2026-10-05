
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendURL, currency } from '../config'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { Search } from 'lucide-react'

const Order = () => {
  const [orders, setOrders] = useState([])
  const [reloadVersion, setReloadVersion] = useState(0)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const token = localStorage.getItem('token')

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendURL + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setReloadVersion((version) => version + 1)
        toast.success('Order status updated')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return
    }

    try {
      const response = await axios.post(
        backendURL + '/api/order/delete',
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setReloadVersion((version) => version + 1)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (!token) return

    let isCurrent = true
    const loadOrders = async () => {
      try {
        const response = await axios.post(
          backendURL + '/api/order/list',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )

        if (isCurrent && response.data.success) setOrders(response.data.orders || [])
        else if (isCurrent) toast.error(response.data.message || 'Failed to fetch orders')
      } catch (error) {
        if (isCurrent) toast.error(error.response?.data?.message || error.message)
      }
    }

    loadOrders()
    return () => {
      isCurrent = false
    }
  }, [token, reloadVersion])

  const statuses = [...new Set(orders.map((order) => order.status).filter(Boolean))]
  const filteredOrders = orders.filter((order) => {
    const query = search.trim().toLowerCase()
    const searchableText = [
      order._id,
      order.address?.firstName,
      order.address?.lastName,
      order.address?.phone,
      ...(order.items || []).map((item) => item.name)
    ].join(' ').toLowerCase()
    const matchesSearch = searchableText.includes(query)
    const matchesStatus = statusFilter === 'All statuses' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-slate-400'>Operations</p>
          <h2 className='mt-2 text-2xl font-bold text-slate-900'>Orders Management</h2>
        </div>
        <span className='rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600'>
          {filteredOrders.length} of {orders.length} orders
        </span>
      </div>

      <div className='flex flex-col gap-3 sm:flex-row'>
        <label className='relative flex-1'>
          <Search size={17} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Search customer, item, phone, or order ID'
            className='w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
          />
        </label>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className='rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
        >
          <option>All statuses</option>
          {statuses.map((status) => <option key={status}>{status}</option>)}
        </select>
      </div>

      <div className='space-y-4'>
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className='grid gap-4 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.04)] lg:grid-cols-[0.7fr_2.2fr_1.2fr_0.8fr_1.2fr]'
          >
            <div className='flex items-center justify-center rounded-2xl bg-[#fff2f6] p-4'>
              <img className='h-12 w-12' src={assets.parcel_icon} alt='parcel' />
            </div>

            <div className='space-y-2 text-sm text-slate-600'>
              {order.items?.map((item, i) => (
                <p key={i} className='font-medium text-slate-800'>
                  {item.name} × {item.quantity}
                  <span className='ml-2 text-slate-500'>({item.size})</span>
                </p>
              ))}

              <p className='pt-2 text-sm font-semibold text-slate-800'>
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>{order.address?.street}</p>
              <p>
                {order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}
              </p>
              <p>{order.address?.phone}</p>
            </div>

            <div className='space-y-2 text-sm text-slate-600'>
              <p>Items: {order.items?.length || 0}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className='flex items-center text-lg font-bold text-slate-900'>
              {currency}
              {order.amount}
            </div>

            <div className='flex flex-col gap-2'>
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-[#d97793] focus:ring-4 focus:ring-rose-100'
              >
                <option value='Order placed'>Order Placed</option>
                <option value='Shipped'>Shipped</option>
                <option value='Out of Delivery'>Out of Delivery</option>
                <option value='Delivered'>Delivered</option>
              </select>

              <button
                onClick={() => deleteOrder(order._id)}
                className='rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-100'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && <p className='rounded-2xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-400'>No matching orders found</p>}
      </div>
    </div>
  )
}

export default Order

