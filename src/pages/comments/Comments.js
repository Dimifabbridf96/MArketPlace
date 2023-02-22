import React, { useState } from 'react'
import  Media  from 'react-bootstrap/Media';
import CommentEditForm from "./CommentEditForm";
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Comment.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';


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

    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;    

    const handleDelete = async() =>{
      try{
      await axiosRes.delete(`/comments/${id}`)
      setProduct(prevProduct => ({
        results: [{
          ...prevProduct.results[0],
          comments_count: prevProduct.results[0].comments_count - 1
        }]
      }))
        setComments(prevComments => ({
          ...prevComments, results: prevComments.results.filter((comment) => comment.id !== id), 
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
              <CommentEditForm
              id={id}
              profile_id={profile_id}
              comment={comment}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
            ) : (
              <p>{comment}</p>
            )}
          </Media.Body>
          {is_owner && !showEditForm && (
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </>
    );
  
}

export default Comments