import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { CookiesProvider } from 'react-cookie';

// import Board from './pages/board'
// import Collection from './pages/collection'
import CustomMain from './pages/custommain'
// import Friends from './pages/friends'
// import Index from './pages/intro'
// import Tutorial  from './pages/tutorial'
// import Welcome from './pages/welcome'
// import Setnickname from './pages/setnickname'
// import AskForShare from './pages/askforshare';
// import UnityBackGround  from './pages/unitybackground'
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';


const container = document.getElementById('root')!;
const root = createRoot(container);
const Board = React.lazy(() => import('./pages/board'))
const Collection = React.lazy(() => import('./pages/collection'))
// const CustomMain = React.lazy(() => import('./pages/custommain'))
const Friends = React.lazy(() => import('./pages/friends'))
const Index = React.lazy(() => import('./pages/intro'))
const Tutorial = React.lazy(() => import('./pages/tutorial'))
const Welcome = React.lazy(() => import('./pages/welcome'))
const Setnickname = React.lazy(() => import('./pages/setnickname'))
const AskForShare = React.lazy(() => import('./pages/askforshare'))
const UnityBackGround = React.lazy(() => import('./pages/unitybackground'))
const persistor = persistStore(store)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <PersistGate persistor={persistor}>
          <CookiesProvider> 
            <BrowserRouter>
            <Suspense fallback={<div>loading</div>}>
              <Routes>
                <Route path="/" element={<Index/>}></Route>
                <Route path="/board" element={<Board/>}></Route>
                <Route path="/collection" element={<Collection/>}></Route>
                <Route path="/custommain/:userid" element={<CustomMain/>}></Route>
                <Route path="/friends/:userid" element={<Friends/>}></Route>
                <Route path="/tutorial" element={<Tutorial/>}></Route>
                <Route path="/welcome" element={<Welcome/>}></Route>
                <Route path="/setnickname" element={<Setnickname/>}></Route>
                <Route path="/askforshare" element={<AskForShare/>}></Route>
                <Route path="/unitybackground" element={<UnityBackGround/>}></Route>
              </Routes>
            </Suspense>
            </BrowserRouter>
          </CookiesProvider>  
        </PersistGate>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
