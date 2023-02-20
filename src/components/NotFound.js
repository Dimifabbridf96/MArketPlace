import React from 'react'
import NoResult from '../assets/noResults.jpg'
import styles from '../styles/NotFound.module.css'
import Asset from './Asset'

const NotFound = () => {
  return (
    <div><Asset src={NoResult} message="Sorry, the page you're looking for doesn't exist"/></div>
  )
}

export default NotFound