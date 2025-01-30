import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'
import { Minus, Plus, Trash2 } from 'lucide-react'

export const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const categoryNames = ['coffees', 'teas', 'desserts']

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
              className='flex items-center gap-4 p-4 sm:p-2 border-b border-gray-300'
            >
              <div className='w-[250px] h-[250px]'>
                <img
                  className='object-cover w-full h-full rounded-md'
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>
              <div className='grid grid-cols-1'>
                <div>
                  <p className='text-[21px] font-[700] text-gray-500'>
                    {item.price}$.
                  </p>
                  <h3 className='text-lg sm:text-[13px] font-semibold'>
                    {item.name}
                  </h3>
                  <p className='text-sm sm:text-[12px] text-gray-500'>
                    {categoryNames[item.category]}
                  </p>
                  <div className='flex items-center gap-[20px]'>
                    <p>Опции:</p>
                    <p className='px-3 py-[2px] text-white rounded-full bg-gray-600'>
                      {item.options.first}
                    </p>
                    <p className='px-3 py-[2px] text-white rounded-full bg-gray-600'>
                      {item.options.second}
                    </p>
                  </div>
                </div>
                <div className='flex mt-2 items-center gap-[10px] justify-between'>
                  <div className='flex gap-2 items-center'>
                    <button className='p-2 bg-gray-200 rounded-full hover:bg-gray-300'>
                      <Minus />
                    </button>
                    <p className='text-xl text-gray-700'>{item.count}</p>
                    <button className='p-2 bg-gray-200 rounded-full hover:bg-gray-300'>
                      <Plus />
                    </button>
                  </div>
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
