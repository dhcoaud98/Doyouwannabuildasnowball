/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function C_Tree_01(props) {
  const { nodes, materials } = useGLTF('/C_tree/C_Tree_01.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, -0.46]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes['Christmas_Tree-Mat'].geometry} material={materials.Mat} />
        <mesh geometry={nodes['Christmas_Tree-Black'].geometry}>
          <meshStandardMaterial color="black"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Christmas_Tree-Light_Bulb_Emission'].geometry} material={materials['Light Bulb_Emission']} />
        <mesh geometry={nodes['Christmas_Tree-Golden_Metallic'].geometry} material={materials.Golden_Metallic}>
        <meshStandardMaterial color="gold"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Christmas_Tree-Red_Metallic'].geometry} material={materials.Red_Metallic}>
        <meshStandardMaterial color="red"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Christmas_Tree-Material_003'].geometry} material={materials['Material 003']}>
        <meshStandardMaterial color="green"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Christmas_Tree-Pine_Tree'].geometry} material={materials['Pine Tree']}>
        <meshStandardMaterial color="darkgreen"></meshStandardMaterial>
        </mesh>
      </group>
      <group position={[0, -3.45, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh geometry={nodes['Present-Brown'].geometry} material={materials.Brown}>
        <meshStandardMaterial color="brown"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Present-Red_Metallic'].geometry} material={materials.Red_Metallic}>
        <meshStandardMaterial color="red"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Present-Green'].geometry} material={materials.Green}>
        <meshStandardMaterial color="green"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Present-White'].geometry} material={materials.White}>
        <meshStandardMaterial color="white"></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Present-Red'].geometry} material={materials.Red}>
        <meshStandardMaterial color="red  "></meshStandardMaterial>
        </mesh>
        <mesh geometry={nodes['Present-Golden_Metallic'].geometry} material={materials.Golden_Metallic}>
        <meshStandardMaterial color="gold"></meshStandardMaterial>
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/C_tree/C_Tree_01.glb')
