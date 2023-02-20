import React, { createContext, useContext, useEffect, useState } from 'react'
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { followerHelper, unfollowerHelper } from '../utils/utils';
import { useCurrentUser } from './CurrentUserContext';


export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();


export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({children}) =>{
    const[profileData, setProfileData] = useState({
        pageProfile: { results: []},
        popularProfiles: {results: []},
      });
      const currentUser = useCurrentUser();


      const handleFollow = async(clickedProfile) =>{
        try{
          const {data} = await axiosRes.post(`/followers/`, {followed: clickedProfile.id});
          setProfileData((prevState) =>({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) => followerHelper(profile, clickedProfile, data.id)),
            }, 
            PopularProfiles: {
              ...prevState.PopularProfiles,
              results: prevState.popularProfiles.results.map((profile) =>followerHelper(profile, clickedProfile, data.id)
              )
            }
          }));
        }catch(err){
          // console.log(err)
        }
      }

      const handleUnfollow = async(clickedProfile) =>{
        try{
           await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
          setProfileData((prevState) =>({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) => unfollowerHelper(profile, clickedProfile)),
            }, 
            PopularProfiles: {
              ...prevState.PopularProfiles,
              results: prevState.popularProfiles.results.map((profile) =>unfollowerHelper(profile, clickedProfile)
              )
            }
          }));
        }catch(err){
          // console.log(err)
        }
      }
    
      useEffect(() => {
        const HandleMount = async() =>{
          try{
            const {data} = await axiosReq.get(`/profiles/?ordering=-followers_count`);
            setProfileData(prevState =>({
              ...prevState, PopularProfiles: data,
            }))
          }catch(err){
              // console.log(err)
          }
        }
        HandleMount()
      }, [currentUser])





  return (
    <ProfileDataContext.Provider value={profileData}>
        <SetProfileDataContext.Provider value={{setProfileData, handleFollow, handleUnfollow}}>

        {children}

        </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  )
}

export default ProfileDataContext