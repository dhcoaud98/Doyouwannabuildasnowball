import Button from '@mui/material/Button';
import { Grid, Stack } from '@mui/material';
import styles from "./index.module.css"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

const Home = () => {

  // 로그인
  const API_SERVER = "http://localhost:8080/api"
  const AUTH_URL = API_SERVER + "/oauth2/authorize/kakao"
  const CLIENT_URL = "http://localhost:3000"
  const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}`
  const REDIRECT_URI = AUTH_URL + OAUTH2_REDIRECT_URI
  // const REDIRECT_URI = 'http://localhost:8080/api/oauth2/authorize/kakao'
  // const CLIENT_URL = "http://localhost:3000"
  // const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}`
  
  // const navigate = useNavigate()
  const router = useRouter();


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
      router.push('/CustomMain')
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
          <img src="/images/main_logo.png" alt="" className={styles.main_logo}/>

          {/* 카카오로그인버튼 - 고정 */}
          <a href={REDIRECT_URI}>
            <div id="kakao-button" className={styles.kakao_login_btn}><img src="/images/kakao_login_btn.png" alt="" className={styles.kakao_login_img} /></div>
          </a>
          {/* <Button className={styles.kakao_login_btn}><img src="/images/kakao_login_btn.png" alt="" className={styles.kakao_login_img} /></Button> */}

          {/* 하단 장식줄 - 고정 */}
          <img src="/images/decoration.png" alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default Home