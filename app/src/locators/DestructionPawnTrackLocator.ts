import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class DestructionPawnTrackLocator extends Locator {
  parentItemType = MaterialType.MainBoard

  coordinates = { z: 1 }

  getPositionOnParent(location: Location, _context: MaterialContext) {
    const coordinates = {
      x: 6.5,
      y: 70.5
    }

    coordinates.x +=  + (location.x! * 3.17)
    if ((location.x! - 2) % 4 === 3) {
      coordinates.x -= 1.2
      coordinates.y -= 1.5
    }
    if ((location.x! - 2) % 4 === 0) coordinates.y -= 9.5
    return coordinates
  }
}

export const destructionPawnTrackLocator = new DestructionPawnTrackLocator();