import React from "react";
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const KakaoAuthHandler = () => {

  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code)
  useEffect(() => {
  axios.get(`${process.env.REACT_APP_DB_HOST}/oauth/kakao/callback?code=${code}`)
  .then((res)=> {
    console.log(res.data.access_token)
    const token = res.data.access_token
    axios.post(`${process.env.REACT_APP_DB_HOST}/api/oauth/login`,{
      memberType: "KAKAO"
    },{
      headers: {
        Authorization: `Bearer ${token}`
      }})
    .then((res)=>{
      localStorage.setItem('accessToken', `${res.data.accessToken}`);
      localStorage.setItem('refreshToken', `${res.data.refreshToken}`);
      localStorage.setItem('accessTokenExpireTime',res.data.accessTokenExpireTime);
      axios.defaults.headers.common['Authorization'] = `${res.data.grantType} ${res.data.accessToken}`;
      window.alert(`카카오이메일로 로그인 하셨습니다.`);
      navigate('/');
    })
  })
  .catch(err => {
    console.log(err)
  })
  
})

  return (
    <div>
      로그인중입니다.
    </div>
  )
};



export default KakaoAuthHandler;