import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { energyCardDescription } from '../material/EnergyCardDescription'
import { mainBoardDescription } from '../material/MainBoardDescription'

export class EnergyCardOnBoardLocator extends ListLocator {
  parentItemType = MaterialType.MainBoard
  getParentItem() {
    return mainBoardDescription.staticItem
  }

  getPositionOnParent(_location: Location, _context: MaterialContext): XYCoordinates {
    return {
      x: 23,
      y: -17.5
    }
  }

  gap = { x: energyCardDescription.width + 1.57 }

}

export const energyCardOnBoardLocator = new EnergyCardOnBoardLocator()