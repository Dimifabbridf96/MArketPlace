import React, {useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Market from '../../assets/signInMarketplace.jpg'
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {

    const setCurrentUser = useSetCurrentUser();
    useRedirect('loggedIn')

    const [signIn, setSignIn] = useState({
        username: "",
        password: "",
    })

    const {username, password} = signIn;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) =>{
        setSignIn({
            ...signIn,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
           const {data} = await axios.post('dj-rest-auth/login/', signIn);
           setCurrentUser(data.user);
           setTokenTimestamp(data)
            history.goBack();
        }catch(errors){
            setErrors(errors.response?.data);
        }
    }

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>
    <Form onSubmit={handleSubmit}>
         <Form.Group controlId="username">
           <Form.Label>Username</Form.Label>
           <Form.Control type="text" placeholder="Insert your username" name='username' value={username} onChange={handleChange} />
         </Form.Group>
         {errors.username?.map((message, idx) => (<Alert variant='danger' key={idx}>{message}</Alert>))}

         <Form.Group controlId="password">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleChange}/>
         </Form.Group>
         {errors.password?.map((message, idx) => (<Alert variant='danger' key={idx}>{message}</Alert>))}

         <Button className={`${btnStyles.Blue} ${btnStyles.Wide} ${btnStyles.Bright}`} variant="primary" type="submit">
           Enter in the Market !
         </Button>
         {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
    </Form>


        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={Market}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;