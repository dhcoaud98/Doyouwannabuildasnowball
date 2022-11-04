// Systems
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import { useAppSelector } from '../app/hooks'

// Other components
import Navbar from '../components/navbar/navbar';
import styles from "./board.module.css"

// MUI
import { Grid, Box, Container, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../assets/fonts/font.css'
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

// 랜덤함수 
function randomImage(array : any) {
  const random = Math.floor(Math.random() * array.length);
  return array[random]
}
// const getRandomIndex = function(length:number) {
//   return parseInt(Math.random() * length)
// }
// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     author: '@helloimnik',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     author: '@nolanissac',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     author: '@hjrc33',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//     featured: true,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     author: '@silverdalex',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     author: '@southside_customs',
//   },
// ];

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Board= () => {

  // 유저 정보
  const nowUserId = useAppSelector((state)  => state.user.userId);
  
  // 메시지 배경색 랜덤 제공
  // const messageColor = ['#FA6767', '#C68CFF', '#FFACAC', '#FDE58E', '#FFBE5F']
  let randomBackImage = randomImage(backImageRandom)


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
      "content" : "메리크리스마스",
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
                                  onClick={() =>(editMessage())}
                                  sx={{ color: 'white' }}
                                  aria-label={`edit ${item.content}`}
                                >
                                  <EditIcon onClick={() => (editMessage())}/>
                                </IconButton>
                              }
                              actionPosition="left"
                            />
                          </ImageListItem>
                        );
                      })}
                    </ImageList>

                      {/* {contents.map((item:Content, index) => (
                        <Box component="div" className={styles.board_card} sx={{ backgroundColor : '#fff', borderRadius: '16px', boxShadow: 1, width: 150}}>
                          <div className={styles.message_box_content} key={index}>
                            <Typography variant="body1">
                              {item.content}
                            </Typography>
                              <br />
                            <Button onClick={() =>(deleteMessage(item.boardId))}>
                              <DeleteForeverIcon color="disabled" fontSize='small' />
                            </Button>
                          </div>
                        </Box>
                      ))} */}
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