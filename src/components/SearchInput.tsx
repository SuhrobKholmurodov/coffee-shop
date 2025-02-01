import { useState } from 'react'
import { Search, X } from 'lucide-react'

export const SearchInput = () => {
  const [searchText, setSearchText] = useState('')

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
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-secondareBgColor transition-all duration-300'
      />
      {searchText && (
        <X
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600'
          size={20}
          onClick={() => setSearchText('')}
        />
      )}
    </div>
  )
}
