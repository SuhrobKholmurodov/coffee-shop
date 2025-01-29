import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectPizzaData } from '../redux/products/selectors'
import { fetchProducts } from '../redux/products/asyncActions'
import { useAppDispatch } from '../redux/store'
import { ShoppingCart } from 'lucide-react' 
import { Skeleton } from './Skeleteon'

export const ProductList = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)

  useEffect(() => {
    dispatch(
      fetchProducts({ sortBy: 'name', order: 'asc', category: '', search: '' })
    )
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div className='grid grid-cols-4 gap-4'>
        {[...new Array(8)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return <div>Error loading products.</div>
  }

  return (
    <div className='grid grid-cols-4 gap-4'>
      {items.map(el => (
        <div
          key={el.id}
          className='border flex flex-col p-4 rounded-2xl border-secondareBgColor h-[400px]'
        >
          <div className='flex justify-center mb-2'>
            <img
              className='h-[150px] w-[150px] object-cover'
              src={el.imageUrl}
              alt={el.name}
            />
          </div>
          <h2 className='text-lg font-semibold'>{el.name}</h2>
          <p className='text-gray-600 flex-grow'>{el.description}</p>
          <p className='font-bold'>Price: ${el.price}</p>
          <button className='mt-auto flex items-center bg-mainBgColor text-white py-2 rounded-full hover:bg-opacity-80 transition duration-300'>
            <ShoppingCart className='mr-2' size={20} />
            Add to cart
          </button>
        </div>
      ))}
    </div>
  )
}
