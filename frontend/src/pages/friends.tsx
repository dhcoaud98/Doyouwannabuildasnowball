// Systems
import * as React from 'react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import axios from 'axios';

// Other components
import "../index.css"
import styles from "./friends.module.css"
import Navbar from '../components/navbar/navbar';
import SearchBar from '../components/search/searchbar';
import { RootState } from '../app/store';
import decorationImg from "../assets/images/decoration.png"

// MUI
import { Grid, Box, Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Badge, Modal } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ImageIcon from '@mui/icons-material/Image';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../assets/fonts/font.css'
// ------------------------------------------------------------------------

// 컴포넌트


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

// Member 타입 지정
type Member = {
  friendId: number,
  memberId: number,
  nickname: string,
  profileImageUrl: string,
  nullsnowglobeId: number,
  snowglobeRequestCnt: number,
  status: number,
}

const Profile= () => {
  // 라우터
  // const router = useRouter();
  // const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwicm9sZSI6IlJPTEVfTUVNQkVSIiwiaXNzIjoic25vd2JhbGwiLCJpYXQiOjE2NjczNjMwMTAsImV4cCI6MTY2NzQ0OTQxMH0.Qy5pTKtpf_BTJxU4Qv6PWDmajOg_Ac1kGZArd3JcIfZ0bv2X60XgWXqWge1ZbjwwsV5tY6l9eHIEmox1eI2WjA'
  // console.log("access token  : " , accessToken)

  // const [nowUser, setNowUser] = useState(0);

  const nowUser = useSelector((state : RootState)  => state.user.userId);
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/friend/list/${nowUser}` 
        )
        setfriends(response.data);
        console.log("친구목록 = ", response.data)
      } catch (err: any) {
          console.log('errer = ', err)
        }
      }
    fetchUsers();
  }, [])

  // 모달에 들어가는 한명의 데이터
  let [member, setMember] = useState<Member>({
    friendId: -1,
    memberId: -1,
    nickname: "",
    profileImageUrl: "",
    nullsnowglobeId: -1,
    snowglobeRequestCnt: -1,
    status: -1,
  })


  // 친구 삭제 함수
  const deleteFriend = (friendId : any) => {
    axios.delete(`http://localhost:8080/api/friend/list/${friendId}?memberId=${nowUser}`)
      .then(res => {
        // console.log("새로 받은 데이터 = ", res.data);
        setfriends(res.data);
    })
  }

  // 친구 요청 받기
  const followFriend = (friendId : any) => {
    axios.patch(`http://localhost:8080/api/friend/request/${friendId}?memberId=${nowUser}`)
      .then(res => {
        // console.log("새로 받은 데이터 = ", res.data);
        setfriends(res.data);

      })
  }

  // 스노우볼 요청
  const requestLetter = (memberId : any) => {
    axios.post(`http://localhost:8080/api/friend/snowglobe/request`, {
        "receiveMemberId" : memberId,
        "sendMemberId" : nowUser
      })
        .then(res => {
          // console.log("새로 받은 데이터 = ", res.data);
          if (res.data==='fail') {
            alert('요청이 불확실합니다.')
          }
        })
        .catch(err => {
          alert('요청이 불확실합니다.')
        })
  }

  // 스노우볼 요청 삭제
  const requestDelete = (memberId : any) => {
    console.log(memberId)
    axios.delete(`http://localhost:8080/api/friend/snowglobe/request`, {
      //헤더에 포함된 정보들 
    	data:{
        "sendMemberId" : memberId,
        "receiveMemberId" : nowUser
        }
    })
      .then(res => {
        // console.log("새로 받은 데이터 = ", res.data);
        setfriends(res.data)
        handleClose();
      })
  }
  
  // modal창 만들기
  const [open, setOpen] = React.useState(false);
  const handleOpen = (member:Member) => {
    setOpen(true);
    setMember(member)
  }
  const handleClose = () => setOpen(false);



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
              <img src={decorationImg} alt="" className={styles.decoimag}/>
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
                      {friends.map((item:Member, index) => (
                        <ListItem sx={{height: 100}} key={index}>
                          
                          <ListItemAvatar sx={{ mr:2 }}>
                            <Badge color="error" badgeContent={item.snowglobeRequestCnt} max={100} onClick={() => handleOpen(item)}>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                            </Badge>
                            
                          </ListItemAvatar>
                          <ListItemText primary={`${item.nickname}`} />

                          {/* 1. 편지 요청 버튼 => 3*/}
                          { item.status == 3 ? 
                            <Button onClick={() =>(requestLetter(item.memberId))}>  
                              <ForwardToInboxIcon color="error" fontSize='large' />
                            </Button>
                          : null }
                          {/* 2. 친구 신청 후 상대방이 받을 때까지 기다리는 버튼 => 2 */}
                          { item.status == 2 ? 
                          <Button>
                            <AutorenewIcon color="disabled" fontSize='large' />
                          </Button>
                          : null }
                          {/* 3. 상대방이 나에게 친구 신청했는데 내가 안 받은 버튼 + 친구 신청 버튼 => 1 */}
                          { item.status == 1 ? 
                          <Button onClick={() =>(followFriend(item.friendId))}>
                            <PersonAddIcon color="inherit" fontSize='large' />
                          </Button>
                            : null }
                          {/* 4. 친구 삭제 버튼 => 1, 2, 3 */}
                          {/* onClick={deleteFriend(item.friendId)} */}
                          <Button onClick={() =>(deleteFriend(item.friendId))}>
                            <PersonRemoveIcon color="disabled" fontSize='large' />
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

        {/* 모달, 모달에 테마 적용 */}
        <ThemeProvider theme={theme}>
        { member.snowglobeRequestCnt != 0 ? 
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component="div" sx={style}>
              <Grid xs={12} item component="div">
                <Button onClick = {()=>(handleClose())}>
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
                <Button variant="contained" color="success" sx={{width: '70%'}} onClick={()=>(requestDelete(member.memberId))}>
                <h4 className={styles.go}>요청 삭제하기</h4></Button>
              </Grid>
            </Box>
          </Modal>
            : null }
        </ThemeProvider>
      </div>
    )
}

export default Profile
