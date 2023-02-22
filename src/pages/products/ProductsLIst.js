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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CategorySelector from "../../components/CategorySelector";

function ProductsPage({message, filter=""}) {
    const [products, setProducts] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();
    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();
    const [category, setCategory] = useState("");
  
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const { data } = await axiosReq.get(`/products/?${filter} search=${query}&category=${category}`);
            setProducts(data);
            setHasLoaded(true);
          } catch (err) {
            // console.log(err);
          }
        };
        setHasLoaded(false);
        const timer = setTimeout(() => {
          fetchProducts();
        }, 1000);
    
        return () => {
          clearTimeout(timer);
        };
  }, [filter, query, pathname, currentUser, category]);

  const handleCategoryFilter = (event)=>{
    if (event.target.value === ''){
        setCategory("");
    } else {
        setCategory(event.target.value);
    }
}


//const filterCategories = [
//  {Other: 'Other'},
//  {Beauty: 'Beauty'},
//  {Home: 'Home & Garden'},
//  {Toys: 'Toys & Game'},
//  {Sport: 'Sport & Outdoor'},
//  {Pet: 'Pet Supply'},
//  {Books: 'Books'},
//  {Electronics:'Electronics'},
//  {Car : 'Car & Motorbike' },
//];

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
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
          <Form.Group controlId="categoryFilter">
            <Form.Label>Filter by Category</Form.Label>
           <CategorySelector onChange={handleCategoryFilter} id='categoryFilter'/>
          </Form.Group>
        </Form>
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
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProductsPage;