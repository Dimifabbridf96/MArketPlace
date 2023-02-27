import React, { useEffect, useState } from 'react'
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProductsList.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Products from "../products/Products";
import NoResults from "../../assets/noResults.jpg";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import CategorySelector from '../../components/CategorySelector';
import ActiveProfiles from '../profiles/ActiveProfiles';

const CategoryFilter = ({message, filter=""}) => {
    const [products, setProducts] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const { data } = await axiosReq.get(`/products/?${filter}search=${query}`);
            setProducts(data);
            setHasLoaded(true);
          } catch (err) {
            // console.log(err);
          }
        };
        setHasLoaded(false);
        fetchProducts();
    }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <ActiveProfiles mobile />
          <Form.Group>
      <CategorySelector value={query} onChange={(event) =>setQuery(event.target.value)}/>
</Form.Group>
        {hasLoaded ? (
          <>
            {products.results.length ? (
              <InfiniteScroll children= { products.results.map((products) => (
                <Products key={products.id} {...products} setProducts={setProducts} />
              ))}
              dataLength={products.results.length}
                loader={<Asset spinner />}
                hasMore={!!products.next}
                next={() => fetchMoreData(products, setProducts)}/>
             
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
        <ActiveProfiles />
        <PopularProfiles />
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      <ActiveProfiles />
      </Col>
    </Row>
  );
}
  

export default CategoryFilter