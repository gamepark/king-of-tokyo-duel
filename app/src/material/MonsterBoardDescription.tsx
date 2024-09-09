import { MonterBoard } from '@gamepark/king-of-tokyo-duel/material/MonterBoard'
import { BoardDescription } from '@gamepark/react-game'
import Alienoid from '../images/monsters/en/Alienoid.jpg'
import CyberKitty from '../images/monsters/en/CyberKitty.jpg'
import Gigazaur from '../images/monsters/en/Gigazaur.jpg'
import MekaDragon from '../images/monsters/en/MekaDragon.jpg'
import SpacePenguin from '../images/monsters/en/SpacePenguin.jpg'
import TheKing from '../images/monsters/en/TheKing.jpg'

export class MonsterBoardDescription extends BoardDescription {
  width = 12
  height = 9.5

  images = {
    [MonterBoard.Alienoid]: Alienoid,
    [MonterBoard.CyberKitty]: CyberKitty,
    [MonterBoard.Gigazaur]: Gigazaur,
    [MonterBoard.MekaDragon]: MekaDragon,
    [MonterBoard.SpacePenguin]: SpacePenguin,
    [MonterBoard.TheKing]: TheKing,
  }
}

export const monsterBoardDescription = new MonsterBoardDescription()