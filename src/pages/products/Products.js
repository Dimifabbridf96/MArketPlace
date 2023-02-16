import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Product.module.css'


const Products = (props) => {
    const{
        id, 
        owner,
        updated_at,
        image,
        title,
        description,
        profile_id,
        profile_image,
        category,
        price,
        like_id,
        likes_count,
        comments_count,
        postPage
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
  
    return (
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={50} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && postPage && "..."}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {description && <Card.Text>{description}</Card.Text>}
        </Card.Body>
        </Card>
  )
}

export default Products