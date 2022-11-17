// system
import React, { useState } from 'react';
import styles from "./search.module.css";

// mui
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear';



const Search = styled('div')(({ theme }) => ({
 position: 'relative',
 borderRadius: theme.shape.borderRadius,
 backgroundColor: alpha(theme.palette.common.white, 0.3),
 '&:hover': {
  backgroundColor: alpha(theme.palette.common.white, 0.5),
 },
 marginLeft: 24,
 marginRight: 24,
 width: 'auto',
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
 height: '100%',
 position: 'absolute',
 pointerEvents: 'none',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
 color: 'inherit',
 '& .MuiInputBase-input': {
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(5)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
[theme.breakpoints.up('sm')]: {
   width: '100%',
   '&:focus': {
     width: '100%',
   },
  },
 },
}));


// 버튼 색
const theme = createTheme({
 palette: {
  primary: {
   main: '#A6D388',
  },
  success:{
   main: '#FED6D6',
  },
 },
});


const SearchBar = (props : any) => {
 const [text, setText] = useState('');
 const onChange = (e: any) => {
  setText(e.target.value);
 };

 return (
  <ThemeProvider theme={theme}>
   <Search id='css-xkcxz9' className={styles.searchbarBody}>
      <StyledInputBase
      className={`css-3zl9sa-MuiInputBase-root MuiInputBase-input ${styles.green_text}`}
      placeholder="친구를 검색하세요"
      inputProps={{ 'aria-label': 'search' }}
      onChange={onChange}
      value={text}
      />
      {/* 검색어 삭제 */}
      <Button sx={{width: "1px"}}>
        <ClearIcon onClick={() => {props.setData(''); setText('')}} />
      </Button>
      {/* 검색어 입력 */}
      <Button onClick={() => props.setData(text) }>
        <SearchIcon />
      </Button>
   </Search>
  </ThemeProvider>
  )
}

export default SearchBar;