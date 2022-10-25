import "./MainContainer.module.css"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { Center, Environment } from "@react-three/drei"
import Snow_globe from "./Snow_globe"
import Model from './Scene'
import { MeshReflectorMaterial } from "@react-three/drei"



function MainContainer() {

  

  return (
    <div className='canvas-container'>
      <style jsx>{`
      .canvas-container {
      width:100%;
      height:100%;
      }
    `}</style>
        <Canvas width="100" height="400" camera={{ position: [0,0,5], fov: 35 }} gl={{ alpha: false }} dpr={[1,2]} id={'menu-canvas'}>
            <directionalLight intensity={2} position={[10, 6, 6]}> 
            </directionalLight>
            <Suspense fallback={null}>
                <Center>
                    {/* <Snow_globe></Snow_globe> */}
                    <Model/>    
                </Center>
                <Environment preset="dawn" />
            </Suspense>
        </Canvas>

    </div>
    
  )
}


export default MainContainer