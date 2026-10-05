import React from 'react'
import { assets } from '../assets/assets'
import { LogOut, Moon, Sun } from 'lucide-react'

const Navbar = ({ setToken, darkMode, onToggleTheme }) => {
  return (
    <header className='border-b border-slate-200 bg-white/90 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 lg:px-6'>
        <div className='flex items-center gap-4'>
          <img className='w-[120px] md:w-[150px]' src={assets.Shopnex_logo} alt='ShopNex Logo' />
          <div className='hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 md:flex'>
            <span className='h-2.5 w-2.5 rounded-full bg-emerald-500'></span>
            Live Dashboard
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 md:block'>
            Admin Control Center
          </div>
          <button
            type='button'
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100'
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setToken('')}
            className='flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700'
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
