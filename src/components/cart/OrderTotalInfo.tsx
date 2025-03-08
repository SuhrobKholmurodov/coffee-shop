import { CartItem } from '@/redux/cart/types'
import { calculateTotalCount } from '@/utils'
import { Trash2 } from 'lucide-react'
import { AnimatedNumber } from '../common'

interface OrderTotalInfoProps {
  cartItems: CartItem[]
  categoryNames: string[]
  onDeleteAll: () => void
}

export const OrderTotalInfo = ({
  cartItems,
  categoryNames,
  onDeleteAll
}: OrderTotalInfoProps) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  )
  const totalCount = calculateTotalCount(cartItems)
  const categoryCounts = cartItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.count
    return acc
  }, {} as Record<string, number>)

  return (
    <div className='flex flex-col gap-[8px] mb-4 rounded-lg p-4 shadow-sm'>
      <div className='flex items-center mb-[15px] justify-between'>
        <h3 className='text-lg font-bold'>Order summary</h3>
        <div
          onClick={onDeleteAll}
          className='flex hover:text-red-600 font-[600] hover:cursor-pointer text-red-500 items-center gap-2'
        >
          <p>Delete all items</p>
          <Trash2 />
        </div>
      </div>
      <div className='flex items-center justify-between w-full'>
        <p className='text-gray-500 font-[600] whitespace-nowrap'>
          Total price:
        </p>
        <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
        <p className='font-semibold'>
          <AnimatedNumber value={totalPrice} />$
        </p>
      </div>
      <div className='flex items-center justify-between w-full'>
        <p className='text-gray-500 font-[600]'>Total number of items:</p>
        <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
        <p className='font-semibold'>
          <AnimatedNumber value={totalCount} />
        </p>
      </div>
      {Object.entries(categoryCounts).map(([category, count]) => (
        <div
          key={category}
          className='flex items-center justify-between w-full'
        >
          <p className='text-gray-500 font-[600]'>
            From {categoryNames[Number(category)]} category:
          </p>
          <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
          <p className='font-semibold'>
            <AnimatedNumber value={count} />
          </p>
        </div>
      ))}
    </div>
  )
}
