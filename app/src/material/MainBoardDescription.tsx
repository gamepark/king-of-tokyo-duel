import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import Board from '../images/board/board.jpg'
import { MainBoardHelp } from './help/MainBoardHelp'

export class MainBoardDescription extends BoardDescription {
  width = 30
  height = 19

  image = Board

  staticItem = {
    location: {
      type: LocationType.MainBoard
    }
  }

  help = MainBoardHelp
}

export const mainBoardDescription = new MainBoardDescription()