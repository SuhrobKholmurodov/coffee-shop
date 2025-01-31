import { Loader } from 'lucide-react'

export const LoadingSpinner = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden text-white'>
      <div className='flex items-center gap-4'>
        <Loader className='size-12 animate-spin' />
        <span className='text-lg font-medium'>Loading...</span>
      </div>
    </div>
  )
}
