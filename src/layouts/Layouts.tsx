import { Header, LaunchTopButton } from '@/components'
import { useLocation } from 'react-router-dom'

const Layouts = () => {
  const location = useLocation()

  return (
    <div className='flex flex-col min-h-screen relative'>
      <Header />
      <main className='flex-1'></main>

      {(location.pathname === '/cart' ||
        (location.pathname === '/' && window.innerWidth < 1024)) && (
        <LaunchTopButton />
      )}
    </div>
  )
}

export default Layouts
