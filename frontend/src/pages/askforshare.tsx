// Systems
import { useNavigate, useParams, Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import { useEffect, useState } from "react";
import axios from 'axios';

// Other components
import "../index.css"
import styles from "./askforshare.module.css"
import tutorialBoxImg from "../assets/images/tutorial_box.png"
import decorationImg from "../assets/images/decoration.png"
import { Navbar } from '../components/navbar/navbar';
import { API_URL } from "../switchurl"
import { RootState } from "../app/store";

// MUI
import { Grid, Button } from "@mui/material"
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

function AskForShare() {
  const APIURL = API_URL()
  const nowUserID = useAppSelector((state : RootState)  => state.user.userId);
  const ownerUserID = Number(useParams().userid)
  const snowglobeID = Number(useParams().snowballid)
  const router = useNavigate()
  const dispatch = useAppDispatch()
  const [ownerUserNickName, setOwnerUserNickName] = useState("")

  const yesShare = () => {
    axios.patch(`${APIURL}api/snowglobe/${snowglobeID}/save`)
    .then((res)=>{
      alert('공유완료')
      router(`/custommain/${ownerUserID}`)
    })
    .catch((err) => {
    })
  }

  const noThanks = () => {
    alert('선물완료')
    router(`/custommain/${ownerUserID}`)
  }

  useEffect(() => {
    axios.get(`${APIURL}api/member/info/${ownerUserID}`)
    .then((response) => {
      setOwnerUserNickName(response.data.nickname)
    })
    .catch((error) => {
    })
  },[]) 

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

            <Grid container direction="row" className={styles.description} justifyContent="center">
              <Grid item spacing={3}>
                <p className={`font-bold ${styles.welcome_text} ${styles.green_text}`} style={{fontSize: '1.8rem', margin:0}}>정말 예쁜 스노우볼이네요!</p>
                <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem', margin:0}}>{ownerUserNickName}님도</p>
                <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem', margin:0}}>분명 좋아하실거에요</p>
              </Grid>

              <Grid item>
                <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize: '1.8rem', margin:0}}>{ownerUserNickName}님과</p>
                <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize: '1.8rem', margin:0}}>스노우볼을</p>
                <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize: '1.8rem', margin:0}}>함께 가지고 싶으신가요?</p>
              </Grid>

              <Grid item container justifyContent="center">
                <ThemeProvider theme={theme}>                  
                  <Button onClick={() => yesShare()} variant="contained" color="primary" className={styles.welcome_button}>
                    <p className={`${styles.welcome_button_text} ${styles.green_text}`}>네, 좋아요!</p>
                  </Button>

                  <Button onClick={() => noThanks()}variant="contained" color="success" className={styles.welcome_button}>
                    <p className={styles.welcome_button_text}>괜찮아요.</p>                      
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </div>
          <img src={decorationImg} alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default AskForShare