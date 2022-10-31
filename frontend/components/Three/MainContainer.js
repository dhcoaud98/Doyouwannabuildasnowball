
// three
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import Model from './Scene'
import { MeshReflectorMaterial, OrbitControls } from "@react-three/drei"
import { LayerMaterial, Base, Depth, Noise, Color } from 'lamina'
import * as THREE from "three"
import { Suspense, useEffect, useRef, useState } from "react"
import S3 from 'react-aws-s3';


function MainContainer() {
  // 변수 선언
  const target = useRef()
  let [env,setEnv] = useState(0)


  // 이미지 업로드 함수
  const saveImage = (sb_id) => {  
    setEnv(1)

    // canvas to blob
    const imgBase64 = target.current.toDataURL('image/png')
    const decodeImg = atob(imgBase64.split(',')[1])
    let array =[]
    for (let i=0; i <decodeImg.length; i++){
      array.push(decodeImg.charCodeAt(i))
    }

    const file = new Blob([new Uint8Array(array)], {type: 'image/png'})
    // S3 Config
    const config = {
      bucketName: '601snowball',
      dirName: 'snowball_sc',
      region: 'ap-northeast-2',
      accessKeyId: 'AKIA3FTVN73LLSOXAIHF',
      secretAccessKey: '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',
  }
    // React S3
    const ReactS3Client = new S3(config)
    const filename = `${sb_id}.png`
    ReactS3Client
      .uploadFile(file, filename)
      .then(data => {
        console.log(data)
        setEnv(0)
      })
      .catch(err => console.log(err))
  }
    
  return (
    <div className='canvas-container'>
      <style jsx>{`
      .canvas-container {
      width:100%;
      height:100%;
      background: rgb(246,60,60);
      background: linear-gradient(0deg, rgba(246,60,60,1) 0%, rgba(255,120,120,1) 100%);
      }
    `}</style>
        <Canvas width="100" height="400" camera={{ position: [0,0,5], fov: 35 }} gl={{ preserveDrawingBuffer: true }} dpr={[1,2]} id={'menu-canvas'} ref={target} onClick={() => saveImage('1423')}>
          <OrbitControls/>
          <directionalLight intensity={2} position={[10, 6, 6]}> 
          </directionalLight>
          <Suspense fallback={null}>  
            <Center>
                <Model/>    
            </Center>
            <Environment preset="dawn" />
          </Suspense>
          {/* lanmina Material */}
          {/* {env === 0 ? <Environment background resolution={64}>
            <mesh scale={51}>
              <sphereGeometry args={[1, 64, 64]} />
              <LayerMaterial side={THREE.BackSide}>
                <Color color="blue" alpha={1.4}/>
                <Depth colorA="#00ffff" colorB="#ff8f00" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
                <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
              </LayerMaterial>
            </mesh>
          </Environment> : null} */}
          
        </Canvas>
    </div>
    
  )
}


export default MainContainer