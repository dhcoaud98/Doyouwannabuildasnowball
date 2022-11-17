// unity
import  { Unity, useUnityContext } from "react-unity-webgl"
import { useEffect } from "react";

// axios
import "./unitybackground.css"
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


function UnityBackground() {

  const currentSbId = useSelector((state: RootState) => state.snowball.current_sb_id)
  const deco = useSelector((state: RootState) => state.snowball.deco)
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


  // javascript => unity setMap
  function SendRequest() {
    console.log('sta')
    sendMessage("UserObject", "DispatchPos", JSON.stringify({snowglobeid: currentSbId, deco: deco }))
    
  }

  function ConMap(pos: string){
    console.log(pos)
  }

  return (
      <div>
        {/* <MainContainer/> */}
        <Unity unityProvider = {unityProvider}/>
        <button onClick={() => requestFullscreen(true)}>click</button>
      </div>
    )
}

export default UnityBackground