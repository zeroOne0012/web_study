import React, { useState } from 'react';
import Webcam from '../components/Webcam';
import Video from '../components/Video';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { useCookies } from 'react-cookie';

function Study() {
  const [cookie] = useCookies(['authToken']);
  axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.authToken}`;
  const [urlId, setUrlId] = useState(null);
  const location = useLocation();
  const c_id = location.pathname.split("/")[2];
  // useEffect(()=>{
    const getChapter = async ()=>{
      await axios.get(`/api/get/URL/?class_id=${c_id}`)
      .then(res=> setUrlId(res.data.URL))
      .catch(err=>console.error("Error: ", err));
    };
    getChapter();
  // }, []);
  return (
    <>
      <h1>학습 페이지</h1>
      {urlId}
      <Container>
        {urlId ? <Video videoId={urlId} /> : <Loading></Loading>}
        <Webcam/>
      </Container>
    </>
  );
}

export default Study;

const Container = styled.div`
  display: flex;
`;