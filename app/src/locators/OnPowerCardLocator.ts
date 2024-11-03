import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

export class OnPowerCardLocator extends Locator {
  parentItemType = MaterialType.PowerCard

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    if (!isItemContext(context)) return { x: 50, y: 50}
    if (location.x === 0) {
      return {
        x: 20, y: 90
      }
    }

    return {
      x: 80, y: 90
    }
  }
}

export const onPowerCardLocator = new OnPowerCardLocator()