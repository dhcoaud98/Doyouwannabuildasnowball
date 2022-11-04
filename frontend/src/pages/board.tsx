// Systems
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import { useAppSelector } from '../app/hooks'

// Other components
import Navbar from '../components/navbar/navbar';
import styles from "./board.module.css"

// MUI
import { Grid, Box, Container, Button, TextField, Typography, Modal } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../assets/fonts/font.css';
import ClearIcon from '@mui/icons-material/Clear';
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

// Content 타입 지정
type Content = {
  boardId: number,
  content: string,
  createdTime: string,
  imageUrl: string,
  modifiedTime: string,
  snowglobeId: number,
}

// 이미지 업로드를 하지 않았을 경우 랜덤 이미지
const backImageRandom = [
'https://cdn.kormedi.com/wp-content/uploads/2020/12/gettyimages-1290149158-1-580x387.jpg',
]

// 랜덤 이미지 함수
function randomImage(array : any) {
  const random = Math.floor(Math.random() * array.length);
  return array[random]
}

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

// 메시지 수정 모달
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// // 모달에 들어가는 메시지
// let [content, setContent] = useState<Content>({
//   boardId: -1,
//   content: " ",
//   createdTime: " ",
//   imageUrl: " ",
//   modifiedTime: " ",
//   snowglobeId: -1,
// })

const Board= () => {

  // 유저 정보
  const nowUserId = useAppSelector((state)  => state.user.userId);
  
  // 메시지 배경색 랜덤 제공
  let randomBackImage = randomImage(backImageRandom)

  // 모달
  const [open, setOpen] = useState(false);
  const handleOpen = (content:Content) => {
    setOpen(true);
    // setContent(content)
  }
  const handleClose = () => setOpen(false);

  // 1. 메시지 전송
  const [contents, setContents] = useState([]);
  const [text, setText] = useState('');
  const onChange = (e : any) => {
    setText(e.target.value);
    console.log(e.target.value)
  };
  const sendMessage = () => {
    axios.post(`http://localhost:8080/api/board/write`, {
        "content" : text,
        "picture" : null,
        "snowglobeId" : 1
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    setText('');
  };

  // 2. 전체 메시지 조회
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/board/${nowUserId}/all`
        );
        setContents(response.data.boardList);
        console.log('메시지 목록 = ', response.data.boardList)
      } catch (err : any) {
        console.log("에러 = ", err)
      }
    };

    fetchMessages();
  }, [])

  // 3. 메시지 삭제
  const deleteMessage = (boardId: number) => {
    console.log('삭제?')
    console.log(boardId)
    axios.delete(`http://localhost:8080/api/board/${boardId}/delete`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // 4. 메시지 수정
  const editMessage = () => {
    console.log("메시지 수정하기")
    axios.patch(`http://localhost:8080/api/board/modify`, {
      "boardId" : 2,
      "snowglobe" : 3,
      "content" : {},
      "picture" : null,
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // 5. 이미지 업로드
  const uploadImg = () => {
    console.log("이미지 올리기")
  }

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
                  <Box component="div" className={styles.board_body_box}>
                    
                    {/* 메시지 카드 */}
                    <ImageList
                      className={styles.board_card}
                      sx={{
                        // width: 500,
                        // height: 450,
                        height: '70vh',
                        transform: 'translateZ(0)',
                      }}
                      rowHeight={200}
                      gap={2}
                    >
                      {contents.map((item:Content) => {
                        // const cols = item.featured ? 2 : 1;
                        // const rows = item.featured ? 2 : 1;

                        return (
                          <ImageListItem key={item.boardId}>
                            <img
                              {...srcset(item.imageUrl ? item.imageUrl: randomBackImage, 250, 200)}
                              alt={item.content}
                              loading="lazy"
                            />
                            <ImageListItemBar
                              sx={{
                                background:
                                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                              }}
                              title={item.content}
                              position="top"
                              actionIcon={
                                <IconButton
                                  onClick={() => (handleOpen(item))}
                                  sx={{ color: 'white' }}
                                  aria-label={`edit ${item.content}`}
                                >
                                  <EditIcon/>
                                </IconButton>
                              }
                              actionPosition="left"
                            />
                            <ImageListItemBar
                              sx={{
                                background:
                                  'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                  'rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%)',
                              }}
                              position="bottom"
                              actionIcon={
                                <IconButton
                                  onClick={()=> (deleteMessage(item.boardId))}
                                  sx={{ color: 'white' }}
                                  aria-label={`ClearIcon ${item.content}`}
                                >
                                  <ClearIcon/>
                                </IconButton>
                              }
                              actionPosition="right"
                            />
                          </ImageListItem>
                        );
                      })}
                    </ImageList>
                  </Box>
                  
                  {/* 메시지 수정용 모달 */}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box component="div" sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        메시지를 수정하세요
                      </Typography>
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
                      <Button variant="contained" onClick={() => (uploadImg())} sx={{ mr: 1 }}><AddPhotoAlternateIcon/></Button>
                      <Button variant="contained" onClick={() => (editMessage())}><SendIcon/></Button>
                        {/* <div>
                          <b>값: {text}</b>
                        </div> */}
                      </Box>
                    </Box>
                  </Modal>

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
                    <Button variant="contained" onClick={() => (uploadImg())} sx={{ mr: 1 }}><AddPhotoAlternateIcon/></Button>
                    <Button variant="contained" onClick={() => (sendMessage())}><SendIcon/></Button>
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