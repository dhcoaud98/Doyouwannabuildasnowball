import react, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import '../../index.css'
import styles from "./navbar.module.css"
import wreath1Img from "../../assets/images/wreath_1.png"

import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocationCityOutlined } from "@mui/icons-material";


export function Navbar() {
  // 현재 페이지 확인
  const router = useNavigate();
  let location = useLocation();

  // 뒤로가기
  const goback = () => {
    // navigate('/[userid]');
    router(-1)
  }

  const [nowPage, setNowPage] = useState(' ');
  const [isXMasPage, setIsXMasPage] = useState(false)

  useEffect(() => {
    if (location.pathname === '/collection') {
      setNowPage('나의 컬렉션')
    } else if (location.pathname === '/board') {    
      setNowPage('방명록')
    } else if (location.pathname.includes('/custommain/')) {
      setNowPage('나의 스노우볼')
    } else if (location.pathname === '/friends') {
      setNowPage('나의 친구 목록')
    } else if (location.pathname === '/setnickname') {
      setNowPage('닉네임 설정하기')
    } else {
      setNowPage('선물하기')
      if (location.pathname === '/merrychristmas') {
        setIsXMasPage(true)
      }
    }
  });

  return (
    <Grid container>   
      
      {/* 뒤로가기 */}
      <Grid xs={2} item>
        <IconButton sx={{ m: 2.5, p:0 }} onClick={goback} disabled={isXMasPage ? true : false}>
          <Avatar alt="" src={wreath1Img} className={styles.avatar}></Avatar>
          <ArrowBackIcon className={styles.arrow}/>
        </IconButton>
      </Grid>

      {/* 현재 화면 이름 */}
      <Grid xs={8} item>
        <h1 className={styles.cntmenu_text}>{nowPage}</h1>
      </Grid>

      {/* 좌우대칭 */}
      <Grid xs={2} item></Grid>
    </Grid>
  )
}