import { Coffee, MapPin } from 'lucide-react'
import { Helmet } from 'react-helmet'

export const About = () => {
  return (
    <div className='bg-secondareBgColor py-[3%] px-[6%] rounded-2xl w-full flex flex-col items-center text-mainBgColor overflow-hidden'>
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1 className='text-[50px] sm:text-[35px] font-semibold mb-6 flex items-center gap-3'>
        <Coffee className='w-[40px] h-[40px] text-[#B0907A]' />
        <p className='animate__animated animate__fadeInDown'>About us</p>
      </h1>
      <p className='text-lg animate__animated animate__lightSpeedInLeft sm:text-base max-w-[1000px] text-center'>
        Welcome to our cozy coffee spot! We believe that every cup tells a
        story, and we’re here to make yours special. Our journey started with a
        simple passion for coffee, and today, we serve carefully brewed drinks
        made from the finest beans.
      </p>
      <p className='text-lg sm:text-base animate__animated animate__lightSpeedInRight max-w-[1000px] text-center mt-4'>
        Whether you’re here for a quick espresso, a friendly chat, or a peaceful
        moment with your favorite book, we’re happy to have you. Come and
        experience the warmth of our space and the richness of our coffee.
      </p>
      <div className='flex gap-4 mt-6'>
        <button className='bg-mainBgColor animate__animated animate__fadeInUp  text-secondareBgColor px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#B0907A] duration-300'>
          Visit Us
        </button>
        <button className='flex items-center animate__animated animate__fadeInUp gap-2 text-mainBgColor border border-mainBgColor px-6 py-3 rounded-full font-semibold text-lg hover:bg-mainBgColor hover:text-secondareBgColor duration-300'>
          <MapPin className='w-5 h-5' /> Find Us
        </button>
      </div>
    </div>
  )
}
