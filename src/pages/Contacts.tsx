import {
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Twitter
} from 'lucide-react'
import { Helmet } from 'react-helmet'

export const Contacts = () => {
  return (
    <div className='bg-secondareBgColor sm:flex-col py-[3%] sm:py-[12%] sm:px-[8%] flex sm:gap-[40px] sm:items-start justify-between px-[6%] rounded-2xl w-full items-center'>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <div className='flex flex-col sm:gap-[10px] gap-[30px]'>
        <p className='font-[600] text-[60px] sm:text-[35px] sm:leading-[50px] leading-[70px]'>
          <span className='text-mainBgColor'>Sip, Savor, Smile.</span> <br />
          <span className='text-[#B0907A] italic'>It’s coffee time!</span>
        </p>
        <div className='flex gap-[20px]'>
          <Twitter className='w-[40px] text-mainBgColor p-2 hover:bg-mainBgColor hover:text-secondareBgColor duration-300 border border-mainBgColor rounded-full h-[40px]' />
          <Instagram className='w-[40px] text-mainBgColor p-2 hover:bg-mainBgColor hover:text-secondareBgColor duration-300 border border-mainBgColor rounded-full h-[40px]' />
          <Facebook className='w-[40px] text-mainBgColor p-2 hover:bg-mainBgColor hover:text-secondareBgColor duration-300 border border-mainBgColor rounded-full h-[40px]' />
        </div>
      </div>
      <div className='w-[40%] sm:w-full flex flex-col gap-6'>
        <p className='text-2xl font-semibold text-mainBgColor'>Contact Us</p>
        <div className='flex text-mainBgColor items-center gap-4'>
          <MapPin />
          <p className='text-lg'>Dushanbe, Tajikistan</p>
        </div>
        <div className='flex text-mainBgColor  items-center gap-4'>
          <Phone />
          <p className='text-lg'>+992-93-753-0592</p>
        </div>
        <div className='flex text-mainBgColor items-center gap-4'>
          <Clock3 />
          <p className='text-lg'>Mon - Fri: 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  )
}
