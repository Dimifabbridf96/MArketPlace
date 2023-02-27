import React from 'react'
import { Form } from 'react-bootstrap'



const CategorySelector = ({value, onChange}) => {
  return (
    <>
    <Form.Label>Category</Form.Label>
    <Form.Control as='select' name="category" value={value} onChange={onChange} >
      <option value='Other'>Other</option>
      <option value='Beauty'>Beauty</option>
      <option value='Home & Garden'>Home & Garden</option>
      <option value='Toys & Game'>Toys & Game</option>
      <option value='Sport & Outdoor'>Sport & Outdoor</option>
      <option value='Pet Supply'>Pet Supply</option>
      <option value='Books'>Books</option>
      <option value='Electronics'>Electronics</option>
      <option value='Car & Motorbike'>Car & Motorbike</option>
    </Form.Control>
    </>
  )
}

export default CategorySelector