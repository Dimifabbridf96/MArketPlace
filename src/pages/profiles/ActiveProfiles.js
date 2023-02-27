import React from 'react'
import Container  from 'react-bootstrap/Container'
import appStyles from '../../App.module.css'
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';

const ActiveProfiles = ({mobile}) => {
    const { activeProfiles} = useProfileData();

  return (
    <Container className={`${appStyles.Content} mb-4 ${mobile && 'd-lg-none text-center mb-3'}`}>
      {activeProfiles.results.length ? (
        <>
        <p>Most active profiles</p>
        {mobile ? (
          <div className='d-flex justify-content-around '>
            {activeProfiles.results.slice(0,4).map(profile => (
          <Profile key={profile.id} profile={profile} mobile />
        ))}
          </div>
        ): (
          activeProfiles.results.map(profile => (
            <Profile key={profile.id} profile={profile} />
          ))
        )}
        </>
        ): (
          <Asset spinner />
        )
        }
    </Container>
  )
}

export default ActiveProfiles