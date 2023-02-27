import React from 'react'
import Media from 'react-bootstrap/Media';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';


const Reviews = (props) => {
    const{
        owner,
        created_at,
        updated_at,
        product,
        review,
        profile_id,
        profile_image,
        id,
    }= props;

    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;


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
              setReview={setReview}
              setShowEditForm={setShowEditForm}
            />
            ):(<p> { review }/5 🌟</p>)}
            </Media.Body>
        </Media>
    </>
  )
}

export default Reviews