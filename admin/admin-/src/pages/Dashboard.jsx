import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Area, AreaChart, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowDownRight, ArrowUpRight, BadgeIndianRupee, Boxes, ClipboardList, Clock3 } from 'lucide-react'
import { backendURL, currency } from '../config'
import { toast } from 'react-toastify'

const formatCurrency = (amount) => `${currency}${Number(amount || 0).toLocaleString('en-IN')}`

const Dashboard = ({ token, darkMode }) => {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productResponse, orderResponse] = await Promise.all([
          axios.get(backendURL + '/api/product/list'),
          axios.post(backendURL + '/api/order/list', {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        if (productResponse.data.success) setProducts(productResponse.data.products || [])
        if (orderResponse.data.success) setOrders(orderResponse.data.orders || [])
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [token])

  const today = new Date()
  const chartData = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today)
    day.setDate(today.getDate() - (6 - index))
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime()
    const end = start + 24 * 60 * 60 * 1000
    const dayOrders = orders.filter((order) => Number(order.date) >= start && Number(order.date) < end)

    return {
      day: day.toLocaleDateString('en-IN', { weekday: 'short' }),
      revenue: dayOrders.reduce((total, order) => total + Number(order.amount || 0), 0),
      orders: dayOrders.length
    }
  })

  const revenue = orders.reduce((total, order) => total + Number(order.amount || 0), 0)
  const pendingOrders = orders.filter((order) => {
    const status = String(order.status || '').toLowerCase()
    return !['delivered', 'complete', 'completed'].includes(status)
  }).length
  const recentOrders = [...orders].sort((a, b) => Number(b.date) - Number(a.date)).slice(0, 5)
  const bestsellers = [...products]
    .sort((a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)))
    .slice(0, 4)

  const metrics = [
    { label: 'Gross order value', value: formatCurrency(revenue), detail: 'Across all orders', icon: BadgeIndianRupee, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Total orders', value: orders.length.toLocaleString('en-IN'), detail: 'All time', icon: ClipboardList, color: 'bg-blue-50 text-blue-700' },
    { label: 'Active products', value: products.length.toLocaleString('en-IN'), detail: 'In your catalog', icon: Boxes, color: 'bg-amber-50 text-amber-700' },
    { label: 'Open orders', value: pendingOrders.toLocaleString('en-IN'), detail: 'Not yet delivered', icon: Clock3, color: 'bg-rose-50 text-rose-700' }
  ]

  return (
    <div className='space-y-7'>
      <div className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-slate-400'>Store overview</p>
          <h1 className='mt-2 text-3xl font-bold text-slate-900'>Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}.</h1>
          <p className='mt-1 text-sm text-slate-500'>Here is how your store is performing.</p>
        </div>
        <p className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600'>
          {today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4' aria-label='Store metrics'>
        {metrics.map(({ label, value, detail, icon: Icon, color }) => (
          <article key={label} className='rounded-2xl border border-slate-200 bg-white p-5'>
            <div className='flex items-start justify-between'>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>{React.createElement(Icon, { size: 20 })}</div>
              <ArrowUpRight size={18} className='text-slate-300' />
            </div>
            <p className='mt-5 text-sm font-medium text-slate-500'>{label}</p>
            <p className='mt-1 text-2xl font-bold text-slate-900'>{loading ? '...' : value}</p>
            <p className='mt-1 text-xs text-slate-400'>{detail}</p>
          </article>
        ))}
      </section>

      <section className='grid gap-5 xl:grid-cols-[1.65fr_1fr]'>
        <article className='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'>
          <div className='flex flex-wrap items-start justify-between gap-3'>
            <div>
              <h2 className='text-lg font-semibold text-slate-900'>Sales performance</h2>
              <p className='mt-1 text-sm text-slate-500'>Revenue and orders, last 7 days</p>
            </div>
            <span className='rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700'>Daily</span>
          </div>
          <div className='mt-6 h-[260px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <ComposedChart data={chartData} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id='revenueFill' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='#0f766e' stopOpacity={0.22} />
                    <stop offset='100%' stopColor='#0f766e' stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={darkMode ? '#263445' : '#e8edf3'} strokeDasharray='4 4' />
                <XAxis dataKey='day' axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9aa9bb' : '#94a3b8', fontSize: 12 }} />
                <YAxis yAxisId='revenue' axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#9aa9bb' : '#94a3b8', fontSize: 11 }} tickFormatter={(value) => `${currency}${value}`} />
                <YAxis yAxisId='orders' orientation='right' hide />
                <Tooltip
                  contentStyle={{ background: darkMode ? '#131d2a' : '#fff', borderColor: darkMode ? '#334155' : '#e2e8f0', borderRadius: 12 }}
                  formatter={(value, name) => [name === 'Revenue' ? formatCurrency(value) : value, name]}
                />
                <Area yAxisId='revenue' type='monotone' dataKey='revenue' name='Revenue' stroke='#0f766e' strokeWidth={3} fill='url(#revenueFill)' />
                <Bar yAxisId='orders' dataKey='orders' name='Orders' barSize={18} fill='#e7a341' radius={[5, 5, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          {!loading && orders.length === 0 && <p className='-mt-3 text-center text-xs text-slate-400'>Sales activity will appear here when orders arrive.</p>}
          <div className='mt-4 flex gap-5 text-xs font-medium text-slate-500'>
            <span className='flex items-center gap-2'><i className='h-2.5 w-2.5 rounded-full bg-teal-700' />Revenue</span>
            <span className='flex items-center gap-2'><i className='h-2.5 w-2.5 rounded-full bg-amber-500' />Orders</span>
          </div>
        </article>

        <article className='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'>
          <div className='flex items-start justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-slate-900'>Catalog highlights</h2>
              <p className='mt-1 text-sm text-slate-500'>Featured products</p>
            </div>
            <ArrowDownRight size={18} className='text-slate-300' />
          </div>
          <div className='mt-5 divide-y divide-slate-100'>
            {bestsellers.map((product) => (
              <div key={product._id} className='flex items-center gap-3 py-3 first:pt-0 last:pb-0'>
                <img className='h-12 w-12 rounded-xl bg-slate-100 object-cover' src={product.image?.[0] || 'https://via.placeholder.com/50'} alt={product.name} />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-semibold text-slate-800'>{product.name}</p>
                  <p className='mt-1 text-xs text-slate-400'>{product.category || 'Uncategorized'}</p>
                </div>
                <p className='text-sm font-semibold text-slate-700'>{formatCurrency(product.price)}</p>
              </div>
            ))}
            {!loading && bestsellers.length === 0 && <p className='py-8 text-center text-sm text-slate-400'>Add products to see catalog highlights.</p>}
          </div>
        </article>
      </section>

      <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white'>
        <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6'>
          <div>
            <h2 className='font-semibold text-slate-900'>Recent orders</h2>
            <p className='mt-1 text-xs text-slate-500'>Latest activity from your store</p>
          </div>
          <span className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-400'>{orders.length} total</span>
        </div>
        <div className='divide-y divide-slate-100'>
          {recentOrders.map((order) => (
            <div key={order._id} className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6'>
              <div>
                <p className='text-sm font-semibold text-slate-800'>{order.address?.firstName || 'Customer'} {order.address?.lastName || ''}</p>
                <p className='mt-1 text-xs text-slate-400'>{new Date(Number(order.date)).toLocaleDateString('en-IN')} · {order.items?.length || 0} items</p>
              </div>
              <div className='flex items-center gap-4'>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>{order.status}</span>
                <span className='text-sm font-bold text-slate-800'>{formatCurrency(order.amount)}</span>
              </div>
            </div>
          ))}
          {!loading && recentOrders.length === 0 && <p className='px-6 py-8 text-center text-sm text-slate-400'>Your recent orders will appear here.</p>}
        </div>
      </section>
    </div>
  )
}

export default Dashboard