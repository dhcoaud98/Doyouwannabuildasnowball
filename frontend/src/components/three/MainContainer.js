
// three
import { Canvas } from "@react-three/fiber"
import { Center, Environment } from "@react-three/drei"
import { OrbitControls } from "@react-three/drei"

// Model
import { Group } from "./Group"

// React
import { Suspense, useRef, forwardRef, useImperativeHandle } from "react"
// S3
import S3 from 'react-aws-s3';


window.Buffer = window.Buffer || require("buffer").Buffer;


const MainContainer = forwardRef((props, ref) => {
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
      background: rgb(2,0,36);
      background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,2,59,1) 100%);

      }
    `}</style>
        <Canvas width="100" height="400"  gl={{ preserveDrawingBuffer: true }} dpr={[1,2]} id={'menu-canvas'} ref={target}>
          <OrbitControls enableZoom={false} enablePan={false}/>
          <directionalLight intensity={1} position={[10, 6, 6]}> 
          </directionalLight>
          <Suspense fallback={null}>  
            <Center onCentered={({ container, height }) => container.scale.setScalar(0.040)}>
                <Group/>    
            </Center>
            <Environment blur={1} files={"/venice_dawn_2_1k.hdr"} background={false} />
          </Suspense>
        </Canvas>
    </div>
    
  )
})

export default MainContainer