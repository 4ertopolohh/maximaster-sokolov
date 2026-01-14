import { useState } from 'react'
import '../SearchString/SearchString.scss'

import searchIcon from '../../assets/images/icons/searchIcon.png'

const SearchString = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className="searchStringWrapper">
      <input
        type="text"
        className="searchString"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value.length === 0 && (
        <div className="placeholder">
          <img src={searchIcon} alt="" loading="lazy" />
          <span>Search</span>
        </div>
      )}
    </div>
  )
}

export default SearchString
