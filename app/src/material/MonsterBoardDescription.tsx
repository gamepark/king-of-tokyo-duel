import { Monster } from '@gamepark/king-of-tokyo-duel/material/Monster'
import { BoardDescription } from '@gamepark/react-game'
import Alienoid from '../images/monsters/en/Alienoid.jpg'
import CyberKitty from '../images/monsters/en/CyberKitty.jpg'
import Gigazaur from '../images/monsters/en/Gigazaur.jpg'
import MekaDragon from '../images/monsters/en/MekaDragon.jpg'
import SpacePenguin from '../images/monsters/en/SpacePenguin.jpg'
import TheKing from '../images/monsters/en/TheKing.jpg'
import { MonsterBoardHelp } from './help/MonsterBoardHelp'

export class MonsterBoardDescription extends BoardDescription {
  width = 12.77
  height = 10
  borderRadius = 0.3

  images = {
    [Monster.Alienoid]: Alienoid,
    [Monster.CyberKitty]: CyberKitty,
    [Monster.Gigazaur]: Gigazaur,
    [Monster.MekaDragon]: MekaDragon,
    [Monster.SpacePenguin]: SpacePenguin,
    [Monster.TheKing]: TheKing,
  }

  help = MonsterBoardHelp
}

export const monsterBoardDescription = new MonsterBoardDescription()