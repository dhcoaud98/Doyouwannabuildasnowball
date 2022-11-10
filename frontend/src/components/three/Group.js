// Else
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"

// three models
// Snowglobe
import { Snowglobe } from "./SnowGlobe"
// C_Tree
import { C_Tree_01 } from "./C_Tree/C_Tree_01"
import { C_Tree_02 } from "./C_Tree/C_Tree_02"
import { C_Tree_03 } from "./C_Tree/C_Tree_03"
import { C_Tree_04 } from "./C_Tree/C_Tree_04"
import { C_Tree_05 } from "./C_Tree/C_Tree_05"
import { C_Tree_06 } from "./C_Tree/C_Tree_06"
import { C_Tree_07 } from "./C_Tree/C_Tree_07"
import { C_Tree_08 } from "./C_Tree/C_Tree_08"
import { C_Tree_09 } from "./C_Tree/C_Tree_09"
// Building
import { Building_01 } from "./Building/Building_01"
import { Building_02 } from "./Building/Building_02"
import { Building_03 } from "./Building/Building_03"
import { Building_04 } from "./Building/Building_04"
import { Building_05 } from "./Building/Building_05"
import { Building_06 } from "./Building/Building_06"

// Pets
import { Ox } from "./Pets/Ox"
import { ArcticFox } from "./Pets/Arcticfox"
import { Penguin } from "./Pets/Penguin"
import { Polarbear } from "./Pets/Polarbear"
import { Reindeer } from "./Pets/Reindeer"
import { Seal } from "./Pets/Seal"
import { Snowowl } from "./Pets/Snowowl"
import { Snowweasel } from "./Pets/Snowweasel"
import { Walrus } from "./Pets/Walrus"



export function Group() {
  const c_tree_id = useSelector((state) => state.snowball.c_tree_id)
  const pets_id = useSelector((state) => state.snowball.pets_id)
  const building_id = useSelector((state) => state.snowball.building_id)
  console.log(useSelector((state) => state.snowball.c_tree_id))

  return (
    <group>
        <Snowglobe/>
        {pets_id == 0 ? <ArcticFox scale={0.08} position={[22,-26,0]}/> : pets_id == 1 ? <Ox scale={0.08} position={[22,-26,0]}/> : pets_id == 2 ? <Penguin scale={0.08} position={[22,-26,0]}/> : pets_id == 3 ? <Polarbear scale={0.08} position={[22,-26,0]}/> : pets_id == 4 ? <Reindeer scale={0.08} position={[22,-26,0]}/> : pets_id == 5 ? <Seal scale={0.08} position={[22,-26,0]}/> : pets_id == 6 ? <Snowowl scale={0.08} position={[22,-26,0]}/> : pets_id == 7 ? <Snowweasel scale={0.08} position={[22,-26,0]}/> : <Walrus scale={0.08} position={[22,-26,0]}/>}
        {c_tree_id == 0 ? <C_Tree_01 scale={0.025} position={[0,-26,0]}/> : c_tree_id == 1 ? <C_Tree_02 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 2 ? <C_Tree_03 scale={4} position={[0,-26,0]}/> : c_tree_id == 3 ? <C_Tree_04 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 4 ? <C_Tree_05 scale={0.05} position={[0,-26,0]}/> : c_tree_id == 5 ? <C_Tree_06 scale={0.045} position={[0,-26,0]}/> : c_tree_id == 6 ? <C_Tree_07 scale={0.055} position={[0,-26,0]}/> : c_tree_id == 7 ? <C_Tree_08 scale={0.08} position={[0,-26,0]}/> : <C_Tree_09 scale={0.055} position={[0,-26,0]}/>}
        {building_id == 0 ? <Building_01 scale={0.024} position={[20,-15,-20]}/> : building_id == 1 ? <Building_02 scale={0.025} position={[20,-15,-20]}/> : building_id == 2 ? <Building_03 scale={0.04} position={[20,-15,-20]}/> : building_id == 3 ? <Building_04 scale={0.04} position={[20,-15,-20]}/> : building_id == 4 ? <Building_05 scale={0.04} position={[20,-15,-20]}/> : building_id == 5 ? <Building_06 scale={0.025} position={[20,-15,-20]}/> : building_id == 6 ? <Snowowl scale={0.08} position={[20,-15,-20]}/> : building_id == 7 ? <Snowweasel scale={0.08} position={[20,-15,-20]}/> : <Walrus scale={0.08} position={[22,-26,0]}/>}
    </group>
  )
}

