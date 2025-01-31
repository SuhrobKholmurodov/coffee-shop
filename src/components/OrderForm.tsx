import { useState } from 'react'
import { ShowToast } from './ShowToast'

export const OrderForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handlePlaceOrder = () => {
    if (name.trim() !== '' && phone.trim() !== '') {
      ShowToast({ message: 'Order placed successfully!', type: 'success' })
      setName('')
      setPhone('')
    } else {
      ShowToast({ message: 'Please fill in all fields!', type: 'error' })
    }
  }

  return (
    <div id='OrderForm' className='order-form p-4 shadow-sm rounded-lg'>
      <h3 className='text-xl font-semibold mb-4'>Place an order</h3>
      <input
        type='text'
        placeholder='Your name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='border border-gray-300 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
      />
      <input
        type='text'
        placeholder='Your phone number'
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className='border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all'
      />
      <button
        onClick={handlePlaceOrder}
        className='w-full bg-blue-600 focus:outline-none text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all'
      >
        🚀 Place an order
      </button>
    </div>
  )
}
