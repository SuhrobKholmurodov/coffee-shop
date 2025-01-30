import { useSelector } from 'react-redux'
import { selectProduct } from '../redux/products/selectors'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { fetchProducts } from '../redux/products/asyncActions'
import { Products } from '../redux/products/types'
import { useAppDispatch } from '../redux/store'
import { HomeIcon, Minus, Plus, ShoppingBasket } from 'lucide-react'
import { Rating } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Helmet } from 'react-helmet'
import { addItem, minusItem } from '../redux/cart/slice'
import { selectCartItemById } from '../redux/cart/selectors'

const categoryNames = ['coffees', 'teas', 'desserts']

export const ProductDetails = () => {
  const [activeFirst, setActiveFirst] = useState(0)
  const [activeSecond, setActiveSecond] = useState(0)

  const handleChangeFirst = (index: number) => {
    setActiveFirst(index)
  }

  const handleChangeSecond = (index: number) => {
    setActiveSecond(index)
  }

  const { items, status } = useSelector(selectProduct)
  const { id, category } = useParams()
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<Products | null>(null)
  const cartItem = useSelector(selectCartItemById(Number(id)))

  const [count, setCount] = useState(cartItem?.count || 0)

  useEffect(() => {
    if (!items.length && status !== 'loading') {
      dispatch(
        fetchProducts({
          sortBy: 'name',
          order: 'asc',
          category: 0,
          search: ''
        })
      )
    }
  }, [dispatch, items.length, status])

  useEffect(() => {
    if (!items.length || status === 'loading') return
    const foundProduct = items.find(
      el =>
        String(el.id) === String(id) && categoryNames[el.category] === category
    )
    setProduct(foundProduct || null)
  }, [items, id, category, status])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (status === 'loading' || !items.length) {
    return <div className='text-center'>Загрузка...</div>
  }

  if (!product) {
    return <div className='text-red-500 text-center'>Продукт не найден.</div>
  }

  const onClickAdd = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      count: count,
      category: product.category,
      imageUrl: product.imageUrl,
      options: {
        first: [product.options.first[activeFirst]],
        second: [product.options.second[activeSecond]]
      }
    }
    dispatch(addItem(item))
    setCount(count + 1)
  }
  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(product.id.toString()))
      setCount(count - 1)
    }
  }

  return (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div role='presentation'>
        <Breadcrumbs aria-label='breadcrumb'>
          <NavLink to={'/'}>
            <HomeIcon fontSize='12px' />
          </NavLink>
          <Typography sx={{ color: 'text.primary' }}>
            {categoryNames[product.category].charAt(0).toUpperCase() +
              categoryNames[product.category].slice(1)}
          </Typography>
          <Typography sx={{ color: 'text.primary' }}>{product.name}</Typography>
        </Breadcrumbs>
      </div>
      <div className='flex items-start sm:flex-col w-auto justify-between'>
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className=' h-[400px] sm:h-[300px] sm:w-[400px] w-[600px] object-fill rounded-lg mb-4'
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
                  className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] 
                      ${
                        activeFirst === index
                          ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                          : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                      }
                      rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
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
                  className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] 
                      ${
                        activeSecond === index
                          ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                          : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                      }
                      rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
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
            <div className='flex items-center justify-between gap-12 sm:w-full mt-4 sm:mt-2'>
              <div className='flex gap-4 items-center'>
                <button
                  onClick={onClickMinus}
                  className='p-2 sm:p-1 bg-[#c6c5c5] rounded-full'
                >
                  <Minus />
                </button>
                <p className='text-xl text-gray-700'>{count}</p>
                <button
                  onClick={onClickAdd}
                  className='p-2 sm:p-1 bg-[#c6c5c5] rounded-full'
                >
                  <Plus />
                </button>
              </div>
              <p className='text-xl sm:pl-2 text-gray-700'>
                {product.price * count} $
              </p>
              <button
                onClick={onClickAdd}
                className='ml-4 flex items-center justify-center gap-[5px] px-4 bg-secondareBgColor text-mainBgColor py-3 rounded-full hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'
              >
                <ShoppingBasket size={20} />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-auto rounded-lg shadow-lg'>
        {product.reviews && product.reviews.length > 0 ? (
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              <h2 className='text-xl font-semibold text-gray-800 dark:text-white flex items-center'>
                Отзывы: {product.reviews.length}
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <div className='divide-y'>
                {product.reviews.map((review, index) => (
                  <div key={index} className='py-4'>
                    <div className='flex justify-between items-start sm:items-center'>
                      <div className='flex items-center'>
                        <img
                          src={review.profilePhoto}
                          alt={review.name}
                          className='w-12 h-12 sm:w-10 sm:h-10 rounded-full border mr-4'
                        />
                        <div>
                          <Typography variant='body1' className='font-semibold'>
                            {review.name}
                          </Typography>
                          <Typography variant='body1' className='font-semibold'>
                            {review.recomendation ? (
                              <span className='text-green-600'>
                                Рекомендует
                              </span>
                            ) : (
                              <span className='text-red-600'>
                                Не рекомендует
                              </span>
                            )}
                          </Typography>
                        </div>
                      </div>
                      <div className='flex flex-col items-end gap-1'>
                        <Rating size='small' readOnly value={review.rating} />
                        <Typography
                          variant='body2'
                          className='text-gray-500 dark:text-gray-300'
                        >
                          {review.date}
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      variant='body2'
                      className='text-gray-600 dark:text-gray-400 pl-16 sm:pl-[55px]'
                    >
                      {review.comment}
                    </Typography>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Typography
            variant='body2'
            className='text-gray-600 dark:text-gray-400'
          >
            Нет отзывов.
          </Typography>
        )}
      </div>
    </div>
  )
}
