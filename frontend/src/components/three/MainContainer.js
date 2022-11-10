
// three
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import { MeshReflectorMaterial, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Model
import { Group } from "./Group"

// React
import { Suspense, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
// S3
import S3 from 'react-aws-s3';


window.Buffer = window.Buffer || require("buffer").Buffer;


export const MainContainer = forwardRef((props, ref) => {
  // 변수 선언
  const target = useRef()
  useImperativeHandle(ref, () => ({
    saveImage
  }))


  // 이미지 업로드 함수
  const saveImage = (sb_id) => {  
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
        <Canvas width="100" height="400"  gl={{ preserveDrawingBuffer: true }} dpr={[1,2]} id={'menu-canvas'} ref={target} onClick={() => saveImage('1423')}>
          <OrbitControls/>
          <directionalLight intensity={2} position={[10, 6, 6]}> 
          </directionalLight>
          <Suspense fallback={null}>  
            <Center onCentered={({ container, height }) => container.scale.setScalar(0.05)}>
                <Group/>    
            </Center>
            <Environment preset="dawn" background={false} />
          </Suspense>
          
        </Canvas>
    </div>
    
  )
})