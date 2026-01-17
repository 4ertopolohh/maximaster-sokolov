import '../FilterSearchString/FilterSearchString.scss'
import searchIcon from '../../../../assets/images/icons/searchIcon.png'
import { useState } from 'react'

const FilterSearchString = () => {
    const [value, setValue] = useState<string>('')
    
    return(
        <div className="filterSearchStringWrapper">
            <input
                type="text"
                className="filterSearchString"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {value.length === 0 && (
                <div className="filterPlaceholder">
                <img src={searchIcon} alt="" loading="lazy" />
                <span>Search</span>
                </div>
            )}
        </div>
    )
}

export default FilterSearchString;