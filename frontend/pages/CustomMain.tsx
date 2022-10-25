import { Grid, Stack } from '@mui/material';
// three import
import MainContainer from "components/Three/MainContainer";
import styles from "./CustomMain.module.css"


const CustomMain= () => {
  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div" container direction="column" justifyContent="space-between">                                
          {/* 상단 */}
          <Grid component="div" item xs={2} className={styles.upper}>
            <h1 className={styles.font_test}>나의 스노우볼</h1>
          </Grid>

          {/* Three.js */}
          <Grid component="div" item xs={9}>
            <MainContainer/>
          </Grid>

          {/* 하단 */}
          <Grid component="div" item xs={1}>
            <img src="/images/decoration.png" alt="" className={styles.decoration}/>
          </Grid>      
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default CustomMain