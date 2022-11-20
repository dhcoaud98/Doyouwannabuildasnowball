import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

interface musicState
{
  musicstate: number
}
export function VolumeIcon(props : musicState) {

  return (
    <div>
      {props.musicstate === 1 ? <VolumeOffIcon/> : <VolumeUpIcon/>}
    </div>
    
  )
}