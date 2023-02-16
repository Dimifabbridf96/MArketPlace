import React from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from '../styles/MoreDropdown.module.css'

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
    className='fa-solid fa-ellipsis-v'
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const MoreDropdown = ({ handleEdit, handleDelete }) =>{
    
    return(
        <Dropdown className='ml-auto' drop='left'>
          <Dropdown.Toggle as={ThreeDots} />
          <Dropdown.Menu className='text-center'  popperConfig={{ strategy: "fixed" }}>
            <Dropdown.Item classname={styles.DropdownItem} onClick={handleEdit} aria-label='edit'><i className='fas fa-edit' /></Dropdown.Item>
            <Dropdown.Item className={styles.DropdownItem} onClick={handleDelete} aria-label='delete'><i className='fa-solid fa-trash-can' /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
  }
  

 