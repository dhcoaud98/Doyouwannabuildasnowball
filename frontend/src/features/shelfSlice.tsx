import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
interface ShelfType {
  shelfList: Array<any>
}

// initalState 생성
const initialState: ShelfType = {
    shelfList: []
}

// 슬라이스생성
export const shelfSlice = createSlice({
  name: 'shelf',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    setShelf: (state: ShelfType, action) => {
      state.shelfList = action.payload
    }
    // minusCounter: (state: StateType, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // }
  }
});

// 액션을 export 해준다.
export const { setShelf} = shelfSlice.actions;

// 슬라이스를 export 해준다.
export default shelfSlice.reducer;