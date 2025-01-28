import { NavLink, Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import logoMain from '../assets/icons/logoMain.svg'

const Header = () => {
  return (
    <header className='flex items-center justify-between py-4 px-[3%] shadow-md text-gray-800'>
      <img className='w-[90px] object-cover h-[50px]' src={logoMain} alt='' />
      <nav>
        <ul className='flex space-x-[100px]'>
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
        <Link to={'/cart'}>
          <ShoppingCart />
        </Link>
      </div>
    </header>
  )
}

export default Header
