// Systems
import * as React from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { changeThreeItem, setCurrentSb } from '../../features/snowballSlice';
import { useAppDispatch } from '../../app/hooks';


// Other components
import styles from './customlist.module.css'
import Tree_1 from '../../assets/images/illustrations/trees/tree_1.png' 
import Tree_2 from '../../assets/images/illustrations/trees/tree_2.png' 
import Tree_3 from '../../assets/images/illustrations/trees/tree_3.png' 
import Tree_4 from '../../assets/images/illustrations/trees/tree_4.png' 
import Tree_5 from '../../assets/images/illustrations/trees/tree_5.png' 
import Tree_6 from '../../assets/images/illustrations/trees/tree_6.png' 
import Tree_7 from '../../assets/images/illustrations/trees/tree_7.png' 
import Tree_8 from '../../assets/images/illustrations/trees/tree_8.png' 
import Tree_9 from '../../assets/images/illustrations/trees/tree_9.png' 

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

export function CustomList() {
  // 현재 몇번째 탭인지
  const [tapValue, setTapValue] = React.useState(0);
  // react hook
  const dispatch = useAppDispatch()
  const deco = useSelector((state:RootState) => state.snowball.deco)
  const c_tree_id = useSelector((state: RootState) => state.snowball.deco[0].indicator)

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
  

  // 버튼 클릭시 three 변화 함수
  const changeThreeComponent = (idx : number) => {
    const payload = {tapValue: tapValue, indicator: idx}
    console.log(idx, payload)
    dispatch(changeThreeItem(payload))
  }

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
            <Tab label="tree" />
            <Tab label="build" />
            <Tab label="snow" />
            <Tab label="ob1" disabled={(c_tree_id === 0 || c_tree_id === 1) ? true : false}/>
            <Tab label="ob2" disabled={(c_tree_id === 0 || c_tree_id === 1) ? true : false}/>
            <Tab label="ob3" disabled={(c_tree_id === 0 || c_tree_id === 1) ? true : false}/>
            <Tab label="pet" />
          </Tabs>

          {/* 탭별 하단요소들 */}
          <Grid component="div" container justifyContent="space-around" alignContent="space-evenly" className={styles.btn_container}>
            {tapImagesArr[tapValue].map((tapImage, idx) => (
              <Grid item key={idx} xs={2.4}>
                <Button variant="outlined" onClick={() => changeThreeComponent(idx)}>{tapImage.image_path}</Button>
              </Grid>
              ))}
          </Grid>
        </ThemeProvider>
      </Box>
    </div>
    )
}