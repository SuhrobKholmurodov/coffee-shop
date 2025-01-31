import { Trash2 } from 'lucide-react'

interface OrderSummaryProps {
  totalPrice: number
  totalCount: number
  categoryCounts: Record<string, number>
  categoryNames: string[]
  onDeleteAll: () => void
}

export const OrderSummary = ({
  totalPrice,
  totalCount,
  categoryCounts,
  categoryNames,
  onDeleteAll
}: OrderSummaryProps) => {
  return (
    <div className='right bg-gray-100 rounded-lg sm:relative sm:top-4 fixed top-[100px] right-[3%] sm:right-0 flex flex-col sm:p-0 p-4'>
      <div className='flex flex-col gap-[8px] mb-4 rounded-lg p-4 shadow-sm'>
        <div className='flex items-center mb-[15px] justify-between'>
          <h3 className='text-lg font-bold'>Order summary</h3>
          <div
            onClick={onDeleteAll}
            className='flex font-[600] hover:cursor-pointer text-red-500 items-center gap-2'
          >
            <p>Delete all the cart</p>
            <Trash2 />
          </div>
        </div>
        <div className='flex items-center justify-between w-full'>
          <p className='text-gray-500 font-[600] whitespace-nowrap'>
            Total price:
          </p>
          <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
          <p className='font-semibold'>{totalPrice}$</p>
        </div>
        <div className='flex items-center justify-between w-full'>
          <p className='text-gray-500 font-[600]'>Total number of items:</p>
          <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
          <p className='font-semibold'>{totalCount}</p>
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
            <p className='font-semibold'> {count}</p>
          </div>
        ))}
      </div>
      <div className='order-form p-4 shadow-sm rounded-lg'>
        <h3 className='text-xl font-semibold mb-4'>Place an order</h3>
        <input
          type='text'
          placeholder='Your name'
          className='border border-gray-300 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
        />
        <input
          type='text'
          placeholder='Your phone number'
          className='border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
        />
        <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all'>
          🚀 Place an order
        </button>
      </div>
    </div>
  )
}
