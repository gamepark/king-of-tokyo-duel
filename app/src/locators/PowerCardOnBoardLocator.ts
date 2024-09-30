import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { powerCardDescription } from '../material/PowerCardDescription'

export class PowerCardOnBoardLocator extends ListLocator {
  parentItemType = MaterialType.MainBoard

  getPositionOnParent(_location: Location, _context: MaterialContext): XYCoordinates {
    return {
      x: 73,
      y: -17.7
    }
  }

  getHoverTransform() {
    return [
      'translateZ(10em)',
      'scale(2)',
      'translateY(15%)'
    ]
  }

  gap = { x: -(powerCardDescription.width + 1.2) }

  navigationSorts = [(item: MaterialItem) => -item.location.x!]

}

export const powerCardOnBoardLocator = new PowerCardOnBoardLocator()