import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { ShowToast } from '../common/ShowToast'

const orderSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(16, 'Name cannot be greater than 16 characters'),
  phone: z
    .string()
    .min(9, 'Phone number cannot be less than 9 digits')
    .max(15, 'Phone number cannot be greater than 15 digits')
    .refine(val => /^\+?[0-9]+$/.test(val), {
      message: 'Phone number is invalid'
    })
})

type Inputs = z.infer<typeof orderSchema>

export const OrderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    resolver: zodResolver(orderSchema)
  })

  const onSubmit = (data: Inputs) => {
    console.log(data)
    ShowToast({ message: 'Order placed successfully!', type: 'success' })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id='OrderForm'
      className='order-form p-4 shadow-sm w-[500px] sm:w-auto min-w-[300px] rounded-lg'
    >
      <h3 className='text-xl font-semibold mb-4'>Place an order</h3>
      <input
        type='text'
        placeholder='Your name'
        {...register('name')}
        className={`border w-[100%] text-gray-500 border-gray-300 p-3 mb-2 rounded-lg focus:outline-none focus:ring-1 ${
          errors.name
            ? 'border-red-500 focus:ring-red-500'
            : 'focus:ring-blue-500'
        } transition-all`}
      />
      {errors.name && (
        <p className='text-red-500 text-sm mb-2 w-full break-words'>
          {errors.name.message}
        </p>
      )}

      <div
        className={`flex bg-white items-center p-3 mb-2 border border-gray-300 rounded-lg transition-all ${
          errors.phone ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <span className='pr-2 text-gray-500 border-r border-gray-300'>+992</span>
        <input
          type='number'
          placeholder='Your phone number'
          {...register('phone')}
          pattern='\d*'
          className={`w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0 text-gray-500 pl-2 border-none focus:outline-none focus:ring-0`}
        />
      </div>
      {errors.phone && (
        <p className='text-red-500 text-sm mb-2 w-full break-words'>
          {errors.phone.message}
        </p>
      )}

      <button
        type='submit'
        className='w-full bg-blue-600 focus:outline-none text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all'
      >
        🚀 Place an order
      </button>
    </form>
  )
}
