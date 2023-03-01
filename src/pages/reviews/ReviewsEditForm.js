import React, { useState } from 'react'
import  Form  from 'react-bootstrap/Form'
import { axiosRes } from '../../api/axiosDefaults';
import styles from "../../styles/ReviewCreateEditForm.module.css";


const ReviewsEditForm = (props) => {
    const{ id, review, setShowEdit, setReviews} = props;

    const [formReview, setFormReview] = useState(review);

    const handleChange = (event) => {
      setFormReview(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axiosRes.put(`/reviews/${id}`, {
          review: formReview,
        });
        setReviews((prevReviews) => ({
          ...prevReviews,
          results: prevReviews.results.map((review) => {
            return review.id === id
              ? {
                  ...review,
                  review: formReview,
                  updated_at: "now",
                }
              : review;
          }),
        }));
        setShowEdit(false);
      } catch (err) {
        // console.log(err);
      }
    };

  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group className='pr-1'>
            <Form.Control
            className={styles.Form}
            type='number'
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
          onClick={() => setShowEdit(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!review}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  )
}

export default ReviewsEditForm