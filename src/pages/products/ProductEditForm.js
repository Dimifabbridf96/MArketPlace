import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import  Image  from "react-bootstrap/Image";
import styles from "../../styles/ProductCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Alert } from "bootstrap";

function ProductEditForm() {
  const [productCreation, setProductCreation] = useState({
    title: "",
    description: "",
    image: "",
    category:"",
    price: "",
  });
const {title, description, image, category, price} = productCreation;

const imageInput = useRef(null)
const history = useHistory()
const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/products/${id}`);
        const { title, image, is_owner, description, price, category } = data;

        is_owner ? setProductCreation({ title, image, description,price, category }) : history.push("/");
      } catch (err) {
         // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) =>{
    setProductCreation({
      ...productCreation, [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProductCreation({
        ...productCreation,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    if (imageInput?.current?.files[0]) {
        formData.append("image", imageInput.current.files[0]);
      }
    formData.append("category", category);
    formData.append("price", price);
  

    try {
      axiosReq.put(`/products/${id}`, formData);
      history.push(`/product/${id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }

  }

  
  const [errors, setErrors] = useState({});


  const textFields = (
    <div className="text-center">
      
  <Form.Group controlId="title">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Give a title to your product" name="title" value={title} onChange={handleChange} />
    </Form.Group>
    {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    <Form.Group controlId="description">
    <Form.Label>Description</Form.Label>
    <Form.Control as='textarea' rows={10} placeholder="Insert your description" name="description" value={description} onChange={handleChange} />
    </Form.Group>
    {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

    <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <select name="category" className={styles.Margin} value={category} onChange={handleChange}>
          <option value='Other'>Other</option>
          <option value='Beauty'>Beauty</option>
          <option value='Home & Garden'>Home & Garden</option>
          <option value='Toys & Game'>Toys & Game</option>
          <option value='Sport & Outdoor'>Sport & Outdoor</option>
          <option value='Pet Supply'>Pet Supply</option>
          <option value='Books'>Books</option>
          <option value='Electronics'>Electronics</option>
          <option value='Car & Motorbike'>Car & Motorbike</option>
        </select>
    </Form.Group>
    {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

    <Form.Group controlId="price">
    <Form.Label>Price</Form.Label>
    <Form.Control type="number" min="0" max="99999999"  step="0.01" placeholder="Insert Your Price " name="price" value={price} onChange={handleChange} />
    </Form.Group>
    {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
        
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {history.goBack()}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
            
                  <figure>
                    <Image className={appStyles.Product} src={image} rounded />
                  </figure>
                  <div className="justify-content-center" >
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
              
    <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductEditForm;