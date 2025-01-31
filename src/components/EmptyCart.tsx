import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

export const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh] text-gray-700'>
      <div className='flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-8 animate__animated animate__bounceIn'>
        <ShoppingCart size={64} className='text-gray-500' />
      </div>
      <h1
        className='text-4xl sm:text-2xl font-bold text-gray-800 tracking-wide mb-2 animate__animated animate__fadeInDown'
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Your cart is empty
      </h1>
      <p
        className='text-lg text-gray-600 text-center max-w-md mb-6 animate__animated animate__fadeInUp'
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        Looks like you haven't added anything to your cart yet. Let's fix that!
      </p>
      <div className='animate__animated animate__fadeInUp'>
        <Link
          to='/'
          className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300'
        >
          Start Shopping
        </Link>
      </div>
    </div>
  )
}
