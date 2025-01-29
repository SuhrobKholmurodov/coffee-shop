import { useSelector } from 'react-redux'
import { selectPizzaData } from '../redux/products/selectors'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { fetchProducts } from '../redux/products/asyncActions'
import { Products } from '../redux/products/types'
import { useAppDispatch } from '../redux/store'
import { HomeIcon } from 'lucide-react'
import { Rating } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'

const categoryNames = ['coffees', 'teas', 'desserts']

export const ProductDetails = () => {
  const { items, status } = useSelector(selectPizzaData)
  const { id, category } = useParams()
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<Products | null>(null)

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

  if (status === 'loading' || !items.length) {
    return <div className='text-center'>Загрузка...</div>
  }

  if (!product) {
    return <div className='text-red-500 text-center'>Продукт не найден.</div>
  }

  return (
    <div>
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
      <div className='flex items-center sm:flex-col justify-between'>
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
          <p className='text-lg font-semibold text-gray-800 dark:text-white mt-4'>
            ${product.price}
          </p>
        </div>
      </div>
      <div className='w-full sm:w-auto rounded-lg shadow-lg'>
        {product.reviews && product.reviews.length > 0 ? (
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
              >
                <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
                  Отзывы: {product.reviews.length}
                </h2>
              </AccordionSummary>
              <AccordionDetails>
                <div className='mt-[-15px]'>
                  {product.reviews.map((review, index) => (
                    <div key={index} className='grid border-t grid-cols-2 border-b py-4'>
                      <div className='flex items-start sm:items-center'>
                        <img
                          src={review.profilePhoto}
                          alt={review.name}
                          className='w-12 h-12 border sm:w-8 sm:h-8 rounded-full mr-4'
                        />
                        <div>
                          <Typography variant='body1' className='font-semibold'>
                            {review.name}
                          </Typography>
                          <Typography variant='body1' className='font-semibold'>
                            {review.recomendation === true ? (
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
                      <div>
                        <div className='flex flex-col items-end gap-[7px]'>
                          <Rating
                            size='small'
                            name='simple-uncontrolled'
                            readOnly
                            value={review.rating}
                          />
                          <Typography
                            variant='body2'
                            className='text-gray-500 dark:text-gray-300'
                          >
                            {review.date}
                          </Typography>
                        </div>
                      </div>
                      <div className='pl-[62px] sm:pt-[8px] sm:pl-0 col-span-2'>
                        <Typography
                          variant='body2'
                          className='text-gray-600 dark:text-gray-400'
                        >
                          {review.comment}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
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
