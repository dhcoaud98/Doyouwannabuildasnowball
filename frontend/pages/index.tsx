import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import styles from "./index.module.css"


const Home = () => {
  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div">
          <h1>MainPage</h1>
          <p>여기는 제일 기본이 되는 MainPage입니다.</p>
          <Button>KakaoLogin</Button>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default Home
