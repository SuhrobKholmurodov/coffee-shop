import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { CategoryFilter, ProductList } from '@/components'
import { selectCategoryId } from '@/redux/products/selectors' 
import { setCategoryId } from '@/redux/products/slice'

export const Home = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector(selectCategoryId)

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index))
  }

  useEffect(() => {
    if (categoryId === null) {
      dispatch(setCategoryId(0))
    }
  }, [categoryId, dispatch])

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>
        <p
          style={{ lineHeight: '125%' }}
          className='text-[40px] animate__animated animate__zoomInDown sm:text-[23px] pb-[1%] font-[600] text-center'
        >
          Behind each of our cups hides an{' '}
          <span className='text-[#B0907A] leading-[1px] italic'>
            <br className='sm:hidden' />
            amazing surprise
          </span>
        </p>
      </div>
      <CategoryFilter
        categoryId={categoryId}
        onChangeCategory={onChangeCategory}
      />
      <ProductList categoryId={categoryId} />
    </div>
  )
}
