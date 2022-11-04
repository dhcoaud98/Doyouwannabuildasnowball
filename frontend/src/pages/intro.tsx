// Systems
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Other components
import kakaoLoginBtnImg from '../assets/images/kakao_login_btn.png'
import decorationImg from '../assets/images/decoration.png'
import mainLogoImg from '../assets/images/main_logo.png'
import "../index.css"
import styles from "./intro.module.css"

// MUI
import { Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

// ------------------------------------------------------------------------

const Home = () => {
  // react hook
  const dispatch = useDispatch()

  // 로그인
  const API_SERVER = "http://localhost:8080/api"
  const AUTH_URL = API_SERVER + "/oauth2/authorize/kakao"
  const CLIENT_URL = "http://localhost:3000"
  // const API_SERVER = "https://mylittlesnowball.com/api"
  // const AUTH_URL = API_SERVER + "/oauth2/authorize/kakao"
  // const CLIENT_URL = "https://mylittlesnowball.com"
  const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}`
  const REDIRECT_URI = AUTH_URL + OAUTH2_REDIRECT_URI
  // const REDIRECT_URI = 'http://localhost:8080/api/oauth2/authorize/kakao'
  // const CLIENT_URL = "http://localhost:3000"
  // const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}`
  
  // const navigate = useNavigate()
  const router = useNavigate();

  useEffect(() => {
    const code = window.location.search
    let param = new URLSearchParams(code);
    const accessToken = param.get('accessToken');
    console.log('code = ', code)
    console.log('accessToken = ', accessToken)

    if(accessToken) {
      // console.log("현재 login됨")
      // console.log(accessToken)
      localStorage.setItem("accessToken", accessToken); // 토큰을 로컬 스토리지에 저장 === 로그인 함.
      console.log("localStorage = ", window.localStorage)
      axios({
        method: "GET",
        url: `http://localhost:8080/api/member/me`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
          dispatch(setUser(res.data))
          router(`/CustomMain/${res.data.memberId}`)
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
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div">
          {/* 메인로고 */}
          <img src={mainLogoImg} alt="" className={styles.main_logo}/>

          {/* 카카오로그인버튼 - 고정 */}
          <a href={REDIRECT_URI}>
            <div id="kakao-button" className={styles.kakao_login_btn}>
              <img src={kakaoLoginBtnImg} alt="" className={styles.kakao_login_img} />
            </div>
          </a>
          {/* <Button className={styles.kakao_login_btn}><img src="/images/kakao_login_btn.png" alt="" className={styles.kakao_login_img} /></Button> */}

          {/* 하단 장식줄 - 고정 */}
          <img src={decorationImg} alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default Home
