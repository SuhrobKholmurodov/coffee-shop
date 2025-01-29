import { NavLink, Link, Outlet } from 'react-router-dom'
import { HomeIcon, Info, Phone, ShoppingCart } from 'lucide-react'
import logoMain from '../assets/icons/logoMain.svg'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useState } from 'react'

const Header = () => {
  const [value, setValue] = useState(0)
  return (
    <div className='sm:flex sm:flex-col sm:min-h-screen'>
      <header className='flex fixed top-0 left-0 right-0 bg-[#E1D4C9] items-center justify-between py-1 px-[3%] shadow-md text-gray-800 z-10'>
        <Link to={'/'}>
          <img
            className='w-[90px] object-cover h-[50px]'
            src={logoMain}
            alt=''
          />
        </Link>
        <nav className='sm:hidden'>
          <ul className='flex space-x-12'>
            <li>
              <NavLink to='/' className='hover:text-[#665F55]'>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to='/contacts' className='hover:text-[#665F55]'>
                Контакты
              </NavLink>
            </li>
            <li>
              <NavLink to='/about' className='hover:text-[#665F55]'>
                О нас
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <input
            type='text'
            placeholder='Search'
            className='px-3 py-2 border border-grayrrer-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#665F55]'
          />
        </div>
        <div className='sm:hidden'>
          <Link to={'/cart'} className='p-2 rounded-full'>
            <ShoppingCart size={24} />
          </Link>
        </div>
      </header>
      <main className='px-[3%] sm:pt-[20%] pt-[7%] sm:pb-[95px] pb-[40px] flex-grow'>
        <Outlet />
      </main>
      <div className='sm:flex hidden fixed bottom-0 left-0 right-0'>
        <Box sx={{ width: '100%' }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue)
            }}
          >
            <BottomNavigationAction
              label='Home'
              icon={
                <Link to={'/'}>
                  <HomeIcon />
                </Link>
              }
            />
            <BottomNavigationAction
              label='Contacts'
              icon={
                <Link to={'/contacts'}>
                  <Phone />
                </Link>
              }
            />
            <BottomNavigationAction
              label='About'
              icon={
                <Link to={'/about'}>
                  <Info />
                </Link>
              }
            />
            <BottomNavigationAction
              label='Cart'
              icon={
                <Link to={'/cart'}>
                  <ShoppingCart />
                </Link>
              }
            />
          </BottomNavigation>
        </Box>
      </div>
    </div>
  )
}

export default Header
