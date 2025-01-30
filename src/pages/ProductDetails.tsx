import { useSelector } from 'react-redux'
import { selectPizzaData } from '../redux/products/selectors'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { fetchProducts } from '../redux/products/asyncActions'
import { Products } from '../redux/products/types'
import { useAppDispatch } from '../redux/store'
import { HomeIcon, ShoppingBasket } from 'lucide-react'
import { Rating } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Helmet } from 'react-helmet'

const categoryNames = ['coffees', 'teas', 'desserts']

interface ProductDetailsProps {
  activeFirst: number
  activeSecond: number
  onChangeFirst: (index: number) => void
  onChangeSecond: (index: number) => void
}

export const ProductDetails = ({
  activeFirst,
  activeSecond,
  onChangeFirst,
  onChangeSecond
}: ProductDetailsProps) => {
  const { items, status } = useSelector(selectPizzaData)
  const { id, category } = useParams()
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<Products | null>(null)
  const [quantity, setQuantity] = useState(1)

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
                  onClick={() => onChangeFirst(index)}
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
                  onClick={() => onChangeSecond(index)}
                >
                  <p className='font-[600] text-[16px]'>{el}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-between sm:mb-4'>
            <p className='text-lg font-semibold text-gray-800 dark:text-white mt-4'>
              ${product.price}
            </p>
            <div className='flex items-center mt-4'>
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className='bg-gray-200 rounded-l-full px-3 py-2 text-lg hover:bg-gray-300 transition duration-200'
              >
                -
              </button>
              <span className='mx-3 text-lg'>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='bg-gray-200 rounded-r-full px-3 py-2 text-lg hover:bg-gray-300 transition duration-200'
              >
                +
              </button>
              <p className='text-lg font-semibold text-gray-800 dark:text-white'>
                ${product.price * quantity}
              </p>
              <button className='ml-4 flex items-center justify-center gap-[5px] px-4 bg-secondareBgColor text-mainBgColor py-3 rounded-full hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
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
