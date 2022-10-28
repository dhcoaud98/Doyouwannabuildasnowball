import styles from "./Collection.module.css"
import * as React from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
// import { theme } from "@/styles/theme";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// 컴포너트
import Navbar from 'components/Navbar/Navbar';
import SearchBar from 'components/Search/SearchBar';


const Collection= () => {


  return (
    
      <div id="container_div">
        <Grid container id="container_div">
          {/* 왼쪽 마진 */}
          <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

          {/* 메인 콘텐츠 */}
          <Grid xs={12} sm={8} md={6} xl={4} item id="main_div">
            
            {/*모바일 위 여백*/}
            <div className={styles.navbar_top_margin}>
            </div>

            {/* 여기는 네브바 */}
            <div className={styles.navbar}>
              <Navbar/>
            </div>

            {/* 여기는 설명 */}
            <div className={styles.navbar_info}>
              <div className={styles.navbar_info_text}>  
                원하는 스노우볼을 선택하세요
              </div>
            </div>

            {/* 여기는 컬렉션 박스 */}
            <div className={styles.collection_box}>
              <div>
                <img src="../public/images/deco1.png" alt="" className={styles.flower_deco}/>
              </div>
            </div>


          </Grid>
          {/* 오른쪽 마진 */}
          <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
        </Grid>
      </div>
    )
}

export default Collection