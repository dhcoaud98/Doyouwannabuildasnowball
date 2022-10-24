// unity
import  {Unity, useUnityContext } from "react-unity-webgl"
import MainContainer from "components/Three/MainContainer";
const UnityBackground = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Project.loader.js",
    dataUrl: "Build/Project.data",
    frameworkUrl: "Build/Project.framework.js",
    codeUrl: "Build/Project.wasm",
  });
  return (
      <div>
        <MainContainer/>
        {/* <Unity unityProvider = {unityProvider}/> */}
      </div>
    )
}

export default UnityBackground