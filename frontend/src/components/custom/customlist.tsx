// Systems
import * as React from 'react';

// Other components
import styles from './CustomList.module.css'

// MUI
import { Tabs, Tab, Box, Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'

// ------------------------------------------------------------------------

  
// 탭 테마 색상 변경
  const theme = createTheme({
    palette: {
      primary: {
        main: '#662113',
      },
    },
  });


const CustomList= () => {
  // 현재 몇번째 탭인지
  const [tapValue, setTapValue] = React.useState(0);

  // 각 탭에 들어갈 버튼 이미지들과 그 값들
  const tapImagesArr = [
    [{image_path:"1-1",},{image_path:"1-2",},{image_path:"1-3",},{image_path:"1-4",},{image_path:"1-5",},{image_path:"1-6",},{image_path:"1-7",},{image_path:"1-8",},{image_path:"1-9",},{image_path:"1-10",}],
    [{image_path:"2-1",},{image_path:"2-2",},{image_path:"2-3",},{image_path:"2-4",},{image_path:"2-5",},{image_path:"2-6",},{image_path:"2-7",},{image_path:"2-8",},{image_path:"2-9",},{image_path:"2-10",}],
    [{image_path:"3-1",},{image_path:"3-2",},{image_path:"3-3",},{image_path:"3-4",},{image_path:"3-5",},{image_path:"3-6",},{image_path:"3-7",},{image_path:"3-8",},{image_path:"3-9",},{image_path:"3-10",}],
    [{image_path:"4-1",},{image_path:"4-2",},{image_path:"4-3",},{image_path:"4-4",},{image_path:"4-5",},{image_path:"4-6",},{image_path:"4-7",},{image_path:"4-8",},{image_path:"4-9",},{image_path:"4-10",}],
    [{image_path:"5-1",},{image_path:"5-2",},{image_path:"5-3",},{image_path:"5-4",},{image_path:"5-5",},{image_path:"5-6",},{image_path:"5-7",},{image_path:"5-8",},{image_path:"5-9",},{image_path:"5-10",}],
    [{image_path:"6-1",},{image_path:"6-2",},{image_path:"6-3",},{image_path:"6-4",},{image_path:"6-5",},{image_path:"6-6",},{image_path:"6-7",},{image_path:"6-8",},{image_path:"6-9",},{image_path:"6-10",}],
    [{image_path:"7-1",},{image_path:"7-2",},{image_path:"7-3",},{image_path:"7-4",},{image_path:"7-5",},{image_path:"7-6",},{image_path:"7-7",},{image_path:"7-8",},{image_path:"7-9",},{image_path:"7-10",}]
  ]
  // 탭 변환 함수
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTapValue(newValue);
    console.log(newValue)
  };

  return (
    <div>
      <Box component="div" className={styles.drawer_box}>
        <ThemeProvider theme={theme}>
          {/* 상단탭 */}
          <Tabs
            value={tapValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="One" />
            <Tab label="Two" />
            <Tab label="Three" />
            <Tab label="Four" />
            <Tab label="Five" />
            <Tab label="Six" />
            <Tab label="Seven" />
          </Tabs>

          {/* 탭별 하단요소들 */}
          <Grid component="div" container justifyContent="space-around" alignContent="space-evenly" p={2} className={styles.btn_container}>
            {tapImagesArr[tapValue].map((tapImage, idx) => (
              <Grid item key={idx}>
                <Button variant="outlined">{tapImage.image_path}</Button>
              </Grid>
              ))}
          </Grid>
        </ThemeProvider>
      </Box>
    </div>
    )
}

export default CustomList