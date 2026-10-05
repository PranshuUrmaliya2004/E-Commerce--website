import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CartTotals from '../Components/CartTotals'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'

const emptyAddress = {
  firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
}

const addressFields = [
  { name: 'firstName', label: 'First name', type: 'text', autocomplete: 'given-name' },
  { name: 'lastName', label: 'Last name', type: 'text', autocomplete: 'family-name' },
  { name: 'email', label: 'Email address', type: 'email', autocomplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' },
  { name: 'street', label: 'Street address', type: 'text', autocomplete: 'street-address', wide: true },
  { name: 'city', label: 'City', type: 'text', autocomplete: 'address-level2' },
  { name: 'state', label: 'State', type: 'text', autocomplete: 'address-level1' },
  { name: 'zipcode', label: 'Postal code', type: 'text', autocomplete: 'postal-code' },
  { name: 'country', label: 'Country', type: 'text', autocomplete: 'country-name' }
]

const Placeorder = () => {
  const {
    navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products
  } = useContext(ShopContext)
  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState(emptyAddress)
  const [savedAddresses, setSavedAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [shouldSaveAddress, setShouldSaveAddress] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    let active = true
    axios.get(`${backendUrl}/api/user/addresses`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (!active || !response.data.success) return
      const addresses = response.data.addresses || []
      setSavedAddresses(addresses)
      const defaultAddress = addresses.find((address) => address.isDefault)
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id)
        setFormData({ ...emptyAddress, ...defaultAddress })
      }
    }).catch((error) => {
      if (active) toast.error(error.response?.data?.message || 'Could not load saved addresses')
    })

    return () => { active = false }
  }, [backendUrl, navigate, token])

  const selectSavedAddress = (event) => {
    const addressId = event.target.value
    setSelectedAddressId(addressId)
    const address = savedAddresses.find((item) => item._id === addressId)
    setFormData(address ? { ...emptyAddress, ...address } : emptyAddress)
    setShouldSaveAddress(false)
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!token) {
      navigate('/login')
      return
    }
    if (getCartAmount() <= 0) {
      toast.error('Your cart is empty')
      return
    }

    setSubmitting(true)
    try {
      const orderItems = []
      for (const productId in cartItems) {
        const product = products.find((item) => item._id === productId)
        if (!product) continue
        for (const size in cartItems[productId]) {
          const quantity = Number(cartItems[productId][size])
          if (quantity > 0) orderItems.push({ ...product, size, quantity })
        }
      }

      if (orderItems.length === 0) {
        toast.error('Your cart could not be loaded. Please refresh and try again.')
        return
      }

      if (shouldSaveAddress && !selectedAddressId) {
        try {
          await axios.post(
            `${backendUrl}/api/user/addresses`,
            { address: formData, isDefault: savedAddresses.length === 0 },
            { headers: { Authorization: 'Bearer ' + token } }
          )
          toast.success('Delivery address saved')
        } catch (error) {
          toast.error(error.response?.data?.message || 'Order can continue, but address was not saved')
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method
      }
      const endpoint = method === 'stripe' ? 'stripe' : 'place'
      const response = await axios.post(`${backendUrl}/api/order/${endpoint}`, orderData, {
        headers: { Authorization: 'Bearer ' + token }
      })

      if (!response.data.success) {
        toast.error(response.data.message || 'Could not place your order')
        return
      }

      if (method === 'stripe') {
        if (!response.data.session_url) {
          toast.error('Payment session could not be started')
          return
        }
        window.location.assign(response.data.session_url)
        return
      }

      setCartItems({})
      toast.success('Order placed successfully')
      navigate('/orders')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!token) return null

  if (getCartAmount() <= 0) {
    return (
      <main className='min-h-[55vh] border-t pt-12 text-center'>
        <h1 className='prata-regular text-3xl'>Your cart is empty</h1>
        <p className='mt-3 text-sm text-gray-500'>Add a piece to your bag before checking out.</p>
        <Link to='/collection' className='mt-6 inline-flex min-h-12 items-center bg-black px-6 text-sm text-white'>Browse collection</Link>
      </main>
    )
  }

  return (
    <form onSubmit={onSubmitHandler} className='checkout-grid grid gap-10 border-t pt-8 sm:pt-12 lg:grid-cols-[1.1fr_.9fr]'>
      <section className='checkout-panel space-y-5'>
        <div>
          <p className='editorial-kicker'>STEP 1 OF 2</p>
          <Title text1='DELIVERY' text2='ADDRESS' />
        </div>

        {savedAddresses.length > 0 && (
          <label className='block text-sm font-medium text-gray-700'>
            Use a saved address
            <select value={selectedAddressId} onChange={selectSavedAddress} className='mt-2 w-full border border-gray-300 bg-white px-3 py-3 text-sm'>
              <option value=''>Enter a new address</option>
              {savedAddresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.label || 'Address'} · {address.firstName} {address.lastName} · {address.city}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className='grid gap-3 sm:grid-cols-2'>
          {addressFields.map(({ name, label, type, autocomplete, wide }) => (
            <label key={name} className={`block text-sm font-medium text-gray-700 ${wide ? 'sm:col-span-2' : ''}`}>
              {label}
              <input
                type={type}
                autoComplete={autocomplete}
                required
                name={name}
                value={formData[name] || ''}
                onChange={onChangeHandler}
                className='mt-2 w-full border border-gray-300 bg-white px-3 py-3 text-base outline-none focus:border-black'
              />
            </label>
          ))}
        </div>

        {!selectedAddressId && (
          <label className='flex items-center gap-2 text-sm text-gray-600'>
            <input type='checkbox' checked={shouldSaveAddress} onChange={(event) => setShouldSaveAddress(event.target.checked)} />
            Save this delivery address to my account
          </label>
        )}
      </section>

      <aside className='checkout-panel space-y-7 lg:pt-8'>
        <section className='border border-gray-200 p-5 sm:p-6'>
          <p className='mb-4 text-xs font-semibold uppercase tracking-[.16em] text-gray-500'>Order summary</p>
          <CartTotals />
        </section>

        <section>
          <p className='mb-4 text-xs font-semibold uppercase tracking-[.16em] text-gray-500'>Payment method</p>
          <div className='grid gap-3 sm:grid-cols-2'>
            <label className={`flex min-h-14 cursor-pointer items-center gap-3 border px-4 transition ${method === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
              <input type='radio' name='paymentMethod' value='cod' checked={method === 'cod'} onChange={() => setMethod('cod')} />
              <span className='text-sm font-medium'>Cash on delivery</span>
            </label>
            <label className={`flex min-h-14 cursor-pointer items-center gap-3 border px-4 transition ${method === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
              <input type='radio' name='paymentMethod' value='stripe' checked={method === 'stripe'} onChange={() => setMethod('stripe')} />
              <img className='h-5 max-w-20 object-contain' src={assets.stripe_logo} alt='Stripe' />
              <span className='text-sm font-medium'>Card</span>
            </label>
          </div>
        </section>

        <button type='submit' disabled={submitting} className='flex min-h-13 w-full items-center justify-center bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-60'>
          {submitting ? 'Processing...' : method === 'stripe' ? 'Continue to secure payment' : 'Place order'}
        </button>
      </aside>
    </form>
  )
}

export default Placeorder
