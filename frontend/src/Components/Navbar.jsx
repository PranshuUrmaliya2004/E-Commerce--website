import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'

const navItems = [
  { label: 'Men', query: '?category=Men' },
  { label: 'Women', query: '?category=Women' },
  { label: 'Kids', query: '?category=Kids' },
  { label: 'Beauty', query: '?category=Beauty' },
  { label: 'New Arrivals', query: '?sort=newest' }
]

const Icon = ({ children, size = 20, ...props }) => (
  <svg aria-hidden='true' width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round' {...props}>
    {children}
  </svg>
)

const SearchIcon = (props) => <Icon {...props}><circle cx='10.8' cy='10.8' r='6.8' /><path d='m16 16 4.5 4.5' /></Icon>
const UserIcon = (props) => <Icon {...props}><circle cx='12' cy='8' r='3.4' /><path d='M5.5 20a6.5 6.5 0 0 1 13 0' /></Icon>
const HeartIcon = (props) => <Icon {...props}><path d='M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z' /></Icon>
const BagIcon = (props) => <Icon {...props}><path d='M5 8h14l1 12H4L5 8Z' /><path d='M9 9V6a3 3 0 0 1 6 0v3' /></Icon>
const MenuIcon = (props) => <Icon {...props}><path d='M4 7h16M4 12h16M4 17h16' /></Icon>
const CloseIcon = (props) => <Icon {...props}><path d='m6 6 12 12M18 6 6 18' /></Icon>

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { search, setSearch, setShowSearch, getCartCount, getWishlistCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
  const location = useLocation()
  const activeCategory = new URLSearchParams(location.search).get('category')
  const activeSort = new URLSearchParams(location.search).get('sort')

  const closeMenus = () => {
    setMobileOpen(false)
    setProfileOpen(false)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setProfileOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    setShowSearch(false)
    setSearch(search.trim())
    closeMenus()
    navigate('/collection')
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCartItems({})
    setToken('')
    closeMenus()
    navigate('/login')
  }

  const renderNavLinks = (mobile = false) => navItems.map(({ label, query }) => {
    const isActive = location.pathname === '/collection' && (
      (label === 'New Arrivals' && activeSort === 'newest') ||
      (label !== 'New Arrivals' && activeCategory === label)
    )

    return (
      <Link
        key={label}
        to={`/collection${query}`}
        onClick={() => {
          setSearch('')
          setShowSearch(false)
          closeMenus()
        }}
        className={`shop-nav__link${isActive ? ' is-active' : ''}${mobile ? ' shop-nav__link--mobile' : ''}`}
      >
        {label}
      </Link>
    )
  })

  const renderAccountMenu = () => token && profileOpen && (
    <div className='shop-nav__account-menu'>
      <Link to='/profile' onClick={closeMenus}>My Profile</Link>
      <Link to='/orders' onClick={closeMenus}>My Orders</Link>
      <button type='button' onClick={logout}>Logout</button>
    </div>
  )

  const accountAction = () => {
    if (!token) {
      closeMenus()
      navigate('/login')
      return
    }
    setProfileOpen((open) => !open)
  }

  return (
    <header className='shop-nav'>
      <div className='shop-nav__inner'>
        <div className='shop-nav__top-row'>
          <Link to='/' onClick={closeMenus} aria-label='ShopNex home' className='shop-nav__brand'>
            <img src={assets.logo} alt='ShopNex' />
          </Link>

          <nav className='shop-nav__categories' aria-label='Shop categories'>
            {renderNavLinks()}
          </nav>

          <form className='shop-nav__search' role='search' onSubmit={submitSearch}>
            <SearchIcon size={18} />
            <input
              type='search'
              aria-label='Search fashion and products'
              placeholder='Search for products, brands and more'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type='submit' aria-label='Submit search'><SearchIcon size={18} /></button>
          </form>

          <div className='shop-nav__actions'>
            <div className='shop-nav__account'>
              <button type='button' onClick={accountAction} aria-label={token ? 'Open account menu' : 'Login or profile'} aria-expanded={profileOpen} className='shop-nav__action'>
                <UserIcon size={21} />
                <span>{token ? 'Profile' : 'Login'}</span>
              </button>
              {renderAccountMenu()}
            </div>

            <Link to='/wishlist' onClick={closeMenus} aria-label={`Wishlist, ${getWishlistCount()} saved items`} className='shop-nav__action shop-nav__wishlist'>
              <span className='shop-nav__heart-icon'><HeartIcon size={21} />{getWishlistCount() > 0 && <span className='shop-nav__count'>{getWishlistCount()}</span>}</span>
              <span>Wishlist</span>
            </Link>

            <Link to='/cart' onClick={closeMenus} aria-label={`Shopping bag, ${getCartCount()} items`} className='shop-nav__action shop-nav__bag'>
              <span className='shop-nav__bag-icon'><BagIcon size={21} /><span className='shop-nav__count'>{getCartCount()}</span></span>
              <span>Bag</span>
            </Link>

            <button
              type='button'
              onClick={() => { setMobileOpen((open) => !open); setProfileOpen(false) }}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className='shop-nav__menu-button'
            >
              {mobileOpen ? <CloseIcon size={23} /> : <MenuIcon size={23} />}
            </button>
          </div>
        </div>

        <form className='shop-nav__search shop-nav__search--mobile' role='search' onSubmit={submitSearch}>
          <SearchIcon size={18} />
          <input
            type='search'
            aria-label='Search fashion and products'
            placeholder='Search for products, brands and more'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type='submit' aria-label='Submit search'><SearchIcon size={18} /></button>
        </form>
      </div>

      <div className={`shop-nav__mobile-panel${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen} inert={!mobileOpen}>
        <nav aria-label='Mobile shop categories'>
          {renderNavLinks(true)}
        </nav>
        <div className='shop-nav__mobile-secondary'>
          <Link to={token ? '/profile' : '/login'} onClick={closeMenus}>{token ? 'My Profile' : 'Login / Sign up'}</Link>
          {token && <Link to='/orders' onClick={closeMenus}>My Orders</Link>}
          <Link to='/about' onClick={closeMenus}>About ShopNex</Link>
          <Link to='/contact' onClick={closeMenus}>Contact</Link>
          {token && <button type='button' onClick={logout}>Log out</button>}
        </div>
      </div>
    </header>
  )
}

export default Navbar