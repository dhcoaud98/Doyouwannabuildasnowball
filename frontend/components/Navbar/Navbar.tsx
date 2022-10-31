import * as React from 'react';
import { useRouter, } from 'next/router';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import styles from "./Navbar.module.css"
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
// import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar= () => {

  // const navigate = useNavigate();
  
  const goback = () => {
    // navigate('/[userid]');
    alert('뒤로가기')
  }

  const router = useRouter();
    
  console.log(router.pathname);

  const [nowPage, setNowPage] = React.useState(' ');

  useEffect(() => {
    if (router.pathname === '/Collection') {
      setNowPage('나의 컬렉션')
    } else if (router.pathname === '/Board') {
      setNowPage('방명록')
    } else if (router.pathname === '/CustomMain') {
      setNowPage('나의 스노우볼')
    } else {
      setNowPage('나의 친구 목록')
    }
  });


  return (
    <Grid container>   
      
      {/* 뒤로가기 */}
      <Grid xs={2} item >
        <IconButton sx={{ m: 2.5, p:0 }} onClick={goback}>
          <Avatar alt="" src="/images/wreath_1.png" className={styles.avatar}></Avatar>
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

export default Navbar