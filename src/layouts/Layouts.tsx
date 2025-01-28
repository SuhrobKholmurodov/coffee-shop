import { Link, Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
    <div>
      <header className='flex items-center justify-between p-4 bg-gray-800 text-white'>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/' className='hover:text-gray-400'>
                Главная
              </Link>
            </li>
            <li>
              <Link to='/contacts' className='hover:text-gray-400'>
                Контакты
              </Link>
            </li>
            <li>
              <Link to='/about' className='hover:text-gray-400'>
                О нас
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layouts
