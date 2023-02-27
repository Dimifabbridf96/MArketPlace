import React from 'react'
import styles from '../styles/NavBar.module.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import icon from '../assets/marketplace-icon.png'
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsiudeToggle';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const HandleSignOut = async () =>{
    try{
      await axios.post('dj-rest-auth/logout/')
      setCurrentUser(null);
    }catch(err){
      // console.log(err)

    }
  }

  const addProductIcon = (
    <NavLink  className={`${styles.NavLink} ${styles.NoHover}`} activeClassName={styles.Active}to='/product/create' ><i className="fa-solid fa-cart-plus"></i> Add Product </NavLink>

  )
  const loggedOutIcons = <> 
  <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/signin' > <i className="fa-regular fa-user"></i> Sign In</NavLink>
  <NavLink className={styles.NavLink} activeClassName={styles.Active} to='/signup' > <i className="fa-solid fa-pen"></i> Sign Up</NavLink>
  </>
  const loggedInIcons = <>
    <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/liked' > <i className="fa-solid fa-heart-circle-bolt"></i> Liked</NavLink>
    <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/followed' > <i className="fas fa-stream"></i> Followed</NavLink>

    <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/' onClick={HandleSignOut} > <i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Sign Out</NavLink>
    <NavLink  className={styles.NavLink} activeClassName={styles.Active}to='/category'> <i className="fa-solid fa-book" /> Category</NavLink>

    <NavLink  className={styles.NavLink} activeClassName={styles.Active}to={`/profiles/${currentUser?.profile_id}`} > <Avatar src={currentUser?.profile_image} text='Profile'/></NavLink>

  </>
  return (
    <Navbar expanded={expanded} expand='md' fixed='top' className={styles.NavBar}>
        <Container>
          <NavLink to='/'>
        <Navbar.Brand><img src={icon} alt='Icon' height='55' width='55'></img> MarketPlace
        </Navbar.Brand> 
        </NavLink>
        { currentUser && addProductIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" ref={ref}
          onClick={() => setExpanded(!expanded)} />
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