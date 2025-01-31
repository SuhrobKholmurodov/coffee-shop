import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartItem } from '../redux/cart/types'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearItems, minusItem, removeItem } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'
import { CartItems, CustomDialog, EmptyCart, OrderSummary } from '../components'

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
          <OrderSummary
            totalPrice={totalPrice}
            totalCount={totalCount}
            categoryCounts={categoryCounts}
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
