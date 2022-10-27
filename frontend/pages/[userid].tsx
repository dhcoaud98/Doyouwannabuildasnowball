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

// 컴포너트
import Navbar from 'components/Navbar/Navbar';
import SearchBar from 'components/Search/SearchBar';


const Profile= () => {

  // [채명] axios로 친구 목록 받아서 friends에 넣기
  const friends = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
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
                      bgcolor: 'FFF8F3',
                      overflow: 'auto',
                      maxHeight: '100%',
                      '& ul': { padding: 0 },
                    }}
                  >
                    {friends.map((item) => (
                      <ListItem sx={{height: 100}}>
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`Item ${item}`} />
                        <Button color="error">
                         <ForwardToInboxIcon fontSize='large'/>
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
    )
}

export default Profile