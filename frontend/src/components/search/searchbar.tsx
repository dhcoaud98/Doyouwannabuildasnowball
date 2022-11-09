import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear';
import Grid from '@mui/material/Grid';

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

const SearchBar = (props : any) => {
  const [text, setText] = useState('');
  
  const onChange = (e: any) => {
    setText(e.target.value);
    // console.log('지금 검색 이름 = ', e.target.value)
  };

  return (
    <Search id='css-xkcxz9'>


      {/* <input onChange={onChange} value={text}  /> */}
      <Grid>

      <StyledInputBase
        className='css-3zl9sa-MuiInputBase-root MuiInputBase-input'
        placeholder="친구를 검색하세요"
        inputProps={{ 'aria-label': 'search' }}
        onChange={onChange}
        value={text}
        />
      </Grid>
      <Button onClick={() => props.setData(text) } >
        <SearchIcon />
      </Button>
      <Button>
        <ClearIcon onClick={() => props.setData('')} />
      </Button>
    </Search>
    )
}

export default SearchBar;