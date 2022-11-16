import { useParams } from "react-router-dom"
import axios from 'axios';


import '../index.css'
import styles from "./merrychristmas.module.css"
import tutorialBoxImg from "../assets/images/tutorial_box.png"
import decorationImg from "../assets/images/decoration.png"
import { Grid } from "@mui/material"
import { Navbar } from '../components/navbar/navbar';

function MerryChristmas() {

  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} lg={4} xl={3} pt={8} item id="main_div">
          <div className={styles.navbar}>
            <Navbar />
          </div>

          <div className={styles.description_box}>
            <img src={tutorialBoxImg} alt="" className={styles.tutorial_box}/>

            <Grid container direction="row" className={styles.description} justifyContent="center">
              <Grid item spacing={3}>
                <p className={`font-bold ${styles.welcome_text} ${styles.green_text}`} style={{fontSize: '2rem', margin:0, marginBottom:5}}>정말 예쁜 스노우볼이네요!</p>
                <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem', margin:0}}>선물 받으시는 분도</p>
                <p className={`font-light ${styles.welcome_text} ${styles.green_text}`} style={{fontSize:'1.6rem', margin:0}}>분명 좋아하실거에요!</p>
              </Grid>

              <Grid item>
                <p className={`font-bold ${styles.welcome_text} ${styles.green_text}`} style={{fontSize: '2rem', margin:0}}>만나서 정말 반가웠어요!</p>
              </Grid>

              <Grid item>
                <p className={`font-bold ${styles.welcome_text} ${styles.red_text}`} style={{fontSize: '3rem', margin:0}}>메리크리스마스!</p>
              </Grid>
            </Grid>
          </div>
          <img src={decorationImg} alt="" className={styles.decoration}/>
        </Grid>

        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
      </Grid>
    </div>
  )
}

export default MerryChristmas