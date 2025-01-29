import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectPizzaData } from '../redux/products/selectors'
import { fetchProducts } from '../redux/products/asyncActions'
import { useAppDispatch } from '../redux/store'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)

  useEffect(() => {
    dispatch(
      fetchProducts({ sortBy: 'name', order: 'asc', category: '', search: '' })
    )
  }, [dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error loading products.</div>
  }

  return (
    <div>
      <h1>Products</h1>
      <div className='product-list'>
        {items.map(el => (
          <div key={el.id} className='el-card'>
            <img className='h-[50px] w-[50px]' src={el.imageUrl} alt={el.name} />
            <h2>{el.name}</h2>
            <p>{el.description}</p>
            <p>Price: ${el.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
