import { Link } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className='flex flex-col px-[5%] items-center justify-center h-screen text-center'>
      <AlertTriangle className='w-[80px] h-[80px] text-[#B0907A] animate-bounce' />
      <h1 className='text-[50px] text-secondareBgColor sm:text-[35px] font-semibold mt-4'>
        Page Not Found
      </h1>
      <p className='text-lg text-secondareBgColor sm:text-base max-w-[600px] mt-2'>
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to='/'
        className='mt-6 bg-mainBgColor text-secondareBgColor px-6 py-3 rounded-full font-semibold text-lg flex items-center gap-2 sm:bg-[#B0907A] sm:text-mainBgColor hover:bg-[#B0907A] duration-300'
      >
        <Home className='w-5 h-5' /> Go Home
      </Link>
    </div>
  )
}
