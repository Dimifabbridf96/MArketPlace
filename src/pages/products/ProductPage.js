import React, {useState, useEffect} from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Products from "./Products";
import Comments from "../comments/Comments";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentCreateForm from "../comments/CommentCreateForm";
import PopularProfiles from "../profiles/PopularProfiles";
import ReviewCreateForm from "../reviews/ReviewCreateForm";
import Reviews from "../reviews/Reviews";
import ActiveProfiles from "../profiles/ActiveProfiles";


function ProductPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState({ results: [] });

  const currentUser = useCurrentUser();
const profile_image = currentUser?.profile_image;
const [comments, setComments] = useState({ results: [] });
const [reviews, setReviews] = useState({results: []});

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: product }, {data: comments}, {data: reviews}] = await Promise.all([
          axiosReq.get(`/products/${id}`),
          axiosReq.get(`/comments/?product=${id}`),
          axiosReq.get(`/reviews/?product=${id}`)
        ]);
        setProduct({ results: [product] });
        setComments(comments);
        setReviews(reviews);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);



  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <ActiveProfiles mobile />
        <Products {...product.results[0]} setProducts={setProduct} productPage/>
        <Container className={`${appStyles.Content} ${appStyles.Comment}`}>
        {currentUser ? (
          
  <CommentCreateForm
  profile_id={currentUser.profile_id}
  profileImage={profile_image}
  product={id}
  setProduct={setProduct}
  setComments={setComments}
/>

) : comments.results.length ? (
   "Comments"
) : null}

{comments.results.length ? ( 
  <InfiniteScroll children ={comments.results.map(comment =>(
   <Comments key={comment.id} {...comment}
   setProduct={setProduct} setComments={setComments}/>
))}
dataLength={comments.results.length}
loader={<Asset spinner />}
hasMore={!!comments.next}
next={() => fetchMoreData(comments, setComments) }/>
  
) : currentUser ? (
  <span>No commented yet, be the first</span>
): (
  <span>No comment, <a href='/signin'>Log in </a>and be the first</span>
)}
  </Container>


  <Container className={`${appStyles.Content} ${appStyles.Review}`}>
        {currentUser ? (
          
  <ReviewCreateForm
  profile_id={currentUser.profile_id}
  profileImage={profile_image}
  product={id}
  setProduct={setProduct}
  setReviews={setReviews}
/>

) : reviews.results.length ? (
   "Reviews"
) : null}

{reviews.results.length ? ( 
  <InfiniteScroll children ={reviews.results.map(review =>(
   <Reviews key={review.id} {...review}
   setProduct={setProduct} setReviews={setReviews}/>
))}
dataLength={reviews.results.length}
loader={<Asset spinner />}
hasMore={!!reviews.next}
next={() => fetchMoreData(reviews, setReviews) }/>
  
) : currentUser ? (
  <span>No review yet, be the first</span>
): (
  <span>No review <a href='/signin'>Log in </a>and be the first</span>
)}

</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <ActiveProfiles />
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProductPage;