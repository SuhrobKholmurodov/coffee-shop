import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, X } from 'lucide-react'
import { selectSearchValue } from '@/redux/filter/selectors'
import { setSearchValue } from '@/redux/filter/slice'

export const SearchInput = () => {
  const dispatch = useDispatch()
  const searchValue = useSelector(selectSearchValue)

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    dispatch(setSearchValue(value))
  }

  const onClickClear = () => {
    dispatch(setSearchValue(''))
  }

  return (
    <div
      id='searchInput'
      className='relative sm:ml-[10px] w-full max-w-sm sm:w-auto transition-all duration-300'
    >
      <Search
        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
        size={20}
      />
      <input
        type='text'
        placeholder='Search'
        value={searchValue}
        onChange={onChangeInput}
        className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondareBgColor transition-all duration-300'
      />
      {searchValue && (
        <X
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600'
          size={20}
          onClick={onClickClear}
        />
      )}
    </div>
  )
}
