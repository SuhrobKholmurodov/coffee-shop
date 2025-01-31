import { motion } from 'framer-motion'

export const LoadingSpinner = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[300px] text-center'>
      <p>Загрузка...</p>
      <div className='flex gap-2 mt-4'>
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
          className='w-2 h-2 bg-[#3B82F6] rounded-full'
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          className='w-2 h-2 bg-[#10B981] rounded-full'
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
          className='w-2 h-2 bg-[#EF4444] rounded-full'
        ></motion.div>
      </div>
    </div>
  )
}
