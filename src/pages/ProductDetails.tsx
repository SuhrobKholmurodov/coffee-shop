import { useSelector } from 'react-redux'
import { selectProduct } from '../redux/products/selectors'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { HomeIcon } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { categoryNames } from '@/constants'
import { LoadingSpinner, ProductDetailsItem, Reviews } from '@/components'
import { fetchProducts } from '@/services/productsApi'
import { useAppDispatch } from '@/redux/store'
import { Products } from '@/redux/products/types'
import { calculateAverageRating } from '@/utils'

const ProductDetails = () => {
  const { items, status } = useSelector(selectProduct)
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (status === 'loading' || !items.length) {
    return (
      <div className='text-center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!product) {
    return <div className='text-red-500 text-center'>Продукт не найден.</div>
  }

  const averageRating = calculateAverageRating(product.reviews)

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
      <ProductDetailsItem product={product} />
      <Reviews reviews={product.reviews} averageRating={averageRating} />
    </div>
  )
}

export default ProductDetails
