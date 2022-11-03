// unity
import  {Unity, useUnityContext } from "react-unity-webgl"
import MainContainer from "components/Three/MainContainer";
import { useEffect } from "react";

// axios
// import { axiosGet } from "./api/axios"


function UnityBackground() {

  // Unity Embed
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
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
    sendMessage("UserObject", "DispatchPos", JSON.stringify({snowglobeid: 14, deco: [{indicator: 0, coordinateX: -14, coordinateY: -6.68, coordinateZ: -8.76},{indicator: 1, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 1, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 1, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 1, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 1, coordinateX: 0, coordinateY: 0, coordinateZ: 0},{indicator: 1, coordinateX: 0, coordinateY: 0, z: 0}]}))
    
  }

  function ConMap(pos: string){
    console.log(pos)
  }

  return (
      <div>
        {/* <MainContainer/> */}
        <Unity unityProvider = {unityProvider}/>
        <button onClick={() => SendRequest()}>do</button>
      </div>
    )
}

export default UnityBackground