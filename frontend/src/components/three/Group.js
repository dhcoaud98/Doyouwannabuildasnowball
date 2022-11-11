// Else
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"
import React, { Suspense } from "react"

// three models
import { Snowglobe } from "./SnowGlobe"



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

  const c_tree_id = useSelector((state) => state.snowball.c_tree_id)
  const pets_id = useSelector((state) => state.snowball.pets_id)
  const building_id = useSelector((state) => state.snowball.building_id)
  console.log(useSelector((state) => state.snowball.c_tree_id))

  return (
    <group>
        <Snowglobe/>
        <Suspense fallback={null}>
          {pets_id == 0 ? <Pets_01 scale={0.08} position={[22,-26,0]}/> : pets_id == 1 ? <Pets_02 scale={0.08} position={[22,-26,0]}/> : pets_id == 2 ? <Pets_03 scale={0.08} position={[22,-26,0]}/> : pets_id == 3 ? <Pets_04 scale={0.08} position={[22,-26,0]}/> : pets_id == 4 ? <Pets_05 scale={0.08} position={[22,-26,0]}/> : pets_id == 5 ? <Pets_06 scale={0.08} position={[22,-26,0]}/> : pets_id == 6 ? <Pets_07 scale={0.08} position={[22,-26,0]}/> : pets_id == 7 ? <Pets_08 scale={0.08} position={[22,-26,0]}/> : <Pets_09 scale={0.08} position={[22,-26,0]}/>}
        
          {c_tree_id == 0 ? <C_Tree_01 scale={0.025} position={[0,-26,0]}/> : c_tree_id == 1 ? <C_Tree_02 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 2 ? <C_Tree_03 scale={4} position={[0,-26,0]}/> : c_tree_id == 3 ? <C_Tree_04 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 4 ? <C_Tree_05 scale={0.05} position={[0,-26,0]}/> : c_tree_id == 5 ? <C_Tree_06 scale={0.045} position={[0,-26,0]}/> : c_tree_id == 6 ? <C_Tree_07 scale={0.055} position={[0,-26,0]}/> : c_tree_id == 7 ? <C_Tree_08 scale={0.08} position={[0,-26,0]}/> : <C_Tree_09 scale={0.055} position={[0,-26,0]}/>}
  
          {building_id == 0 ? <Building_01 scale={0.024} position={[20,-15,-20]}/> : building_id == 1 ? <Building_02 scale={0.025} position={[20,-15,-20]}/> : building_id == 2 ? <Building_03 scale={0.04} position={[20,-15,-20]}/> : building_id == 3 ? <Building_04 scale={0.04} position={[20,-15,-20]}/> : building_id == 4 ? <Building_05 scale={0.04} position={[20,-15,-20]}/> : building_id == 5 ? <Building_06 scale={0.025} position={[20,-15,-20]}/> : building_id == 6 ? <Pets_07 scale={0.08} position={[20,-15,-20]}/> : building_id == 7 ? <Pets_08 scale={0.08} position={[20,-15,-20]}/> : <Pets_09 scale={0.08} position={[22,-26,0]}/>}
        </Suspense>
    </group>
  )
}

