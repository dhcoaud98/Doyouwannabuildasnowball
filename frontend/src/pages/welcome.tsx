// Systems
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../app/hooks"

// Other components
import "../index.css"
import styles from "./welcome.module.css"
import tutorialBoxImg from "../assets/images/tutorial_box.png"
import decorationImg from "../assets/images/decoration.png"
import kakaoLoginBtnImg from '../assets/images/kakao_login_btn.png'
import { Navbar } from '../components/navbar/navbar';
import { setUserId } from "../features/userSlice"

// MUI
import { Grid, Button, Stack } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles'

// ------------------------------------------------------------------------

// 버튼 색
const theme = createTheme({
  palette: {
    primary: {
      main: '#A6D388',
    },
    success:{
      main: '#FED6D6',
    },
  },
});

function Welcome() {
  const dispatch = useAppDispatch()
  const router = useNavigate()
  // 뒤로가기
  const goback = () => {
    dispatch(setUserId(1))
    router(-1)
  }

  const API_SERVER = "https://mylittlesnowball.com/api"
  const AUTH_URL = API_SERVER + "/oauth2/authorize/kakao"
  const CLIENT_URL = "https://mylittlesnowball.com"
  const OAUTH2_REDIRECT_URI = `?redirect_uri=${CLIENT_URL}`
  const REDIRECT_URI = AUTH_URL + OAUTH2_REDIRECT_URI

  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} lg={4} xl={3} pt={8} item id="main_div">
          <div className={styles.navbar}>
            <Navbar/>
          </div>
          <div className={styles.description_box}>
            <img src={tutorialBoxImg} alt="" className={styles.tutorial_box}/>
            <div className={styles.description}>
              <h1 className={`${styles.welcome_text} ${styles.green_text}`}>정말 반가워요 !</h1>
              <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem'}}>방문자님도</p>
              <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem'}}>본인만의 스노우볼을</p>
              <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem'}}>갖고 싶지 않으세요?</p>

              <a href={REDIRECT_URI} style={{ width:'100%'}}>
                <div id="kakao-button" className={`${styles.kakao_login_btn}`}>
                  <img src={kakaoLoginBtnImg} alt="" className={`${styles.kakao_login_img}`} />
                </div>
              </a>

              <ThemeProvider theme={theme}>
                <Button onClick={() => goback()} variant="contained" color="success" className={styles.welcome_button}>
                  <p className={styles.welcome_button_text}>선물만 해줄래요</p>
                </Button>
              </ThemeProvider>
              
              <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize:'1.1rem'}}>주의 !</p>
              <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize:'1.1rem'}}>회원가입 미진행시 선물 받는 분이</p>
              <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize:'1.1rem'}}>누구의 선물인지 알 수 없습니다.</p>
            </div>
          </div>
          <img src={decorationImg} alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}
export default Welcome