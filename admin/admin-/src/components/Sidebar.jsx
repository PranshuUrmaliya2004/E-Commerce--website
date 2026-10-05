import React from 'react'
import { NavLink } from 'react-router-dom'
import { Boxes, LayoutDashboard, PackagePlus, PackageSearch } from 'lucide-react'

const menuItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/add', label: 'Add Product', icon: PackagePlus },
  { to: '/list', label: 'Inventory', icon: Boxes },
  { to: '/orders', label: 'Orders', icon: PackageSearch }
]

const Sidebar = () => {
  return (
    <aside className='hidden w-[260px] shrink-0 lg:block'>
      <div className='rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]'>
        <div className='mb-6 px-3 pt-2'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400'>Overview</p>
          <h2 className='mt-2 text-xl font-semibold text-slate-800'>Operations Hub</h2>
        </div>

        <nav className='space-y-2'>
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'border-[#f1d7de] bg-[#fff2f6] text-[#7d293b] shadow-sm'
                    : 'border-transparent bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-slate-100'
                }`
              }
            >
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm'>
                {React.createElement(Icon, { size: 17 })}
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
