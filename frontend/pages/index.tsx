import Button from '@mui/material/Button';
import styles from "styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>MainPage</h1>
      <p>여기는 제일 기본이 되는 MainPage입니다.</p>
      <Button>KakaoLogin</Button>
    </div>
  )
}

export default Home
