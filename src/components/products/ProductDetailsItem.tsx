import { useDispatch, useSelector } from 'react-redux'
import { ShoppingBasket } from 'lucide-react'
import { useState } from 'react'
import { Products } from '@/redux/products/types'
import { selectCartItemById } from '@/redux/cart/selectors'
import { addItem, minusItem } from '@/redux/cart/slice'
import { ShowToast } from '../common'
import { ItemCounter } from '../cart'

interface ProductDetailsItemProps {
  product: Products
}

export const ProductDetailsItem = ({ product }: ProductDetailsItemProps) => {
  const dispatch = useDispatch()
  const [activeFirst, setActiveFirst] = useState(0)
  const [activeSecond, setActiveSecond] = useState(0)

  const cartItem = useSelector(selectCartItemById(Number(product.id)))
  const count = cartItem?.count || 0

  const handleChangeFirst = (index: number) => {
    setActiveFirst(index)
  }

  const handleChangeSecond = (index: number) => {
    setActiveSecond(index)
  }

  const onClickAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      count: 1,
      category: product.category,
      imageUrl: product.imageUrl,
      options: {
        first: [product.options.first[activeFirst]],
        second: [product.options.second[activeSecond]]
      }
    }
    dispatch(addItem(item))
    ShowToast({ message: `${product.name} was added to cart!` })
  }

  const onClickMinus = () => {
    if (!cartItem || count <= 1) return
    dispatch(minusItem(product.id.toString()))
  }

  return (
    <div
      id='products'
      className='flex items-start sm:flex-col w-auto justify-between'
    >
      <div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className='h-[400px] sm:h-[300px] sm:w-[400px] w-[600px] object-fill rounded-lg mb-4'
        />
      </div>
      <div>
        <h1 className='text-2xl font-bold text-gray-800 dark:text-white'>
          {product.name}
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-2'>
          {product.description}
        </p>
        <div className='mt-4'>
          <p className='text-sm font-semibold mb-4'>Выберите первую опцию:</p>
          <div className='flex gap-[16px] sm:gap-[10px] flex-wrap mb-4'>
            {product.options.first.map((el, index) => (
              <div
                key={el}
                className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] ${
                  activeFirst === index
                    ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                    : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                } rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
                onClick={() => handleChangeFirst(index)}
              >
                <p className='font-[600] text-[16px]'>{el}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-8'>
          <p className='text-sm font-semibold mb-4'>Выберите вторую опцию:</p>
          <div className='flex gap-[16px] sm:gap-[10px] flex-wrap'>
            {product.options.second.map((el, index) => (
              <div
                key={el}
                className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] ${
                  activeSecond === index
                    ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                    : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                } rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
                onClick={() => handleChangeSecond(index)}
              >
                <p className='font-[600] text-[16px]'>{el}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center sm:flex-col sm:items-start justify-between mt-4 sm:mt-4 sm:mb-4'>
          <p className='text-lg sm:hidden font-semibold text-gray-800 dark:text-white'>
            ${product.price}
          </p>
          <div className='flex items-center justify-between gap-12 sm:gap-4 sm:w-full mt-4 sm:mt-2'>
            {count >= 1 && (
              <ItemCounter
                count={count}
                onMinus={onClickMinus}
                onAdd={onClickAdd}
                price={product.price}
              />
            )}
            <button
              onClick={onClickAdd}
              style={{ width: count < 1 ? '100%' : 'auto' }}
              className='ml-4 sm:ml-0 flex items-center justify-center gap-[5px] sm:py-2 px-4 bg-secondareBgColor text-mainBgColor py-3 rounded-full hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'
            >
              <ShoppingBasket size={20} />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
