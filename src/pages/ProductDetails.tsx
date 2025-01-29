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
    </div>
  )
}
