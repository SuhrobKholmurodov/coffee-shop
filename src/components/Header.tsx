import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import logoMain from '../assets/icons/logoMain.svg'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/cart/selectors'
import { Badge } from '@mui/material'
import BottomNav from './BottomNav'

const Header = () => {
  const location = useLocation()
  const { items: cartItems } = useSelector(selectCart)
  const totalCount = cartItems.reduce(
    (sum: number, item) => sum + item.count,
    0
  )
  return (
    <div className='sm:flex sm:flex-col sm:min-h-screen'>
      <header className='flex fixed top-0 left-0 right-0 bg-[#E1D4C9] items-center justify-between py-2 px-[3%] shadow-md text-gray-800 z-10'>
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
            <Badge showZero={false} badgeContent={totalCount} color='error'>
              <ShoppingCart size={28} />
            </Badge>
          </Link>
        </div>
      </header>
      <main
        className={`px-[3%] sm:pt-[20%] pt-[5%] pb-[20px] flex-grow ${
          location.pathname === '/cart' ? 'sm:pb-[85px]' : 'sm:pb-[80px]'
        }`}
      >
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default Header
