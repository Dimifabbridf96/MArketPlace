import React from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip  from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Product.module.css'
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

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
        reviews_count,
        productPage,
        setProducts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () =>{
      history.push(`/products/${id}`)
    }

    const handleDelete = async() =>{
      try{
      await axiosRes.delete(`/products/${id}`)
      history.goBack()
      }catch(err){
        // console.log(err)
      }

    }
    const handleLike = async () => {
        try{
            const {data} = await axiosRes.post('/likes/', {product: id});
        setProducts((prevProducts) => ({
            ...prevProducts, results: prevProducts.results.map((product) =>{
                return product.id === id
                ? {...product, likes_count: product.likes_count +1, like_id: data.id } : product;
            }),
        }));
        }catch(err){
            // console.log(err)
        }
    };

    const handleUnlike = async() =>{
        try{
            await axiosRes.delete(`likes/${like_id}`);
            setProducts((prevProducts) => ({
                ...prevProducts, results: prevProducts.results.map((product) =>{
                    return product.id === id
                    ? {...product, likes_count: product.likes_count - 1, like_id: null } : product;
                }),
            }));
            }catch(err){
                // console.log(err)
            }
        };
    
  
    return (
      <Card className={styles.Product}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={50} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{updated_at}</span>
              {is_owner && productPage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete}/>}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/product/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {description && <Card.Text>{description}</Card.Text>}
          {category && <Card.Text>{category}</Card.Text>}
          {price && <Card.Text>{price} €</Card.Text>}
          <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Autolike not allowed !</Tooltip>}
            >
              <i className={`fa-regular fa-circle-up`} />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike }>
              <i className={`fa-regular fa-circle-up ${styles.Upvote}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`fa-solid fa-circle-up ${styles.Neutral}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like product!</Tooltip>}
            >
              <i className="fa-regular fa-circle-up" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/product/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
          <Link to={`/product/${id}`}>
            <i className="fa-regular fa-star" />
          </Link>
          {reviews_count}
        </div>
        </Card.Body>
        </Card>
  )
          }

export default Products