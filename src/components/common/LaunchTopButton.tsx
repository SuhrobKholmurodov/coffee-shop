import { Rocket } from 'lucide-react'

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
        hidden sm:flex sm:items-center sm:justify-center
        fixed right-7 bottom-16 
        w-12 h-12 rounded-full shadow-md
        bg-slate-800 hover:bg-slate-700
        focus:outline-none focus:ring-2 focus:ring-slate-400
        transition-all duration-300
        dark:bg-slate-900 dark:hover:bg-slate-800
        dark:focus:ring-slate-600
        group
      `}
    >
      <Rocket
        size={24}
        className='text-white transition-transform 
                   group-hover:scale-110 group-hover:rotate-6'
      />
    </button>
  )
}