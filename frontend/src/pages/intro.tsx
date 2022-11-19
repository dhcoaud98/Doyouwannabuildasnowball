// Systems
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Other components
import { API_URL } from "../switchurl"
import kakaoLoginBtnImg from '../assets/images/kakao_login_btn.png'
import decorationImg from '../assets/images/decoration.png'
import mainLogoImg from '../assets/images/main_logo.png'
import "../index.css"
import styles from "./intro.module.css"

// MUI
import { Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { setCurrentSb } from '../features/snowballSlice';

// ------------------------------------------------------------------------

const Home = () => {
  // react hook
  const dispatch = useDispatch()

  // 로그인
  // 로컬서버
  const API_SERVER = "http://localhost:8080/api"
  const CLIENT_URL = "http://localhost:3000"

  // 배포서버
  // const API_SERVER = "https://mylittlesnowball.com/api"
  // const CLIENT_URL = "https://mylittlesnowball.com"
  
  const AUTH_URL = API_SERVER + "/oauth2/authorize/kakao"
  const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}`
  const REDIRECT_URI = AUTH_URL + OAUTH2_REDIRECT_URI
  
  // const navigate = useNavigate()
  const router = useNavigate();
  const APIURL = API_URL()
  useEffect(() => {
    const code = window.location.search
    let param = new URLSearchParams(code);
    const accessToken = param.get('accessToken');
    const newMember = param.get('newMember')
    console.log('code = ', code)
    console.log('accessToken = ', accessToken)
    console.log('newMember = ', newMember)

    if (accessToken) {
      // console.log("현재 login됨")
      // console.log(accessToken)
      localStorage.setItem("accessToken", accessToken); // 토큰을 로컬 스토리지에 저장 === 로그인 함.
      console.log("localStorage = ", window.localStorage)

      axios({
        method: "GET",
        url: `${APIURL}api/member/me`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        console.log(res.data)
          dispatch(setUser(res.data))
          axios({
            method: "GET",
            url: `${APIURL}api/snowglobe/${res.data.memberId}`,
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then((rs) => {
            console.log(rs.data)
            dispatch(setCurrentSb(rs.data))
          })
          
          if (newMember === 'true') {
            router('/setnickname')
          } else {
            router(`/custommain/${res.data.memberId}`)
          }
      })
      
      // setTimeout(() => {
      //   navigate('/')
      // }, 1000);
    }
  }, [])


  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} lg={4} xl={3} item id="main_div">
          {/* 메인로고 */}
          <img src={mainLogoImg} alt="" className={styles.main_logo}/>

          {/* 카카오로그인버튼 - 고정 */}
          <a href={REDIRECT_URI} style={{ width:'100%'}}>
            <div id="kakao-button" className={`${styles.kakao_login_btn}`}>
              <img src={kakaoLoginBtnImg} alt="" className={`${styles.kakao_login_img}`} />
            </div>
          </a>
          {/* <Button className={styles.kakao_login_btn}><img src="/images/kakao_login_btn.png" alt="" className={styles.kakao_login_img} /></Button> */}

          {/* 하단 장식줄 - 고정 */}
          <img src={decorationImg} alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default Home