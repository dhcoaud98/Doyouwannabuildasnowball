// Systems
import { API_URL } from "../switchurl";
// Other components
import { Navbar } from "../components/navbar/navbar";
import styles from "./collection.module.css";
import deco1Img from "../assets/images/deco1.png";
import woodbar2Img from "../assets/images/woodbar2.png";

// MUI
import { Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import axios from "axios";
import { setShelf } from "../features/shelfSlice";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Carousel from 'react-material-ui-carousel';
import { setCurrentSb } from "../features/snowballSlice";
import { useNavigate } from "react-router-dom";
// ------------------------------------------------------------------------

// Collect 타입 지정
type Collect = {
  screenshot : string,
  snowglobeId : number
}
const accessToken = localStorage.getItem("accessToken")


function Collection() {
  const user_id = useSelector((state:RootState) => state.user.userId)
  const currentSbId = useSelector((state:RootState) => state.snowball.current_sb_id)
  // shelf list = [{snowglobeId: 2, screenshot: 'https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/2.png'}, snowglobeId: 1, screenshot: 'https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/1.png']
  const shelf_list = useSelector((state:RootState) => state.shelf.shelfList)
  const APIURL = API_URL()
  const dispatch = useDispatch()
  const router = useNavigate()

  const setSelection = (sg_id: number) => {
    axios({
      method: "GET",
      url: `${APIURL}api/snowglobe/${sg_id}/detail` 
    })
    .then((res) => {
      console.log(res.data)
      dispatch(setCurrentSb(res.data))
    })

  }

  const deleteSelection = (sg_id: number) => {
    axios({
      method: "PATCH",
      url: `${APIURL}api/snowglobe/${sg_id}/delete`,
      data: null,
      headers: {
        Authorization: `Bearer ${accessToken}`
      } 
    })
    .then((res) => {
      axios({
        method: "GET",
        url:`${APIURL}api/snowglobe/${user_id}/shelf`
      })
      .then((res) => {
        console.log(res.data)
        dispatch(setShelf(res.data))
      })
    })
  }

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 후 이용 가능합니다')
      router('/')
    }

    axios({
      method: "GET",
      url:`${APIURL}api/snowglobe/${user_id}/shelf`
    })
    .then((res) => {
      console.log(res.data)
      dispatch(setShelf(res.data))
    })
  },[])

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

            {/* 여기는 설명 */}
            <div className={styles.navbar_info}>
              <div className={styles.navbar_info_text}>  
                원하는 스노우볼을 선택하세요
              </div>
            </div>

            {/* 여기는 컬렉션 박스 */}
            <div className={styles.collection_box}>
            <Carousel className={styles.collection_carousel}
             navButtonsProps={{         
              style: {
                  // backgroundColor: 'cornflowerblue',
                  borderRadius: 10, 
              }
            }} 
            height={"90%"}
            autoPlay={false}>
              {
                shelf_list.map((item: Collect, i : number) => 
                <div key={i} className={styles.collection_carousel_div}>
                  <img  src={item.screenshot} className={styles.collection_carousel_img}/>
                  {item.snowglobeId === currentSbId ?
                  <div className={styles.current_button_container}>
                  <Button color="error" size='large' variant='outlined' className={ styles.current_button} onClick={() => setSelection(item.snowglobeId)}>선택됨</Button>
                  </div>: 
                  <div className={styles.save_button_container}>
                  <Button color="error" size='large' variant='outlined' className={ styles.save_button} onClick={() => setSelection(item.snowglobeId)}>선택</Button>
                  {i != 0 ? <Button color="error" size='large' variant='outlined' className={ styles.save_button} onClick={() => deleteSelection(item.snowglobeId)}>삭제</Button> : null}
                  </div>
                  }  
                </div> 
                )
              }
              </Carousel>
            </div>


          </Grid>
          {/* 오른쪽 마진 */}
          <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
        </Grid>
      </div>
    )
}

export default Collection