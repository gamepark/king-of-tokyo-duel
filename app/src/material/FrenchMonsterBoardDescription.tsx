import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import Alienoid from '../images/monsters/fr/Alienoid.jpg'
import CyberKitty from '../images/monsters/fr/CyberKitty.jpg'
import Gigazaur from '../images/monsters/fr/Gigazaur.jpg'
import MekaDragon from '../images/monsters/fr/MekaDragon.jpg'
import SpacePenguin from '../images/monsters/fr/SpacePenguin.jpg'
import TheKing from '../images/monsters/fr/TheKing.jpg'
import { MonsterBoardDescription } from './MonsterBoardDescription'

export class FrenchMonsterBoardDescription extends MonsterBoardDescription {
  images = {
    [Monster.Alienoid]: Alienoid,
    [Monster.CyberKitty]: CyberKitty,
    [Monster.Gigazaur]: Gigazaur,
    [Monster.MekaDragon]: MekaDragon,
    [Monster.SpacePenguin]: SpacePenguin,
    [Monster.TheKing]: TheKing
  }
}

export const frenchMonsterBoardDescription = new FrenchMonsterBoardDescription()