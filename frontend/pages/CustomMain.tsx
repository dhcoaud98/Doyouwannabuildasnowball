import { Grid, Stack } from '@mui/material';
// three import
import MainContainer from "components/Three/MainContainer";


const CustomMain= () => {
  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item container direction="column" id="main_div">
          <Grid xs={2} item>
            <h1>CustomMainPage</h1> 
          </Grid>
          <Grid xs={9} item>
            <MainContainer/>
          </Grid>
          

        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default CustomMain