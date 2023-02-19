import React from 'react'
import { Media } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'


const Comments = (props) => {
    const{
        owner,
        updated_at,
        comment,
        profile_id,
        profile_image,
        setProduct,
        setComments,
        id,
    }= props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;    
    const history = useHistory();

    const handleDelete = async() =>{
      try{
      await axiosRes.delete(`/comments/${id}/`)
      setProduct(prevProduct => ({
        results: [{
          ...prevProduct.results[0],
          comments_count: prevProduct.results[0].comments_count - 1
        }]
      }))
        setComments(prevComments => ({
          ...prevComments, results: prevComments.results.filter(comment => comment.id !== id), 
          }))
      }
      catch(err){
        console.log(err)
      }
}
    }

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
        <p> {comment }</p>
        </Media.Body>
        {is_owner && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>}
        </Media>
          </div>     
  )
}

export default Comments