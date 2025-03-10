import { ChevronUp } from 'lucide-react'

export const LaunchTopButton = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={handleScroll}
      className={`
        fixed sm:right-3 right-[45px] bottom-8 sm:bottom-[70px] flex items-center justify-center
        w-11 h-11 rounded-full
        bg-slate-800 hover:bg-slate-700
        focus:outline-none focus:ring-2 focus:ring-slate-400
        transition-all duration-300
      `}
    >
      <ChevronUp size={24} className='text-white' />
    </button>
  )
}
