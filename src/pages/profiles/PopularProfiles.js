import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults';
import appStyles from '../../App.module.css'
import Asset from '../../components/Asset';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const PopularProfiles = () => {
  const[profileData, setProfileData] = useState({
    pageProfile: { results: []},
    PopularProfiles: {results: []},
  });
  const[PopularProfiles] = profileData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const HandleMount = async() =>{
      try{
        const {data} = await axiosReq.get(`/profiles/?ordering=-followers_count`);
        setProfileData(prevState =>({
          ...prevState, PopularProfiles: data,
        }))
      }catch(err){
          console.log(err)
      }
    }
    HandleMount()
  }, [currentUser])

  

  return (
    <Container className={appStyles.Content}>
      {PopularProfiles.results.length ? (
        <>
        <p>Most followed profiles</p>
       {PopularProfiles.results.map(profile => (
          <p key={profile.id}> {profile.owner }</p>
        ))}
        </>
        ): (
          <Asset spinner />
        )
        }
    </Container>
  )
}



export default PopularProfiles