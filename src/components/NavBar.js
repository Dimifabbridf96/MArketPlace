import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import icon from '../assets/marketplace-icon.png'

const NavBar = () => {
  return (
    <Navbar expand='md' fixed='top'>
        <Container>
        <Navbar.Brand href="#home"><img src={icon} alt='Icon' height='55' width='55'></img> MarketPlace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link >Home</Nav.Link>
            <Nav.Link >Sign In</Nav.Link>
            <Nav.Link >Sign Up</Nav.Link>

          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar