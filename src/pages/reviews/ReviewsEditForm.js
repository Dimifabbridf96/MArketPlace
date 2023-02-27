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
            as='number'
            min='0'
            max='5'
            step='1'
            placeholder="Insert Your Review "
            value={formReview}
            onChange={handleChange}
            />
          </Form.Group>
          <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!comment.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  )
}

export default ReviewsEditForm