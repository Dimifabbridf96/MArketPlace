import React from 'react'
import styles from '../styles/NavBar.module.css'
import {Container, Nav, Navbar} from 'react-bootstrap';
import icon from '../assets/marketplace-icon.png'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    
    <Navbar expand='md' fixed='top' className={styles.NavBar}>
        <Container>
          <NavLink to='/'>
        
        <Navbar.Brand><img src={icon} alt='Icon' height='55' width='55'></img> MarketPlace
        </Navbar.Brand> </NavLink>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink to='/' className={styles.NavLink} activeClassName={styles.Active}><i className="fa-solid fa-house-user"></i>Home</NavLink>
            <NavLink to='/signin' className={styles.NavLink} activeClassName={styles.Active} > <i className="fa-regular fa-user"></i> Sign In</NavLink>
            <NavLink to='/signup' className={styles.NavLink} activeClassName={styles.Active} > <i className="fa-solid fa-pen"></i> Sign Up</NavLink>

          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar