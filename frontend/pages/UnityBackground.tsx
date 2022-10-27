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
    addEventListener("SetMap", SendRequest);
    return () => {
      removeEventListener("SetMap", SendRequest);
    };
  }, [addEventListener, removeEventListener, SendRequest]);

  function SendRequest() {
    sendMessage("Test", "setMap",1)
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