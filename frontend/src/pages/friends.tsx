// Systems
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Other components
import "../index.css"
import '../assets/fonts/font.css'
import styles from "./friends.module.css"
import { Navbar } from '../components/navbar/navbar';
import SearchBar from '../components/search/searchbar';
import { RootState } from '../app/store';
import { API_URL } from "../switchurl"
import decorationImg from "../assets/images/decoration.png"

// MUI
import { Grid, Box, Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Badge, Modal } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../assets/fonts/font.css'
// ------------------------------------------------------------------------


// 모달 스타일
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '60%',
  bgcolor: '#FFF8F3',
  border: '0px solid #000',
  borderRadius: '4px',
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
  // 라우팅
  const router = useNavigate();

  // 1. 친구 목록 axios
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
    } catch (err: any) {
        console.log('errer = ', err)
      }
    }

  // 시작할 때 친구 목록 불러오기 
  useEffect(() => {
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다')
      router('/')
    }

    fetchUsers();
  }, [])

  // 2. 검색 실행
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

  // 3. 친구 삭제 함수
  const deleteFriend = (friendId : any) => {
    alert("친구를 삭제 하시겠습니까?")
    axios.delete(`${APIURL}api/friend/list/${friendId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        setfriends(res.data);
    })
  }

  // 4. 친구 요청 받기
  const followFriend = (friendId : any) => {
    axios.patch(`${APIURL}api/friend/request/${friendId}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        setfriends(res.data);
        fetchUsers();
      })
      .catch(err => {
        if(err.response.status === 400) {
          alert("확인되지 않은 친구 요청입니다.")
        }
      })
  }

  // 5. 스노우볼 요청
  const requestLetter = (memberId : any) => {
    axios.post(`${APIURL}api/friend/snowglobe/request`, {
        "receiveMemberId" : memberId,
        "sendMemberId" : nowUser
      },)
        .then(res => {
          alert('스노우볼 요청을 보냈어요!')
        })
        .catch(() => {
          alert('이미 보낸 요청이 있어요')
        })
  }

  // 6. 스노우볼 요청 삭제
  const requestDelete = (memberId : any) => {
    axios.delete(`${APIURL}api/friend/snowglobe/request`, {
      //헤더에 포함된 정보들 
    	data:{
        "sendMemberId" : memberId,
        "receiveMemberId" : nowUser
        }
    })
      .then(res => {
        setfriends(res.data)
        handleClose();
      })
  }

  // 7. 친구 검색
  const searchFriend = (data:string) => {
    axios.get(`${APIURL}api/friend/search/${data}`, {     
      headers: {
        Authorization: `Bearer ${accessToken}`
    }})
      .then(res => {
        setSearchFriends(res.data)
      }
    )
  }
  // 7-5. 기존친구에서 검색하기
  let result: Member[] = friends.filter((value: Member) => value.nickname.includes(data));

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

  // 친구 닉네임 누르면 친구 페이지로 이동
  const goToCustommain = (memberId : any) => {
    requestDelete(memberId);
    router(`/custommain/${memberId}`)
  }

  // 
  const wait = () => {
    alert('친구 요청을 했습니다. 잠시만 기다려 주세요')
  }

  // modal창 만들기
  const [open, setOpen] = useState(false);
  const handleOpen = (member:Member) => {
    setOpen(true);
    setMember(member)
  }
  const handleClose = () => setOpen(false);

  return (    
    <ThemeProvider theme={theme}>
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
                      {/* 1-1. 검색 친구 */}
                      {searchFriends.map((item:Member, index) => (
                        <ListItem sx={{height: 100}} key={index}>
                          
                          <ListItemAvatar sx={{ mr:2 }}>
                            {item.snowglobeRequestCnt? 
                              <Badge color="error" badgeContent="❤" onClick={() => handleOpen(item)}>
                                <Avatar alt="profile" src={item.profileImageUrl}/>
                              </Badge>
                              : <Avatar alt="profile" src={item.profileImageUrl}/> }                          
                          </ListItemAvatar>
                          <ListItemText primary={`${item.nickname}`} className={styles.green_text}/>

                          {/* 친구 검색을 통해 얻은 친구 목록에서 친구 요청 보내기 */}
                          { item.status === 0 ? 
                          <Button onClick={() =>(SearchFriendRequest(item.memberId))}>
                            <PersonAddIcon color="inherit" fontSize='large' />
                          </Button>
                            : null }
                        </ListItem>
                      ))}
                      {/* 1-2. 기존 친구에서 검색 */}
                      {result.map((item:Member, index:any) => (
                        <ListItem sx={{height: 100}} key={index}>

                            <ListItemAvatar sx={{ mr:2 }}>
                              {item.snowglobeRequestCnt? 
                                <Badge color="error" badgeContent="❤" onClick={() => handleOpen(item)}>
                                  <Avatar onClick={() => goToCustommain(item.memberId)} alt="profile" src={item.profileImageUrl}/>
                                </Badge>
                                : <Avatar onClick={() => goToCustommain(item.memberId)} alt="profile" src={item.profileImageUrl}/> }                          
                            </ListItemAvatar>
                            <ListItemText onClick={() => goToCustommain(item.memberId)} primary={`${item.nickname}`} className={styles.green_text}/>
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
                  
                  {/* 내 친구 목록 */}
                  <Box component="div" sx={{ bgcolor: '#FFF8F3'}} className={data === '' ? styles.myFriend2 : styles.myFriend}>
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
                            {item.snowglobeRequestCnt? 
                              <Badge color="error" badgeContent="❤" onClick={() => handleOpen(item)}>
                                <Avatar onClick={() => goToCustommain(item.memberId)} alt="profile" src={item.profileImageUrl}/>
                              </Badge>
                              : <Avatar onClick={() => goToCustommain(item.memberId)} alt="profile" src={item.profileImageUrl}/> }
                          </ListItemAvatar>
                          <ListItemText onClick={() => goToCustommain(item.memberId)} primary={`${item.nickname}`} className={styles.green_text} />

                          {/* 1. 편지 요청 버튼 => 3*/}
                          { item.status === 3 ? 
                            <Button onClick={() =>(requestLetter(item.memberId))}>  
                              <ForwardToInboxIcon color="error" fontSize='large' />
                            </Button>
                          : null }
                          {/* 2. 친구 신청 후 상대방이 받을 때까지 기다리는 버튼 => 2 */}
                          { item.status === 2 ? 
                          <Button onClick={() =>(wait())}>
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
                <h2 className={styles.cntmenu_text1}>스노우볼 요청</h2>
              </Grid>
              <Grid xs={12} item component="div" style={{justifyContent: 'center'}} sx={{ mt:4, mb: 8 }}>
                <h4 className={styles.cntmenu_text1}>스노우볼 요청이 왔네요!</h4>
              </Grid>
              <Grid xs={12} item component="div" className={styles.gift_delete_button} sx={{ m:2 }}>
                <Button variant="contained" color="primary" sx={{width: '70%'}} onClick={() => goToCustommain(member.memberId) }>
                  <h4 className={styles.go}>선물하러 가기</h4></Button>
              </Grid>
              <Grid xs={12} item component="div" className={styles.gift_delete_button} sx={{ m:2 }}>
                <Button variant="contained" color="success" sx={{width: '70%'}} onClick={()=>requestDelete(member.memberId)}>
                <h4 className={styles.go}>요청 삭제하기</h4></Button>
              </Grid>
            </Box>
          </Modal>
            : null }
      </div>
      </ThemeProvider>
      
    )
}

export default Profile