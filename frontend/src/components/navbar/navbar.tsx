import react, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import '../../index.css'
import styles from "./navbar.module.css"
import wreath1Img from "../../assets/images/wreath_1.png"

import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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

  useEffect(() => {
    if (location.pathname === '/collection') {
      setNowPage('나의 컬렉션')
    } else if (location.pathname === '/board') {    
      setNowPage('방명록')
    } else if (location.pathname === '/custommain/:userid') {
      setNowPage('나의 스노우볼')
    } else if (location.pathname === '/friends/:userid') {
      setNowPage('나의 친구 목록')
    } else if (location.pathname === '/setnickname') {
      setNowPage('닉네임 설정하기')
    } else {
      setNowPage('선물하기')
    }
  });

  return (
    <Grid container>   
      
      {/* 뒤로가기 */}
      <Grid xs={2} item >
        <IconButton sx={{ m: 2.5, p:0 }} onClick={goback}>
          <Avatar alt="" src={wreath1Img} className={styles.avatar}></Avatar>
          <ArrowBackIcon className={styles.arrow}/>
        </IconButton>
      </Grid>

      {/* 현재 화면 이름 */}
      <Grid xs={8} item>
        <h1 className='cntmenu-text'>{nowPage}</h1>
      </Grid>

      {/* 좌우대칭 */}
      <Grid xs={2} item></Grid>
    </Grid>
  )
}