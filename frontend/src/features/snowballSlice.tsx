import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LargeNumberLike } from 'crypto';

// initalState 타입 정의
interface SnowballType {
  current_sb_id: number
  c_tree_id: number
  building_id: number
  snowman_id: number
  objet1_id: number
  objet2_id: number
  objet3_id: number
  pets_id: number
  music_id: number

};

// initalState 생성
const initialState: SnowballType = {
    current_sb_id: 0,
    c_tree_id: 0,
    building_id: 0,
    snowman_id: 0,
    objet1_id: 0,
    objet2_id: 0,
    objet3_id: 0,
    pets_id: 0,
    music_id: 0,
    }

// 슬라이스생성
export const SnowballSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    setCurrentSb: (state: SnowballType, action) => {
      state.current_sb_id = action.payload.snowglobeId
      state.c_tree_id = action.payload.deco[0].indicator
      state.building_id = action.payload.deco[1].indicator
      state.snowman_id = action.payload.deco[2].indicator
      state.objet1_id = action.payload.deco[3].indicator
      state.objet2_id = action.payload.deco[4].indicator
      state.objet3_id = action.payload.deco[5].indicator
      state.pets_id = action.payload.deco[6].indicator
      state.music_id = action.payload.musicId
    },
    changeThreeItem: (state: SnowballType, action) => {
      switch(action.payload.tapValue) {
        case 0:
          state.c_tree_id = action.payload.indicator
          break
        case 1:
          state.building_id = action.payload.indicator
          break
        case 2:
          state.snowman_id = action.payload.indicator
          break
        case 3:
          state.objet1_id = action.payload.indicator
          break
        case 4:
          state.objet2_id = action.payload.indicator
          break
        case 5:
          state.objet3_id = action.payload.indicator
          break
        case 6:
          state.pets_id = action.payload.indicator
          break
      }
    }
    // minusCounter: (state: StateType, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // }
  }
});

// 액션을 export 해준다.
export const { setCurrentSb, changeThreeItem } = SnowballSlice.actions;

// 슬라이스를 export 해준다.
export default SnowballSlice.reducer;