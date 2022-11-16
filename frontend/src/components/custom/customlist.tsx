// Systems
import * as React from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { changeThreeItem, setCurrentSb } from '../../features/snowballSlice';
import { useAppDispatch } from '../../app/hooks';


// Other components
import styles from './customlist.module.css'
import Tap_Tree from '../../assets/images/illustrations/tap_buttons/tree_btn.webp'
import Tap_Building from '../../assets/images/illustrations/tap_buttons/building_btn.webp'
import Tap_Snowman from '../../assets/images/illustrations/tap_buttons/snowman_btn.webp'
import Tap_Obj1 from '../../assets/images/illustrations/tap_buttons/obj1_btn.webp'
import Tap_Obj2 from '../../assets/images/illustrations/tap_buttons/obj2_btn.webp'
import Tap_Obj3 from '../../assets/images/illustrations/tap_buttons/obj3_btn.webp'
import Tap_Pet from '../../assets/images/illustrations/tap_buttons/pet_btn.webp'
import Tree_1 from '../../assets/images/illustrations/trees/tree_1.webp' 
import Tree_2 from '../../assets/images/illustrations/trees/tree_2.webp' 
import Tree_3 from '../../assets/images/illustrations/trees/tree_3.webp' 
import Tree_4 from '../../assets/images/illustrations/trees/tree_4.webp' 
import Tree_5 from '../../assets/images/illustrations/trees/tree_5.webp' 
import Tree_6 from '../../assets/images/illustrations/trees/tree_6.webp' 
import Tree_7 from '../../assets/images/illustrations/trees/tree_7.webp' 
import Tree_8 from '../../assets/images/illustrations/trees/tree_8.webp' 
import Tree_9 from '../../assets/images/illustrations/trees/tree_9.webp'
import Building_1 from '../../assets/images/illustrations/buildings/building_1.webp'
import Building_2 from '../../assets/images/illustrations/buildings/building_2.webp'
import Building_3 from '../../assets/images/illustrations/buildings/building_3.webp'
import Building_4 from '../../assets/images/illustrations/buildings/building_4.webp'
import Building_5 from '../../assets/images/illustrations/buildings/building_5.webp'
import Building_6 from '../../assets/images/illustrations/buildings/building_6.webp'
import Snowman_1 from '../../assets/images/illustrations/snowmans/snowman_1.webp'
import Snowman_2 from '../../assets/images/illustrations/snowmans/snowman_2.webp'
import Snowman_3 from '../../assets/images/illustrations/snowmans/snowman_3.webp'
import Snowman_4 from '../../assets/images/illustrations/snowmans/snowman_4.webp'
import Snowman_5 from '../../assets/images/illustrations/snowmans/snowman_5.webp'
import Snowman_6 from '../../assets/images/illustrations/snowmans/snowman_6.webp'
import Snowman_7 from '../../assets/images/illustrations/snowmans/snowman_7.webp'
import Snowman_8 from '../../assets/images/illustrations/snowmans/snowman_8.webp'
import Obj1_1 from '../../assets/images/illustrations/objects1/obj1_1.webp'
import Obj1_2 from '../../assets/images/illustrations/objects1/obj1_2.webp'
import Obj1_3 from '../../assets/images/illustrations/objects1/obj1_3.webp'
import Obj1_4 from '../../assets/images/illustrations/objects1/obj1_4.webp'
import Obj1_5 from '../../assets/images/illustrations/objects1/obj1_5.webp'
import Obj1_6 from '../../assets/images/illustrations/objects1/obj1_6.webp'
import Obj1_7 from '../../assets/images/illustrations/objects1/obj1_7.webp'
import Obj1_8 from '../../assets/images/illustrations/objects1/obj1_8.webp'
import Obj1_9 from '../../assets/images/illustrations/objects1/obj1_9.webp'
import Obj1_10 from '../../assets/images/illustrations/objects1/obj1_10.webp'
import Obj2_1 from '../../assets/images/illustrations/objects1/obj2_1.webp'
import Obj2_2 from '../../assets/images/illustrations/objects1/obj2_2.webp'
import Obj2_3 from '../../assets/images/illustrations/objects1/obj2_3.webp'
import Obj2_4 from '../../assets/images/illustrations/objects1/obj2_4.webp'
import Obj2_5 from '../../assets/images/illustrations/objects1/obj2_5.webp'
import Obj2_6 from '../../assets/images/illustrations/objects1/obj2_6.webp'
import Obj2_7 from '../../assets/images/illustrations/objects1/obj2_7.webp'
import Obj2_8 from '../../assets/images/illustrations/objects1/obj2_8.webp'
import Obj2_9 from '../../assets/images/illustrations/objects1/obj2_9.webp'
import Obj2_10 from '../../assets/images/illustrations/objects1/obj2_10.webp'
import Obj3_1 from '../../assets/images/illustrations/objects1/obj3_1.webp'
import Obj3_2 from '../../assets/images/illustrations/objects1/obj3_2.webp'
import Obj3_3 from '../../assets/images/illustrations/objects1/obj3_3.webp'
import Obj3_4 from '../../assets/images/illustrations/objects1/obj3_4.webp'
import Obj3_5 from '../../assets/images/illustrations/objects1/obj3_5.webp'
import Obj3_6 from '../../assets/images/illustrations/objects1/obj3_6.webp'
import Obj3_7 from '../../assets/images/illustrations/objects1/obj3_7.webp'
import Obj3_8 from '../../assets/images/illustrations/objects1/obj3_8.webp'
import Obj3_9 from '../../assets/images/illustrations/objects1/obj3_9.webp'
import Obj3_10 from '../../assets/images/illustrations/objects1/obj3_10.webp'
import Pet_1 from '../../assets/images/illustrations/pets/pet_1.webp'
import Pet_2 from '../../assets/images/illustrations/pets/pet_2.webp'
import Pet_3 from '../../assets/images/illustrations/pets/pet_3.webp'
import Pet_4 from '../../assets/images/illustrations/pets/pet_4.webp'
import Pet_5 from '../../assets/images/illustrations/pets/pet_5.webp'
import Pet_6 from '../../assets/images/illustrations/pets/pet_6.webp'
import Pet_7 from '../../assets/images/illustrations/pets/pet_7.webp'
import Pet_8 from '../../assets/images/illustrations/pets/pet_8.webp'
import Pet_9 from '../../assets/images/illustrations/pets/pet_9.webp'
import Pet_10 from '../../assets/images/illustrations/pets/pet_10.webp'

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