import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'
import { Minus, Plus, Trash2 } from 'lucide-react'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className='flex sm:max-w-full items-center max-w-[50%] gap-4 sm:gap-2 p-4 sm:px-2 border-b-2 border-gray-900'
            >
              <div>
                <div className='w-[250px] sm:w-[150px] sm:h-[150px] h-[250px]'>
                  <img
                    className='object-cover w-full h-full rounded-md'
                    src={item.imageUrl}
                    alt={item.name}
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <div>
                  <div className='sm:flex sm:flex-row-reverse sm:items-start sm:justify-between'>
                    <p className='text-[21px] font-[700] text-gray-500'>
                      {item.price}$.
                    </p>
                    <h3 className='text-[22px] sm:text-[19px] font-semibold'>
                      {item.name}
                    </h3>
                  </div>
                  <div className='flex sm:flex-wrap-reverse sm:mt-2 mt-3 sm:gap-3 items-center gap-[20px]'>
                    <p className='sm:hidden'>Опции:</p>
                    <p className='px-3 py-[3px] sm:px-2 sm:py-1 text-white rounded-full bg-gray-600'>
                      {item.options.first}
                    </p>
                    <p className='px-3 py-[3px] text-white rounded-full bg-gray-600'>
                      {item.options.second}
                    </p>
                  </div>
                </div>
                <div className='flex mt-4 w-full items-center justify-between'>
                  <div className='flex gap-2 items-center'>
                    <button className='p-2 sm:p-1 bg-gray-200 rounded-full hover:bg-gray-300'>
                      <Minus />
                    </button>
                    <p className='text-xl text-gray-700'>{item.count}</p>
                    <button className='p-2 sm:p-1 bg-gray-200 rounded-full hover:bg-gray-300'>
                      <Plus />
                    </button>
                  </div>
                  <p className='text-xl sm:pl-2 text-gray-700'>
                    {item.price * item.count}$
                  </p>
                  <button className='p-2 text-white rounded-md flex items-center space-x-2'>
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
