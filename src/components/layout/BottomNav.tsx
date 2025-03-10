import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Link } from 'react-router-dom'
import { HomeIcon, Phone, Info, ShoppingCart } from 'lucide-react'
import { Badge } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { selectCart } from '@/redux/cart/selectors'
import { calculateTotalCount } from '@/utils'

export const BottomNav = () => {
  const [value, setValue] = useState(0)
  const { items: cartItems } = useSelector(selectCart)

  const totalCount = calculateTotalCount(cartItems)
  

  return (
    <div className='sm:flex hidden fixed bottom-0 left-0 right-0'>
      <Box sx={{ width: '100%' }}>
        <BottomNavigation
          showLabels
          sx={{
            backgroundColor: '#E1D4C9',
            boxShadow: '0 0 0 1px #665F55',
            gap:"25px"
          }}
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction
            label='Home'
            icon={
              <Link to={'/'}>
                <HomeIcon />
              </Link>
            }
          />

          <BottomNavigationAction
            label='Contacts'
            icon={
              <Link to={'/contacts'}>
                <Phone />
              </Link>
            }
          />

          <BottomNavigationAction
            label='About'
            icon={
              <Link to={'/about'}>
                <Info />
              </Link>
            }
          />

          <BottomNavigationAction
            label='Cart'
            icon={
              <Link to={'/cart'} className='rounded-full'>
                <Badge showZero={false} badgeContent={totalCount} color='error'>
                  <ShoppingCart size={28} />
                </Badge>
              </Link>
            }
          />
        </BottomNavigation>
      </Box>
    </div>
  )
}
