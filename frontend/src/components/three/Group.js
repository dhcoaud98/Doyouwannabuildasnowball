// Else
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"
import React, { Suspense } from "react"

// three models
import { Snowglobe_light } from "./SnowGlobe_light"



export function Group() {
  // C_Tree import
  const C_Tree_01 = React.lazy(() => import("./C_Tree/C_Tree_01"))
  const C_Tree_02 = React.lazy(() => import("./C_Tree/C_Tree_02"))
  const C_Tree_03 = React.lazy(() => import("./C_Tree/C_Tree_03"))
  const C_Tree_04 = React.lazy(() => import("./C_Tree/C_Tree_04"))
  const C_Tree_05 = React.lazy(() => import("./C_Tree/C_Tree_05"))
  const C_Tree_06 = React.lazy(() => import("./C_Tree/C_Tree_06"))
  const C_Tree_07 = React.lazy(() => import("./C_Tree/C_Tree_07"))
  const C_Tree_08 = React.lazy(() => import("./C_Tree/C_Tree_08"))
  const C_Tree_09 = React.lazy(() => import("./C_Tree/C_Tree_09"))
  // Building import
  const Building_01 = React.lazy(() => import("./Building/Building_01"))
  const Building_02 = React.lazy(() => import("./Building/Building_02"))
  const Building_03 = React.lazy(() => import("./Building/Building_03"))
  const Building_04 = React.lazy(() => import("./Building/Building_04"))
  const Building_05 = React.lazy(() => import("./Building/Building_05"))
  const Building_06 = React.lazy(() => import("./Building/Building_06"))
  // Snowman import
  const Snowman_01 = React.lazy(() => import("./Snowman/Snowman_01"))
  const Snowman_02 = React.lazy(() => import("./Snowman/Snowman_02"))
  const Snowman_03 = React.lazy(() => import("./Snowman/Snowman_03"))
  const Snowman_04 = React.lazy(() => import("./Snowman/Snowman_04"))
  const Snowman_05 = React.lazy(() => import("./Snowman/Snowman_05"))
  const Snowman_06 = React.lazy(() => import("./Snowman/Snowman_06"))
  const Snowman_07 = React.lazy(() => import("./Snowman/Snowman_07"))
  const Snowman_08 = React.lazy(() => import("./Snowman/Snowman_08"))
  // Objet1 import
  const Objet1_01 = React.lazy(() => import("./Objet1/Objet1_01"))
  const Objet1_02 = React.lazy(() => import("./Objet1/Objet1_02"))
  const Objet1_03 = React.lazy(() => import("./Objet1/Objet1_03"))
  const Objet1_04 = React.lazy(() => import("./Objet1/Objet1_04"))
  const Objet1_05 = React.lazy(() => import("./Objet1/Objet1_05"))
  const Objet1_06 = React.lazy(() => import("./Objet1/Objet1_06"))
  const Objet1_07 = React.lazy(() => import("./Objet1/Objet1_07"))
  const Objet1_08 = React.lazy(() => import("./Objet1/Objet1_08"))
  const Objet1_09 = React.lazy(() => import("./Objet1/Objet1_09"))
  // Objet2 import
  const Objet2_01 = React.lazy(() => import("./Objet2/Objet2_01"))
  const Objet2_02 = React.lazy(() => import("./Objet2/Objet2_02"))
  const Objet2_03 = React.lazy(() => import("./Objet2/Objet2_03"))
  const Objet2_04 = React.lazy(() => import("./Objet2/Objet2_04"))
  const Objet2_05 = React.lazy(() => import("./Objet2/Objet2_05"))
  const Objet2_06 = React.lazy(() => import("./Objet2/Objet2_06"))
  const Objet2_07 = React.lazy(() => import("./Objet2/Objet2_07"))
  const Objet2_08 = React.lazy(() => import("./Objet2/Objet2_08"))
  const Objet2_09 = React.lazy(() => import("./Objet2/Objet2_09"))
   // Objet3 import
   const Objet3_01 = React.lazy(() => import("./Objet3/Objet3_01"))
   const Objet3_02 = React.lazy(() => import("./Objet3/Objet3_02"))
   const Objet3_03 = React.lazy(() => import("./Objet3/Objet3_03"))
   const Objet3_04 = React.lazy(() => import("./Objet3/Objet3_04"))
   const Objet3_05 = React.lazy(() => import("./Objet3/Objet3_05"))
   const Objet3_06 = React.lazy(() => import("./Objet3/Objet3_06"))
   const Objet3_07 = React.lazy(() => import("./Objet3/Objet3_07"))
   const Objet3_08 = React.lazy(() => import("./Objet3/Objet3_08"))
   const Objet3_09 = React.lazy(() => import("./Objet3/Objet3_09"))
     // Pets import
  const Pets_01 = React.lazy(() => import("./Pets/Pets_01"))
  const Pets_02 = React.lazy(() => import("./Pets/Pets_02"))
  const Pets_03 = React.lazy(() => import("./Pets/Pets_03"))
  const Pets_04 = React.lazy(() => import("./Pets/Pets_04"))
  const Pets_05 = React.lazy(() => import("./Pets/Pets_05"))
  const Pets_06 = React.lazy(() => import("./Pets/Pets_06"))
  const Pets_07 = React.lazy(() => import("./Pets/Pets_07"))
  const Pets_08 = React.lazy(() => import("./Pets/Pets_08"))
  const Pets_09 = React.lazy(() => import("./Pets/Pets_09"))


  const c_tree_id = useSelector((state) => state.snowball.deco[0].indicator)
  const building_id = useSelector((state) => state.snowball.deco[1].indicator)
  const snowman_id = useSelector((state) => state.snowball.deco[2].indicator)
  const objet1_id = useSelector((state) => state.snowball.deco[3].indicator)
  const objet2_id = useSelector((state) => state.snowball.deco[4].indicator)
  const objet3_id = useSelector((state) => state.snowball.deco[5].indicator)
  const pets_id = useSelector((state) => state.snowball.deco[6].indicator)

  console.log(c_tree_id)

  return (
    <group rotation={[0.2,0,0]}>
        <Snowglobe_light/>
        <Suspense fallback={null}>
          {pets_id == 0 ? <Pets_01 scale={0.08} position={[33,-19,0]}/> : pets_id == 1 ? <Pets_02 scale={0.08} position={[33,-19,0]}/> : pets_id == 2 ? <Pets_03 scale={0.08} position={[33,-19,0]}/> : pets_id == 3 ? <Pets_04 scale={0.08} position={[33,-19,0]}/> : pets_id == 4 ? <Pets_05 scale={0.08} position={[33,-19,0]}/> : pets_id == 5 ? <Pets_06 scale={0.08} position={[33,-19,0]}/> : pets_id == 6 ? <Pets_07 scale={0.08} position={[33,-19,0]}/> : pets_id == 7 ? <Pets_08 scale={0.08} position={[33,-19,0]}/> : <Pets_09 scale={0.08} position={[33,-19,0]}/>}
        
          {c_tree_id == 0 ? <C_Tree_01 scale={0.03} position={[0,-26,0]}/> : c_tree_id == 1 ? <C_Tree_02 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 2 ? <C_Tree_03 scale={4} position={[0,-26,0]}/> : c_tree_id == 3 ? <C_Tree_04 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 4 ? <C_Tree_05 scale={0.05} position={[0,-26,0]}/> : c_tree_id == 5 ? <C_Tree_06 scale={0.045} position={[0,-26,-10]} /> : c_tree_id == 6 ? <C_Tree_07 scale={0.055} position={[0,-26,0]}/> : c_tree_id == 7 ? <C_Tree_08 scale={0.08} position={[0,-26,0]}/> : <C_Tree_09 scale={0.055} position={[0,-26,0]}/>}
  
          {building_id == 0 ? <Building_01 scale={0.024} position={[20,-15,-20]}/> : building_id == 1 ? <Building_02 scale={0.025} position={[20,-15,-20]}/> : building_id == 2 ? <Building_03 scale={0.04} position={[20,-15,-20]}/> : building_id == 3 ? <Building_04 scale={0.04} position={[20,-15,-20]}/> : building_id == 4 ? <Building_05 scale={0.04} position={[20,-15,-20]}/> : building_id == 5 ? <Building_06 scale={0.025} position={[20,-15,-20]}/> : building_id == 6 ? <Pets_07 scale={0.08} position={[20,-15,-20]}/> : null}

          {snowman_id == 0 ? <Snowman_01 scale={0.17} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 1 ? <Snowman_02 scale={0.06} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 2 ? <Snowman_03 scale={0.06} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 3 ? <Snowman_04 scale={0.06} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 4 ? <Snowman_05 scale={0.085} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 5 ? <Snowman_06 scale={0.11} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 6 ? <Snowman_07 scale={0.11} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : snowman_id == 7 ? <Snowman_08 scale={0.06} position={[-34,-18, 15]} rotation={[0,19.5,0]}/> : <Pets_09 scale={0.08} position={[-34,-18, 15]} rotation={[0,19.5,0]}/>}

          {objet1_id == 0 ? <Objet1_01 scale={0.03} position={[0,-26, 16]} rotation={[0,19.5,0]}/> : objet1_id == 1 ? <Objet1_02 scale={0.03} position={[0,-26, 16]} rotation={[0,19.5,0]}/> : objet1_id == 2 ? <Objet1_03 scale={0.03} position={[0,-26, 16]} rotation={[0,19.5,0]}/> : objet1_id == 3 ? <Objet1_04 scale={0.55} position={[0, 35, 0]} rotation={[0,19.5,0]}/> : objet1_id == 4 ? <Objet1_05 scale={0.2} position={[0, 36, 0]}/> : objet1_id == 5 ? <Objet1_06 scale={0.18} position={[0,-26, 16]} rotation={[0,19.5,0]}/> : objet1_id == 6 ? <Objet1_07 scale={0.25} position={[0, 36, 0]} /> : objet1_id == 7 ? <Objet1_08 scale={0.032} position={[0,-26, 16]} rotation={[0,19.5,0]}/> :  objet1_id == 8 ? <Objet1_09 scale={0.06} position={[0,-26, 16]} rotation={[0,19.5,0]}/> : null}
        
          {objet2_id == 0 ? <Objet2_01 scale={0.05} position={[16,-26, 20]} rotation={[0,-19.5,0]}/> : objet2_id == 1 ? <Objet2_02 scale={0.08} position={[16,-26, 20]} rotation={[0,19.5,0]}/> : objet2_id == 2 ? <Objet2_03 scale={0.125} position={[16,-26, 20]} rotation={[0,-19.5,0]}/> : objet2_id == 3 ? <Objet2_04 scale={0.05} position={[16,-26, 20]} rotation={[0,-19.5,0]}/> : objet2_id == 4 ? <Objet2_05 scale={0.06} rotation={[0,-19.5,0]} position={[16,-26, 20]}/> : objet2_id == 5 ? <Objet2_06 scale={0.20} position={[16,-18, 20]} rotation={[0,-19.5,0]}/> : objet2_id == 6 ? <Objet2_07 scale={20} position={[16,-26, 20]} rotation={[0,-19.5,0]}/> : objet2_id == 7 ? <Objet2_08 scale={0.12} position={[16,-26, 20]} rotation={[0,-19.5,0]}/> :  objet2_id == 8 ? <Objet2_09 scale={20} position={[16,-26, 20]} rotation={[0,-19.5,0]}/> : null}

          {objet3_id == 0 ? <Objet3_01 scale={0.04} position={[-26,-8 , 12]} rotation={[0,0,0]}/> : objet3_id == 1 ? <Objet3_02 scale={0.08} position={[-16,-24, 20]} rotation={[0,19.5,0]}/> : objet3_id == 2 ? <Objet3_03 scale={0.08} position={[-16,-24, 20]} rotation={[0,19.5,0]}/> : objet3_id == 3 ? <Objet3_04 scale={0.35} position={[-16,-24, 20]} rotation={[0,19.5,0]}/> : objet3_id == 4 ? <Objet3_05 scale={0.085} rotation={[0,19.5,0]} position={[-16,-24, 20]}/> : objet3_id == 5 ? <Objet3_06 scale={0.15} position={[-16,-24, 20]} rotation={[0,19.5,0]}/> : objet3_id == 6 ? <Objet3_07 scale={3.5} position={[-16,-18, 20]} rotation={[0,19.5,0]}/> : objet3_id == 7 ? <Objet3_08 scale={3.5} position={[-16,-18, 20]} rotation={[0,19.5,0]}/> : null}

        </Suspense>
    </group>
  )
}

