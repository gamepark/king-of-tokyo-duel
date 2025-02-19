import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { isItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'

export class OnPowerCardLocator extends Locator {
  parentItemType = MaterialType.PowerCard

  getPositionOnParent(location: Location, context: MaterialContext): XYCoordinates {
    if (!isItemContext(context)) return { x: 50, y: 50}
    const x = location.x! % 2 === 0? 17: 87
    const y = 90 - (25 * Math.floor(location.x! / 2))
    return { x: x, y: y }
  }
}

export const onPowerCardLocator = new OnPowerCardLocator()