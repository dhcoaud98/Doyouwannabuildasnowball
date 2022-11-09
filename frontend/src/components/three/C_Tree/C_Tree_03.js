/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function C_Tree_03(props) {
  const { nodes, materials } = useGLTF('/C_tree/C_Tree_03.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.christmastree.geometry} material={materials['Mat.4']} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0.24, 1.38, 6.45]} scale={0.84}>
          <mesh geometry={nodes.sphere_red004_1.geometry} material={materials.christmas} />
        </group>
        <group position={[-0.81, 2.8, 1.79]} scale={1.01}>
          <mesh geometry={nodes.sphere_blue004_1.geometry} material={materials.christmas} />
        </group>
        <group position={[-1.32, -0.07, 7.5]} scale={0.73}>
          <mesh geometry={nodes.sphere_purple003_1.geometry} material={materials.christmas} />
        </group>
        <group position={[-2.89, -0.66, 2.61]} scale={1.26}>
          <mesh geometry={nodes.sphere_red004_2.geometry} material={materials.christmas} />
        </group>
        <group position={[-1.5, -2.86, 2.16]} scale={1.32}>
          <mesh geometry={nodes.sphere_blue004_2.geometry} material={materials.christmas} />
        </group>
        <group position={[-0.68, -2.02, 4.05]} scale={1.02}>
          <mesh geometry={nodes.sphere_purple003_2.geometry} material={materials.christmas} />
        </group>
        <group position={[0.18, -1.82, 6.67]} scale={0.81}>
          <mesh geometry={nodes.sphere_red004_3.geometry} material={materials.christmas} />
        </group>
        <group position={[1.13, 1.44, 4.98]} scale={1.01}>
          <mesh geometry={nodes.sphere_blue004_3.geometry} material={materials.christmas} />
        </group>
        <group position={[2.35, -2.79, 2.11]} scale={1.4}>
          <mesh geometry={nodes.sphere_yellow002_1.geometry} material={materials.christmas} />
        </group>
        <group position={[1.83, -2.25, 4.42]} scale={1.16}>
          <mesh geometry={nodes.sphere_blue004_4.geometry} material={materials.christmas} />
        </group>
        <group position={[2.72, -0.46, 3.04]} scale={1.16}>
          <mesh geometry={nodes.sphere_red004_4.geometry} material={materials.christmas} />
        </group>
        <group position={[1.68, -0.46, 6.1]} scale={0.84}>
          <mesh geometry={nodes.sphere_yellow002_2.geometry} material={materials.christmas} />
        </group>
        <group position={[2.35, 0.94, 3.42]} scale={1.38}>
          <mesh geometry={nodes.sphere_purple003_3.geometry} material={materials.christmas} />
        </group>
        <group position={[-0.06, 2.23, 4.39]} scale={1.4}>
          <mesh geometry={nodes.sphere_yellow002_3.geometry} material={materials.christmas} />
        </group>
        <mesh geometry={nodes.sphere_red004.geometry} material={materials.christmas} position={[-0.46, 0.62, 8.34]} scale={0.98} />
        <mesh geometry={nodes.sphere_blue004.geometry} material={materials.christmas} position={[-2.27, 0.89, 4.38]} scale={1.17} />
        <mesh geometry={nodes.star.geometry} material={materials['Mat.7']} position={[-0.05, 0.36, 11.33]} rotation={[-0.59, 1.55, 0.39]}>
          <mesh geometry={nodes.star_topper.geometry} material={materials['Mat.6']} position={[0.88, -0.06, -0.01]} rotation={[-1.52, -1.52, -1.51]} />
        </mesh>
        <mesh geometry={nodes.sphere_purple003.geometry} material={materials.christmas} position={[-2.42, 1.78, 2.32]} scale={1.38} />
        <mesh geometry={nodes.sphere_yellow002.geometry} material={materials.christmas} position={[-2.22, -1.59, 4.71]} scale={0.84} />
        <mesh geometry={nodes.treetop001.geometry} material={materials['Mat.1']} position={[0.01, -0.14, 4.96]} />
        <mesh geometry={nodes.treetop002.geometry} material={materials['Mat.2']} position={[0.01, -0.14, 5.85]} />
        <mesh geometry={nodes.treetop003.geometry} material={materials.Mat} position={[0.01, -0.14, 7.22]} />
        <mesh geometry={nodes.treetop004.geometry} material={materials['Mat.5']} position={[-0.01, -0.06, 9.34]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/C_tree/C_Tree_03.glb')