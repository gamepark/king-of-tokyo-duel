import { LocationType } from '@gamepark/king-of-tokyo-duel/material/LocationType'
import { BoardDescription } from '@gamepark/react-game'
import Board from '../images/board/board.jpg'

export class MainBoardDescription extends BoardDescription {
  width = 31.5
  height = 20

  image = Board

  staticItem = {
    location: {
      type: LocationType.MainBoard
    }
  }
}

export const mainBoardDescription = new MainBoardDescription()