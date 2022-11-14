import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { LargeNumberLike } from 'crypto';

// initalState 타입 정의
interface SnowballType {
  current_sb_id: number
  music_id: number
  deco: Array<any> 

};

// initalState 생성
const initialState: SnowballType = {
    current_sb_id: 0,
    music_id: 0,
    deco: [{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 0, coordinateX: 0, coordinateY: 0, coordinateZ: 0}]
    }

// 슬라이스생성
export const SnowballSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    setCurrentSb: (state: SnowballType, action) => {
      state.current_sb_id = action.payload.snowglobeId
      state.music_id = action.payload.musicId
      state.deco = action.payload.deco
    },
    changeThreeItem: (state: SnowballType, action) => {
      switch(action.payload.tapValue) {
        case 0:
          state.deco[0].indicator = action.payload.indicator
          if (action.payload.indicator === 0 || action.payload.indicator === 1) {
            state.deco[3].indicator = 9
            state.deco[4].indicator = 9
            state.deco[5].indicator = 9
          }
          break
        case 1:
          state.deco[1].indicator = action.payload.indicator
          break
        case 2:
          state.deco[2].indicator = action.payload.indicator
          break
        case 3:
          state.deco[3].indicator = action.payload.indicator
          break
        case 4:
          state.deco[4].indicator = action.payload.indicator
          break
        case 5:
          state.deco[5].indicator = action.payload.indicator
          break
        case 6:
          state.deco[6].indicator = action.payload.indicator
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