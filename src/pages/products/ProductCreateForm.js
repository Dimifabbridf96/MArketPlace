import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.jpg";
import { Image } from "react-bootstrap";
import styles from "../../styles/ProductCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function ProductCreateForm() {
  const [productCreation, setProductCreation] = useState({
    title: "",
    description: "",
    image: ""
  });
const {title, description, image} = productCreation;

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

  }

  
  const [errors, setErrors] = useState({});


  const textFields = (
    <div className="text-center">
      
      <Form>
  <Form.Group controlId="title">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Give a title to your product" name="title" value={title} onChange={handleChange} />
    </Form.Group>
    <Form.Group controlId="description">
    <Form.Label>Description</Form.Label>
    <Form.Control as='textarea' rows={10} placeholder="Insert your description" name="description" value={description} onChange={handleChange} />
    </Form.Group>
    </Form>

    
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (<>
                  <figure>
                    <Image className={appStyles.Product} src={image} rounded />
                  </figure>
                  <div justify-content-center>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>) : (  <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message='Click here to upload an image' />
                </Form.Label>)}
              
    <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} />
            </Form.Group>
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

export default ProductCreateForm;