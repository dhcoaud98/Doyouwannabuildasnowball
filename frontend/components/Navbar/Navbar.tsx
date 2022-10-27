import Grid from '@mui/material/Grid';

import styles from "./Navbar.module.css"
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'


const Navbar= () => {

  // const history = useHistory();

  const goback = () => {
    // history.push('/');
    alert('뒤로 가기')
  }

  return (
    <div className={styles.navbar} >   
      
        {/* 뒤로가기 */}
        <Grid xs={0} sm={2} item>
          <IconButton sx={{ m: 2.5, p:0 }} onClick={goback}>
            <Avatar alt="" src="/images/wreath_1.png" className={styles.avatar}>
            </Avatar>
          </IconButton>
        </Grid>

        {/* 현재 화면 이름 */}
        <Grid xs={0} sm={8}  item>
          <h1 className='cntmenu-text'>나의 친구들</h1>
        </Grid>
      </div>
    )
}

export default Navbar