import * as React from 'react';
import { Grid } from '@mui/material';
import styles from "./[userid].module.css"
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
import Image from 'next/image'

// 컴포넌트
import Navbar from 'components/Navbar/Navbar';
import SearchBar from 'components/Search/SearchBar';

// 모달 스타일
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '50%',
  bgcolor: '#FFF8F3',
  border: '2px solid #A6D388',
  boxShadow: 10,
  p: 4,
};

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

const Profile= () => {

  // [채명] axios로 친구 목록 받아서 friends에 넣기
  const friends = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  // [채명] modal창 만들기
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <ThemeProvider theme={theme}>
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
            
            {/* 여기는 서치바 */}
            <div className={styles.search}>
              <SearchBar/>
            </div>

            {/* 장식 */}
            <div className={styles.deco}>
              <img src="/images/decoration.png" alt="" className={styles.decoimag}/>
            </div>
            
            {/* 여기는 친구 목록 */}
            <div className={styles.friends}>
              <Container>
                <Box component="div" sx={{ bgcolor: '#FFF8F3', height: '65vh' }}>
                    <List
                      sx={{
                        position: 'relative',
                        width: '100%',
                        bgcolor: '#FFF8F3',
                        overflow: 'auto',
                        maxHeight: '100%',
                        '& ul': { padding: 0 },
                      }}
                    >
                      {friends.map((item) => (
                        <ListItem sx={{height: 100}} key={item}>
                          <ListItemAvatar sx={{ mr:2 }}>
                            <Badge color="error" badgeContent={15} max={100} onClick={handleOpen}>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </Badge>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box component="div" sx={style}>

                                  <Grid xs={12} item component="div">
                                    <Button>
                                      <ArrowBackIcon />
                                    </Button>
                                  </Grid>
                                  <Grid xs={12} item component="div" style={{justifyContent: 'center'}}>
                                    <h1 className={styles.cntmenu_text1}>스노우볼 요청</h1>
                                  </Grid>
                                  <Grid xs={12} item component="div" style={{justifyContent: 'center'}} sx={{ mt:4, mb: 8 }}>
                                    <h4 className={styles.cntmenu_text1}>스노우볼 요청이 왔네요!</h4>
                                  </Grid>
                                  <Grid xs={12} item component="div" className={styles.gift_delete_button} sx={{ m:4 }}>
                                    <Button variant="contained" color="primary" sx={{width: '70%'}}>
                                      <h4 className={styles.go}>선물하러 가기</h4></Button>
                                  </Grid>
                                  <Grid xs={12} item component="div" className={styles.gift_delete_button} sx={{ m:4 }}>
                                    <Button variant="contained" color="success" sx={{width: '70%'}}>
                                    <h4 className={styles.go}>요청 삭제하기</h4></Button>
                                  </Grid>

                              </Box>
                            </Modal>
                          </ListItemAvatar>
                          <ListItemText primary={`Item ${item}`} />
                          {/* 편지 요창 버튼 */}
                          <Button>
                            <ForwardToInboxIcon color="error" fontSize='large' />
                          </Button>
                          {/* 친구 신청 후 상대방이 받을 때까지 기다리는 버튼 */}
                          <Button>
                            <AutorenewIcon color="disabled" fontSize='large' />
                          </Button>
                          {/* 친구 삭제 버튼 */}
                          <Button>
                            <PersonRemoveIcon color="disabled" fontSize='large' />
                          </Button>
                          {/* 상대방이 나에게 친구 신청했는데 내가 안 받은 버튼 + 친구 신청 버튼 */}
                          <Button>
                            <PersonAddIcon color="inherit" fontSize='large' />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
              </Container>
            </div>

          </Grid>
          {/* 오른쪽 마진 */}
          <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
        </Grid>
      </div>
    </ThemeProvider>
    )
}

export default Profile