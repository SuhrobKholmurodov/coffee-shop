import { X } from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  options: {
    first: string[]
    second: string[]
  }
}

interface ProductDialogProps {
  product: Product | null
  activeFirst: number
  activeSecond: number
  onChangeFirst: (index: number) => void
  onChangeSecond: (index: number) => void
  onClose: () => void
}

export const ProductDialog = ({
  product,
  activeFirst,
  activeSecond,
  onChangeFirst,
  onChangeSecond,
  onClose
}: ProductDialogProps) => {
  if (!product) return null

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 p-[7px] transition-opacity duration-300 ease-in-out flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='bg-mainBgColor p-6 sm:p-2 sm:pt-[20px] sm:pb-[20px] rounded-2xl w-full max-w-lg shadow-xl relative transform transition-transform duration-300 ease-in-out'
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
            <p className='text-gray-600 dark:text-gray-400 text-sm flex-grow overflow-hidden text-ellipsis'>
              {product.description.split(' ').slice(0, 12).join(' ')}
              {product.description.split(' ').length > 20 && (
                <span className='text-blue-500 cursor-pointer'>...more</span>
              )}
            </p>
            <p className='text-lg font-bold text-gray-800 mt-2'>
              ${product.price}
            </p>
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-sm font-semibold mb-2'>Выберите первую опцию:</p>
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

        <div>
          <p className='text-sm font-semibold mb-2'>Выберите вторую опцию:</p>
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
        <button className='mt-6 w-full bg-secondareBgColor text-mainBgColor py-3 rounded-full hover:bg-opacity-90 sm:hover:scale-100 hover:scale-105 hover:shadow-lg transition-transform duration-300'>
          Add to cart
        </button>
      </div>
    </div>
  )
}
