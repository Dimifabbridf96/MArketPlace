import React from 'react'
import styles from '../styles/NavBar.module.css'
import {Container, Nav, Navbar} from 'react-bootstrap';
import icon from '../assets/marketplace-icon.png'

const NavBar = () => {
  return (
    <Navbar expand='md' fixed='top' className={styles.NavBar}>
        <Container>
        <Navbar.Brand href="#home"><img src={icon} alt='Icon' height='55' width='55'></img> MarketPlace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link ><i class="fa-solid fa-house-user"></i>Home</Nav.Link>
            <Nav.Link > <i class="fa-regular fa-user"></i> Sign In</Nav.Link>
            <Nav.Link > <i class="fa-solid fa-pen"></i> Sign Up</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar