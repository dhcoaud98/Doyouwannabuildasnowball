import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
const makeStore = () => {
  
    // 슬라이스 통합 store 생성
    const store = configureStore({
      reducer: {
        user: userSlice
        // [counterSlice.name]: counterSlice.reducer, // 위와 동일한 코드다.
        // [numberSlice.name]: numberSlice.reducer
      },
      devTools: process.env.NODE_ENV === 'development' // 개발자도구 설정
    });
  
    return store;
  };
  
  // store 생성
  const store = makeStore();
  
  // store 엑스포트
  export default store;
  
  // RootState 엑스포트
  export type RootState = ReturnType<typeof store.getState>;