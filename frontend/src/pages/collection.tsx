// Systems
import { API_URL } from "../switchurl";
// Other components
import { Navbar } from "../components/navbar/navbar";
import styles from "./collection.module.css"
import deco1Img from "../assets/images/deco1.png"
import woodbar2Img from "../assets/images/woodbar2.png"

// MUI
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import axios from "axios";
import { setShelf } from "../features/shelfSlice";

// ------------------------------------------------------------------------

function Collection() {
  const user_id = useSelector((state:RootState) => state.user.userId)
  // shelf list = [{snowglobeId: 2, screenshot: 'https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/2.png'}, snowglobeId: 1, screenshot: 'https://601snowball.s3.ap-northeast-2.amazonaws.com/snowball_sc/1.png']
  const shelf_list = useSelector((state:RootState) => state.shelf.shelfList)
  const APIURL = API_URL()
  const dispatch = useDispatch()
  useEffect(() => {
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
              <img src={deco1Img} alt="" className={styles.flower_deco}/>
      
              {/* <div className={styles.collection_box_top}></div> */}

              <div className={styles.collection_box_top}>
                <img src={woodbar2Img} className={styles.collection_mysnowball}></img>
              </div>
              <div className={styles.collection_box_top}>
                {/* <Snow_globe/> */}
              </div>
              
              <div className={styles.collection_box_top}>
                <img src={woodbar2Img} className={styles.collection_mysnowball2}></img>
              </div>
              <div className={styles.collection_box_top}>
                <img src={woodbar2Img} className={styles.collection_mysnowball3}></img>
              </div>
            </div>


          </Grid>
          {/* 오른쪽 마진 */}
          <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
        </Grid>
      </div>
    )
}

export default Collection