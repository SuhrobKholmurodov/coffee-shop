import Header from '../components/Header'
import { Footer } from '../components'

const Layouts = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow px-[3%] pt-[0px] pb-[20px]'>
      </main>
      <Footer />
    </div>
  )
}

export default Layouts
