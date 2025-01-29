import { X } from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

interface ProductDialogProps {
  product: Product | null
  activeMilk: number
  activeSugar: number
  onChangeMilk: (index: number) => void
  onChangeSugar: (index: number) => void
  onClose: () => void
}

const milks = ['Обычное', 'Соевое', 'Миндальное']
const sugars = ['Без сахара', '1 ложка', '2 ложки']

export const ProductDialog = ({
  product,
  activeMilk,
  activeSugar,
  onChangeMilk,
  onChangeSugar,
  onClose
}: ProductDialogProps) => {
  if (!product) return null

  return (
    <div
      className='fixed inset-0 duration-300 bg-black bg-opacity-50 flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='bg-mainBgColor p-6 sm:p-2 rounded-2xl w-full max-w-lg shadow-xl relative'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-4 right-4 sm:top-3 sm:right-3 text-gray-600 hover:text-gray-900 transition'
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <div className='flex sm:items-center gap-6'>
          <img
            className='w-40 h-40 object-cover rounded-lg'
            src={product.imageUrl}
            alt={product.name}
          />
          <div>
            <h2 className='text-xl font-bold text-gray-800'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p>
            <p className='text-lg font-bold text-gray-800 mt-2'>
              ${product.price}
            </p>
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-sm font-semibold mb-2'>Выберите молоко:</p>
          <div className='flex space-x-4 mb-4'>
            {milks.map((el, index) => (
              <div
                key={el}
                className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] 
                      ${
                        activeMilk === index
                          ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                          : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                      }
                      rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
                onClick={() => onChangeMilk(index)}
              >
                <p className='font-[600] text-[16px]'>{el}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className='text-sm font-semibold mb-2'>Выберите сахар:</p>
          <div className='flex space-x-4'>
            {sugars.map((el, index) => (
              <div
                key={el}
                className={`flex hover:bg-secondareBgColor group duration-300 items-center gap-[5px] border-[1px] 
                      ${
                        activeSugar === index
                          ? 'bg-secondareBgColor border-mainBgColor text-mainBgColor'
                          : 'border-[#C1B6AD] text-black hover:text-mainBgColor'
                      }
                      rounded-[100px] h-11 pl-4 pr-6 sm:px-[15px] hover:cursor-pointer`}
                onClick={() => onChangeSugar(index)}
              >
                <p className='font-[600] text-[16px]'>{el}</p>
              </div>
            ))}
          </div>
        </div>

        <button className='mt-6 w-full bg-secondareBgColor text-mainBgColor py-3 rounded-full hover:bg-opacity-90 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
          Добавить в корзину
        </button>
      </div>
    </div>
  )
}
