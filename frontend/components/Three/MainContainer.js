import "./MainContainer.module.css"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { Center, Environment } from "@react-three/drei"
import Snow_globe from "./Snow_globe"
import Model from './Scene'
import { MeshReflectorMaterial } from "@react-three/drei"
import { LayerMaterial, Base, Depth, Noise, Color } from 'lamina'
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"


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
          <OrbitControls/>
          <color attach="background" args={["linear-gradient(#FF7878, #F63C3C)"]}/>
          <directionalLight intensity={2} position={[10, 6, 6]}> 
          </directionalLight>
          <Suspense fallback={null}>  
            <Center>
                {/* <Snow_globe></Snow_globe> */}
                <Model/>    
            </Center>
            <Environment preset="dawn" />
          </Suspense>

          <Environment background resolution={64}>
            <mesh scale={51}>
              <sphereGeometry args={[1, 64, 64]} />
              <LayerMaterial side={THREE.BackSide}>
                <Color color="blue" alpha={1.4}/>
                <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
              </LayerMaterial>
            </mesh>
          </Environment>
        </Canvas>

    </div>
    
  )
}


export default MainContainer