import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const closeMenus = () => {
    setVisible(false)
    setProfileOpen(false)
  }

  const openSearch = () => {
    setShowSearch(true)
    navigate('/collection')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCartItems({})
    setToken('')
    closeMenus()
    navigate('/login')
  }

  const goTo = (path) => {
    closeMenus()
    navigate(path)
  }

  return (
    <header className='relative z-30 flex h-16 items-center justify-between font-medium'>
      <Link to='/' aria-label='Home'><img src={assets.logo} className='w-36' alt='Shop home' /></Link>
      <nav aria-label='Main navigation'>
        <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
          <NavLink to='/' className='flex flex-col items-center gap-1'><p>HOME</p><hr className='hidden h-0.5 w-2/4 border-none bg-gray-700' /></NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'><p>COLLECTION</p><hr className='hidden h-0.5 w-2/4 border-none bg-gray-700' /></NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1'><p>ABOUT</p><hr className='hidden h-0.5 w-2/4 border-none bg-gray-700' /></NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'><p>CONTACT</p><hr className='hidden h-0.5 w-2/4 border-none bg-gray-700' /></NavLink>
        </ul>
      </nav>
      <div className='flex items-center gap-4 sm:gap-6'>
        <button type='button' onClick={openSearch} aria-label='Search products' className='flex min-h-11 min-w-8 items-center justify-center'><img src={assets.search_icon} className='w-5' alt='' /></button>
        <div className='relative'>
          <button type='button' onClick={() => token ? setProfileOpen(!profileOpen) : navigate('/login')} aria-label={token ? 'Open account menu' : 'Sign in'} aria-expanded={profileOpen} className='flex min-h-11 min-w-8 items-center justify-center'><img src={assets.profile_icon} className='w-5' alt='' /></button>
          {token && profileOpen && <div className='absolute right-0 top-full z-50 w-40 pt-2'><div className='flex flex-col gap-1 border border-gray-200 bg-white p-2 text-sm text-gray-600 shadow-md'>
            <button type='button' onClick={() => goTo('/profile')} className='px-3 py-2 text-left hover:text-black'>My Profile</button>
            <button type='button' onClick={() => goTo('/orders')} className='px-3 py-2 text-left hover:text-black'>My Orders</button>
            <button type='button' onClick={logout} className='px-3 py-2 text-left hover:text-black'>Logout</button>
          </div></div>}
        </div>
        <Link to='/cart' aria-label={`Cart, ${getCartCount()} items`} className='relative flex min-h-11 min-w-8 items-center justify-center'>
          <img src={assets.cart_icon} className='w-5' alt='' />
          <span className='absolute bottom-1 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] leading-none text-white'>{getCartCount()}</span>
        </Link>
        <button type='button' onClick={() => setVisible(true)} aria-label='Open mobile navigation' aria-expanded={visible} className='flex min-h-11 min-w-8 items-center justify-center sm:hidden'><img src={assets.menu_icon} className='w-5' alt='' /></button>
      </div>
      {visible && <button type='button' aria-label='Close mobile navigation' onClick={closeMenus} className='fixed inset-0 z-40 bg-black/20 sm:hidden' />}
      <aside className={`fixed right-0 top-0 z-50 h-dvh w-[min(20rem,100vw)] overflow-y-auto bg-white transition-transform duration-300 sm:hidden ${visible ? 'translate-x-0' : 'translate-x-full'}`} aria-label='Mobile navigation' aria-hidden={!visible} inert={!visible}>
        <div className='flex min-h-full flex-col text-gray-700'>
          <button type='button' onClick={closeMenus} className='flex min-h-14 items-center gap-3 border-b px-5 text-left'><img src={assets.dropdown_icon} className='h-4 rotate-180' alt='' /><span>Close menu</span></button>
          <NavLink onClick={closeMenus} className='border-b px-6 py-4' to='/'>Home</NavLink>
          <NavLink onClick={closeMenus} className='border-b px-6 py-4' to='/collection'>Collection</NavLink>
          <NavLink onClick={closeMenus} className='border-b px-6 py-4' to='/about'>About</NavLink>
          <NavLink onClick={closeMenus} className='border-b px-6 py-4' to='/contact'>Contact</NavLink>
          {token ? <>
            <NavLink onClick={closeMenus} className='border-b px-6 py-4' to='/profile'>My Profile</NavLink>
            <NavLink onClick={closeMenus} className='border-b px-6 py-4' to='/orders'>My Orders</NavLink>
            <button type='button' onClick={logout} className='px-6 py-4 text-left'>Logout</button>
          </> : <NavLink onClick={closeMenus} className='px-6 py-4' to='/login'>Sign in</NavLink>}
        </div>
      </aside>
    </header>
  )
}

export default Navbar