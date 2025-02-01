import { Minus, Plus } from 'lucide-react'

interface ItemCounterProps {
  count: number
  onMinus: () => void
  onAdd: () => void
  price?: number
}

export const ItemCounter = ({
  count,
  onMinus,
  onAdd,
  price
}: ItemCounterProps) => {
  return (
    <div className='flex gap-8 sm:gap-2 items-center'>
      <button
        onClick={onMinus}
        disabled={count === 1}
        style={{
          cursor: count === 1 ? 'not-allowed' : 'pointer',
          backgroundColor: count === 1 ? '#e6e5e5' : '#c6c5c5'
        }}
        className='p-2 sm:p-1 rounded-full'
      >
        <Minus />
      </button>
      <p className='text-xl sm:text-lg text-gray-700'>{count}</p>
      <button onClick={onAdd} className='p-2 sm:p-1 bg-[#c6c5c5] rounded-full'>
        <Plus />
      </button>
      {price !== undefined && (
        <p className='text-xl sm:pl-0 sm:text-lg pl-8 text-gray-700'>
          {price * count}$
        </p>
      )}
    </div>
  )
}
