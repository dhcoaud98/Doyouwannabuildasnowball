// Systems
import { useState } from 'react';

// Other components
import "../index.css"
import styles from "./tutorial.module.css"
import { API_URL } from "../switchurl"
import tutorialBoxImg from "../assets/images/tutorial_box.png"

// MUI
import { Grid, Button, MobileStepper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';  

// ------------------------------------------------------------------------

function Tutorial() {
  // 튜토리얼 장
  const [activeStep, setActiveStep] = useState(0);
  
  // 튜토리얼 다음 장 함수
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // 튜토리얼 이전 장 함수
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // 테마 사용
  const theme = useTheme();
  
  // 각 장에 해당하는 튜토리얼에 띄워줄 요소들과 현재 장에서 보여주는 튜토리얼들
  const tutorialTextArr = ['설명1', '설명2', '설명3', '설명4']
  let cntTutorialText = tutorialTextArr[activeStep]

  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} lg={4} xl={3} item id="main_div">
          <div className={styles.tutorial_text}>
            {cntTutorialText}
          </div>
          <img src={tutorialBoxImg} alt="" className={styles.tutorial_box}/>
          {/* 튜토리얼 설명문구란 */}

          <MobileStepper
            className={styles.mobile_stepper}
            variant="dots"
            steps={4}
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1, padding: 0 }}
            nextButton={
              <Button  onClick={handleNext} disabled={activeStep === 3}>
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
          
        </Grid>
        {/* 오른쪽 마진 */}
        <Grid xs={0} sm={2} md={3} lg={4} xl={4.5} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default Tutorial