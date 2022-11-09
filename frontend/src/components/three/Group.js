// Else
import { RootState } from "../../app/store"
import { useSelector } from "react-redux"

// three models
// Snowglobe
import { Snowglobe } from "./SnowGlobe"
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
import { C_Tree_01 } from "./C_Tree/C_Tree_01"
import { C_Tree_02 } from "./C_Tree/C_Tree_02"
import { C_Tree_03 } from "./C_Tree/C_Tree_03"
import { C_Tree_04 } from "./C_Tree/C_Tree_04"
import { C_Tree_05 } from "./C_Tree/C_Tree_05"
import { C_Tree_06 } from "./C_Tree/C_Tree_06"
import { C_Tree_07 } from "./C_Tree/C_Tree_07"
import { C_Tree_08 } from "./C_Tree/C_Tree_08"
import { C_Tree_09 } from "./C_Tree/C_Tree_09"


export function Group() {
  const c_tree_id = useSelector((state) => state.snowball.c_tree_id)
  const pets_id = useSelector((state) => state.snowball.pets_id)

  return (
    <group>
        <Snowglobe/>
        {pets_id == 0 ? <ArcticFox scale={0.08} position={[22,-26,0]}/> : pets_id == 1 ? <Ox scale={0.08} position={[22,-26,0]}/> : pets_id == 2 ? <Penguin scale={0.08} position={[22,-26,0]}/> : pets_id == 3 ? <Polarbear scale={0.08} position={[22,-26,0]}/> : pets_id == 4 ? <Reindeer scale={0.08} position={[22,-26,0]}/> : pets_id == 5 ? <Seal scale={0.08} position={[22,-26,0]}/> : pets_id == 6 ? <Snowowl scale={0.08} position={[22,-26,0]}/> : pets_id == 7 ? <Snowweasel scale={0.08} position={[22,-26,0]}/> : <Walrus scale={0.08} position={[22,-26,0]}/>}
        {c_tree_id == 0 ? <C_Tree_01 scale={0.025} position={[0,-26,0]}/> : c_tree_id == 1 ? <C_Tree_02 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 2 ? <C_Tree_03 scale={4} position={[0,-26,0]}/> : c_tree_id == 3 ? <C_Tree_04 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 4 ? <C_Tree_05 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 5 ? <C_Tree_06 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 6 ? <C_Tree_07 scale={0.08} position={[0,-26,0]}/> : c_tree_id == 7 ? <C_Tree_08 scale={0.08} position={[0,-26,0]}/> : <C_Tree_09 scale={0.08} position={[0,-26,0]}/>}
    </group>
  )
}

