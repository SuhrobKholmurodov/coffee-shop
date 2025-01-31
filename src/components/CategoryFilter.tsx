import cofeecat from '../assets/icons/coffeecat.svg'
import desertcat from '../assets/icons/desertcat.svg'
import teacat from '../assets/icons/teacat.svg'

interface CategoryFilter {
  categoryId: number | null
  onChangeCategory: (index: number) => void
}

export const CategoryFilter = ({ categoryId, onChangeCategory }: CategoryFilter) => {
  const categories = [
    { name: 'Coffee', icon: cofeecat },
    { name: 'Tea', icon: teacat },
    { name: 'Desert', icon: desertcat }
  ]

  return (
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
  )
}
