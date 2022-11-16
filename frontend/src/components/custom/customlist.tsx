// Systems
import * as React from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { changeThreeItem, setCurrentSb } from '../../features/snowballSlice';
import { useAppDispatch } from '../../app/hooks'

// Other components
import styles from './customlist.module.css'
// import Tap_Tree from '../../assets/images/illustrations/tap_buttons/tree_btn.png'
// import Tap_Building from '../../assets/images/illustrations/tap_buttons/building_btn.png'
// import Tap_Snowman from '../../assets/images/illustrations/tap_buttons/snowman_btn.png'
// import Tap_Obj1 from '../../assets/images/illustrations/tap_buttons/obj1_btn.png'
// import Tap_Obj2 from '../../assets/images/illustrations/tap_buttons/obj2_btn.png'
// import Tap_Obj3 from '../../assets/images/illustrations/tap_buttons/obj3_btn.png'
// import Tap_Pet from '../../assets/images/illustrations/tap_buttons/pet_btn.png'
import Tree_1 from '../../assets/images/illustrations/trees/tree_1.png' 
import Tree_2 from '../../assets/images/illustrations/trees/tree_2.png' 
import Tree_3 from '../../assets/images/illustrations/trees/tree_3.png' 
import Tree_4 from '../../assets/images/illustrations/trees/tree_4.png' 
import Tree_5 from '../../assets/images/illustrations/trees/tree_5.png' 
import Tree_6 from '../../assets/images/illustrations/trees/tree_6.png' 
import Tree_7 from '../../assets/images/illustrations/trees/tree_7.png' 
import Tree_8 from '../../assets/images/illustrations/trees/tree_8.png' 
import Tree_9 from '../../assets/images/illustrations/trees/tree_9.png'
import Building_1 from '../../assets/images/illustrations/buildings/building_1.png'
import Building_2 from '../../assets/images/illustrations/buildings/building_2.png'
import Building_3 from '../../assets/images/illustrations/buildings/building_3.png'
import Building_4 from '../../assets/images/illustrations/buildings/building_4.png'
import Building_5 from '../../assets/images/illustrations/buildings/building_5.png'
import Building_6 from '../../assets/images/illustrations/buildings/building_6.png'
import Snowman_1 from '../../assets/images/illustrations/snowmans/snowman_1.png'
import Snowman_2 from '../../assets/images/illustrations/snowmans/snowman_2.png'
import Snowman_3 from '../../assets/images/illustrations/snowmans/snowman_3.png'
import Snowman_4 from '../../assets/images/illustrations/snowmans/snowman_4.png'
import Snowman_5 from '../../assets/images/illustrations/snowmans/snowman_5.png'
import Snowman_6 from '../../assets/images/illustrations/snowmans/snowman_6.png'
import Snowman_7 from '../../assets/images/illustrations/snowmans/snowman_7.png'
import Snowman_8 from '../../assets/images/illustrations/snowmans/snowman_8.png'
import Obj1_1 from '../../assets/images/illustrations/objects_1/obj1_1.png'
import Obj1_2 from '../../assets/images/illustrations/objects_1/obj1_2.png'
import Obj1_3 from '../../assets/images/illustrations/objects_1/obj1_3.png'
import Obj1_4 from '../../assets/images/illustrations/objects_1/obj1_4.png'
import Obj1_5 from '../../assets/images/illustrations/objects_1/obj1_5.png'
import Obj1_6 from '../../assets/images/illustrations/objects_1/obj1_6.png'
import Obj1_7 from '../../assets/images/illustrations/objects_1/obj1_7.png'
import Obj1_8 from '../../assets/images/illustrations/objects_1/obj1_8.png'
import Obj1_9 from '../../assets/images/illustrations/objects_1/obj1_9.png'
import Obj1_10 from '../../assets/images/illustrations/objects_1/obj1_10.png'
import Obj2_1 from '../../assets/images/illustrations/objects_2/obj2_1.png'
import Obj2_2 from '../../assets/images/illustrations/objects_2/obj2_2.png'
import Obj2_3 from '../../assets/images/illustrations/objects_2/obj2_3.png'
import Obj2_4 from '../../assets/images/illustrations/objects_2/obj2_4.png'
import Obj2_5 from '../../assets/images/illustrations/objects_2/obj2_5.png'
import Obj2_6 from '../../assets/images/illustrations/objects_2/obj2_6.png'
import Obj2_7 from '../../assets/images/illustrations/objects_2/obj2_7.png'
import Obj2_8 from '../../assets/images/illustrations/objects_2/obj2_8.png'
import Obj2_9 from '../../assets/images/illustrations/objects_2/obj2_9.png'
import Obj2_10 from '../../assets/images/illustrations/objects_2/obj2_10.png'
import Obj3_1 from '../../assets/images/illustrations/objects_3/obj3_1.png'
import Obj3_2 from '../../assets/images/illustrations/objects_3/obj3_2.png'
import Obj3_3 from '../../assets/images/illustrations/objects_3/obj3_3.png'
import Obj3_4 from '../../assets/images/illustrations/objects_3/obj3_4.png'
import Obj3_5 from '../../assets/images/illustrations/objects_3/obj3_5.png'
import Obj3_6 from '../../assets/images/illustrations/objects_3/obj3_6.png'
import Obj3_7 from '../../assets/images/illustrations/objects_3/obj3_7.png'
import Obj3_8 from '../../assets/images/illustrations/objects_3/obj3_8.png'
import Obj3_9 from '../../assets/images/illustrations/objects_3/obj3_9.png'
import Obj3_10 from '../../assets/images/illustrations/objects_3/obj3_10.png'
import Pet_1 from '../../assets/images/illustrations/pets/pet_1.png'
import Pet_2 from '../../assets/images/illustrations/pets/pet_2.png'
import Pet_3 from '../../assets/images/illustrations/pets/pet_3.png'
import Pet_4 from '../../assets/images/illustrations/pets/pet_4.png'
import Pet_5 from '../../assets/images/illustrations/pets/pet_5.png'
import Pet_6 from '../../assets/images/illustrations/pets/pet_6.png'
import Pet_7 from '../../assets/images/illustrations/pets/pet_7.png'
import Pet_8 from '../../assets/images/illustrations/pets/pet_8.png'
import Pet_9 from '../../assets/images/illustrations/pets/pet_9.png'
import Pet_10 from '../../assets/images/illustrations/pets/pet_10.png'

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
    [{image_path:Tree_1,},{image_path:Tree_2,},{image_path:Tree_3,},{image_path:Tree_4,},{image_path:Tree_5,},{image_path:Tree_6,},{image_path:Tree_7,},{image_path:Tree_8,},{image_path:Tree_9,},{image_path:"1-10",}],
    [{image_path:Building_1,},{image_path:Building_2,},{image_path:Building_3,},{image_path:Building_4,},{image_path:Building_5,},{image_path:Building_6,},{image_path:"2-7",},{image_path:"2-8",},{image_path:"2-9",},{image_path:"2-10",}],
    [{image_path:Snowman_1,},{image_path:Snowman_2,},{image_path:Snowman_3,},{image_path:Snowman_4,},{image_path:Snowman_5,},{image_path:Snowman_6,},{image_path:Snowman_7,},{image_path:Snowman_8,},{image_path:"3-9",},{image_path:"3-10"}],
    [{image_path:Obj1_1,},{image_path:Obj1_2,},{image_path:Obj1_3,},{image_path:Obj1_4,},{image_path:Obj1_5,},{image_path:Obj1_6,},{image_path:Obj1_7,},{image_path:Obj1_8,},{image_path:Obj1_9,},{image_path:Obj1_10,}],
    [{image_path:Obj2_1,},{image_path:Obj2_2,},{image_path:Obj2_3,},{image_path:Obj2_4,},{image_path:Obj2_5,},{image_path:Obj2_6,},{image_path:Obj2_7,},{image_path:Obj2_8,},{image_path:Obj2_9,},{image_path:Obj2_10,}],
    [{image_path:Obj3_1,},{image_path:Obj3_2,},{image_path:Obj3_3,},{image_path:Obj3_4,},{image_path:Obj3_5,},{image_path:Obj3_6,},{image_path:Obj3_7,},{image_path:Obj3_8,},{image_path:Obj3_9,},{image_path:Obj3_10,}],
    [{image_path:Pet_1,},{image_path:Pet_2,},{image_path:Pet_3,},{image_path:Pet_4,},{image_path:Pet_5,},{image_path:Pet_6,},{image_path:Pet_7,},{image_path:Pet_8,},{image_path:Pet_9,},{image_path:Pet_10}]
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
            <Tab label="나무"/>
            <Tab label="건물" />
            <Tab label="눈사람" />
            <Tab label="장식1" disabled={(c_tree_id === 0 || c_tree_id === 1) ? true : false}/>
            <Tab label="장식2" disabled={(c_tree_id === 0 || c_tree_id === 1) ? true : false}/>
            <Tab label="장식3" disabled={(c_tree_id === 0 || c_tree_id === 1) ? true : false}/>
            <Tab label="동물" />
          </Tabs>

          {/* 탭별 하단요소들 */}
          <Grid component="div" container justifyContent="space-around" alignContent="space-evenly" className={styles.btn_container}>
            {tapImagesArr[tapValue].map((tapImage, idx) => (
              <Grid item key={idx} xs={2.4}>
                <Button variant="outlined" onClick={() => changeThreeComponent(idx)}>
                  <img className={styles.button_img} src={tapImage.image_path} alt={tapImage.image_path} />
                </Button>
              </Grid> 
              ))}
          </Grid>
        </ThemeProvider>
      </Box>
    </div>
    )
}