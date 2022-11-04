// Systems
import { useEffect, useState } from 'react'
import axios from 'axios';

// Other components
import Navbar from '../components/navbar/navbar';
import styles from "./board.module.css"

// MUI
import { Grid, Box, Container, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';

// ------------------------------------------------------------------------

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


const Board = () => {
  
  const messageColor = ['#FA6767', '#C68CFF', '#FFACAC', '#FDE58E', '#FFBE5F']

  // 메시지 전송
  const [contents, setContents] = useState('');
  const [text, setText] = useState('');
  const onChange = (e : any) => {
    setText(e.target.value);
    console.log(e.target.value)
  };

  const sendMessage = () => {
    axios.post(`http://localhost:8080/api/board/write`, {
        "content" : text,
        "picture" : 'null',
        "snowglobe" : 3
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    setText('');
  };

  // delete axios


  // 전체 메시지 조회 message axios
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/board/1/all`
        );
        setContents(response.data);
        console.log('메시지 목록 = ', response.data)
      } catch (err : any) {
        console.log("에러 = ", err)
      }
    };

    fetchMessages();
  }, [])


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
                  <Box component="div" sx={{ bgcolor: '#FFF8F3', height: '75vh' }} className={styles.board_body_box}>
                    <b>값: {text}</b>
                    {/* 메시지 카드 */}
                    {/* <div className={styles.board_content}>  */}
                      {/* <Box component="div" className={styles.board_card} sx={{ backgroundColor : '#C68CFF' }}>
                        <div className={styles.message_box_content}>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            손민지
                          </Typography>
                          <Typography variant="h6">
                            안녕 반가워~
                          </Typography>
                            <br />

                          삭제버튼
                          <Button>
                            <DeleteForeverIcon color="disabled" fontSize='small' />
                          </Button>
                        </div>
                      </Box> */}
                    {/* </div> */}
                  </Box>
                  {/* 글쓰기 버튼 */}
                  <Box component="div" className={styles.input_body}>
                    <TextField 
                      onChange={onChange} 
                      value={text} 
                      sx={{ mr: 1 }}
                      // label="내용을 입력하세요"
                      // color="success"
                      focused 
                      placeholder="내용을 입력하세요" 
                      className={styles.input_box}/>
                    <Button variant="contained" onClick={sendMessage}><SendIcon/></Button>
                      {/* <div>
                        <b>값: {text}</b>
                      </div> */}
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