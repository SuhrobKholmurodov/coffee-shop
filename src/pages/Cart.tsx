import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'

export const Cart = () => {
  const [open, setOpen] = useState(false)
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

  const totalPrice = cartItems.items.reduce(
    (total, item) => total + item.price * item.count,
    0
  )
  const totalCount = cartItems.items.reduce(
    (total, item) => total + item.count,
    0
  )

  const categoryNames: string[] = ['Coffees', 'Teas', 'Desserts']

  const categoryCounts = cartItems.items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.count
    return acc
  }, {} as Record<string, number>)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems.items))
  }, [cartItems.items])

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className='grid grid-cols-2 sm:grid-cols-1'>
        <div className='left'>
          {cartItems.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.items.map((item: CartItem) => (
              <div
                key={item.id}
                className='flex sm:max-w-full items-center gap-4 sm:gap-2 p-4 sm:px-2 border-b-2 border-gray-900'
              >
                <div>
                  <div className='w-[250px] sm:w-[150px] sm:h-[150px] h-[250px]'>
                    <img
                      className='object-cover w-full h-full rounded-md'
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1'>
                  <div>
                    <div className='sm:flex sm:flex-row-reverse sm:items-start sm:justify-between'>
                      <p className='text-[21px] font-[700] text-gray-500'>
                        {item.price}$.
                      </p>
                      <h3 className='text-[22px] sm:text-[19px] font-semibold'>
                        {item.name}
                      </h3>
                    </div>
                    <div className='flex sm:flex-wrap-reverse sm:mt-2 mt-3 sm:gap-3 items-center gap-[20px]'>
                      <p className='sm:hidden'>Опции:</p>
                      <p className='px-3 py-[3px] sm:px-2 sm:py-1 text-white rounded-full bg-gray-600'>
                        {item.options.first}
                      </p>
                      <p className='px-3 py-[3px] text-white rounded-full bg-gray-600'>
                        {item.options.second}
                      </p>
                    </div>
                  </div>
                  <div className='flex mt-4 w-full items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                      <button className='p-2 sm:p-1 bg-gray-200 rounded-full hover:bg-gray-300'>
                        <Minus />
                      </button>
                      <p className='text-xl text-gray-700'>{item.count}</p>
                      <button className='p-2 sm:p-1 bg-gray-200 rounded-full hover:bg-gray-300'>
                        <Plus />
                      </button>
                    </div>
                    <p className='text-xl sm:pl-2 text-gray-700'>
                      {item.price * item.count}$
                    </p>
                    <button
                      onClick={() => handleClickOpen(item)}
                      className='p-2 text-red-800 rounded-md flex items-center space-x-2'
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='right bg-gray-100 rounded-lg sm:relative sm:top-4 fixed top-[100px] right-[3%] sm:right-0 flex flex-col sm:p-0 p-4'>
          <div className='flex flex-col gap-[8px] mb-4 rounded-lg p-4 shadow-sm'>
            <h3 className='text-lg font-bold'>Order summary</h3>
            <div className='flex items-center justify-between w-full'>
              <p className='text-gray-500 font-[600] whitespace-nowrap'>
                Total price:
              </p>
              <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
              <p className='font-semibold'>{totalPrice}$</p>
            </div>
            <div className='flex items-center justify-between w-full'>
              <p className='text-gray-500 font-[600]'>Total number of items:</p>
              <div className='flex-1 border mt-[10px] border-dashed border-gray-400 mx-2'></div>
              <p>{totalCount}</p>
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
                <p> {count}</p>
              </div>
            ))}
          </div>
          <div className='order-form p-4 shadow-sm rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Оформить заказ</h3>
            <input
              type='text'
              placeholder='Ваше имя'
              className='border border-gray-300 p-3 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            />
            <input
              type='text'
              placeholder='Ваш номер'
              className='border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            />
            <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all'>
              🚀 Оформить заказ
            </button>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete item?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete
            <span className='text-green-700'> {selectedItem?.name}?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              if (selectedItem?.id !== undefined) {
                dispatch(removeItem(selectedItem.id.toString()))
              }
              handleClose()
            }}
            autoFocus
          >
            Agree
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </div>
  )
}
