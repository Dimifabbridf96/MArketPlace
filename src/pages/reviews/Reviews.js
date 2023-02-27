import React from 'react'

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
            <p> { review }</p>
            </Media.Body>
        </Media>
    </>
  )
}

export default Reviews