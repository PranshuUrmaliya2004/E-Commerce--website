import React, { lazy, Suspense, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import { Navigate } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'))

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('admin-theme') === 'dark')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    localStorage.setItem('admin-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className='admin-root min-h-screen bg-[#f4f7fb] text-slate-800' data-theme={darkMode ? 'dark' : 'light'}>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
          <div className='mx-auto flex max-w-[1600px] gap-6 px-4 py-6 lg:px-6'>
            <Sidebar />
            <main className='flex-1'>
              <div className='rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-6 lg:p-8'>
                <Routes>
                  <Route path='/' element={<Suspense fallback={<p className='py-16 text-center text-sm text-slate-400'>Loading dashboard...</p>}><Dashboard token={token} darkMode={darkMode} /></Suspense>} />
                  <Route path='*' element={<Navigate to='/' replace />} />
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Order token={token} />} />
                </Routes>
              </div>
            </main>
          </div>
        </>
      )}
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  )
}

export default App


