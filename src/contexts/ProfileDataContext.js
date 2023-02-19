import React, { createContext, useContext, useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from './CurrentUserContext';


export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();


export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({children}) =>{
    const[profileData, setProfileData] = useState({
        pageProfile: { results: []},
        PopularProfiles: {results: []},
      });
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
    <ProfileDataContext.Provider value={profileData}>
        <SetProfileDataContext.Provider value={setProfileData}>

        {children}

        </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  )
}

export default ProfileDataContext