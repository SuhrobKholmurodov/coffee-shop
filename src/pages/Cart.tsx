import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'
import { useDispatch, useSelector } from 'react-redux'
import { clearItems, removeItem } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'
import {
  CartItems,
  CustomDialog,
  EmptyCart,
  OrderSummary,
  ShowToast
} from '../components'

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
    ShowToast({ message: 'All items were deleted!' })
    setOpenDialogClearItems(false)
  }

  const handleDeleteItem = () => {
    if (selectedItem?.id !== undefined) {
      dispatch(removeItem(selectedItem.id.toString()))
      ShowToast({ message: `${selectedItem.name} deleted` })
    }
    handleClose()
  }

  const categoryNames: string[] = ['coffees', 'teas', 'desserts']

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
