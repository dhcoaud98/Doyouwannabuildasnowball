// Systems
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useDispatch } from "react-redux";

// Other components
import "../index.css"
import styles from "./friends.module.css"
import { Navbar } from '../components/navbar/navbar';
import SearchBar from '../components/search/searchbar';
import { RootState } from '../app/store';
import { API_URL } from "../switchurl"
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
import { DataArray } from '@mui/icons-material';
// ------------------------------------------------------------------------


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

function Profile (props:any) {
  
  // 토큰
  const accessToken = localStorage.getItem("accessToken")
  // API
  const APIURL = API_URL()
  // 현재 유저 id
  const nowUser = useSelector((state : RootState)  => state.user.userId);
  // 친구 목록
  const [friends, setfriends] = useState([]);
  // 검색 목록
  const [searchFriends, setSearchFriends] = useState([]);
  // 검색어
  const [data, setData] = useState('');

  // 친구 목록 axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${APIURL}api/friend/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        } 
      )
      setfriends(response.data);
      console.log("친구목록 = ", response.data)
    } catch (err: any) {
        console.log('errer = ', err)
      }
    }

  // 시작할 때 친구 목록 불러오기 
  useEffect(() => {
    fetchUsers();
    console.log(friends)
  }, [])

  // 검색 실행
  useEffect(() => {
    if (data !== '') {
      searchFriend(data)
    }
  }, [data])

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
    axios.delete(`${APIURL}api/friend/list/${friendId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        setfriends(res.data);
    })
  }

  // 친구 요청 받기
  const followFriend = (friendId : any) => {
    console.log(friendId)
    axios.patch(`${APIURL}api/friend/request/${friendId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        setfriends(res.data);
        fetchUsers();
      })
  }

  // 스노우볼 요청
  const requestLetter = (memberId : any) => {
    axios.post(`${APIURL}api/friend/snowglobe/request`, {
        "receiveMemberId" : memberId,
        "sendMemberId" : nowUser
      },)
        .then(res => {
          // console.log("새로 받은 데이터 = ", res.data);
          if (res.data ==='fail') {
            alert('요청이 불확실합니다.')
          }
        })
        .catch(() => {
          alert('요청이 불확실합니다.')
        })
  }

  // 스노우볼 요청 삭제
  const requestDelete = (memberId : any) => {
    console.log(memberId)
    axios.delete(`${APIURL}api/friend/snowglobe/request`, {
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

  // 친구 검색
  const searchFriend = (data:string) => {
    console.log(data);
    
    axios.get(`${APIURL}api/friend/search/${data}`, {     
      headers: {
        Authorization: `Bearer ${accessToken}`
    }})
      .then(res => {
        console.log("확인",res.data)
        setSearchFriends(res.data)
      })
  }

  // 검색한 친구에서 친구 요청하기
  const SearchFriendRequest = (memberId : any) => {
    axios.post(`${APIURL}api/friend/request`, 
      {
        "sendMemberId" : nowUser,
        "receiveMemberId" : memberId
      }
    )
      .then(res => {
        // 다시 검색 요청
        searchFriend(data);
        fetchUsers();
      })
  }

  // modal창 만들기
  const [open, setOpen] = useState(false);
  const handleOpen = (member:Member) => {
    setOpen(true);
    setMember(member)
  }
  const handleClose = () => setOpen(false);

  return (
      <div id="container_div">
        <Grid container id="container_div">
          {/* 왼쪽 마진 */}
          <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="left_div"></Grid>

          {/* 메인 콘텐츠 */}
          <Grid xs={12} sm={8} md={6} lg={4} xl={3} item id="main_div">
            
            {/*모바일 위 여백*/}
            <div className={styles.navbar_top_margin}>
            </div>

            {/* 여기는 네브바 */}
            <div className={styles.navbar}>
              <Navbar/>
            </div>
            
            {/* 여기는 서치바 */}
            <div className={styles.search}>
              <SearchBar setData={setData}/>
            </div>
  
            {/* 장식 */}
            <div className={styles.deco}>
              <img src={decorationImg} alt="" className={styles.decoimag}/>
            </div>
            
            {/* 여기는 친구 목록 */}
            <div className={styles.friends}>
              <Container>
              {/* 친구를 검색했을 경우 */}
                <Box component="div" sx={{ bgcolor: '#FFF8F3', height: '30vh' }} className={data === '' ? styles.searchFriendList2 : styles.searchFriendList}>
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
                      {searchFriends.map((item:Member, index) => (
                        <ListItem sx={{height: 100}} key={index}>
                          
                          <ListItemAvatar sx={{ mr:2 }}>
                            <Badge color="error" badgeContent={item.snowglobeRequestCnt} max={100} onClick={() => handleOpen(item)}>
                            <Avatar>
                              <ImageIcon />
                            </Avatar>
                            </Badge>
                            
                          </ListItemAvatar>
                          <ListItemText primary={`${item.nickname}`} />

                          {/* 친구 검색을 통해 얻은 친구 목록에서 친구 요청 보내기 */}
                          { item.status === 0 ? 
                          <Button onClick={() =>(SearchFriendRequest(item.memberId))}>
                            <PersonAddIcon color="inherit" fontSize='large' />
                          </Button>
                            : null }

                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  {/* 내 친구 목록 */}
                  <Box component="div" sx={{ bgcolor: '#FFF8F3' }} className={data === '' ? styles.myFriend2 : styles.myFriend}>
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
                          { item.status === 3 ? 
                            <Button onClick={() =>(requestLetter(item.memberId))}>  
                              <ForwardToInboxIcon color="error" fontSize='large' />
                            </Button>
                          : null }
                          {/* 2. 친구 신청 후 상대방이 받을 때까지 기다리는 버튼 => 2 */}
                          { item.status === 2 ? 
                          <Button>
                            <AutorenewIcon color="disabled" fontSize='large' />
                          </Button>
                          : null }
                          {/* 3. 상대방이 나에게 친구 신청했는데 내가 안 받은 버튼 + 친구 신청 버튼 => 1 */}
                          { item.status === 1 ? 
                          <Button onClick={() =>(followFriend(item.friendId))}>
                            <PersonAddIcon color="inherit" fontSize='large' />
                          </Button>
                            : null }
                          {/* 친구 검색을 통해 얻은 친구 목록에서 친구 요청 보내기 */}
                          { item.status === 0 ? 
                          <Button onClick={() =>(SearchFriendRequest(item.memberId))}>
                            <PersonAddIcon color="inherit" fontSize='large' />
                          </Button>
                            : null }
                          {/* 4. 친구 삭제 버튼 => 1, 2, 3 */}
                          {/* onClick={deleteFriend(item.friendId)} */}
                          { item.status === 1 || item.status === 2 || item.status === 3 ? 
                          <Button onClick={() =>(deleteFriend(item.friendId))}>
                            <PersonRemoveIcon color="disabled" fontSize='large' />
                          </Button>
                            : null }
                        </ListItem>
                      ))}
                    </List>
                  </Box>
              </Container>
            </div>
          </Grid>

          {/* 오른쪽 마진 */}
          <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
        </Grid>

        {/* 모달, 모달에 테마 적용 */}
        <ThemeProvider theme={theme}>
        { member.snowglobeRequestCnt !== 0 ? 
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
