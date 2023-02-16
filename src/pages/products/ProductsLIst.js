import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProductsList.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Products from "./Products";
import NoResults from "../../assets/noResults.jpg";
import Asset from "../../components/Asset";

function ProductsPage({message, filter=""}) {
    const [products, setProducts] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();
    const [query, setQuery] = useState("");
  
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const { data } = await axiosReq.get(`/products/?${filter} search=${query}`);
            setProducts(data);
            setHasLoaded(true);
          } catch (err) {
            console.log(err);
          }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchProducts();
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}/>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search products"
          />
        </Form>
        {hasLoaded ? (
          <>
            {products.results.length ? (
              products.results.map((products) => (
                <Products key={products.id} {...products} setProducts={setProducts} />
              ))
            ) : (
              <Container>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default ProductsPage;