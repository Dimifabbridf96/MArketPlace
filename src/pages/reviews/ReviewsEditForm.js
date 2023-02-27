import React from 'react'
import  Form  from 'react-bootstrap/Form'

const ReviewsEditForm = (props) => {
    const{ id, review, setShowEdit, setReview} = props;

    const [formReview, setFormReview] = useState(review);


  return (
    <Form>
        <Form.Group className='pr-1'>
            <From.Control
            className={styles.Form}
            as=''
        </Form.Group>
    </Form>
  )
}

export default ReviewsEditForm