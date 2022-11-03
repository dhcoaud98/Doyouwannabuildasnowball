// Systems
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { RootState } from 'store/store';
import axios from 'axios';

// Other components
import MainContainer from "components/Three/MainContainer";
import CustomList from "../../components/Custom/CustomList"
import styles from "./[userid].module.css"

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

// ------------------------------------------------------------------------


const CustomMain= () => {
  // 라우터
  const router = useRouter();

  // 현재 CustomMain의 Owner ID
  const ownerQuery =router.query;
  let ownerUserID


  // 현재 서비스 사용자아이디
  const nowUserID = useSelector((state : RootState)  => state.user.userId);

  // 소유자 닉네임 딱 대기
  let ownerUserNickName = ""
  
  // 컴포넌트 실행시 가장 먼저 실행되는 함수
  useEffect(() => {
    console.log(ownerQuery)
    if (ownerQuery.userid)
    {
      // Owner 정보 가져오기
    ownerUserID = ownerQuery.userid
    axios.get(`http://localhost:8080/api/member/info/${ownerUserID}`)
    .then((response) => {
      console.log(response.data)
      ownerUserNickName = response.data.nickname
    })
    .catch((error) => {
      console.log(error)
    })
    }
    
  },[ownerQuery]) 

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

  // 저장버튼 함수
  const saveCustom = () => {

  }
  
  // 꾸미기 취소 함수
  const cancelCustom = () => {
    setCustomListState((prev) => false)
  }

  // 스피드 다이얼 버튼들 함수
    // 1.내 메인페이지일 경우 스피드 다이얼 함수 구성
      // ㄱ.꾸미기
      const customSnowBall = () => {
        setCustomListState((prev) => true)
      }
      // ㄴ.공유하기
      const shareSnowBall = () => {}
      // ㄷ.친구목록으로 라우팅
      const showFriends = () => {
        // 현재는 사용자 정보가 없으므로...
        router.push('/dddd')
      }
      const showCollection = () => {
        router.push('Collection')
      } 

    // 2.남의 메인페이지일 경우 스피드 다이얼 함수 구성
      // ㄱ.선물하기
      const giftSnowBall = () => {   
        setCustomListState((prev) => true)
      }
      // ㄴ.친구요청 보내기
      const requestBeFriend = () => {}
      // ㄷ.친구삭제
      const deleteFriend= () => {}
  

  // 스피드 다이얼 구성요소
    // 1.내 메인페이지일 경우 스피드 다이얼 구성
    const myActions = [
      { icon: <AutoFixHighIcon />, name: '꾸미기', eventFunc: customSnowBall},
      { icon: <ShareIcon />, name: '공유', eventFunc: shareSnowBall},
      { icon: <PeopleIcon />, name: '친구목록', eventFunc: showFriends},
      { icon: <AppsIcon/>, name: '스노우볼 모두 보기', eventFunc: showCollection}
    ];

    // 2.남의 메인페이지일 경우 스피드 다이얼 구성
    // 친구 추가 요청과 친구삭제는 친구 여부에 따라서 하나만 뜨도록 구성 예정
    const theOthersActions = [
      { icon: <CardGiftcardIcon />, name: '선물하기', eventFunc: giftSnowBall},
      { icon: <PersonAddAlt1Icon />, name: '친구추가요청', eventFunc: requestBeFriend},
      { icon: <PersonOffIcon />, name: '친구삭제', eventFunc: deleteFriend},
    ]


  // 여기서부터는 현재 서비스 사용자와 현재 페이지 소유자가 같은지 여부에 따라 달라지는 변수들
  let actions = theOthersActions
  let whoseSnowGlobe:string = ownerUserNickName
  let customMenuName:string = "선물하기"
  
  if (ownerUserID === nowUserID) {
    actions = myActions
    whoseSnowGlobe = "나"
    customMenuName = "꾸미기"
  }

    return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div" container direction="column" justifyContent="space-between">                                
          {/* 상단 */}
          <Grid component="div" item container xs={2} className={styles.upper}>
            {/* 상단 내브바 왼쪽 */}
            {/* 꾸미기 시 뒤로가기 버튼 */}
            <Grid xs={2} item>
              <IconButton sx={{ m: 2.5, p:0 }} onClick={cancelCustom} className={noneAtCustomListFalse}>
                <Avatar alt="" src="/images/wreath_1.png" className={styles.avatar}></Avatar>
                <ArrowBackIcon className={styles.arrow}/>
              </IconButton>
            </Grid>

            {/* 상단 내브바 중간 */}
            {/* 현재 상태 이름 */}
            <Grid xs={8} item component="div" style={{justifyContent: 'end'}}>
              <h1 className='cntmenu-text'>{customListState === true ? customMenuName : `${whoseSnowGlobe}의 스노우볼` }</h1>
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
                  sx: { bgcolor: '#FFF3E1', color: '#662113', '&:hover': {bgcolor: '#FFF3E1',}}
                }}
              >
                {/* 내 메인페이지인지에 따라 바뀜 */}
                {/* 여기가 추후에 myActions가 아닌 actions로 바뀔 것 */}
                {actions.map((action) => (
                  <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} className={styles.brownicon} onClick={action.eventFunc}/>
                ))}
              </StyledSpeedDial>
                
              <Button color="error" size='large' variant='outlined' className={`${noneAtCustomListFalse} ${styles.save_button}`}>저장</Button>
            </Grid>
          </Grid>

          {/* 중단 */}
          {/* Three.js */}
          {/* 꾸미기 상태 비활성화 */}
          <Grid component="div" item xs={9} className={noneAtCustomListTrue}>
            <MainContainer/>
            {/* 마을 놀러가기 버튼 */}
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

          {/* 꾸미기 상태 활성화 */}
          <Grid component="div" item xs={6} className={noneAtCustomListFalse}>
            <MainContainer/>
          </Grid> 

          {/* 하단 */}
          {/* 꾸미기 상태 비활성화 */}
          <Grid component="div" item xs={1} className={noneAtCustomListTrue}>
            <img src="/images/decoration.png" alt="" className={styles.decoration}/>
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
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default CustomMain