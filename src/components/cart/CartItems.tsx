import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ItemCounter } from './ItemCounter'
import { categoryNames } from '@/constants'
import { CartItem } from '@/redux/cart/types'
import { addItem, minusItem } from '@/redux/cart/slice'

interface CartItemsProps {
  cartItems: CartItem[]
  handleClickOpen: (item: CartItem) => void
}

export const CartItems = ({ cartItems, handleClickOpen }: CartItemsProps) => {
  const dispatch = useDispatch()
  const onClickMinus = (id: string, count: number) => {
    if (count > 1) {
      dispatch(minusItem(id))
    }
  }

  const onClickPlus = (id: string) => {
    const item = cartItems.find(i => i.id.toString() === id.toString())
    if (item) {
      dispatch(addItem({ ...item, count: item.count + 1 }))
    }
  }

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
              <div className='sm:flex sm:flex-row-reverse sm:items-start sm:justify-between w-full'>
                <p className='text-[21px] font-[700] text-gray-500 ml-auto'>
                  {item.price}$
                </p>
                <h3 className='text-[22px] sm:text-[19px] font-semibold flex-1 min-w-0 truncate'>
                  {item.name}
                </h3>
              </div>
              <div className='flex sm:flex-wrap-reverse sm:mt-2 mt-3 sm:gap-3 items-center gap-[20px]'>
                <p className='sm:hidden text-xl'>Options:</p>
                <p className='px-3 py-[3px] sm:px-2 sm:py-1 text-white rounded-full bg-gray-600'>
                  {item.options?.first}
                </p>
                <p className='px-3 py-[3px] text-white rounded-full bg-gray-600'>
                  {item.options?.second}
                </p>
              </div>
            </div>
            <div className='flex w-[400px] mt-4 sm:w-full items-center justify-between'>
              <ItemCounter
                count={item.count}
                onMinus={() => onClickMinus(item.id.toString(), item.count)}
                onAdd={() => onClickPlus(item.id.toString())}
                price={item.price}
              />
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
