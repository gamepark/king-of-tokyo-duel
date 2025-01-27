import { MaterialType } from '@gamepark/king-of-tokyo-duel/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'

export class PowerCardCostLocator extends Locator {
  parentItemType = MaterialType.PowerCard
  positionOnParent = { x: 10, y: 10 }
  locationDescription = new LocationDescription({ width: 2, height: 2, borderRadius: 1 })
}

export const powerCardCostLocator = new PowerCardCostLocator()