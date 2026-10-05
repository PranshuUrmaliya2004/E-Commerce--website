import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [view, setView] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (token) navigate('/', { replace: true })
  }, [navigate, token])

  const submitForm = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      if (view === 'forgot') {
        const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email })
        if (response.data.success) {
          toast.success(response.data.message || 'Check your email for a reset link')
          setView('login')
        } else {
          toast.error(response.data.message || 'Could not request a reset link')
        }
        return
      }

      if (view === 'signup' && password !== confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      const endpoint = view === 'signup' ? 'register' : 'login'
      const payload = view === 'signup' ? { name: name.trim(), email: email.trim(), password } : { email: email.trim(), password }
      const response = await axios.post(`${backendUrl}/api/user/${endpoint}`, payload)

      if (!response.data.success) {
        toast.error(response.data.message || 'Could not sign in')
        return
      }

      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      toast.success(view === 'signup' ? 'Your ShopNex account is ready' : 'Welcome back')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const title = view === 'signup' ? 'Create your account' : view === 'forgot' ? 'Reset your password' : 'Welcome back'
  const description = view === 'signup'
    ? 'Join ShopNex to keep your finds and orders together.'
    : view === 'forgot'
      ? 'Enter your account email and we will send a secure reset link.'
      : 'Sign in to continue where your style left off.'

  return (
    <main className='auth-page'>
      <section className='auth-panel'>
        <div className='auth-brand-panel'>
          <img className='auth-brand-image' src={assets.hero_img} alt='' aria-hidden='true' />
          <Link to='/' aria-label='ShopNex home' className='auth-brand-logo'><img src={assets.logo} alt='ShopNex' /></Link>
          <div className='auth-brand-copy'>
            <p className='editorial-kicker'>A MORE PERSONAL EDIT</p>
            <h1>Good finds.<br />Better fits.</h1>
            <p>Keep your wishlist, orders, and account details in one place.</p>
          </div>
          <span className='auth-brand-index'>SHOPNEX / MEMBER ACCESS</span>
        </div>

        <div className='auth-form-panel'>
          <div className='auth-form-heading'>
            <p className='editorial-kicker'>{view === 'signup' ? 'JOIN SHOPNEX' : view === 'forgot' ? 'ACCOUNT RECOVERY' : 'MEMBER SIGN IN'}</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <form onSubmit={submitForm} className='auth-form'>
            {view === 'signup' && (
              <label>
                Full name
                <input autoComplete='name' required minLength={2} maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder='Your name' />
              </label>
            )}

            <label>
              Email address
              <input autoComplete='email' type='email' required value={email} onChange={(event) => setEmail(event.target.value)} placeholder='you@example.com' />
            </label>

            {view !== 'forgot' && (
              <label>
                Password
                <input autoComplete={view === 'signup' ? 'new-password' : 'current-password'} type='password' required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder='At least 8 characters' />
              </label>
            )}

            {view === 'signup' && (
              <label>
                Confirm password
                <input autoComplete='new-password' type='password' required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder='Enter your password again' />
              </label>
            )}

            {view === 'login' && (
              <button type='button' onClick={() => setView('forgot')} className='auth-inline-link'>Forgot password?</button>
            )}

            <button type='submit' disabled={submitting} className='auth-submit'>
              {submitting ? 'Please wait...' : view === 'signup' ? 'Create account' : view === 'forgot' ? 'Send reset link' : 'Sign in'}
            </button>
          </form>

          <div className='auth-form-footer'>
            {view === 'login' && <p>New to ShopNex? <button type='button' onClick={() => setView('signup')}>Create account</button></p>}
            {view === 'signup' && <p>Already have an account? <button type='button' onClick={() => setView('login')}>Sign in</button></p>}
            {view === 'forgot' && <p>Remembered your password? <button type='button' onClick={() => setView('login')}>Back to sign in</button></p>}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
