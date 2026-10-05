import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import { useContext } from 'react'

const ResetPassword = () => {
  const { backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitReset = async (event) => {
    event.preventDefault()
    if (!resetToken) {
      toast.error('This reset link is missing or invalid')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
        token: resetToken,
        password
      })
      if (response.data.success) {
        toast.success(response.data.message || 'Password reset successfully')
        navigate('/login', { replace: true })
      } else {
        toast.error(response.data.message || 'Could not reset password')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'This reset link may have expired')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className='auth-page'>
      <section className='auth-reset-panel'>
        <Link to='/' aria-label='ShopNex home' className='auth-brand-logo'><img src={assets.logo} alt='ShopNex' /></Link>
        <p className='editorial-kicker mt-10'>ACCOUNT SECURITY</p>
        <h1 className='mt-2 text-3xl font-semibold'>Choose a new password</h1>
        <p className='mt-2 text-sm leading-6 text-gray-500'>Use at least 8 characters. Reset links expire after 15 minutes and can only be used once.</p>

        {resetToken ? (
          <form onSubmit={submitReset} className='auth-form mt-7'>
            <label>
              New password
              <input type='password' autoComplete='new-password' minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder='At least 8 characters' />
            </label>
            <label>
              Confirm new password
              <input type='password' autoComplete='new-password' minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder='Enter it again' />
            </label>
            <button type='submit' disabled={submitting} className='auth-submit'>
              {submitting ? 'Updating...' : 'Reset password'}
            </button>
          </form>
        ) : (
          <div className='mt-7 border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900'>
            This reset link is incomplete. Request a new one from the sign-in page.
          </div>
        )}

        <Link to='/login' className='mt-6 inline-flex text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-black'>Back to sign in</Link>
      </section>
    </main>
  )
}

export default ResetPassword
