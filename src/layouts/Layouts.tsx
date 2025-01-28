import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Footer } from '../components'

const Layouts = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='px-[3%] pt-[20px] flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layouts
