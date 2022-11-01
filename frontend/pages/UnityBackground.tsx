// unity
import  {Unity, useUnityContext } from "react-unity-webgl"
import MainContainer from "components/Three/MainContainer";
import { useEffect } from "react";



function UnityBackground() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
    loaderUrl: "Build/Project.loader.js",
    dataUrl: "Build/Project.data",
    frameworkUrl: "Build/Project.framework.js",
    codeUrl: "Build/Project.wasm",
  });

  useEffect(() => {
    addEventListener("SendJsRequest", SendRequest)
    addEventListener("SaveMap", ConMap)
    return () => {
      removeEventListener("SendJsRequest", SendRequest)
      removeEventListener("SaveMap", ConMap)
    };
  }, [addEventListener, removeEventListener,SendRequest])

  function SendRequest() {
    console.log('sta')
    sendMessage("UserObject", "DispatchPos", JSON.stringify({id: 14, position: [{indicator: 0, x: -14, y: -6.68, z: -8.76},{indicator: 1, x: 0, y: 0, z: 0},{indicator: 1, x: 0, y: 0, z: 0},{indicator: 1, x: 0, y: 0, z: 0},{indicator: 1, x: 0, y: 0, z: 0},{indicator: 1, x: 0, y: 0, z: 0},{indicator: 1, x: 0, y: 0, z: 0}]}))
    
  }

  function ConMap(pos: string){
    console.log(typeof(pos))
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