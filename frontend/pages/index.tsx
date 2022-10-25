import Button from '@mui/material/Button';
import { Grid, Stack } from '@mui/material';
import styles from "./index.module.css"


const Home = () => {
  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div">
          {/* 메인로고 */}
          <img src="/images/main_logo.png" alt="" className={styles.main_logo}/>

          {/* 카카오로그인버튼 - 고정 */}
          <Button className={styles.kakao_login_btn}><img src="/images/kakao_login_btn.png" alt="" className={styles.kakao_login_img} /></Button>

          {/* 하단 장식줄 - 고정 */}
          <img src="/images/decoration.png" alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default Home
