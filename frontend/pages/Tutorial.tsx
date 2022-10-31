import { Grid } from '@mui/material';
import styles from "./Tutorial.module.css"

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';  

// import merryChristmasLetter from '../public/images/christmas_lettering.png'

const Tutorial= () => {
  const tutorialTextArr = ['설명1', '설명2', '설명3', '설명4']

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let cntTutorialText = tutorialTextArr[activeStep]

  return (
    <div id="container_div">
      <Grid container id="container_div">
        {/* 왼쪽 마진 */}
        <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

        {/* 메인 콘텐츠 */}
        <Grid xs={12} sm={8} md={6} xl={4} item id="main_div">
          <div className={styles.tutorial_text}>
            {cntTutorialText}
          </div>
          <img src='/images/tutorial_box.png' alt="" className={styles.tutorial_box}/>
          {/* 튜토리얼 설명문구란 */}

          <MobileStepper
            className={styles.mobile_stepper}
            variant="dots"
            steps={4}
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
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
        <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
      </Grid>
    </div>
    )
}

export default Tutorial