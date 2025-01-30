import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'

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
              <div className='w-20 sm:w-[60px] sm:h-[60px] h-20'>
                <img
                  className='w-full h-full object-cover rounded-md'
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>
              <div className='flex-1 dark:text-mainTextColor'>
                <h3 className='text-lg sm:text-[13px] font-semibold'>
                  {item.name}
                </h3>
                <p className='text-sm sm:text-[12px] text-gray-500'>
                  {categoryNames[item.category]}
                </p>
                <p className='text-sm sm:text-[12px] text-gray-500'>
                  Price: {item.price}$
                </p>
                <p className='text-sm sm:text-[12px] text-gray-500'>
                  Count: {item.count}
                </p>
                <p>
                  Option 1:
                  {item.options.first.join(', ')}
                </p>
                <p>
                  Option 2:
                  {item.options.second.join(', ')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
