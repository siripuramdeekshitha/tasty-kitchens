import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const RestaurantsHeader = props => {
  const {sortBy, onChange} = props

  return (
    <div className="restaurants-header">
      <div className="sort-container">
        <BsFilterLeft className="filter-icon" />

        <label htmlFor="sort-by">
          Sort By
        </label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={onChange}
        >
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
      </div>
    </div>
  )
}

export default RestaurantsHeader