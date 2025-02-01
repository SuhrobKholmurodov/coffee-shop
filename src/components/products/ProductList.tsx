import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Eye, MessageCircle, ShoppingCart } from 'lucide-react'
import { Star } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/store'
import { selectProduct } from '../../redux/products/selectors'
import { Products } from '../../redux/products/types'
import { selectSearchValue } from '../../redux/filter/selectors'
import { selectCart } from '../../redux/cart/selectors'
import { fetchProducts } from '../../redux/products/asyncActions'
import { Skeleton } from './Skeleteon'
import { ProductDialog } from './ProductDialog'
import { categoryNames } from '@/constants'
interface ProductListProps {
  categoryId: number
}

export const ProductList = ({ categoryId }: ProductListProps) => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectProduct)
  const [selectedProduct, setSelectedProduct] = useState<null | Products>(null)
  const [activeFirst, setActiveFirst] = useState(0)
  const [activeSecond, setActiveSecond] = useState(0)
  const searchValue = useSelector(selectSearchValue)
  const cartItems = useSelector(selectCart)

  useEffect(() => {
    dispatch(
      fetchProducts({
        sortBy: 'name',
        order: 'asc',
        category: categoryId,
        search: searchValue
      })
    )
  }, [categoryId, dispatch, searchValue])

  const filteredItems = items.filter(item => item.category === categoryId)

  const calculateAverageRating = (
    reviews: { rating: number }[]
  ): number | string => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
    const average = totalRating / reviews.length
    return average.toFixed(1).replace(/\.0$/, '')
  }

  if (status === 'loading') {
    return (
      <div className='grid grid-cols-4 sm:grid-cols-1 gap-6 sm:gap-[10px]'>
        {[...new Array(4)].map((_, index) => (
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
      {filteredItems.map(el => {
        const cartItem = cartItems.items.find(item => item.id === el.id)
        const count = cartItem?.count || 0
        return (
          <div
            key={el.id}
            className='border border-secondareBgColor p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-[420px]'
          >
            <Link
              to={`/${categoryNames[el.category]}/${el.id}`}
              className='flex justify-center mb-3'
            >
              <img
                className='h-[160px] w-[160px] object-cover'
                src={el.imageUrl}
                alt={el.name}
              />
            </Link>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
              {el.name}
            </h2>
            <p className='text-gray-600 dark:text-gray-400 text-sm flex-grow overflow-hidden text-ellipsis'>
              {el.description.split(' ').slice(0, 10).join(' ')}
              {el.description.split(' ').length > 10 && (
                <Link
                  to={`/${categoryNames[el.category]}/${el.id}`}
                  className='text-blue-500 cursor-pointer'
                >
                  ...more
                </Link>
              )}
            </p>
            <div className='flex flex-col mb-2 justify-between'>
              <p className='font-bold text-gray-800 dark:text-white text-lg mt-2'>
                ${el.price}
              </p>
              <div className='flex items-center justify-between'>
                <Link
                  to={`/${categoryNames[el.category]}/${el.id}`}
                  className='flex items-center text-gray-600 gap-[5px] font-[700]'
                >
                  <MessageCircle />
                  <p>{el.reviews.length}</p> reviews
                </Link>
                <div className='flex items-center text-gray-600 gap-[3px] font-[700]'>
                  <Star className='text-[orange]' sx={{ fontSize: '21px' }} />
                  <p>{calculateAverageRating(el.reviews)}</p>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <Link
                to={`/${categoryNames[el.category]}/${el.id}`}
                className='items-center justify-center bg-blue-600 text-white py-2 px-2 rounded-2xl hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300 hover:bg-blue-600'
              >
                <div className='flex items-center gap-[5px]'>
                  <p>
                    <Eye size={20} />
                  </p>
                  <p>More Details</p>
                </div>
              </Link>
              <button
                className='mt-auto sm:px-[20px] w-full sm:w-auto flex items-center justify-center bg-secondareBgColor text-mainBgColor py-2 rounded-2xl hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'
                onClick={() => {
                  setActiveFirst(0)
                  setActiveSecond(0)
                  setSelectedProduct(el)
                }}
              >
                <ShoppingCart className='mr-2' size={20} />
                {count > 0 ? `${count} in cart` : 'Add to cart'}
              </button>
            </div>
          </div>
        )
      })}
      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          activeFirst={activeFirst}
          activeSecond={activeSecond}
          onChangeFirst={setActiveFirst}
          onChangeSecond={setActiveSecond}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
