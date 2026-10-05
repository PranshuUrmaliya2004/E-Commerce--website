import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendURL } from '../config'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(backendURL + '/api/user/admin', { email, password })

      if (response.data.success) {
        setToken(response.data.token)
        toast.success('Login Successful ✅')
      } else {
        toast.error(response.data.message || 'Invalid Credentials')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#fff5f8,_#eef4ff_30%,_#f8fafc_60%,_#eef2ff_100%)] px-4'>
      <div className='grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='flex flex-col justify-between bg-[linear-gradient(135deg,_#111827,_#1f2937_35%,_#7d293b_100%)] p-8 text-white lg:p-12'>
          <div>
            <p className='mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-rose-200'>ShopNex Admin</p>
            <h1 className='max-w-md text-4xl font-bold leading-tight'>Smarter commerce operations for your growth.</h1>
          </div>

          <div className='mt-10 space-y-4 text-sm text-slate-200'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p className='font-semibold text-white'>Inventory control</p>
              <p className='mt-1'>Track products, categories, and performance in one place.</p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p className='font-semibold text-white'>Order visibility</p>
              <p className='mt-1'>Monitor orders, customer delivery flow, and fulfillment status.</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center p-6 sm:p-10'>
          <div className='w-full max-w-md'>
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-slate-400'>Sign in</p>
            <h2 className='mt-3 text-3xl font-bold text-slate-900'>Welcome back</h2>
            <p className='mt-2 text-sm text-slate-500'>Access the commerce dashboard and manage your catalog.</p>

            <form onSubmit={onSubmitHandler} className='mt-8 space-y-5'>
              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700'>Email</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='your@gmail.com'
                  required
                  className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#d97793] focus:bg-white focus:ring-4 focus:ring-rose-100'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-slate-700'>Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                  className='w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-[#d97793] focus:bg-white focus:ring-4 focus:ring-rose-100'
                />
              </div>

              <button
                type='submit'
                className='w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700'
              >
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

