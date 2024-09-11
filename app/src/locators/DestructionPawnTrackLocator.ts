
import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { mainBoardDescription } from '../material/MainBoardDescription'

export class DestructionPawnTrackLocator extends Locator {
  parentItemType = MaterialType.MainBoard
  getParentItem() {
    return mainBoardDescription.staticItem
  }

  getPositionOnParent(_location: Location, _context: MaterialContext) {
    return {
      x: 6.5,
      y: 70
    }
  }
}

export const destructionPawnTrackLocator = new DestructionPawnTrackLocator();