import React from 'react'


const CategorySelector = () => {
  return (
    <select name="category" >
          <option value='Other'>Other</option>
          <option value='Beauty'>Beauty</option>
          <option value='Home & Garden'>Home & Garden</option>
          <option value='Toys & Game'>Toys & Game</option>
          <option value='Sport & Outdoor'>Sport & Outdoor</option>
          <option value='Pet Supply'>Pet Supply</option>
          <option value='Books'>Books</option>
          <option value='Electronics'>Electronics</option>
          <option value='Car & Motorbike'>Car & Motorbike</option>
        </select>
  )
}

export default CategorySelector