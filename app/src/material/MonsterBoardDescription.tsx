import { MonsterBoard } from '@gamepark/king-of-tokyo-duel/material/MonsterBoard'
import { BoardDescription } from '@gamepark/react-game'
import Alienoid from '../images/monsters/en/Alienoid.jpg'
import CyberKitty from '../images/monsters/en/CyberKitty.jpg'
import Gigazaur from '../images/monsters/en/Gigazaur.jpg'
import MekaDragon from '../images/monsters/en/MekaDragon.jpg'
import SpacePenguin from '../images/monsters/en/SpacePenguin.jpg'
import TheKing from '../images/monsters/en/TheKing.jpg'

export class MonsterBoardDescription extends BoardDescription {
  width = 12.77
  height = 10
  borderRadius = 0.3

  images = {
    [MonsterBoard.Alienoid]: Alienoid,
    [MonsterBoard.CyberKitty]: CyberKitty,
    [MonsterBoard.Gigazaur]: Gigazaur,
    [MonsterBoard.MekaDragon]: MekaDragon,
    [MonsterBoard.SpacePenguin]: SpacePenguin,
    [MonsterBoard.TheKing]: TheKing,
  }
}

export const monsterBoardDescription = new MonsterBoardDescription()