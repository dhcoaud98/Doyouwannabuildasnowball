import { Grid, Stack } from '@mui/material';
// three import
import MainContainer from "components/Three/MainContainer";
import styles from "./CustomMain.module.css"
import gsap from 'gsap'

import { styled } from '@mui/material/styles';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ShareIcon from '@mui/icons-material/Share';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import CustomList from "../components/Custom/CustomList"



const CustomMain= () => {
  // 스피드 다이얼 스타일
  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
  }));

  // 스노우볼 커스텀 리스트창 상태
  const [customListState, setCustomListState] = useState(false);
  const customListStyles = customListState ? styles.custom_list : styles.d_none;
  const noneAtCustomListTrue = customListState ? styles.d_none : "";
  const noneAtCustomListFalse = customListState ? "" : styles.d_none;

  // 스피드 다이얼 버튼들 함수
  const customSnowBall = () => {
    if (customListState === false) {
      console.log('커스텀시작')
      setCustomListState((prev) => true)
    } else {
      console.log('커스텀 끄읏')
      setCustomListState((prev) => false)
    }
  }
  const shareSnowBall = () => {}
  const showFriends= () => {}
  
  const actions = [
    { icon: <AutoFixHighIcon />, name: '꾸미기', eventFunc: customSnowBall},
    { icon: <ShareIcon />, name: '공유', eventFunc: shareSnowBall},
    { icon: <PeopleIcon />, name: '친구목록', eventFunc: showFriends},
  ];

  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div" container direction="column" justifyContent="space-between">                                
          {/* 상단 */}
          <Grid component="div" item container xs={2} className={styles.upper}>
              
              <Grid xs={2} item component="div"></Grid>

              {/* 현재 화면 이름 */}
              <Grid xs={8} item component="div" style={{justifyContent: 'end'}}>
                <h1 className='cntmenu-text'>나의 스노우볼</h1>
              </Grid>

              {/* 스피드다이얼 */}
              <Grid xs={2} item component="div" style={{position:'relative', height: '4.5rem'}}>
                <StyledSpeedDial
                  ariaLabel="SpeedDial playground example"
                  icon={<MenuIcon />}
                  direction='down'
                  FabProps={{
                    sx: {
                      // bgimage: '/images/wreath_1.png',
                      bgcolor: '#FFF3E1',
                      // bgcolor: 'transparent',
                      color: '#662113',
                      '&:hover': {
                        bgcolor: '#FFF3E1',
                      }
                    }
                  }}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      className={styles.brownicon}
                      onClick={action.eventFunc}
                    />
                  ))}
                </StyledSpeedDial>
              {/* </Box> */}
              </Grid>

          </Grid>

          {/* Three.js */}
          <Grid component="div" item xs={9} className={noneAtCustomListTrue}>
            <MainContainer/>

            <div className={styles.container}>
              <div className={`${styles.button} ${styles.btn_clickable}`}>
                <div className={styles.slider}>
                  <div className={styles.slider_text}>
                    <div className={styles.text}>마을 놀러가기!</div>
                  </div>
                  <div className={styles.slider_trigger}>
                    <div className={styles.controller} id='controller'>
                     <ArrowForwardIosIcon />
                    </div>
                    <div className={styles.endpoint_container}>
                      <div className={styles.endpoint} id='controllerDrop'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid> 

          <Grid component="div" item xs={6} className={noneAtCustomListFalse}>
            <MainContainer/>
          </Grid> 

          
          {/* 하단 */}
          <Grid component="div" item xs={1} className={noneAtCustomListTrue}>
            <img src="/images/decoration.png" alt="" className={styles.decoration}/>
          </Grid>      

          <Grid component="div" item xs={4} className={noneAtCustomListFalse}></Grid>   
          
          <div className={customListStyles}>
            <CustomList/>
          </div>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default CustomMain