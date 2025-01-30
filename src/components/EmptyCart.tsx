import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

export const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh] text-gray-700'>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
      >
        <div className='flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-8'>
          <ShoppingCart size={64} className='text-gray-500' />
        </div>
      </motion.div>
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='text-4xl sm:text-2xl font-bold text-gray-800 tracking-wide mb-2'
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Your cart is empty
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className='text-lg text-gray-600 text-center max-w-md mb-6'
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        Looks like you haven't added anything to your cart yet. Let's fix that!
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Link
          to='/'
          className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300'
        >
          Start Shopping
        </Link>
      </motion.div>
    </div>
  )
}
