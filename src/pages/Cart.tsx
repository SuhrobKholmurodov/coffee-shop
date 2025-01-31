import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'
import { Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearItems, minusItem, removeItem } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'
import { CartItems, CustomDialog, EmptyCart } from '../components'

export const Cart = () => {
  const [open, setOpen] = useState(false)
  const [openDialogClearItems, setOpenDialogClearItems] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null)
  const dispatch = useDispatch()

  const cartItems = useSelector(selectCart)

  const handleClickOpen = (item: CartItem) => {
    setSelectedItem(item)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedItem(null)
  }

  const handleOpenDialog = () => {
    setOpenDialogClearItems(true)
  }

  const handleCloseDialog = () => {
    setOpenDialogClearItems(false)
  }

  const handleConfirmDelete = () => {
    dispatch(clearItems())
    setOpenDialogClearItems(false)
  }

  const totalPrice = cartItems.items.reduce(
    (total, item) => total + item.price * item.count,
    0
  )
  const totalCount = cartItems.items.reduce(
    (total, item) => total + item.count,
    0
  )

  const categoryNames: string[] = ['coffees', 'teas', 'desserts']

  const categoryCounts = cartItems.items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.count
    return acc
  }, {} as Record<string, number>)

  const onClickMinus = (id: string, count: number) => {
    if (count > 1) {
      dispatch(minusItem(id))
    }
  }

  const onClickPlus = (id: string) => {
    const item = cartItems.items.find(i => i.id.toString() === id.toString())
    if (item) {
      dispatch(addItem({ ...item, count: item.count + 1 }))
    } else {
      console.error(`Item with id ${id} not found`)
    }
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems.items))
  }, [cartItems.items])

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-1'>
          <CartItems
            cartItems={cartItems.items}
            onClickMinus={onClickMinus}
            onClickPlus={onClickPlus}
            handleClickOpen={handleClickOpen}
          />
          <div className='right bg-gray-100 rounded-lg sm:relative sm:top-4 fixed top-[100px] right-[3%] sm:right-0 flex flex-col sm:p-0 p-4'>
            <div className='flex flex-col gap-[8px] mb-4 rounded-lg p-4 shadow-sm'>
              <div className='flex items-center mb-[15px] justify-between'>
                <h3 className='text-lg font-bold'>Order summary</h3>
                <div
                  onClick={handleOpenDialog}
                  className='flex font-[600] hover:cursor-pointer text-red-500 items-center gap-2'
                >
                  <p>Delete all the cart</p>
                  <Trash2 />
                </div>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-gray-500 font-[600] whitespace-nowrap'>
                  Total price:
                </p>
                <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
                <p className='font-semibold'>{totalPrice}$</p>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-gray-500 font-[600]'>
                  Total number of items:
                </p>
                <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
                <p className='font-semibold'>{totalCount}</p>
              </div>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div
                  key={category}
                  className='flex items-center justify-between w-full'
                >
                  <p className='text-gray-500 font-[600]'>
                    From {categoryNames[Number(category)]} category:
                  </p>
                  <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
                  <p className='font-semibold'> {count}</p>
                </div>
              ))}
            </div>
            <div className='order-form p-4 shadow-sm rounded-lg'>
              <h3 className='text-xl font-semibold mb-4'>Place an order</h3>
              <input
                type='text'
                placeholder='Your name'
                className='border border-gray-300 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
              />
              <input
                type='text'
                placeholder='Your phone number'
                className='border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
              />
              <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all'>
                🚀 Place an order
              </button>
            </div>
          </div>
        </div>
      )}
      <CustomDialog
        open={openDialogClearItems}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title='Delete all items?'
        description='Are you sure you want to delete all items from the cart?'
      />
      <CustomDialog
        open={open}
        onClose={handleClose}
        onConfirm={() => {
          if (selectedItem?.id !== undefined) {
            dispatch(removeItem(selectedItem.id.toString()))
          }
          handleClose()
        }}
        title='Delete item?'
        description={`Are you sure you want to delete ${selectedItem?.name}?`}
      />
    </div>
  )
}
