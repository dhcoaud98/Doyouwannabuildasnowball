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


export function Group() {

  return (
    <group>
        <Snowglobe/>
        <Ox scale={0.08} position={[0,-26,0]}/>
    </group>
  )
}

