import React from 'react'
import styles from '../styles/NavBar.module.css'
import {Container, Nav, Navbar} from 'react-bootstrap';
import icon from '../assets/marketplace-icon.png'
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserProvider';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedOutIcons = <> 
  <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/signin' > <i className="fa-regular fa-user"></i> Sign In</NavLink>
  <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup' > <i className="fa-solid fa-pen"></i> Sign Up</NavLink>
  </>
  const loggedInIcons = <>
    {currentUser?.username}
    <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/signout' > <i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Sign Out</NavLink>

  </>
  return (
    
    <Navbar expand='md' fixed='top' className={styles.NavBar}>
        <Container>
          <NavLink to='/'>
        <Navbar.Brand><img src={icon} alt='Icon' height='55' width='55'></img> MarketPlace
        </Navbar.Brand> 
        </NavLink>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to='/'><i className="fa-solid fa-house-user"></i>Home</NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
            

          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar