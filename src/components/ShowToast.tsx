import toast from 'react-hot-toast'

interface ShowToastProps {
  message: string
  type?: 'success' | 'error' 
}

export const ShowToast = ({ message, type = 'success' }: ShowToastProps) => {
  if (type === 'success') {
    toast.success(
      <div className='flex items-center'>
        <h4 className='text-[15px] text-center dark:text-mainTextColor'>
          {message}
        </h4>
      </div>
    )
  } else if (type === 'error') {
    toast.error(
      <div className='flex items-center'>
        <h4 className='text-[15px] text-center dark:text-red-500'>
          {message}
        </h4>
      </div>
    )
  }
}
