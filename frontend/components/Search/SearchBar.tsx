
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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
  // [theme.breakpoints.up('sm')]: {
    // width: 'auto',
  // },
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
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

const SearchBar= () => {
  return (
    <Search id='css-xkcxz9'>
      <SearchIconWrapper >
        <SearchIcon sx={{ ml: 1 }}/>
      </SearchIconWrapper>
      <StyledInputBase
        className='css-3zl9sa-MuiInputBase-root MuiInputBase-input'
        placeholder="친구를 검색하세요"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
    )
}


export default SearchBar