import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
interface SnowballType {
  current_sb_id: number
  c_tree_id: number
  building_id: number
  snowman_id: number
  plants_id: number
  light_id: number
  objet_id: number
  pets_id: number

};

// initalState 생성
const initialState: SnowballType = {
    current_sb_id: 0,
    c_tree_id: 0,
    building_id: 0,
    snowman_id: 0,
    plants_id: 0,
    light_id: 0,
    objet_id: 0,
    pets_id: 0,
    }

// 슬라이스생성
export const SnowballSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    setCurrentSb: (state: SnowballType, action) => {
      state.current_sb_id = action.payload.memberId

    },
    // minusCounter: (state: StateType, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // }
  }
});

// 액션을 export 해준다.
export const { setCurrentSb } = SnowballSlice.actions;

// 슬라이스를 export 해준다.
export default SnowballSlice.reducer;