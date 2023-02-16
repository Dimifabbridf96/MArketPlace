import React, {useState, useEffect} from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Products from "./Products";

function ProductPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: product }] = await Promise.all([
          axiosReq.get(`/product/${id}`),
        ]);
        setProduct({ results: [product] });
        console.log(product);
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
        <Products {...product.results[0]} setProduct={setProduct}/>
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ProductPage;