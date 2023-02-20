import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import  Button from "react-bootstrap/Button";
import  Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import Products from "../products/Products";
import { fetchMoreData } from "../../utils/utils";
import noResults from '../../assets/noResults.jpg'
import { ProfileEditDropdown } from "../../components/MoreDropdown";



function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const {id} = useParams();
  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
  const {pageProfile} = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profileProduct, setProfileProduct] = useState({results: []})

  useEffect(() => {
    const fetchData = async() =>{
        try{
            const [{data: pageProfile}, {data: profileProduct}] = await Promise.all([
                axiosReq.get(`/profiles/${id}/`),
                axiosReq.get(`/products/?owner__profile=${id}`)
            ])
            setProfileData(prevState =>({
                ...prevState, 
                pageProfile: {results: [pageProfile]} 
            }))
            setProfileProduct(profileProduct);
            setHasLoaded(true);
        }catch(err){
            // console.log(err)
        }
    }
      fetchData()
  }, [id, setProfileData])

  const mainProfile = (
    
    <>
    {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage} src={profile?.image} roundedCircle />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
        <Row className="justify6-content-center no-gutters">
            <Col xs={3} className='my-2'>
                <div>{profile?.products_count}</div>
                <div>insertions</div>
                </Col>
                <Col xs={3} className='my-2'>
                <div>{profile?.followers_count}</div>
                <div>follower</div>
                </Col>
                <Col xs={3} className='my-2'>
                <div>{profile?.following_count}</div>
                <div>following</div>
                </Col>
            
        </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
            {currentUser && !is_owner && (
                profile?.following_id ? (
                    <Button className={`${btnStyles.Button}`} onClick={() => handleUnfollow(profile) }> Unfollow</Button>
                ): (
                    <Button className={`${btnStyles.Button}`} onClick={() => handleFollow(profile)}> Follow</Button>
                )
            )}
        <p>Follow button</p>
        </Col>
        {profile?.content &&  <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileProducts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s insertions</p>
      <hr />
      {profileProduct.results.length ? (
        <InfiniteScroll children={profileProduct.results.map(product =>(
            <Products key={product.id} {...product} setProfileProduct={profileProduct}/>
        ))}
        dataLength={profileProduct.results.length}
        loader={<Asset spinner />}
        hasMore={!!profileProduct.next}
        next={()=>{fetchMoreData(profileProduct, setProfileData)}} />
       
      ):(
        <Asset src={noResults} message={`No results found, ${profile?.owner} hasn't posted yet.`}/>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileProducts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;