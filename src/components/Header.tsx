import { NavLink, Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import logoMain from '../assets/icons/logoMain.svg'

const Header = () => {
  return (
    <header className='flex fixed top-0 left-0 right-0 bg-[#E1D4C9] items-center justify-between py-4 px-[3%] shadow-md text-gray-800'>
      <Link to={'/'}>
        <img className='w-[90px] object-cover h-[50px]' src={logoMain} alt='' />
      </Link>
      <nav>
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
          placeholder='search'
          className='px-3 py-2 border border-grayrrer-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#665F55]'
        />
      </div>
      <div>
        <Link to={'/cart'} className='p-2 hover:bg-gray-100 rounded-full'>
          <ShoppingCart size={24} />
        </Link>
      </div>
    </header>
  )
}

export default Header
