// Systems

// Other components
import Navbar from "../components/navbar/navbar";
import styles from "./collection.module.css"

// MUI
import { Grid } from '@mui/material';

// ------------------------------------------------------------------------

const Collection= () => {
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

            {/* 여기는 설명 */}
            <div className={styles.navbar_info}>
              <div className={styles.navbar_info_text}>  
                원하는 스노우볼을 선택하세요
              </div>
            </div>

            {/* 여기는 컬렉션 박스 */}
            <div className={styles.collection_box}>
              <img src="/images/deco1.png" alt="" className={styles.flower_deco}/>
      
              {/* <div className={styles.collection_box_top}></div> */}

              <div className={styles.collection_box_top}>
                <img src="/images/woodbar2.png" className={styles.collection_mysnowball}></img>
              </div>
              <div className={styles.collection_box_top}>
                {/* <Snow_globe/> */}
              </div>
              
              <div className={styles.collection_box_top}>
                <img src="/images/woodbar2.png" className={styles.collection_mysnowball2}></img>
              </div>
              <div className={styles.collection_box_top}>
                <img src="/images/woodbar2.png" className={styles.collection_mysnowball3}></img>
              </div>
            </div>


          </Grid>
          {/* 오른쪽 마진 */}
          <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
        </Grid>
      </div>
    )
}

export default Collection