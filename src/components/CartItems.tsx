import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CartItem } from '../redux/cart/types'

interface CartItemsProps {
  cartItems: CartItem[]
  onClickMinus: (id: string, count: number) => void
  onClickPlus: (id: string) => void
  handleClickOpen: (item: CartItem) => void
}

export const CartItems = ({
  cartItems,
  onClickMinus,
  onClickPlus,
  handleClickOpen
}: CartItemsProps) => {
  const categoryNames: string[] = ['coffees', 'teas', 'desserts']

  return (
    <div className='left mb-[-35px] sm:mb-[-23px]'>
      {cartItems.map((item: CartItem) => (
        <div
          key={item.id}
          className='flex sm:max-w-full items-center gap-4 sm:gap-2 p-4 sm:px-2 border-b-2 border-gray-900'
        >
          <div>
            <div className='w-[250px] sm:w-[150px] sm:h-[150px] h-[250px]'>
              <Link to={`/${categoryNames[item.category]}/${item.id}`}>
                <img
                  className='object-cover w-full h-full rounded-md'
                  src={item.imageUrl}
                  alt={item.name}
                />
              </Link>
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
                <p className='sm:hidden'>Options:</p>
                <p className='px-3 py-[3px] sm:px-2 sm:py-1 text-white rounded-full bg-gray-600'>
                  {item.options.first}
                </p>
                <p className='px-3 py-[3px] text-white rounded-full bg-gray-600'>
                  {item.options.second}
                </p>
              </div>
            </div>
            <div className='flex w-[400px] mt-4 sm:w-full items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <button
                  onClick={() => onClickMinus(item.id.toString(), item.count)}
                  disabled={item.count === 1}
                  style={{
                    cursor: item.count === 1 ? 'not-allowed' : 'pointer',
                    backgroundColor: item.count === 1 ? '#e6e5e5' : '#c6c5c5'
                  }}
                  className='p-2 sm:p-1 rounded-full'
                >
                  <Minus />
                </button>
                <p className='text-xl text-gray-700'>{item.count}</p>
                <button
                  onClick={() => onClickPlus(item.id.toString())}
                  className='p-2 sm:p-1 bg-[#c6c5c5] rounded-full'
                >
                  <Plus />
                </button>
              </div>
              <p className='text-xl sm:pl-2 text-gray-700'>
                {item.price * item.count}$
              </p>
              <button
                onClick={() => handleClickOpen(item)}
                className='p-2 text-red-800 rounded-md flex items-center space-x-2'
              >
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
