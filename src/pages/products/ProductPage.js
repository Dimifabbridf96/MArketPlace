import React, {useState, useEffect} from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Products from "./Products";
import Comments from "../comments/Comments";

function ProductPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState({ results: [] });

  const currentUser = useCurrentUser();
const profile_image = currentUser?.profile_image;
const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: product }, {data: comments}] = await Promise.all([
          axiosReq.get(`/product/${id}`),
          axiosReq.get(`/comments/?product=${id}`)
        ]);
        setProduct({ results: [product] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);



  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Products {...product.results[0]} setProduct={setProduct} productPage/>
        <Container className={appStyles.Content}>
        {currentUser ? (
  <CommentCreateForm
  profile_id={currentUser.profile_id}
  profileImage={profile_image}
  post={id}
  setProduct={setProduct}
  setComments={setComments}
/>
) : comments.results.length ? (
   "Comments"
) : null}
{comments.results.length ? ( 
  comments.results.map(comment =>(
   <Comments key={comment.id} {...comment}/>
)) 
): currentUser ? (
  <span>No commented yet, be the first</span>
): (
  <span>No comment, <a to='/signin'>Log in </a>and be the first</span>
)}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ProductPage;