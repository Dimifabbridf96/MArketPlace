import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import styles from "../../styles/ReviewCreateEditForm.module.css";


const ReviewCreateForm = (props) => {
     const { product, setProduct, setReviews, profileImage, profile_id } = props;
    const [review, setReview] = useState("");

    const handleChange = (event) => {
        setReview(event.target.value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await axiosRes.post("/reviews/", {
            review,
            product,
          });
          setReviews((prevReviews) => ({
            ...prevReviews,
            results: [data, ...prevReviews.results],
          }));
          setProduct((prevProduct) => ({
            results: [
              {
                ...prevProduct.results[0],
                reviews_count: prevProduct.results[0].reviews_count + 1,
              },
            ],
          }));
          setReview("");
        } catch (err) {
          // console.log(err);
        }
      };

  return (
   <Form onSubmit={handleSubmit}>
    <Form.Group>
        <InputGroup>
            <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profileImage} />
            </Link>
            <Form.Control
            className={styles.Form}
            placeholder="Insert your Review"
            type="number"
            min='0'
            max='5'
            step='1'
            value={review}
            onChange={handleChange}    
          />
        </InputGroup>
    </Form.Group>
    <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!review.trim()}
        type="submit"
      >
        review
      </button>
   </Form>
  )
}

export default ReviewCreateForm