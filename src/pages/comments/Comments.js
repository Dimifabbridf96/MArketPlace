import React from 'react'
import styles from '../../styles/Comment.module.css'


const Comments = (props) => {
    const{
        id,
        owner,
        updated_at,
        product,
        comment,
        profile_id,
        profile_image,
    }= props;
  return (
    <div>Comments</div>
  )
}

export default Comments