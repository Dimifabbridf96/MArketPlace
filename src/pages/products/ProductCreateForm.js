import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import Upload from "../../assets/upload.jpg";
import  Image  from "react-bootstrap/Image";
import styles from "../../styles/ProductCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Alert } from "bootstrap";
import { useRedirect } from "../../hooks/useRedirect";
import CategorySelector from "../../components/CategorySelector";

function ProductCreateForm() {
  useRedirect('loggedOut')
  const [productCreation, setProductCreation] = useState({
    title: "",
    description: "",
    image: "",
    category:"Other",
    price: "",
  });
const {title, description, image, category, price} = productCreation; 

const [errors, setErrors] = useState({});


const imageInput = useRef(null)
const history = useHistory()

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
    formData.append("image", imageInput.current.files[0]);
    formData.append("category", category);
    formData.append("price", price);

    try {
      const { data } = await axiosReq.post("/products/", formData);
      history.push(`/products/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }

  }

  
 


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
        <Form.Control as='select' name="category" value={description} onChange={handleChange} >
          <option value='Other'>Other</option>
          <option value='Beauty'>Beauty</option>
          <option value='Home & Garden'>Home & Garden</option>
          <option value='Toys & Game'>Toys & Game</option>
          <option value='Sport & Outdoor'>Sport & Outdoor</option>
          <option value='Pet Supply'>Pet Supply</option>
          <option value='Books'>Books</option>
          <option value='Electronics'>Electronics</option>
          <option value='Car & Motorbike'>Car & Motorbike</option>
        </Form.Control>
    </Form.Group>
    

    <Form.Group controlId="price">
    <Form.Label>Price</Form.Label>
    <Form.Control type="number" min="0" max="1000"  step="1" placeholder="Insert Your Price " name="price" value={price} onChange={handleChange} />
    </Form.Group> 
   
        
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {history.goBack()}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
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
              {image ? (<>
                  <figure>
                    <Image className={appStyles.Product} src={image} rounded />
                  </figure>
                  <div className="justify-content-center" >
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue}`}
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

export default ProductCreateForm;