import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'

const PopularProfiles = () => {
  const[profileData, setProfileData] = useState({
    pageProfile: { results: []},
    PopularProfiles: {results: []},
  });
  }

  return (
    <Container className={appStyles.Content}>
        <p>Most followed profiles</p>
    </Container>
  )
}


export default PopularProfiles