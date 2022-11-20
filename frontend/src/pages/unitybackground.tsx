// unity
import  { Unity, useUnityContext } from "react-unity-webgl"
import { useEffect } from "react";

// axios
import "./unitybackground.css"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import axios from "axios";
import { useNavigate } from "react-router-dom"

// else
import { API_URL } from "../switchurl";
import { setCurrentSb } from "../features/snowballSlice";
import { Button } from '@mui/material';

function UnityBackground() {

  const router = useNavigate()
  const currentSbId = useSelector((state: RootState) => state.snowball.current_sb_id)
  const deco = useSelector((state: RootState) => state.snowball.deco)
  const dispatch = useDispatch()
  const APIURL = API_URL()
  // Unity Embed
  const { unityProvider, sendMessage, addEventListener, removeEventListener, requestFullscreen } = useUnityContext({
    loaderUrl: "Build/Project.loader.js",
    dataUrl: "Build/Project.data",
    frameworkUrl: "Build/Project.framework.js",
    codeUrl: "Build/Project.wasm",
  });


  // unity-javascript communication setter
  useEffect(() => {
    addEventListener("SendJsRequest", SendRequest)
    addEventListener("SaveMap", ConMap)
    return () => {
      removeEventListener("SendJsRequest", SendRequest)
      removeEventListener("SaveMap", ConMap)
    };
  }, [addEventListener, removeEventListener,SendRequest])

  useEffect(() => {
    axios({
      method:'GET',
      url:`${APIURL}api/snowglobe/${currentSbId}/detail`
    })
    .then((res) => {
      dispatch(setCurrentSb(res.data))
    })
  })

  // javascript => unity setMap
  function SendRequest() {
    sendMessage("UserObject", "DispatchPos", JSON.stringify({snowglobeid: currentSbId, deco: deco }))    
  }

  function ConMap(pos: string){
    const payload = JSON.parse(pos)
    axios({
      method:"PATCH",
      url: `${APIURL}api/snowglobe/${payload.snowglobeid}/modifyCoordinate`,
      data: {deco: payload.deco}
    })
    .then((res) => {
    })
  }

  const goBack = () => {
    router(-1)
  }

  return (
      <div>
        <Button onClick={() => requestFullscreen(true)}>click</Button>
        <Button onClick={() => goBack()}>뒤로가기</Button>
        <Unity unityProvider = {unityProvider}/>
      </div>
    )
}

export default UnityBackground