// Systems
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { useDispatch } from "react-redux";
import { RootState } from "../app/store";

// Other components
import tutorialBoxImg from "../assets/images/tutorial_box.png"
import decorationImg from "../assets/images/decoration.png"
import "../index.css"
import styles from "./setnickname.module.css"
import { Navbar } from '../components/navbar/navbar';
import { API_URL } from "../switchurl"
import { setNickname } from "../features/userSlice";

// MUI
import { Grid, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'

// ------------------------------------------------------------------------

// 버튼 색
const theme = createTheme({
  palette: {
    primary: {
      main: '#A6D388',
    },
    success:{
      main: '#FFC3C3',
    },
    secondary:{
      main: '#6A1206',
    }
  },
});

function Setnickname() {
  const APIURL = API_URL()

  const router = useNavigate()

  const dispatch = useAppDispatch()

  // 현재 서비스 사용자아이디
  const nowUserID = useAppSelector((state : RootState)  => state.user.userId);
  let nowUserNickName = useAppSelector((state: RootState) => state.user.nickname)

  const [insertedNickName, setInsertedNickName] = useState(nowUserNickName)

  const [isOverLap, setIsOverLap] = useState(0)

  const changingNickName = (event:any) => {
    setInsertedNickName(event.target.value)
  }

  // 중복확인 함수
  const checkNickName = () => {
    axios.get(`${APIURL}api/member/confirm/${insertedNickName}`)
      .then((response) => {
        if (insertedNickName === null) {
          alert ("설정할 닉네임을 입력해주세요.")
        } else if (insertedNickName.length > 8) {
          alert ("닉네임은 최대 8자까지로 입력해주세요.")
        } else {
          if (response.data === true) {
            alert("중복되는 닉네임입니다. 다른 닉네임을 입력해주세요")
            setIsOverLap((prev) => 1)
          } else if (response.data === false) {
            alert("사용가능한 닉네임입니다.")
            setIsOverLap((prev) => 2)
          }
        }
      })
      .catch((error) => {
      })
  }
  
  // 닉네임 설정 함수
  const updateNickName = () => {
    axios.patch(`${APIURL}api/member/update`, {
      memberId: nowUserID,
      nickname: insertedNickName
    })
    .then((response) => {
      console.log('성공')
      alert('닉네임이 변경되었습니다.')
      dispatch(setNickname(insertedNickName))
      router(`/custommain/${nowUserID}`)
    })
    .catch((error) => {
      console.log(error)
    })
  }

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
              <p className={`font-bold ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.8rem'}}>사용할 닉네임을</p>
              <p className={`font-bold ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.8rem', marginBottom:'15%'}}>설정해주세요.</p>

              <div style={{ width: '70%', marginBottom: '5%'}}>
                <ThemeProvider theme={theme}>
                  <TextField onChange={changingNickName} fullWidth color="secondary" label="NickName" id="fullWidth" placeholder={nowUserNickName} inputProps={{ maxLength: 8 }}/>
                </ThemeProvider>
              </div>

              <ThemeProvider theme={theme}>
                <Button onClick={() => checkNickName()} variant="contained" color="success" className={styles.check_button}>
                  <p className={`font-bold ${styles.check_button_text}`}>중복확인</p>
                </Button>
              </ThemeProvider>

              <ThemeProvider theme={theme}>
                <Button disabled={isOverLap !== 2 ? true : false} onClick={() => updateNickName()} variant="contained" color="primary" className={styles.setnickname_button}>
                  <p className={`${styles.green_text} ${styles.setnickname_button_text}`}>닉네임 설정하기</p>
                </Button>
              </ThemeProvider>
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

export default Setnickname