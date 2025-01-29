import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectPizzaData } from '../redux/products/selectors'
import { fetchProducts } from '../redux/products/asyncActions'
import { useAppDispatch } from '../redux/store'
import { ShoppingCart } from 'lucide-react'
import { Products } from '../redux/products/types'
import { Skeleton } from './Skeleteon'
import { ProductDialog } from './ProductDialog'

export const ProductList = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)
  const [selectedProduct, setSelectedProduct] = useState<null | Products>(null)
  const [activeFirst, setactiveFirst] = useState(0)
  const [activeSecond, setactiveSecond] = useState(0)

  useEffect(() => {
    dispatch(
      fetchProducts({ sortBy: 'name', order: 'asc', category: '', search: '' })
    )
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div className='grid grid-cols-4 sm:grid-cols-1 gap-6'>
        {[...new Array(8)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className='text-red-500 text-center'>Ошибка загрузки продуктов.</div>
    )
  }

  return (
    <div className='grid grid-cols-4 sm:grid-cols-1 gap-6'>
      {items.map(el => (
        <div
          key={el.id}
          className='border border-secondareBgColor p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-[420px]'
        >
          <div className='flex justify-center mb-3'>
            <img
              className='h-[160px] w-[160px] object-cover'
              src={el.imageUrl}
              alt={el.name}
            />
          </div>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
            {el.name}
          </h2>
          <p className='text-gray-600 dark:text-gray-400 text-sm flex-grow overflow-hidden text-ellipsis'>
            {el.description}
          </p>
          <p className='font-bold text-gray-800 dark:text-white text-lg mt-2'>
            ${el.price}
          </p>
          <button
            className='mt-auto flex items-center justify-center bg-secondareBgColor text-mainBgColor py-2 rounded-full hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-transform duration-300'
            onClick={() => {
              setactiveFirst(0)
              setactiveSecond(0)
              setSelectedProduct(el)
            }}
          >
            <ShoppingCart className='mr-2' size={20} />
            Add to cart
          </button>
        </div>
      ))}

      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          activeFirst={activeFirst}
          activeSecond={activeSecond}
          onChangeFirst={setactiveFirst}
          onChangeSecond={setactiveSecond}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
