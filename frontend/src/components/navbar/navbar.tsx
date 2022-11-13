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
    alert('뒤로가기')
  }

  console.log(location.pathname);
  const [nowPage, setNowPage] = useState(' ');

  useEffect(() => {
    if (location.pathname === '/Collection') {
      setNowPage('나의 컬렉션')
    } else if (location.pathname === '/Board') {    
      setNowPage('방명록')
    } else if (location.pathname === '/Custommain/:userid') {
      setNowPage('나의 스노우볼')
    } else if (location.pathname === '/Welcome') {
      setNowPage('선물하기')
    } else if (location.pathname === '/Setnickname') {
      setNowPage('닉네임 설정하기')
    } else {
      setNowPage('나의 친구 목록')
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