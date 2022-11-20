// Systems
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState, useRef, Suspense } from "react";
import {useSelector} from 'react-redux'
import { RootState } from "../app/store";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useCookies, Cookies } from 'react-cookie';
import { CookiesProvider } from 'react-cookie';

// Other components
import '../assets/fonts/font.css'
import "../index.css"
import styles from "./custommain.module.css"
import MainContainer from "../components/three/MainContainer";
import { CustomList } from "../components/custom/customlist";
import { API_URL } from "../switchurl"
import wreath1Img from "../assets/images/wreath_1.png"
import gotovillage from "../assets/images/gotovillage.png"
import { setCurrentSb } from "../features/snowballSlice";

// MUI
import { styled } from '@mui/material/styles';
import { SpeedDial, SpeedDialAction, Button, Avatar, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ShareIcon from '@mui/icons-material/Share';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AppsIcon from '@mui/icons-material/Apps';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LogoutIcon from '@mui/icons-material/Logout';
import SmsIcon from '@mui/icons-material/Sms';
import SettingsIcon from '@mui/icons-material/Settings';
import { RepeatOneSharp } from "@mui/icons-material";
// ------------------------------------------------------------------------

function CustomMain() {
  // lazyloading
  // 타입선언
  interface saveHandle {
    saveImage: (sb_id : number) => void
  }
  const dispatch = useAppDispatch()
  const APIURL = API_URL()
  const accessToken = localStorage.getItem("accessToken")
  // 라우터
  const router = useNavigate()
  // 자식 컴포넌트 Ref
  const containerRef = useRef<saveHandle>()
  // 현재 띄우는 스노우볼 id
  const currentSbId = useSelector((state: RootState) => state.snowball.current_sb_id)
  // 현재 스노우볼 music Id
  const currentMusicId = useSelector((state:RootState) => state.snowball.music_id)
  // 현재 CustomMain의 Owner ID
  let ownerUserID = Number(useParams().userid)
  // 현재 서비스 사용자아이디
  const nowUserID = useAppSelector((state : RootState)  => state.user.userId);
  // 페이지 주인 정보 초기값 설정
  const [ownerUserNickName, setOwnerUserNickName] = useState("나")
  // audio list
  const audioList = ['https://601snowball.s3.ap-northeast-2.amazonaws.com/music/We+Wish+You+a+Merry+Christmas.wav', 'https://601snowball.s3.ap-northeast-2.amazonaws.com/music/O+Holy+Night(A.Sax).wav', 'https://601snowball.s3.ap-northeast-2.amazonaws.com/music/Joy+To+The+World(EDM).mp3', 'https://601snowball.s3.ap-northeast-2.amazonaws.com/music/%EC%B2%9C%EC%82%AC%EB%93%A4%EC%9D%98+%EB%85%B8%EB%9E%98%EA%B0%80(Angels+We+Have+Heard+on+High).wav', 'https://601snowball.s3.ap-northeast-2.amazonaws.com/music/%EC%A7%95%EA%B8%80%EB%B2%A8(Jingle+Bell).wav','https://601snowball.s3.ap-northeast-2.amazonaws.com/music/%EC%98%A4+%EB%B2%A0%EB%93%A4%EB%A0%88%ED%97%B4+%EC%9E%91%EC%9D%80+%EB%A7%88%EC%9D%84(O+Little+Town+Of+Bethlehem).wav']
  // audio ref
  const audioref = useRef<HTMLAudioElement>(null)

  // 스피드 다이얼 스타일
  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
  }));
  
  // 스노우볼 커스텀 리스트창 상태
  const [customListState, setCustomListState] = useState(false);
  // 커스텀리스트는 customListState에 따라 상태가 보임
  const customListStyles = customListState ? styles.custom_list : styles.d_none;
  // 커스텀리스트 올라오면 안보이는 요소들의 클래스
  const noneAtCustomListTrue = customListState ? styles.d_none : "";
  // 커스텀리스트 내려가면 안보이는 요소들의 클래스
  const noneAtCustomListFalse = customListState ? "" : styles.d_none;
  // snowball deco select
  const deco = useSelector((state: RootState) => state.snowball.deco)
  // 쿠키 지우기
  const [cookies, setCookie, removeCookie ] = useCookies();

  // 저장버튼 함수
  const saveCustom = () => {
    // 내 스노우볼 저장
    if (nowUserID === ownerUserID) {
      axios.put(`${APIURL}api/snowglobe/${nowUserID}/modify`, {
        screenshot: `https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/${currentSbId}.png`,
        deco: deco,
        musicId: currentMusicId
      })
      .then(()=>{
        containerRef?.current?.saveImage(currentSbId)
        setCustomListState(false)
      })
      .catch((error)=>{
      })
    } 
    // 다른사람에게 선물 
    else {
      axios.post(`${APIURL}api/snowglobe/${ownerUserID}/present`, {
        makerId: nowUserID,
        screenshot: `https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/$DEFAULT.png`,
        deco: deco,
        musicId: 1
      })
      .then((res)=>{
        containerRef?.current?.saveImage(res.data)
        axios.patch(`${APIURL}api/snowglobe/changeScreenshot`, {
          url: `https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/${res.data}.png`,
          sid: res.data
        })
        .then((res)=>{
          setCustomListState(false)
        })
        .catch((error)=>{
        })

        if (nowUserID === 1) {
          router('/merrychristmas')
        }
        else {
          router(`/askforshare/${ownerUserID}/${res.data}`)
        }
      })
      .catch((error)=>{
      })
    }   
  }
  
  // 닉네임 변경 함수
  const changeNickName = () => {
    router('/setnickname')
  }

  // 꾸미기 취소 함수
  const cancelCustom = () => {
    axios.get(`${APIURL}api/snowglobe/${currentSbId}/detail`)
    .then((res) => {
      dispatch(setCurrentSb(res.data))
    })
      
    setCustomListState((prev) => false)
  }
  
  // 스피드 다이얼 버튼들 함수
    // 1.내 메인페이지일 경우 스피드 다이얼 함수 구성
    // ㄱ.꾸미기
    const customSnowBall = () => {
      setCustomListState((prev) => true)
    }
    // ㄴ.공유하기
    const shareSnowBall = async () => {
      try {
        await navigator.clipboard.writeText(`https://mylittlesnowball/custommain/${nowUserID}`)
        alert('클립보드에 링크가 복사되었습니다.')
      } catch (err) {
        alert('링크 복사에 실패했습니다.')
      }
    }

    // ㄷ.친구목록으로 라우팅
    const showFriends = () => {
      router(`/friends/`)
    }
    const showCollection = () => {
      router('/collection')
    } 
    const logout = () => {
      alert('로그아웃 하기')
      localStorage.setItem("accessToken", '');
      axios.post(`${APIURL}api/member/logout/${nowUserID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => {
          removeCookie("refresh", { path: '/' }); 
          router('/');
      })
    }
    const board = () => {
      router('/board')
    }
    
    // 2.남의 메인페이지일 경우 스피드 다이얼 함수 구성
    // ㄱ.선물하기
    const giftSnowBall = () => {   
      if (nowUserID === 0) {
        router('/welcome')
      } else {
        setCustomListState((prev) => true)
      }
    }
    // ㄴ.친구요청 보내기
    const requestBeFriend = () => {
      axios.post(`${APIURL}api/friend/request/`, {
        'sendMemberId' : nowUserID,
        'receiveMemberId' : ownerUserID
      })
      .then((response) => {
        alert(`${ownerUserNickName}님께 친구요청을 보냈습니다.`)
        window.location.replace(`/custommain/${ownerUserID}`)
      })
      .catch((error) => {
        if(error.response.status === 409) {
          alert("이미 요청되어 승낙을 기다리고 있어요.")
        }
      })
    } 
    // ㄷ.친구요청 받기
    const recieveRequest = () => {
      axios.patch(`${APIURL}api/friend/request/${ownerUserID}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
        alert(`${ownerUserNickName}님과 친구가 되었습니다!`)
        window.location.replace(`/custommain/${ownerUserID}`)
      })
      .catch((error) => {
        if(error.response.status === 400) {
          alert("확인되지 않은 친구 요청입니다.")
        }
      })
    }
    // ㄹ.친구삭제
    const deleteFriend = () => {
      axios.delete(`${APIURL}api/friend/list/${ownerUserID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          alert(`${ownerUserNickName}님을 친구목록에서 삭제했습니다.`)
          window.location.replace(`/custommain/${ownerUserID}`)
      })
      .catch((error) => {
      })
    }
    
    // 마을 놀러가기
    const goToVillage = () => {
      router('/unitybackground')
    }

    // 스피드다이얼 구성 초기값 설정
    const [actions, setActions] = useState([
      { icon: <AutoFixHighIcon />, name: '꾸미기', eventFunc: customSnowBall},
      { icon: <ShareIcon />, name: '공유', eventFunc: shareSnowBall},
      { icon: <PeopleIcon />, name: '친구목록', eventFunc: showFriends},
      { icon: <AppsIcon/>, name: '스노우볼 모두 보기', eventFunc: showCollection},
      { icon: <SmsIcon/>, name: '방명록', eventFunc: board},
      { icon: <SettingsIcon/>, name: '닉네임변경', eventFunc: changeNickName},
      { icon: <LogoutIcon/>, name: '로그아웃', eventFunc: logout},
    ])
    // 여기서부터는 현재 서비스 사용자와 현재 페이지 소유자가 같은지 여부에 따라 달라지는 변수들
    const [customMenuName, setCustomMenuName] = useState("꾸미기")

    // 컴포넌트 실행시 가장 먼저 실행되는 함수 
    useEffect(() => {
      // 현재 페이지 주인의 스노우볼로 스노우볼 정보 변경
      axios.get(`${APIURL}api/snowglobe/${ownerUserID}`)
      .then((response) => {
        dispatch(setCurrentSb(response.data))
      })
      .catch((err) => {
      })
      
      // 페이지 주인의 정보를 묻는 액시오스
      axios.get(`${APIURL}api/member/info/${ownerUserID}`)
      .then((response) => {
        // 페이지 주인이 내가 아니라면,
        if (ownerUserID !== nowUserID) {
          setOwnerUserNickName((prev) => response.data.nickname.slice(0, 8))
          setCustomMenuName((prev) => "선물하기")

          if (!accessToken) {
            setActions((prev) => [
              { icon: <CardGiftcardIcon />, name: '선물하기', eventFunc: giftSnowBall},
            ])
          } else {
            // 어? 내 페이지 아니네, 그럼 이 페이지 주인 나랑 친구야? 묻는 액시오스
            axios.get(`${APIURL}api/friend/status/${ownerUserID}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            .then((response) => {
              if (response.data.status === 0) {
                setActions((prev) => [
                  { icon: <CardGiftcardIcon />, name: '선물하기', eventFunc: giftSnowBall},
                  { icon: <PersonAddAlt1Icon />, name: '친구추가요청', eventFunc: requestBeFriend},
                  { icon: <SmsIcon/>, name: '방명록', eventFunc: board},
                ])
              } else if (response.data.status === 1) {
                setActions((prev) => [
                  { icon: <CardGiftcardIcon />, name: '선물하기', eventFunc: giftSnowBall},
                  { icon: <HandshakeIcon />, name: '친구추가받기', eventFunc: recieveRequest},
                  { icon: <SmsIcon/>, name: '방명록', eventFunc: board},
                ])
              } else if (response.data.status === 2) {
                setActions((prev) => [
                  { icon: <CardGiftcardIcon />, name: '선물하기', eventFunc: giftSnowBall},
                  { icon: <PersonAddAlt1Icon />, name: '친구요청됨', eventFunc: requestBeFriend},
                  { icon: <SmsIcon/>, name: '방명록', eventFunc: board},
                ])
              } else {
                setActions((prev) => [
                  { icon: <CardGiftcardIcon />, name: '선물하기', eventFunc: giftSnowBall},
                  { icon: <PersonOffIcon />, name: '친구삭제', eventFunc: deleteFriend},
                  { icon: <SmsIcon/>, name: '방명록', eventFunc: board},
                ])
              }
            })
          }
        } 
        
        // 페이지 주인이 나라면,
        else {
          if (response.data.snowglobeId !== currentSbId) {
            setActions((prev) => [
              { icon: <ShareIcon />, name: '공유', eventFunc: shareSnowBall},
              { icon: <PeopleIcon />, name: '친구목록', eventFunc: showFriends},
              { icon: <AppsIcon/>, name: '스노우볼 모두 보기', eventFunc: showCollection},
              { icon: <SmsIcon/>, name: '방명록', eventFunc: board},
              { icon: <SettingsIcon/>, name: '닉네임변경', eventFunc: changeNickName},
              { icon: <LogoutIcon/>, name: '로그아웃', eventFunc: logout},
            ])
          }
        }
      })
      .catch((error) => {
        alert('존재하지 않는 회원입니다.')
        router(-1)
      })
    } ,[]) 

    useEffect(() => {
      const audio = audioref.current
      if (audio != null) {
        audio.load()
        audio.play()
      }    
    },[currentMusicId])


    return (
    <div id="container_div">
      <audio ref={audioref}>
        <source src={audioList[currentMusicId]}></source>
      </audio>
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} lg={4} xl={3} item id="main_div" container direction="column" justifyContent="space-between">                                
          {/* 상단 */}
          <Grid component="div" item container xs={2} className={styles.upper}>
            {/* 상단 내브바 왼쪽 */}
            {/* 꾸미기 시 뒤로가기 버튼 */}
            <Grid xs={2} item>
              <IconButton sx={{ m: 2.5, p:0 }} onClick={() => cancelCustom()} className={noneAtCustomListFalse}>
                <Avatar alt="" src={wreath1Img} className={styles.avatar}></Avatar>
                <ArrowBackIcon className={styles.arrow}/>
              </IconButton>
            </Grid>

            {/* 상단 내브바 중간 */}
            {/* 현재 상태 이름 */}
            <Grid xs={8} item component="div" style={{justifyContent: 'end'}}>
              <h1 className={ customListState === false ? styles.cntmenu_text : `${styles.lower_cntmenu} ${styles.cntmenu_text}`}>{customListState === true ? customMenuName : `${ownerUserNickName}의` }</h1>
              <h1 className={`${styles.cntmenu_text} ${noneAtCustomListTrue} ${styles.lower_cntmenu}`}>스노우볼</h1>
            </Grid>

            {/* 상단 내브바 오른쪽 */}
            {/* 스피드다이얼, 꾸미기 시작하면 저장버튼 */}
            <Grid xs={2} item component="div" style={{position:'relative', height: '50%', display:'flex', alignContent:'center'}}>
              {/* 스피드다이얼 */}
              <StyledSpeedDial
                className={noneAtCustomListTrue}
                ariaLabel="SpeedDial playground example"
                icon={<MenuIcon />}
                direction='down'
                FabProps={{
                  sx: { bgcolor: 'transparent', color: '#662113', '&:hover': {bgcolor: '#FFF3E1',}}
                }}
              >
                {/* 내 메인페이지인지에 따라 바뀜 */}
                {/* 여기가 추후에 myActions가 아닌 actions로 바뀔 것 */}
                {actions.map((action) => (
                  <SpeedDialAction key={action.name} open={action.name === '친구요청됨' ? false : true }  icon={action.icon} tooltipTitle={action.name} className={styles.brownicon} onClick={() => action.eventFunc()}/>
                ))}
              </StyledSpeedDial>
                
              <Button color="error" size='large' variant='outlined' className={`${noneAtCustomListFalse} ${styles.save_button}`} onClick={() => saveCustom()}>{nowUserID===ownerUserID?'저장':'선물'}</Button>
            </Grid>
          </Grid>

          {/* 중단 */}
          {/* Three.js */}
          {/* 꾸미기 상태 비활성화 */}
          <Grid component="div" item xs={8} className={noneAtCustomListTrue}>
            <MainContainer ref={containerRef}/>
          </Grid> 

          {/* 꾸미기 상태 활성화 */}
          <Grid component="div" item xs={6} className={noneAtCustomListFalse}>
            <Suspense fallback={<div>loading...</div>}>
              <MainContainer/>
            </Suspense>
          </Grid> 

          {/* 하단 */}
          {/* 꾸미기 상태 비활성화 */}
          <Grid component="div" item xs={2} className={noneAtCustomListTrue} sx={{backgroundColor: '#010023'}}>
            <Button onClick={() => goToVillage()} className={styles.gotovillage_btn}>
              <img src={gotovillage} alt="" className={styles.gotovillage_img}/>
            </Button>
          </Grid>      

          {/* 꾸미기 상태 활성화 */}
          <Grid component="div" item xs={4} className={noneAtCustomListFalse}></Grid>   
          
          {/* 커스텀 드로워 */}
          {/* 꾸미기 상태 활성화시 시작 */}
          <div className={customListStyles}>
            <CustomList/>
          </div>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default CustomMain