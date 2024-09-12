import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class FamePawnTrackLocator extends Locator {
  parentItemType = MaterialType.MainBoard

  coordinates = { z: 1 }

  getPositionOnParent(location: Location, _context: MaterialContext) {
    const coordinates = {
      x: 5.2,
      y: 21.5
    }

    coordinates.x +=  + (location.x! * 3.17)
    if ((location.x! - 2) % 4 === 3) {
      coordinates.x += 1.2
      coordinates.y += 1.5
    }
    if ((location.x! - 2) % 4 === 0) coordinates.y += 8.5
    return coordinates
  }

}

export const famePawnTrackLocator = new FamePawnTrackLocator();