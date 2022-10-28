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


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
}));

const actions = [
  { icon: <AutoFixHighIcon />, name: '꾸미기' },
  { icon: <ShareIcon />, name: '공유' },
  { icon: <PeopleIcon />, name: '친구목록' },
];

const CustomMain= () => {
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

              {/* <Box component="div" sx={{ position: 'relative', mt: 3, height: 320 }}> */}
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
                    />
                  ))}
                </StyledSpeedDial>
              {/* </Box> */}
              </Grid>

          </Grid>

          {/* Three.js */}
          <Grid component="div" item xs={9}>
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

          {/* 하단 */}
          <Grid component="div" item xs={1}>
            <img src="/images/decoration.png" alt="" className={styles.decoration}/>
          </Grid>      
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default CustomMain