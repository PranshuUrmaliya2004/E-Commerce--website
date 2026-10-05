import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../Context/ShopContext'

const emptyAddress = {
  label: 'Home',
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: ''
}

const addressFields = [
  { name: 'firstName', label: 'First name', required: true, autocomplete: 'given-name' },
  { name: 'lastName', label: 'Last name', required: true, autocomplete: 'family-name' },
  { name: 'email', label: 'Email', required: false, autocomplete: 'email' },
  { name: 'phone', label: 'Phone', required: true, autocomplete: 'tel' },
  { name: 'street', label: 'Street address', required: true, autocomplete: 'street-address' },
  { name: 'city', label: 'City', required: true, autocomplete: 'address-level2' },
  { name: 'state', label: 'State', required: true, autocomplete: 'address-level1' },
  { name: 'zipcode', label: 'Postal code', required: true, autocomplete: 'postal-code' },
  { name: 'country', label: 'Country', required: true, autocomplete: 'country-name' }
]

const Profile = () => {
  const { backendUrl, navigate, token } = useContext(ShopContext)
  const [profile, setProfile] = useState({ name: '', email: '' })
  const [addresses, setAddresses] = useState([])
  const [addressDraft, setAddressDraft] = useState(emptyAddress)
  const [editingAddressId, setEditingAddressId] = useState('')
  const [passwordDraft, setPasswordDraft] = useState({ currentPassword: '', newPassword: '' })
  const [loading, setLoading] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingAddress, setSavingAddress] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const authConfig = { headers: { Authorization: 'Bearer ' + token } }

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    let active = true
    const loadAccount = async () => {
      try {
        const requestConfig = { headers: { Authorization: 'Bearer ' + token } }
        const [profileResponse, addressResponse] = await Promise.all([
          axios.post(`${backendUrl}/api/user/profile`, {}, requestConfig),
          axios.get(`${backendUrl}/api/user/addresses`, requestConfig)
        ])

        if (active && profileResponse.data.success) setProfile(profileResponse.data.user)
        if (active && addressResponse.data.success) setAddresses(addressResponse.data.addresses || [])
      } catch (error) {
        if (active) toast.error(error.response?.data?.message || 'Could not load account details')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadAccount()
    return () => { active = false }
  }, [backendUrl, navigate, token])

  const saveProfile = async (event) => {
    event.preventDefault()
    const name = profile.name.trim()
    if (!name) return toast.error('Name is required')

    setSavingProfile(true)
    try {
      const response = await axios.put(`${backendUrl}/api/user/profile`, { name }, authConfig)
      if (response.data.success) {
        setProfile(response.data.user)
        toast.success('Profile updated')
      } else {
        toast.error(response.data.message || 'Could not update profile')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const saveAddress = async (event) => {
    event.preventDefault()
    setSavingAddress(true)
    const request = editingAddressId
      ? axios.put(`${backendUrl}/api/user/addresses`, { addressId: editingAddressId, address: addressDraft }, authConfig)
      : axios.post(`${backendUrl}/api/user/addresses`, { address: addressDraft }, authConfig)

    try {
      const response = await request
      if (response.data.success) {
        setAddresses(response.data.addresses || [])
        setAddressDraft(emptyAddress)
        setEditingAddressId('')
        toast.success(editingAddressId ? 'Address updated' : 'Address saved')
      } else {
        toast.error(response.data.message || 'Could not save address')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save address')
    } finally {
      setSavingAddress(false)
    }
  }

  const editAddress = (address) => {
    setEditingAddressId(address._id)
    setAddressDraft({ ...emptyAddress, ...address })
  }

  const setDefaultAddress = async (address) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/addresses`,
        { addressId: address._id, address, isDefault: true },
        authConfig
      )
      if (response.data.success) setAddresses(response.data.addresses || [])
      else toast.error(response.data.message || 'Could not update default address')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update default address')
    }
  }

  const deleteAddress = async (addressId) => {
    if (!window.confirm('Delete this saved address?')) return
    try {
      const response = await axios.delete(`${backendUrl}/api/user/addresses`, {
        ...authConfig,
        data: { addressId }
      })
      if (response.data.success) {
        setAddresses(response.data.addresses || [])
        if (editingAddressId === addressId) {
          setAddressDraft(emptyAddress)
          setEditingAddressId('')
        }
        toast.success('Address deleted')
      } else {
        toast.error(response.data.message || 'Could not delete address')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete address')
    }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    setSavingPassword(true)
    try {
      const response = await axios.put(`${backendUrl}/api/user/password`, passwordDraft, authConfig)
      if (response.data.success) {
        setPasswordDraft({ currentPassword: '', newPassword: '' })
        toast.success(response.data.message || 'Password updated')
      } else {
        toast.error(response.data.message || 'Could not update password')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update password')
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <main className='account-hub min-h-[55vh] border-t pt-10 sm:pt-14'>
      <header className='mb-8 flex flex-wrap items-end justify-between gap-4'>
        <div>
          <p className='editorial-kicker'>YOUR SHOPNEX ACCOUNT</p>
          <h1 className='prata-regular mt-2 text-3xl'>Account overview</h1>
          <p className='mt-2 text-sm text-gray-500'>Manage your details, delivery addresses, and security.</p>
        </div>
        <nav className='flex flex-wrap gap-2' aria-label='Account shortcuts'>
          <Link className='border px-4 py-2 text-sm hover:border-black' to='/orders'>Orders</Link>
          <Link className='border px-4 py-2 text-sm hover:border-black' to='/wishlist'>Wishlist</Link>
          <Link className='border px-4 py-2 text-sm hover:border-black' to='/cart'>Cart</Link>
        </nav>
      </header>

      {loading ? (
        <p className='py-12 text-sm text-gray-500' role='status'>Loading account details...</p>
      ) : (
        <div className='grid gap-6 lg:grid-cols-[.8fr_1.2fr]'>
          <div className='space-y-6'>
            <section className='border border-gray-200 p-5 sm:p-6'>
              <h2 className='text-lg font-semibold'>Personal information</h2>
              <form onSubmit={saveProfile} className='mt-5 space-y-4'>
                <label className='block text-sm text-gray-700'>
                  Name
                  <input autoComplete='name' required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className='mt-2 w-full border border-gray-300 px-3 py-3 text-base text-gray-900 outline-none focus:border-black' />
                </label>
                <label className='block text-sm text-gray-700'>
                  Email
                  <input readOnly value={profile.email} className='mt-2 w-full border border-gray-200 bg-gray-50 px-3 py-3 text-base text-gray-500' />
                </label>
                <button type='submit' disabled={savingProfile} className='bg-black px-5 py-3 text-sm text-white disabled:opacity-60'>
                  {savingProfile ? 'Saving...' : 'Save profile'}
                </button>
              </form>
            </section>

            <section className='border border-gray-200 p-5 sm:p-6'>
              <h2 className='text-lg font-semibold'>Change password</h2>
              <form onSubmit={changePassword} className='mt-5 space-y-4'>
                <label className='block text-sm text-gray-700'>
                  Current password
                  <input type='password' autoComplete='current-password' required value={passwordDraft.currentPassword} onChange={(event) => setPasswordDraft({ ...passwordDraft, currentPassword: event.target.value })} className='mt-2 w-full border border-gray-300 px-3 py-3 text-base outline-none focus:border-black' />
                </label>
                <label className='block text-sm text-gray-700'>
                  New password
                  <input type='password' autoComplete='new-password' minLength={8} required value={passwordDraft.newPassword} onChange={(event) => setPasswordDraft({ ...passwordDraft, newPassword: event.target.value })} className='mt-2 w-full border border-gray-300 px-3 py-3 text-base outline-none focus:border-black' />
                </label>
                <button type='submit' disabled={savingPassword} className='border border-black px-5 py-3 text-sm disabled:opacity-60'>
                  {savingPassword ? 'Updating...' : 'Update password'}
                </button>
              </form>
            </section>
          </div>

          <section className='border border-gray-200 p-5 sm:p-6'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div>
                <h2 className='text-lg font-semibold'>Saved addresses</h2>
                <p className='mt-1 text-sm text-gray-500'>Choose an address at checkout, or add one for next time.</p>
              </div>
              <span className='text-xs text-gray-500'>{addresses.length} / 10</span>
            </div>

            <div className='mt-5 space-y-3'>
              {addresses.map((address) => (
                <article key={address._id} className='border border-gray-200 p-4'>
                  <div className='flex flex-wrap items-start justify-between gap-3'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <p className='font-semibold'>{address.label || 'Address'}</p>
                        {address.isDefault && <span className='bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-800'>Default</span>}
                      </div>
                      <p className='mt-2 text-sm text-gray-700'>{address.firstName} {address.lastName}</p>
                      <p className='mt-1 text-sm text-gray-500'>{address.street}, {address.city}, {address.state} {address.zipcode}, {address.country}</p>
                      <p className='mt-1 text-sm text-gray-500'>{address.phone}</p>
                    </div>
                    <div className='flex flex-wrap gap-3 text-xs font-medium'>
                      {!address.isDefault && <button type='button' onClick={() => setDefaultAddress(address)} className='underline'>Set default</button>}
                      <button type='button' onClick={() => editAddress(address)} className='underline'>Edit</button>
                      <button type='button' onClick={() => deleteAddress(address._id)} className='text-red-700 underline'>Delete</button>
                    </div>
                  </div>
                </article>
              ))}
              {addresses.length === 0 && <p className='border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500'>No saved addresses yet.</p>}
            </div>

            {addresses.length < 10 || editingAddressId ? (
              <form onSubmit={saveAddress} className='mt-6 border-t border-gray-200 pt-5'>
                <div className='mb-4 flex items-center justify-between gap-3'>
                  <h3 className='font-semibold'>{editingAddressId ? 'Edit address' : 'Add an address'}</h3>
                  {editingAddressId && <button type='button' onClick={() => { setAddressDraft(emptyAddress); setEditingAddressId('') }} className='text-xs underline'>Cancel edit</button>}
                </div>
                <label className='mb-4 block text-sm text-gray-700'>
                  Address label
                  <input value={addressDraft.label} onChange={(event) => setAddressDraft({ ...addressDraft, label: event.target.value })} placeholder='Home, work...' className='mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-black' />
                </label>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {addressFields.map(({ name, label, required, autocomplete }) => (
                    <label key={name} className={`block text-sm text-gray-700 ${name === 'street' ? 'sm:col-span-2' : ''}`}>
                      {label}
                      <input
                        type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
                        autoComplete={autocomplete}
                        required={required}
                        value={addressDraft[name] || ''}
                        onChange={(event) => setAddressDraft({ ...addressDraft, [name]: event.target.value })}
                        className='mt-2 w-full border border-gray-300 px-3 py-3 outline-none focus:border-black'
                      />
                    </label>
                  ))}
                </div>
                <button type='submit' disabled={savingAddress} className='mt-4 bg-black px-5 py-3 text-sm text-white disabled:opacity-60'>
                  {savingAddress ? 'Saving...' : editingAddressId ? 'Update address' : 'Save address'}
                </button>
              </form>
            ) : <p className='mt-5 text-sm text-gray-500'>You have reached the 10-address limit.</p>}
          </section>
        </div>
      )}
    </main>
  )
}

export default Profile