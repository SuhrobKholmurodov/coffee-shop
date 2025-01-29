import { useDispatch } from 'react-redux'
import { ProductList } from '../components'
import cofeecat from '../assets/icons/coffeecat.svg'
import desertcat from '../assets/icons/desertcat.svg'
import teacat from '../assets/icons/teacat.svg'
import { useSelector } from 'react-redux'
import { selectFilter } from '../redux/filter/selectors'
import { setCategoryId } from '../redux/filter/slice'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export const Home = () => {
  const dispatch = useDispatch()
  const { categoryId } = useSelector(selectFilter)

  const categories = [
    { name: 'Coffee', icon: cofeecat },
    { name: 'Tea', icon: teacat },
    { name: 'Desert', icon: desertcat }
  ]

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
          className='text-[60px] sm:text-[30px] pb-[3%] font-[600] text-center'
        >
          Behind each of our cups hides an{' '}
          <span className='text-[#B0907A] leading-[1px] italic'>
            amazing <br /> surprise
          </span>
        </p>
      </div>
      <div className='flex items-center justify-center gap-5 sm:justify-between mb-4'>
        {categories.map((el, index) => (
          <div
            key={el.name}
            className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px]
              ${
                categoryId === index
                  ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                  : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
              }
              rounded-[100px] h-11 pl-2 pr-6 hover:cursor-pointer`}
            onClick={() => onChangeCategory(index)}
          >
            <div
              className={`${
                categoryId === index
                  ? 'bg-mainBgColor border-mainBgColor'
                  : 'bg-[#b4a89e] border-[#b4a89e]'
              } border-2 group-hover:bg-mainBgColor group-hover:border-mainBgColor rounded-full p-[2px]`}
            >
              <img src={el.icon} alt={el.name} width='20' height='20' />
            </div>
            <p className='font-[600] text-[16px]'>{el.name}</p>
          </div>
        ))}
      </div>
      <ProductList categoryId={categoryId} />{' '}
    </div>
  )
}
