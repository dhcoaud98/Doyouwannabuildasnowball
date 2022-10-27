import * as React from 'react';
import { style } from '@mui/system'
import styles from './Navbar.module.css'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';


const Navbar= () => {

  // const history = useHistory();

  const goback = () => {
    // history.push('/');
    alert('뒤로 가기')
  }


  return (
      <div className={styles.navbar}> 

        {/* 뒤로가기 버튼 */}
        <IconButton sx={{ p: 0 }} onClick={goback}>
          <Avatar alt="" src="/images/wreath_1.png">
          </Avatar>
        </IconButton>

        <Typography sx={{ p: 2 }} className={styles.navbar_text}>
          나의 친구들
        </Typography>

        {/* 햄버거 버튼 */}
        
        <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>


      </div>
    )
}

export default Navbar