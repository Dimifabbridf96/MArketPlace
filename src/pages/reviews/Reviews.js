import React, { useState } from 'react'
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ReviewsEditForm from './ReviewsEditForm';
import styles from '../../styles/Comment.module.css'



const Reviews = (props) => {
    const{
        owner,
        updated_at,
        review,
        profile_id,
        profile_image,
        setProduct,
        setReviews,
        id,
    }= props;

    const [showEditForm, setShowEdit] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async() =>{
      try{
      await axiosRes.delete(`/reviews/${id}`)
      setProduct(prevProduct => ({
        results: [{
          ...prevProduct.results[0],
          reviews_count: prevProduct.results[0].reviews_count - 1
        }]
      }))
        setReviews(prevReviews => ({
          ...prevReviews, results: prevReviews.results.filter((review) => review.id !== id), 
          }))
      }
      catch(err){
        // console.log(err)
      }
}


  return (
    <>
        <hr />
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            {showEditForm ? (
              <ReviewsEditForm
              id={id}
              profile_id={profile_id}
              review={review}
              profileImage={profile_image}
              setReviews={setReviews}
              setShowEdit={setShowEdit}
            />
            ):(<p> { review }/5 🌟</p>)}
            </Media.Body>
            {is_owner && !showEditForm && (
            <MoreDropdown
              handleEdit={() => setShowEdit(true)}
              handleDelete={handleDelete}
            />
            )}
        </Media>
    </>
  )
}

export default Reviews