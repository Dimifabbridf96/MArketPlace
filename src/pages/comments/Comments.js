import React from 'react'
import { Media } from 'react-bootstrap';
import styles from '../../styles/Comment.module.css'


const Comments = (props) => {
    const{
        owner,
        updated_at,
        comment,
        profile_id,
        profile_image,
    }= props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

  return (
    <div>
        <hr />
        <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body>
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
            {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>}
        <p> {comment }</p>
        </Media.Body>
        </Media>
          </div>     
  )
}

export default Comments