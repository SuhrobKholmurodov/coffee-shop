// src/components/ProductList.tsx
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectPizzaData } from '../redux/products/selectors'
import { fetchProducts } from '../redux/products/asyncActions'
import { useAppDispatch } from '../redux/store'

export const ProductList = () => {
  const dispatch = useAppDispatch()
  const { items, status } = useSelector(selectPizzaData)

  useEffect(() => {
    dispatch(
      fetchProducts({ sortBy: 'name', order: 'asc', category: '', search: '' })
    )
  }, [dispatch])

  if (status === 'loading') {
    return <div className='flex'>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error loading products.</div>
  }

  return (
    <div className=' grid grid-cols-4 gap-4'>
      {items.map(el => (
        <div key={el.id} className='el-card border p-4 rounded shadow'>
          <img
            className='h-[150px] w-[150px] object-cover'
            src={el.imageUrl}
            alt={el.name}
          />
          <h2 className='text-lg font-semibold'>{el.name}</h2>
          <p className='text-gray-600'>{el.description}</p>
          <p className='font-bold'>Price: ${el.price}</p>
        </div>
      ))}
    </div>
  )
}
