import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// reducer
import userReducer from './userSlice';


const reducers = combineReducers({
    user:userReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

  
  // store 엑스포트
  export default store;
  
  // RootState 엑스포트
  export type RootState = ReturnType<typeof store.getState>;