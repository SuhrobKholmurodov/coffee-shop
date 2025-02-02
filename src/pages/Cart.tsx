import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {
  CartItems,
  CustomDialog,
  EmptyCart,
  OrderSummary,
  ShowToast
} from '@/components'
import { categoryNames } from '@/constants'
import { CartItem } from '@/redux/cart/types'
import { selectCart } from '@/redux/cart/selectors'
import { clearItems, removeItem } from '@/redux/cart/slice'

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

  const handleDeleteItem = () => {
    if (selectedItem?.id !== undefined) {
      dispatch(removeItem(selectedItem.id.toString()))
      ShowToast({ message: `${selectedItem.name} was deleted` })
    }
    handleClose()
  }

  const handleOpenDialog = () => {
    setOpenDialogClearItems(true)
  }

  const handleCloseDialog = () => {
    setOpenDialogClearItems(false)
  }

  const handleConfirmDelete = () => {
    dispatch(clearItems())
    ShowToast({ message: 'All items were deleted!' })
    setOpenDialogClearItems(false)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems.items))
  }, [cartItems.items])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
            handleClickOpen={item => {
              handleClickOpen(item)
            }}
          />
          <OrderSummary
            cartItems={cartItems.items}
            categoryNames={categoryNames}
            onDeleteAll={handleOpenDialog}
          />
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
        onConfirm={handleDeleteItem}
        title='Delete item?'
        description={
          <>
            Вы уверены, что хотите удалить{' '}
            <span style={{ color: '#B0907A', fontWeight: 'bold' }}>
              {selectedItem?.name}
            </span>
            ?
          </>
        }
      />
    </div>
  )
}
