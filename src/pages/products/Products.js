import React from 'react';

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
        comments_count
    } = props;

  return (
    <div>Products</div>
  )
}

export default Products