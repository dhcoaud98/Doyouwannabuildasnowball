import * as React from 'react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';


// 컴포넌트
import Navbar from 'components/Navbar/Navbar';
import styles from "./Board.module.css"


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


const Board= () => {
  
  const messageColor = ['#FA6767', '#C68CFF', '#FFACAC', '#FDE58E', '#FFBE5F']

  const [content, setContent] = React.useState(' ');

  // delete axios

  // create axios
  const sendMessage = () => (
    console.log('메시지 보내기')
    // axios로 메시지를 DB에 보내고, 출력
  )

  // get message axios


  return (
    <ThemeProvider theme={theme}>
        <div id="container_div">
          <Grid container id="container_div">
            {/* 왼쪽 마진 */}
            <Grid xs={0} sm={2} md={3} xl={4} item id="left_div"></Grid>

            {/* 메인 콘텐츠 */}
            <Grid xs={12} sm={8} md={6} xl={4} item id="main_div">
              
              {/*모바일 위 여백*/}
              <div className={styles.navbar_top_margin}>
              </div>

              {/* 여기는 네브바 */}
              <div className={styles.navbar}>
                <Navbar/>
              </div>

              {/* 여기는 게시판 메인 */}
              <div className={styles.board_body}>
                <Container>
                  <Box component="div" sx={{ bgcolor: '#FFF8F3', height: '80vh' }} className={styles.board_body_box}>
                    
                    {/* 메시지 카드 */}
                    {/* <Box component="div" className={styles.board_card}>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word 
                      </Typography>
                      <Typography variant="body2">
                        well
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>

                      <Button>
                        <DeleteForeverIcon color="disabled" fontSize='medium' />
                      </Button>
                    </Box> */}

                    {/* <BoardInput/> */}
                    <div className={styles.board_content}> 
                      <Box component="div" className={styles.board_card} sx={{ backgroundColor : '#C68CFF' }}>
                        <div className={styles.message_box_content}>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            손민지
                          </Typography>
                          <Typography variant="h6">
                            안녕 반가워~
                          </Typography>
                            <br />

                          <Button>
                            <DeleteForeverIcon color="disabled" fontSize='small' />
                          </Button>
                        </div>
                      </Box>
                    </div>
                  

                  
                    {/* 글쓰기 버튼 */}
                    <div className={styles.input_body}>
                    <Paper
                      component="form"
                      sx={{ display: 'flex', alignItems: 'center', width: 400 }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="내용을 입력하세요"
                        inputProps={{ 'aria-label': 'message' }}
                      />
                      <Button sx={{ p: '10px' }} aria-label="search" onClick={sendMessage}>
                        <SendIcon className={styles.send_button}/>
                      </Button>
                    </Paper>
                      {/* <Grid xs={10}>
                      <TextField label="내용을 입력하세요" id="fullWidth" className={styles.input_box} />
                      </Grid>
                      <Grid xs={2}>
                        <Fab size="small" color="primary" aria-label="add" className={styles.text_button}>
                          <SendIcon />
                        </Fab>
                      </Grid> */}
                    </div>

                  </Box>

                </Container>
              </div>
              
            </Grid>
            {/* 오른쪽 마진 */}
            <Grid xs={0} sm={2} md={3} xl={4} item id="right_div"></Grid>
          </Grid>
        </div>
      </ThemeProvider>
    )
}

export default Board