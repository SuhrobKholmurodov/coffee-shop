import { Eye, Minus, Plus, ShoppingBasket, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { categoryNames } from '@/constants'
import { Reviews } from '@/redux/products/types'
import { selectCart, selectCartItemById } from '@/redux/cart/selectors'
import { CartItem } from '@/redux/cart/types'
import { addItem, minusItem, removeItem } from '@/redux/cart/slice'
import { ShowToast } from '../common'
import { CustomDialog } from './CustomDialog'
interface Product {
  id: number
  name: string
  description: string
  price: number
  category: number
  imageUrl: string
  options: {
    first: string[]
    second: string[]
  }
  reviews: Reviews[]
}

interface ProductDialogProps {
  product?: Product | null
  activeFirst: number
  activeSecond: number
  onChangeFirst: (index: number) => void
  onChangeSecond: (index: number) => void
  onClose: () => void
}

export const ProductDialog = ({
  product,
  activeFirst,
  activeSecond,
  onChangeFirst,
  onChangeSecond,
  onClose
}: ProductDialogProps) => {
  const dispatch = useDispatch()
  const { items: cartItems } = useSelector(selectCart)
  const isMounted = useRef(false)
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null)
  const cartItem = useSelector(selectCartItemById(Number(product?.id)))
  const count = cartItem?.count || 0

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [cartItems])

  if (!product) return null

  const handleClose = () => {
    setOpen(false)
    setSelectedItem(null)
  }

  const handleDeleteItem = () => {
    if (selectedItem?.id !== undefined) {
      dispatch(removeItem(selectedItem.id.toString()))
      ShowToast({ message: `${selectedItem.name} was deleted` })
    }
    handleClose()
  }

  const onClickAdd = () => {
    const item: CartItem = {
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
    ShowToast({ message: `${item?.name} was added to cart!` })
  }

  const onClickMinus = () => {
    if (!cartItem) return

    if (count === 1) {
      setSelectedItem(cartItem)
      setOpen(true)
    } else {
      dispatch(minusItem(product.id.toString()))
    }
  }

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 p-[7px] transition-opacity duration-300 ease-in-out flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='bg-mainBgColor p-6 sm:p-2 sm:pt-[20px] sm:pb-[20px] rounded-2xl w-full max-w-lg shadow-xl relative transform transition-transform duration-300 ease-in-out'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-4 sm:top-3 sm:right-3 text-gray-600 hover:text-gray-900 transition'
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className='flex sm:items-center gap-6'>
          <img
            className='w-40 h-40 sm:w-[140px] sm:h-[140px] object-cover rounded-lg'
            src={product.imageUrl}
            alt={product.name}
          />
          <div>
            <h2 className='text-xl font-bold text-gray-800'>{product.name}</h2>
            <Link
              to={`/${categoryNames[product.category]}/${product.id}`}
              className='text-gray-600 dark:text-gray-400 text-sm flex-grow overflow-hidden text-ellipsis'
            >
              {product.description.split(' ').slice(0, 10).join(' ')}
              {product.description.split(' ').length > 20 && (
                <span className='text-blue-500 cursor-pointer'>...more</span>
              )}
            </Link>
            <p className='text-lg font-bold text-gray-800 mt-2'>
              ${product.price}
            </p>
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-sm font-semibold mb-2'>
            Choose the first option:{' '}
          </p>
          <div className='flex gap-[16px] sm:gap-[10px] flex-wrap mb-4'>
            {product.options.first.map((el, index) => (
              <div
                key={el}
                className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] 
                      ${
                        activeFirst === index
                          ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                          : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                      }
                      rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
                onClick={() => onChangeFirst(index)}
              >
                <p className='font-[600] sm:font-[500] text-[16px] sm:text-[14px]'>
                  {el}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className='text-sm font-semibold mb-2'>
            Choose the second option:
          </p>
          <div className='flex gap-[16px] sm:gap-[10px] flex-wrap'>
            {product.options.second.map((el, index) => (
              <div
                key={el}
                className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] 
                      ${
                        activeSecond === index
                          ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                          : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                      }
                      rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
                onClick={() => onChangeSecond(index)}
              >
                <p className='font-[600] sm:font-[500] text-[16px] sm:text-[14px]'>
                  {el}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex mt-6 flex-row-reverse items-center gap-[10px]'>
          <button
            onClick={onClickAdd}
            className='w-full flex items-center justify-center gap-[5px] bg-secondareBgColor text-mainBgColor py-3 rounded-full hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'
          >
            <ShoppingBasket size={20} />
            Add to cart
          </button>
          {count >= 1 && (
            <div className='flex gap-[10px] items-center'>
              <button
                onClick={onClickMinus}
                className='border bg-secondareBgColor text-mainBgColor py-3 rounded-2xl px-3 border-gray-500'
              >
                <Minus />
              </button>
              <p className='text-`xl'>{count}</p>
              <Plus />
            </div>
          )}
          <Link
            to={`/${categoryNames[product.category]}/${product.id}`}
            className='flex w-full items-center justify-center bg-[#B0907A] hover:bg-[#9b7e6c] text-white py-3 rounded-full hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'
          >
            <div className='flex items-center gap-[5px]'>
              <p>
                <Eye size={20} />
              </p>
              <p>More Details</p>
            </div>
          </Link>
        </div>
        <CustomDialog
          open={open}
          onClose={handleClose}
          onConfirm={handleDeleteItem}
          title='Delete item?'
          description={
            <div className='flex items-center gap-[5px] flex-wrap'>
              <p> Are you sure you want to delete </p>
              <span style={{ color: '#B0907A', fontWeight: 'bold' }}>
                {selectedItem?.name}
              </span>
              <p>from the cart ?</p>
            </div>
          }
        />
      </div>
    </div>
  )
}
