import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initalState 타입 정의
interface UserType {
  userId: number,
  userName: string,
  nickname: string,
  snowglobeId: number,
  profileImgUrl: string,
};

// initalState 생성
const initialState: UserType = {
     userId: 0,
     userName: '',
     nickname: '',
     snowglobeId: 0,
     profileImgUrl: '',
    }

// 슬라이스생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // action의 타입은 PayloadAction<제네릭> 으로 정의해준다.
    setUser: (state: UserType, action) => {
      state.userId = action.payload.memberId
      state.userName = action.payload.name
      state.nickname = action.payload.nickname
      state.snowglobeId = action.payload.snowglobeId
      state.profileImgUrl = action.payload.profileImageUrl
      console.log(state.userName)
    },
    // minusCounter: (state: StateType, action: PayloadAction<number>) => {
    //   state.value -= action.payload;
    // }
  }
});

// 액션을 export 해준다.
export const { setUser } = userSlice.actions;

// 슬라이스를 export 해준다.
export default userSlice.reducer;