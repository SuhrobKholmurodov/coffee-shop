import { Outlet, NavLink } from 'react-router-dom'
import logoMain from '../assets/img/logoMain.png'

const Layouts = () => {
  return (
    <div>
      <header className='flex items-center justify-between py-4 px-[3%] shadow-md text-gray-800'>
        <img className='w-[90px] object-cover h-[50px]' src={logoMain} alt='' />
        <nav>
          <ul className='flex space-x-[100px]'>
            <li>
              <NavLink to='/' className='hover:text-gray-400'>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to='/contacts' className='hover:text-gray-400'>
                Контакты
              </NavLink>
            </li>
            <li>
              <NavLink to='/about' className='hover:text-gray-400'>
                О нас
              </NavLink>
            </li>
          </ul>
        </nav>
        <button>hello</button>
      </header>
      <main className='px-[3%] pt-[20px]'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layouts
