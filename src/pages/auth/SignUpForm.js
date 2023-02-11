import React from "react";
import { Link } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import market from '../../assets/marketplace.jpg'

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="password" placeholder="Please insert your username" name="username" />
      </Form.Group>

      <Form.Group controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password1" placeholder="Password" name="password1"/>
      </Form.Group>
        <Form.Group controlId="password2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password2" placeholder=" Confirm your Password" name='password2'/>
        </Form.Group>
      

      <Button className={`${btnStyles.Blue} ${btnStyles.Wide} ${btnStyles.Bright}`} variant="primary" type="submit">
        Submit
      </Button>
    </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            market
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;