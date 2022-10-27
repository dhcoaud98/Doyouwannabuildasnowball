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
    addEventListener("SetMap1", SendRequest)
    addEventListener("SaveMap", ConMap)
    return () => {
      removeEventListener("SetMap1", SendRequest)
      removeEventListener("SaveMap", ConMap)
    };
  }, [addEventListener, removeEventListener, SendRequest])

  function SendRequest() {
    sendMessage("GameObject", "setMap", 0)
    console.log('sta')
  }

  function ConMap(pos: JSON){
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