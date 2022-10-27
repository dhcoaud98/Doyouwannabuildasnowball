import * as React from 'react';
import { Grid } from '@mui/material';
import styles from "./[userid].module.css"


// 컴포너트
import Navbar from 'components/Navbar/Navbar';
import SearchBar from 'components/Search/SearchBar';



const Profile= () => {

  
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
            <SearchBar />
          </div>
          
          {/* 여기는 친구 목록 */}
          <div className={styles.friends}>여기는 친구 목록
          
          </div>
        </Grid>
        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default Profile